import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '竹内鍼灸治療院 | 世田谷区用賀 脈診経絡治療',
  description: '竹内鍼灸治療院 - 世田谷区用賀。脈診による経絡治療を行っております。腰痛、肩こり、神経痛、不妊治療、逆子、自律神経の不調、うつ症状などでお悩みの方はご相談ください。ご予約：03-3708-4511',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
