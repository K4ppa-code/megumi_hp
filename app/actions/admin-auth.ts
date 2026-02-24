'use server';

import { cookies } from 'next/headers';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createSignedSession, verifySignedSession, getCookieName } from '@/lib/admin-session';

type EnvWithAuth = { ADMIN_PASSWORD_1?: string; ADMIN_PASSWORD_2?: string; ADMIN_SESSION_SECRET?: string };

/** セッション署名用。ADMIN_SESSION_SECRET が無い場合はパスワードから導出（設定が1つで済む） */
function getSessionSecret(env: EnvWithAuth): string {
  if (env.ADMIN_SESSION_SECRET) return env.ADMIN_SESSION_SECRET;
  return (env.ADMIN_PASSWORD_1 ?? '') + (env.ADMIN_PASSWORD_2 ?? '');
}

export type LoginResult = { ok: true } | { ok: false; error: string };

export async function adminLogin(step1: string, step2: string): Promise<LoginResult> {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as EnvWithAuth;
    const p1 = env.ADMIN_PASSWORD_1;
    const p2 = env.ADMIN_PASSWORD_2;

    if (!p1 || !p2) {
      return { ok: false, error: '管理者パスワードが設定されていません。' };
    }

    const secret = getSessionSecret(env);
    if (!secret) {
      return { ok: false, error: '管理者パスワードを設定してください。' };
    }

    const s1 = (step1 ?? '').trim();
    const s2 = (step2 ?? '').trim();

    if (s1 !== p1) {
      return { ok: false, error: 'パスワードが違います。' };
    }
    if (!s2) {
      return { ok: true };
    }
    if (s2 !== p2) {
      return { ok: false, error: '答えが違います。' };
    }

    const value = await createSignedSession(secret);
    const store = await cookies();
    store.set(getCookieName(), value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/admin',
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'ログインに失敗しました。' };
  }
}

export async function adminLogout(): Promise<void> {
  const store = await cookies();
  store.delete(getCookieName());
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as EnvWithAuth;
    const secret = getSessionSecret(env);
    if (!secret) return false;

    const store = await cookies();
    const value = store.get(getCookieName())?.value;
    if (!value) return false;

    return await verifySignedSession(secret, value);
  } catch {
    return false;
  }
}
