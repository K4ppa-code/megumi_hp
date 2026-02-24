'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/app/actions/admin-auth';

export default function AdminLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await adminLogin(step1, '');
    setLoading(false);
    if (result.ok) {
      setStep(2);
      setStep2('');
    } else {
      setError(result.error);
      setStep1('');
    }
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await adminLogin(step1, step2);
    setLoading(false);
    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error);
      setStep2('');
    }
  }

  return (
    <div className="admin-login-form">
      {error && <p className="admin-login-error" role="alert">{error}</p>}
      {step === 1 ? (
        <form onSubmit={handleStep1}>
          <label htmlFor="admin-password-1">パスワード</label>
          <input
            id="admin-password-1"
            type="password"
            value={step1}
            onChange={(e) => setStep1(e.target.value)}
            autoComplete="off"
            autoFocus
            disabled={loading}
            placeholder="パスワード"
          />
          <button type="submit" className="btn btn-primary" disabled={loading || !step1.trim()}>
            {loading ? '確認中…' : '次へ'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleStep2}>
          <label htmlFor="admin-password-2">確認（猫の名前）</label>
          <input
            id="admin-password-2"
            type="text"
            value={step2}
            onChange={(e) => setStep2(e.target.value)}
            autoComplete="off"
            autoFocus
            disabled={loading}
            placeholder="ひらがなで入力"
          />
          <div className="admin-login-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => { setStep(1); setError(''); }}
              disabled={loading}
            >
              戻る
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading || !step2.trim()}>
              {loading ? '確認中…' : 'ログイン'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
