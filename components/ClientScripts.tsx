'use client'

import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // ローダー
    const loader = document.getElementById('loader')
    const handleLoad = () => {
      setTimeout(() => {
        loader?.classList.add('hidden')
        document.body.style.overflow = ''
      }, 800)
    }
    window.addEventListener('load', handleLoad)
    setTimeout(() => {
      loader?.classList.add('hidden')
      document.body.style.overflow = ''
    }, 3000)

    // ナビゲーション
    const header = document.getElementById('header')
    const navToggle = document.getElementById('navToggle')
    const navMenu = document.getElementById('navMenu')
    const navOverlay = document.getElementById('navOverlay')

    const toggleMenu = () => {
      navToggle?.classList.toggle('active')
      navMenu?.classList.toggle('active')
      navOverlay?.classList.toggle('active')
      document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : ''
    }

    const closeMenu = () => {
      navToggle?.classList.remove('active')
      navMenu?.classList.remove('active')
      navOverlay?.classList.remove('active')
      document.body.style.overflow = ''
    }

    navToggle?.addEventListener('click', toggleMenu)
    navOverlay?.addEventListener('click', closeMenu)
    navMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu)
    })

    // スクロール時のヘッダースタイル変更
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        header?.classList.add('scrolled')
      } else {
        header?.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll)

    // トップへ戻るボタン
    const backToTop = document.getElementById('backToTop')
    const handleBackToTopScroll = () => {
      if (window.pageYOffset > 500) {
        backToTop?.classList.add('visible')
      } else {
        backToTop?.classList.remove('visible')
      }
    }
    window.addEventListener('scroll', handleBackToTopScroll)

    backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
        const targetId = this.getAttribute('href')
        if (!targetId || targetId === '#') {
          e.preventDefault()
          return
        }
        const targetElement = document.querySelector(targetId)
        if (!targetElement) return
        e.preventDefault()
        const headerHeight = header?.offsetHeight || 0
        const isMobile = window.innerWidth <= 768
        const extraOffset = isMobile ? 20 : 0
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraOffset
        window.scrollTo({ top: targetPosition, behavior: 'smooth' })
      })
    })

    // Intersection Observer アニメーション
    const revealElements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, { root: null, rootMargin: '0px', threshold: 0.1 })

    revealElements.forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleBackToTopScroll)
    }
  }, [])

  return null
}
