'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // バリデーション
    if (!formData.name.trim()) {
      setMessage({ text: 'お名前を入力してください。', type: 'error' })
      return
    }

    if (!formData.email || !isValidEmail(formData.email)) {
      setMessage({ text: '有効なメールアドレスを入力してください。', type: 'error' })
      return
    }

    if (!formData.message.trim()) {
      setMessage({ text: 'お問い合わせ内容を入力してください。', type: 'error' })
      return
    }

    // 送信処理（実際の実装ではサーバーに送信）
    console.log('Form submitted:', formData)
    setMessage({ text: 'お問い合わせを受け付けました。\n確認次第、ご連絡いたします。', type: 'success' })
    setFormData({ name: '', email: '', phone: '', message: '' })

    // 5秒後にメッセージを消去
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
      {message && (
        <div
          className={`form-message form-message--${message.type}`}
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            textAlign: 'center',
            background: message.type === 'success' ? '#e8f5e9' : '#ffebee',
            color: message.type === 'success' ? '#2e7d32' : '#c62828',
            whiteSpace: 'pre-line'
          }}
        >
          {message.text}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="name">お名前 <span className="required">必須</span></label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">メールアドレス <span className="required">必須</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">電話番号</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">お問い合わせ内容 <span className="required">必須</span></label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-full">
        送信する
      </button>
    </form>
  )
}
