'use client'

import { useState, useEffect } from 'react'

const PASSWORD1 = '1129'
const PASSWORD2 = 'じろー'

export default function PasswordProtection({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [step, setStep] = useState(1)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error1, setError1] = useState('')
  const [error2, setError2] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authenticated = sessionStorage.getItem('authenticated') === 'true'
      if (authenticated) {
        setIsAuthenticated(true)
        onAuthenticated()
      }
    }
  }, [onAuthenticated])

  const checkPassword1 = () => {
    if (password1.trim() === PASSWORD1) {
      setStep(2)
      setError1('')
    } else {
      setError1('パスワードが違います')
      setPassword1('')
    }
  }

  const checkPassword2 = () => {
    if (password2.trim() === PASSWORD2) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('authenticated', 'true')
      }
      setIsAuthenticated(true)
      onAuthenticated()
    } else {
      setError2('答えが違います')
      setPassword2('')
    }
  }

  if (isAuthenticated) return null

  return (
    <div className="password-screen">
      <div className="password-container">
        <h1 className="password-title">竹内鍼灸治療院</h1>
        <p className="password-subtitle">プレビューサイト</p>

        {step === 1 && (
          <div className="password-step">
            <label htmlFor="password1">パスワードを入力してください</label>
            <input
              type="password"
              id="password1"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkPassword1()}
              placeholder="パスワード"
              autoComplete="off"
            />
            <button type="button" onClick={checkPassword1} className="password-btn">
              次へ
            </button>
            <p className="password-error">{error1}</p>
          </div>
        )}

        {step === 2 && (
          <div className="password-step">
            <label htmlFor="password2">猫の名前は？</label>
            <input
              type="text"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkPassword2()}
              placeholder="ひらがなで入力"
              autoComplete="off"
            />
            <button type="button" onClick={checkPassword2} className="password-btn">
              サイトを見る
            </button>
            <p className="password-error">{error2}</p>
          </div>
        )}
      </div>
    </div>
  )
}
