'use client'

import PasswordProtection from '@/components/PasswordProtection'
import ClientScripts from '@/components/ClientScripts'
import MonthReservationStatus from '@/components/MonthReservationStatus'
import { useState } from 'react'

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)

  const handleAuthenticated = () => {
    setAuthenticated(true)
  }

  return (
    <>
      <PasswordProtection onAuthenticated={handleAuthenticated} />
      {authenticated && (
        <>
          <div className="loader" id="loader">
            <div className="loader-inner">
              <div className="loader-circle"></div>
              <span className="loader-text">竹内鍼灸治療院</span>
            </div>
          </div>

          <header className="header" id="header">
            <nav className="nav">
              <a href="#" className="logo">
                <span className="logo-main">竹内鍼灸治療院</span>
                <span className="logo-sub">TAKEUCHI ACUPUNCTURE</span>
              </a>
              <button className="nav-toggle" id="navToggle" aria-label="メニューを開く">
                <span></span>
                <span></span>
                <span></span>
              </button>
              <ul className="nav-menu" id="navMenu">
                <li><a href="#about">当院のご案内</a></li>
                <li><a href="#treatment">治療の流れ</a></li>
                <li><a href="#nerves">自律神経と鍼灸</a></li>
                <li><a href="#symptoms">適応疾患</a></li>
                <li><a href="#fee">料金・診察日</a></li>
                <li><a href="#contact">ご予約</a></li>
                <li><a href="#access">アクセス</a></li>
                <li><a href="/contact" className="nav-cta">お問い合わせ</a></li>
              </ul>
            </nav>
          </header>

          <section className="hero" id="hero">
            <div className="hero-bg">
              <div className="hero-gradient"></div>
            </div>
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title animate-fade-up">
                  <span>心と体に寄り添う</span>
                  <span>脈診経絡治療</span>
                </h1>
                <p className="hero-description animate-fade-up">
                  東洋医学の自然哲学思想に基づき、<br />
                  あなたの自己治癒力を高める鍼灸治療
                </p>
                <div className="hero-actions animate-fade-up">
                  <a href="tel:0337084511" className="btn btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    03-3708-4511
                  </a>
                  <a href="#about" className="btn btn-secondary">詳しく見る</a>
                </div>
                <p className="hero-hours animate-fade-up">平日 9:00〜19:00 / 土曜 9:00〜17:00 / 日祝休診</p>
              </div>
              <div className="hero-visual">
                <div className="hero-circle"></div>
                <div className="hero-decoration"></div>
              </div>
            </div>
            <div className="scroll-indicator">
              <span>Scroll</span>
              <div className="scroll-line"></div>
            </div>
          </section>

          <section className="news" id="news">
            <div className="container">
              <div className="news-container">
                <div className="news-header">
                  <span className="section-label">News</span>
                  <h2 className="news-title">お知らせ</h2>
                </div>
                <div className="news-content">
                  <ul className="news-list">
                    <li className="news-item">
                      <time dateTime="2024-01-15">2024.01.15</time>
                      <span className="news-tag">お知らせ</span>
                      <a href="#">年末年始の診療について</a>
                    </li>
                    <li className="news-item">
                      <time dateTime="2024-01-10">2024.01.10</time>
                      <span className="news-tag">ブログ</span>
                      <a href="#">冬の冷え対策と鍼灸治療</a>
                    </li>
                    <li className="news-item">
                      <time dateTime="2024-01-05">2024.01.05</time>
                      <span className="news-tag">診療日誌</span>
                      <a href="#">自律神経の乱れと季節の変わり目</a>
                    </li>
                  </ul>
                  <a href="#" className="news-more">お知らせ一覧へ →</a>
                </div>
              </div>
            </div>
          </section>

          <section className="about" id="about">
            <div className="container">
              <div className="section-header">
                <span className="section-label">About Us</span>
                <h2 className="section-title">当院のご案内</h2>
              </div>
              <div className="about-content">
                <div className="about-text">
                  <p className="lead-text">
                    竹内鍼灸治療院は、刺激鍼や電気を用いた治療は一切行わず、
                    <strong>脈診（みゃくしん）による経絡治療</strong>を行っております。
                  </p>
                  <p>
                    経絡治療は東洋医学の自然哲学思想の裏付けによって成立し、
                    日本の気候風土や、そこに暮らす人々の体質に適合させて発展した鍼灸術です。
                    現代的な刺激鍼や中国鍼とも違う独特の日本鍼灸治療です。
                  </p>
                  <p>
                    痛いところに鍼を何本も打つといった局所治療ではなく、
                    体表の浅いところにある経穴（ツボ）に鍼先のわずかな刺激を伝え、
                    「気血」の流れを調整することで、自己治癒力を高めて病気を治癒へと導きます。
                  </p>
                </div>
                <div className="about-features">
                  <div className="about-feature">
                    <div className="feature-icon">
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" />
                        <path d="M32 16v32M24 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3>脈診経絡治療</h3>
                    <p>脈を診て体全体のバランスを把握し、経絡を整えます</p>
                  </div>
                  <div className="about-feature">
                    <div className="feature-icon">
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 8l6 18h18l-14 11 5 17-15-11-15 11 5-17-14-11h18z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3>繊細な刺激</h3>
                    <p>体表の浅い部分にわずかな刺激を伝える優しい治療</p>
                  </div>
                  <div className="about-feature">
                    <div className="feature-icon">
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 56c13.255 0 24-10.745 24-24S45.255 8 32 8 8 18.745 8 32s10.745 24 24 24z" stroke="currentColor" strokeWidth="2" />
                        <path d="M32 20v24M20 32h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3>自己治癒力の向上</h3>
                    <p>あなた自身の治る力を引き出します</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="treatment" id="treatment">
            <div className="container">
              <div className="section-header">
                <span className="section-label">Treatment</span>
                <h2 className="section-title">治療の流れ</h2>
              </div>
              <div className="treatment-flow">
                <div className="flow-item">
                  <span className="flow-number">01</span>
                  <h3>問診</h3>
                  <p>現在の症状、これまでの経過、生活習慣などについて詳しくお聞きします。</p>
                </div>
                <div className="flow-item">
                  <span className="flow-number">02</span>
                  <h3>脈診・腹診</h3>
                  <p>脈やお腹の状態から、体全体の気血のバランスを診断します。</p>
                </div>
                <div className="flow-item">
                  <span className="flow-number">03</span>
                  <h3>施術</h3>
                  <p>経穴（ツボ）に繊細な鍼の刺激を与え、気血の流れを調整します。</p>
                </div>
                <div className="flow-item">
                  <span className="flow-number">04</span>
                  <h3>確認・アドバイス</h3>
                  <p>施術後の状態を確認し、日常生活でのアドバイスをお伝えします。</p>
                </div>
              </div>
            </div>
          </section>

          <section className="nerves" id="nerves">
            <div className="container">
              <div className="section-header">
                <span className="section-label">Autonomic Nerves</span>
                <h2 className="section-title">自律神経と鍼灸治療</h2>
              </div>

              <div className="nerves-intro">
                <h3>自律神経とは</h3>
                <p className="lead-text">
                  自律神経は、全身の筋肉や内臓、血管、分泌腺などほとんどすべての器官に分布しています。
                  人が常に安定した状態で生命を維持できるのは、この自律神経のおかげです。
                </p>
                <p>
                  気温が上昇すると汗を出して体温を調節します。運動時に心拍数を上げ、血管を収縮させて筋肉へ酸素を供給します。
                  私たちは外からの刺激に対して、状況に応じた変化を無意識のうちに行っています。その司令を出すのが自律神経です。
                </p>
              </div>

              <div className="nerves-grid">
                <div className="nerves-card">
                  <h4>交感神経と副交感神経</h4>
                  <p>
                    自律神経は交感神経と副交感神経という２つに分けられます。
                    この２つがバランスよくはたらくことで体の機能をコントロールして健康状態を保っています。
                  </p>
                  <p>
                    日中の活動に適したはたらきをするのが交感神経、休息時や睡眠中にはたらくのが副交感神経です。
                  </p>
                </div>
                <div className="nerves-card">
                  <h4>自律神経がうまく働かないと…</h4>
                  <p>
                    自律神経のバランスが崩れてしまうと、体のいろいろなところに不調が起こります。
                    <strong>その不快な症状が自律神経失調症</strong>と呼ばれる状態です。
                  </p>
                  <p>
                    自覚症状があるのに検査で異常がなく病変も見つからない場合に自律神経が原因といわれることが少なくありません。
                  </p>
                </div>
              </div>

              <div className="nerves-symptoms">
                <h4>自律神経の乱れが引き起こす症状</h4>
                <div className="symptoms-grid">
                  <div className="symptom-box">
                    <h5>からだの症状</h5>
                    <ul>
                      <li><strong>全身：</strong>脱力感、倦怠感、疲れやすい、食欲不振</li>
                      <li><strong>頭・目・顔：</strong>頭痛、耳鳴り、味覚異常、疲れ目</li>
                      <li><strong>呼吸：</strong>息苦しい、息切れ</li>
                      <li><strong>首〜背中：</strong>首・肩こり、腰痛、食道のつかえ、のどの違和感、吐き気</li>
                      <li><strong>その他：</strong>動悸、めまい、立ちくらみ、のぼせ、冷え、手足のしびれ、多汗など</li>
                    </ul>
                  </div>
                  <div className="symptom-box">
                    <h5>精神的な症状</h5>
                    <ul>
                      <li>不眠、眠りが浅い</li>
                      <li>朝起きられない</li>
                      <li>不安感、イライラ</li>
                      <li>怒りっぽい</li>
                      <li>やる気が出ない</li>
                      <li>集中力の低下</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="nerves-treatment">
                <h4>経絡治療が自律神経に有効な理由</h4>
                <p>
                  経絡治療の目的は気を調整し、陰陽五行のバランスを整えることで経絡の乱れや歪みを改善することです。
                  また体内に侵入した邪気を取り除き、自己治癒力によって病気を克服する手助けをします。
                </p>
                <p>
                  生体の恒常性に重要な役割を担っている交感神経と副交感神経。この2つが拮抗したり補いあって健康状態を保っているのは、
                  陰と陽の相互間の働きとよく似ています。気血が流れる経絡は、全身に分布する自律神経そのものにたとえることができるのではないでしょうか。
                </p>
                <p>
                  経絡治療は気血の調整を行い、自己治癒力を高めることで症状を改善する治療です。
                  シンプルに自然の摂理に従って患者さん自身の治る力をサポートするのが目的です。
                </p>
              </div>
            </div>
          </section>

          <section className="symptoms-section" id="symptoms">
            <div className="container">
              <div className="section-header">
                <span className="section-label">Symptoms</span>
                <h2 className="section-title">鍼灸の適応疾患</h2>
                <p className="section-description">
                  さまざまな症状に対応しております。お気軽にご相談ください。
                </p>
              </div>
              <div className="symptoms-container">
                <div className="symptom-category">
                  <h3 className="category-title">
                    <span className="category-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    運動器系
                  </h3>
                  <ul className="symptom-list">
                    <li>腰痛・ぎっくり腰</li>
                    <li>肩こり・五十肩</li>
                    <li>膝の痛み</li>
                    <li>神経痛</li>
                    <li>頭痛</li>
                    <li>寝違え</li>
                  </ul>
                </div>
                <div className="symptom-category">
                  <h3 className="category-title">
                    <span className="category-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </span>
                    自律神経系
                  </h3>
                  <ul className="symptom-list">
                    <li>自律神経失調症</li>
                    <li>うつ症状</li>
                    <li>不眠</li>
                    <li>めまい・耳鳴り</li>
                    <li>動悸・息切れ</li>
                    <li>ストレス</li>
                  </ul>
                </div>
                <div className="symptom-category">
                  <h3 className="category-title">
                    <span className="category-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </span>
                    婦人科系
                  </h3>
                  <ul className="symptom-list">
                    <li>不妊治療</li>
                    <li>PMS（月経前症候群）</li>
                    <li>月経不順・月経痛</li>
                    <li>更年期の諸症状</li>
                    <li>冷え性</li>
                  </ul>
                </div>
                <div className="symptom-category">
                  <h3 className="category-title">
                    <span className="category-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </span>
                    マタニティ・小児
                  </h3>
                  <ul className="symptom-list">
                    <li>逆子</li>
                    <li>つわり</li>
                    <li>妊娠中の腰痛・むくみ</li>
                    <li>安産灸</li>
                    <li>小児はり（夜泣き・かんむしなど）</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="fee" id="fee">
            <div className="container">
              <div className="section-header">
                <span className="section-label">Fee & Schedule</span>
                <h2 className="section-title">料金・診察日</h2>
              </div>
              <div className="fee-content">
                <div className="fee-table-wrapper">
                  <h3>施術料金</h3>
                  <table className="fee-table">
                    <tbody>
                      <tr>
                        <th>初診料</th>
                        <td>1,000円</td>
                      </tr>
                      <tr>
                        <th>鍼灸治療</th>
                        <td>5,000円</td>
                      </tr>
                      <tr>
                        <th>小児はり</th>
                        <td>2,000円</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="fee-note">※料金は税込です</p>
                </div>
                <div className="schedule-wrapper">
                  <h3>診療時間</h3>
                  <table className="schedule-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>月</th>
                        <th>火</th>
                        <th>水</th>
                        <th>木</th>
                        <th>金</th>
                        <th>土</th>
                        <th>日祝</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>9:00〜12:00</th>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                        <td>休</td>
                      </tr>
                      <tr>
                        <th>14:00〜19:00</th>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                        <td>△</td>
                        <td>休</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="schedule-note">△ 土曜午後は17:00まで<br />※日曜・祝日休診、他不定休あり</p>
                </div>
              </div>
            </div>
          </section>

          <section className="access" id="access">
            <div className="container">
              <div className="section-header">
                <span className="section-label">Access</span>
                <h2 className="section-title">交通アクセス</h2>
              </div>
              <div className="access-content">
                <div className="access-info">
                  <div className="info-card">
                    <h3>竹内鍼灸治療院</h3>
                    <dl className="info-list">
                      <div className="info-item">
                        <dt>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          電話番号
                        </dt>
                        <dd><a href="tel:0337084511" className="tel-link">03-3708-4511</a></dd>
                      </div>
                      <div className="info-item">
                        <dt>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          住所
                        </dt>
                        <dd>〒158-0097<br />東京都世田谷区用賀4-15-10</dd>
                      </div>
                      <div className="info-item">
                        <dt>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                          最寄り駅
                        </dt>
                        <dd>東急田園都市線 用賀駅北口より徒歩約4分</dd>
                      </div>
                      <div className="info-item">
                        <dt>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          受付時間
                        </dt>
                        <dd>平日 9:00〜19:00<br />土曜 9:00〜17:00<br />日曜・祝日 休診</dd>
                      </div>
                    </dl>
                    <p className="access-note">※駐車場はありません。近隣のコインパーキングをご利用ください。</p>
                  </div>
                </div>
                <div className="access-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7493.730126572504!2d139.62785084578258!3d35.626526426894024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f4740d1796d5%3A0xbdd930c6b58aeffa!2z56u55YaF6Y2854G45rK755mC6Zmi!5e0!3m2!1sja!2sjp!4v1500615918123"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="contact" id="contact">
            <div className="container">
              <div className="contact-content contact-content--stacked">
                <div className="contact-info">
                  <span className="section-label">Contact</span>
                  <h2 className="section-title">ご予約</h2>
                  <p className="contact-description">
                    完全予約制となっております。<br />
                    お電話にてご予約ください。
                  </p>
                  <div className="contact-methods">
                    <a href="tel:0337084511" className="contact-method contact-method-primary">
                      <span className="method-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <span className="method-text">
                        <small>ご予約電話</small>
                        <strong>03-3708-4511</strong>
                      </span>
                    </a>
                    <div className="contact-hours">
                      <p>平日 9:00〜19:00 / 土曜 9:00〜17:00</p>
                      <p>日曜・祝日 休診</p>
                    </div>
                  </div>
                </div>
                <div className="contact-reservation-status">
                  <MonthReservationStatus
                    year={new Date().getFullYear()}
                    month={new Date().getMonth() + 1}
                  />
                </div>
                <div className="contact-form-link-wrapper">
                  <a href="/contact" className="contact-form-link">
                    <span className="contact-form-link-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <span className="contact-form-link-text">メールでのお問い合わせ</span>
                    <span className="contact-form-link-note">クリックするとフォームが表示されます</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-brand">
                  <a href="#" className="footer-logo">
                    <span className="logo-main">竹内鍼灸治療院</span>
                    <span className="logo-sub">TAKEUCHI ACUPUNCTURE</span>
                  </a>
                  <p className="footer-address">〒158-0097 東京都世田谷区用賀4-15-10</p>
                  <p className="footer-tel"><a href="tel:0337084511">TEL: 03-3708-4511</a></p>
                </div>
                <div className="footer-links">
                  <div className="footer-nav">
                    <h4>診療案内</h4>
                    <ul>
                      <li><a href="#about">当院のご案内</a></li>
                      <li><a href="#treatment">治療の流れ</a></li>
                      <li><a href="#nerves">自律神経と鍼灸</a></li>
                      <li><a href="#symptoms">鍼灸の適応疾患</a></li>
                      <li><a href="#fee">料金・診察日</a></li>
                    </ul>
                  </div>
                  <div className="footer-nav">
                    <h4>その他</h4>
                    <ul>
                      <li><a href="#">小児はりについて</a></li>
                      <li><a href="#">診療日誌</a></li>
                      <li><a href="#">ブログ</a></li>
                      <li><a href="#access">交通アクセス</a></li>
                      <li><a href="/contact">お問い合わせ</a></li>
                      <li><a href="/admin">予約管理</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p className="copyright">&copy; 竹内鍼灸治療院 All Rights Reserved.</p>
              </div>
            </div>
          </footer>

          <button className="back-to-top" id="backToTop" aria-label="ページ上部へ戻る">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>

          <div className="nav-overlay" id="navOverlay"></div>

          <nav className="mobile-bottom-nav" id="mobileBottomNav">
            <ul>
              <li>
                <a href="#about">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span>当院</span>
                </a>
              </li>
              <li>
                <a href="#symptoms">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <span>適応疾患</span>
                </a>
              </li>
              <li>
                <a href="tel:0337084511" className="nav-tel">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>電話予約</span>
                </a>
              </li>
              <li>
                <a href="#fee">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>料金・時間</span>
                </a>
              </li>
              <li>
                <a href="#access">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>アクセス</span>
                </a>
              </li>
            </ul>
          </nav>

          <ClientScripts />
        </>
      )}
    </>
  )
}
