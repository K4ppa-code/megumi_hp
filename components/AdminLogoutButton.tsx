'use client';

import { useRouter } from 'next/navigation';
import { adminLogout } from '@/app/actions/admin-auth';

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await adminLogout();
    router.refresh();
  }

  return (
    <button type="button" className="btn btn-secondary admin-logout-btn" onClick={handleLogout}>
      ログアウト
    </button>
  );
}
