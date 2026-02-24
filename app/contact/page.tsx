import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'メールでのお問い合わせ | 竹内鍼灸治療院',
  description: '竹内鍼灸治療院へのメールお問い合わせフォーム',
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="container">
        <div className="contact-page-header">
          <Link href="/" className="contact-page-back">
            ← トップへ戻る
          </Link>
          <h1 className="contact-page-title">メールでのお問い合わせ</h1>
          <p className="contact-page-description">
            以下のフォームにご記入のうえ、送信してください。確認次第、ご連絡いたします。
          </p>
        </div>
        <div className="contact-form-wrapper contact-form-wrapper--page">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
