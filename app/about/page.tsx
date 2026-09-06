import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <Link href="/" className="logo">
              Liu Hongming
            </Link>
            <div className="nav-links">
              <Link href="/about" className="nav-active">
                关于 About
              </Link>
              <Link href="/#work">作品 Work</Link>
              <Link href="/#blog">博客 Blog</Link>
              <Link href="/#contact">联系 Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* ── 关于 Hero ── */}
        <section className="about-hero">
          <div className="container">
            <span className="card-tag">关于我 | About Me</span>
            <h1 className="about-name">刘洪铭 | Liu Hongming</h1>
            <p className="hero-role">核科学与技术 在读博士生</p>
            <span className="hero-role-sub">PhD Candidate in Tsinghua University</span>
            <p className="about-bio">
              目前就读于清华大学，攻读核科学与技术专业博士学位（辐射防护与环境保护），研究方向聚焦核医学剂量学、辐射防护与环境保护。
            </p>
            <p className="about-bio-sub">
              I am currently a PhD candidate in Nuclear Science and Technology (Radiation Protection and Environmental
              Protection) at Tsinghua University, focusing on nuclear medicine dosimetry, radiation protection, and
              environmental protection.
            </p>
            <p className="about-bio">
              目前最成功的人生经历是拥有一个极好的原生家庭环境和女朋友（昨天正式宣告版本从五周年更新到v6.0），以及中学、本科、研究生阶段的好友们。
            </p>
            <p className="about-bio-sub">
              The greatest success of my life so far is having a wonderful family of origin and a girlfriend (who just
              yesterday officially upgraded from the 5th anniversary to v6.0), as well as good friends from middle
              school, undergraduate, and graduate school.
            </p>
          </div>
        </section>

        {/* ── 教育背景 ── */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">教育背景</h2>
                <span className="section-title-sub">Education</span>
              </div>
            </div>

            <div className="edu-list">
              <div className="edu-item">
                <div className="edu-degree">博士 | PhD</div>
                <h3 className="edu-title">核科学与技术 | Nuclear Science and Technology</h3>
                <div className="edu-school">清华大学 | Tsinghua University</div>
                <div className="edu-meta">在读 | In Progress</div>
              </div>

              <div className="edu-item">
                <div className="edu-degree">硕士 | Master</div>
                <h3 className="edu-title">放射医学 | Radiation Medicine</h3>
                <div className="edu-school">复旦大学 | Fudan University</div>
                <div className="edu-meta">研究方向：辐射探测、核应急、辐射防护 | Radiation Detection, Nuclear Emergency & Radiation Protection</div>
              </div>

              <div className="edu-item">
                <div className="edu-degree">本科 | Bachelor</div>
                <h3 className="edu-title">核工程与核技术 | Nuclear Engineering and Technology</h3>
                <div className="edu-school">四川大学 | Sichuan University</div>
                <div className="edu-meta">工学学士 | Bachelor of Engineering</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 联系 ── */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">联系我</h2>
                <span className="section-title-sub">Contact</span>
              </div>
            </div>
            <div className="contact-details">
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
                <span>602239436@qq.com</span>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>中国北京·海淀 | Haidian, Beijing, China</span>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <a
                  href="https://www.researchgate.net/profile/Hongming-Liu-8"
                  target="_blank"
                  rel="noreferrer"
                >
                  ResearchGate
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="logo">Liu Hongming</div>
            <div className="footer-content">
              <nav className="footer-nav">
                <Link href="/about">关于 About</Link>
                <Link href="/#work">作品 Work</Link>
                <Link href="/#blog">博客 Blog</Link>
                <Link href="/#contact">联系 Contact</Link>
              </nav>
            </div>
          </div>
          <div className="copyright">© 2026 刘洪铭 | Liu Hongming. 版权所有 All rights reserved.</div>
          <div className="beian">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
              京ICP备2026050992号-1
            </a>
          </div>
          <div className="credit">Designed using 1UI.dev and built using v0.app</div>
        </div>
      </footer>
    </>
  )
}
