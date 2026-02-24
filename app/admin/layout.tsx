import { verifyAdminSession } from '@/app/actions/admin-auth';
import AdminLoginForm from '@/components/AdminLoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await verifyAdminSession();

  if (!isAuthenticated) {
    return (
      <main className="admin-page admin-login-page">
        <div className="container">
          <div className="admin-login-wrapper">
            <h1>予約管理</h1>
            <p className="admin-login-description">管理者用パスワードを入力してください。</p>
            <AdminLoginForm />
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
