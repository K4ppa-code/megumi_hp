import AdminCalendar from '@/components/AdminCalendar';
import Link from 'next/link';
import AdminLogoutButton from '@/components/AdminLogoutButton';

export const metadata = {
  title: '予約管理 | 竹内鍼灸治療院',
  description: '予約枠の設定',
};

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>予約枠の設定</h1>
          <div className="admin-header-actions">
            <Link href="/" className="btn btn-secondary">トップへ戻る</Link>
            <AdminLogoutButton />
          </div>
        </div>
        <p className="admin-description">
          日付と時間帯をクリックして、予約可能（○）／予約不可（×）を切り替えてください。保存は自動で反映されます。
        </p>
        <AdminCalendar />
      </div>
    </main>
  );
}
