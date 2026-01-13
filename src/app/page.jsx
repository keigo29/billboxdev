import Image from 'next/image';
import Link from 'next/link';
import "./App.scss"
export default function Home() {
  return (
    <div className="all_logo_frame">
      <header className="App-header">
      <div className="header-container">
        <div className="header-content">
          {/* Navigation */}
          <nav className="header-nav">
            <Link href="/dashboard" className="header-logo" aria-label="BillBox">
              <Image
               src="/logo.png" // public フォルダに保存されているファイル
               alt="Logo"
               width={50}
               height={50}
              />
              billbox
            </Link>
            <nav className="header-links">
              <a href="#" className="nav-link">
                特徴
              </a>
              <a href="#" className="nav-link">
                料金プラン
              </a>
              <a href="#" className="nav-link">
                Pricing
              </a>
              <a href="#" className="nav-link">
                About
              </a>
            </nav>
            <div className="header-buttons">
              <a href="/dashboard" className="btn-login">
                ログイン
              </a>
              <a href="/dashboard" className="btn-register">
                新規登録
              </a>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero-section">
            {/* Text Content */}
            <div className="hero-text">
              <p className="hero-subtitle">請求業務がサクッと簡単！</p>
              <h1 className="hero-title">
                billboxで<br />
                面倒な書類作業を<br />
                ラクラク効率化
              </h1>
              <p className="hero-description">
                billboxなら工数見積もり・請求書作成・invoice対応・各種書類ワンタップ変換で業務効率化できます。
              </p>
              <div className="hero-buttons">
                <a href="#" className="btn-register">
                  新規登録
                </a>
                <a href="#" className="btn-contact">
                  お問い合わせ
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hero-image">
              <Image
                src="/mv-pc.png" // スペースを削除
                alt="Hero Image"
                width={500}
                height={300}
              />
            </div>
          </section>
        </div>
      </div>
    </header>
    </div>
  );
}
