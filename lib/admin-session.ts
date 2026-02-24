/**
 * 管理画面用セッション: 署名付きクッキーで改ざんを検知
 * ペイロードは有効期限のみ。secret は env.ADMIN_SESSION_SECRET を使用
 */

const COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24時間

function base64UrlEncode(data: ArrayBuffer): string {
  const bytes = new Uint8Array(data);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function createSignedSession(secret: string): Promise<string> {
  const expiry = String(Date.now() + SESSION_MAX_AGE_MS);
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(expiry));
  const payload = btoa(expiry).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const sig = base64UrlEncode(signature);
  return `${payload}.${sig}`;
}

export async function verifySignedSession(secret: string, value: string): Promise<boolean> {
  if (!value || !secret) return false;
  const dot = value.indexOf('.');
  if (dot === -1) return false;
  const payloadB64 = value.slice(0, dot).replace(/-/g, '+').replace(/_/g, '/');
  const sigB64 = value.slice(dot + 1);
  let expiryMs: number;
  try {
    expiryMs = parseInt(atob(payloadB64), 10);
  } catch {
    return false;
  }
  if (Number.isNaN(expiryMs) || Date.now() > expiryMs) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const expectedSig = await crypto.subtle.sign('HMAC', key, encoder.encode(String(expiryMs)));
  const expected = new Uint8Array(expectedSig);
  const actual = base64UrlDecode(sigB64);
  if (expected.length !== actual.length) return false;
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) return false;
  }
  return true;
}

export function getCookieName(): string {
  return COOKIE_NAME;
}
