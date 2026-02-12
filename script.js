/**
 * 竹内鍼灸治療院 - メインスクリプト
 */

document.addEventListener('DOMContentLoaded', () => {
    // ローダー
    initLoader();

    // ナビゲーション
    initNavigation();

    // スクロールエフェクト
    initScrollEffects();

    // スムーズスクロール
    initSmoothScroll();

    // フォーム
    initContactForm();

    // Intersection Observer アニメーション
    initRevealAnimations();
});

/**
 * ローダー
 */
function initLoader() {
    const loader = document.getElementById('loader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 800);
    });

    // 最大3秒でローダーを非表示
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 3000);
}

/**
 * ナビゲーション
 */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // モバイルメニュートグル
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // メニューリンクをクリックしたら閉じる
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // スクロール時のヘッダースタイル変更
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * スクロールエフェクト
 */
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');

    // トップへ戻るボタンの表示/非表示
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // トップへ戻るボタンのクリック
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * スムーズスクロール
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * お問い合わせフォーム
 */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // フォームデータの取得
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // バリデーション
        if (!validateForm(data)) {
            return;
        }

        // 送信処理（実際の実装ではサーバーに送信）
        console.log('Form submitted:', data);

        // 成功メッセージ
        showFormMessage('お問い合わせを受け付けました。\n確認次第、ご連絡いたします。', 'success');

        // フォームリセット
        form.reset();
    });
}

/**
 * フォームバリデーション
 */
function validateForm(data) {
    const { name, email, message } = data;

    if (!name || name.trim() === '') {
        showFormMessage('お名前を入力してください。', 'error');
        return false;
    }

    if (!email || !isValidEmail(email)) {
        showFormMessage('有効なメールアドレスを入力してください。', 'error');
        return false;
    }

    if (!message || message.trim() === '') {
        showFormMessage('お問い合わせ内容を入力してください。', 'error');
        return false;
    }

    return true;
}

/**
 * メールアドレスの検証
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * フォームメッセージの表示
 */
function showFormMessage(message, type) {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // メッセージ要素を作成
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;

    // スタイルを追加
    Object.assign(messageEl.style, {
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        textAlign: 'center',
        animation: 'fadeUp 0.3s ease'
    });

    if (type === 'success') {
        messageEl.style.background = '#e8f5e9';
        messageEl.style.color = '#2e7d32';
    } else {
        messageEl.style.background = '#ffebee';
        messageEl.style.color = '#c62828';
    }

    // フォームの先頭に挿入
    const form = document.getElementById('contactForm');
    form.insertBefore(messageEl, form.firstChild);

    // 5秒後に自動で消去
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

/**
 * Intersection Observer によるアニメーション
 */
function initRevealAnimations() {
    // アニメーション対象の要素を設定
    const revealElements = [
        '.feature-card',
        '.treatment-point',
        '.symptom-category',
        '.profile-content',
        '.info-card',
        '.contact-method'
    ];

    // 各セレクタに対してクラスを追加
    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Intersection Observer の設定
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 監視開始
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * パララックス効果（オプション）
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/**
 * カウントアップアニメーション（将来の機能拡張用）
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * 日本語入力対応のテキストエリア自動リサイズ
 */
function initAutoResize() {
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// ユーティリティ関数
const utils = {
    /**
     * デバウンス
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * スロットル
     */
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};
