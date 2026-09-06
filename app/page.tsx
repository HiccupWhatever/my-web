"use client"

import { useEffect, useState } from "react"
import RunCharacter from "@/components/RunCharacter"

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const animateText = (element: Element) => {
      const text = element.textContent || ""
      const words = text.split(" ")
      let html = ""
      let totalChars = 0

      words.forEach((word, wordIndex) => {
        const letters = word.split("")
        letters.forEach((letter) => {
          const delay = totalChars * 0.03
          html += `<span class="letter-blur" style="animation-delay: ${delay}s">${letter}</span>`
          totalChars++
        })
        if (wordIndex < words.length - 1) {
          html += " "
          totalChars++
        }
      })

      element.innerHTML = html
    }

    const textElements = document.querySelectorAll(
      ".hero-bio, .section-title, .newsletter h2, .blog-section h2, .contact-section h2",
    )
    textElements.forEach((el) => {
      if (!el.classList.contains("animated")) {
        animateText(el)
        el.classList.add("animated")
      }
    })

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <div className="logo">Liu Hongming</div>
            <div className="nav-links">
              <a href="/about">关于 About</a>
              <a href="#work">作品 Work</a>
              <a href="#blog">博客 Blog</a>
              <a href="#contact">联系 Contact</a>
            </div>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
            <div className="social-icons desktop-only">
              <a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-links">
              <a href="/about" onClick={handleLinkClick}>
                关于 About
              </a>
              <a href="#work" onClick={handleLinkClick}>
                作品 Work
              </a>
              <a href="#blog" onClick={handleLinkClick}>
                博客 Blog
              </a>
              <a href="#contact" onClick={handleLinkClick}>
                联系 Contact
              </a>
              <div className="mobile-menu-social">
                <a href="#" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="about" className="hero animate-on-scroll">
          <div className="container">
            <div className="hero-layout">
              <div className="hero-content-wrapper">
                <div className="hero-image-container animate-on-scroll">
                  <div className="hero-image-bg"></div>
                  <RunCharacter />
                </div>
                <div className="hero-content">
                  <span className="hero-role">核科学与技术 在读博士生</span>
                  <span className="hero-role-sub">PhD Candidate in Tsinghua University</span>
                  <div className="hero-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    中国北京·海淀 | Haidian, Beijing, China
                  </div>
                  <p className="hero-bio">
                    这个网站还在测试过程中，当事人并没有想要介绍什么东西。
                  </p>
                  <p className="hero-bio-sub">
                    This website is still under testing — the owner doesn't intend to introduce anything yet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee-wrapper">
          <div className="marquee-content">
            <div className="marquee-text">
              <span>滚动条很好看 | This Marquee Looks Great</span>
              <span className="marquee-dot">•</span>
              <span>没想好放什么 | Not Sure What to Put Here</span>
              <span className="marquee-dot">•</span>
              <span>不能广告招租 | No Ads for Rent</span>
              <span className="marquee-dot">•</span>
              <span>滚动条很好看 | This Marquee Looks Great</span>
              <span className="marquee-dot">•</span>
              <span>没想好放什么 | Not Sure What to Put Here</span>
              <span className="marquee-dot">•</span>
              <span>不能广告招租 | No Ads for Rent</span>
              <span className="marquee-dot">•</span>
            </div>
            <div className="marquee-text" aria-hidden="true">
              <span>滚动条很好看 | This Marquee Looks Great</span>
              <span className="marquee-dot">•</span>
              <span>没想好放什么 | Not Sure What to Put Here</span>
              <span className="marquee-dot">•</span>
              <span>不能广告招租 | No Ads for Rent</span>
              <span className="marquee-dot">•</span>
              <span>滚动条很好看 | This Marquee Looks Great</span>
              <span className="marquee-dot">•</span>
              <span>没想好放什么 | Not Sure What to Put Here</span>
              <span className="marquee-dot">•</span>
              <span>不能广告招租 | No Ads for Rent</span>
              <span className="marquee-dot">•</span>
            </div>
          </div>
        </div>

        <section id="work" className="section">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <h2 className="section-title">精选作品 | Featured Work</h2>
              <a href="#" className="view-all">
                查看全部 View All
              </a>
            </div>
            <div className="grid">
              <article className="card animate-on-scroll">
                <img src="/作品1.png" alt="钇-90微球SIRT剂量学问题研究" className="card-image" />
                <div className="card-content">
                  <span className="card-tag">博士研究方向 | 核医学剂量学、辐射防护与环境保护</span>
                  <h3 className="card-title">
                    钇-90微球SIRT剂量学问题研究 | <sup>90</sup>Y-SIRT Dosimetry Research
                  </h3>
                  <p className="card-desc">
                    四个模块：微球分布预测、微纳剂量学与肿瘤响应、宏观剂量学、系统设计。发表的文章不多，因为还没做完……
                  </p>
                  <p className="card-desc-sub">
                    Four modules: microsphere distribution prediction, micro-/nano-dosimetry and tumor response,
                    macroscopic dosimetry, and system design. Not many papers published yet — it's still a work in
                    progress.
                  </p>
                </div>
              </article>

              <article className="card animate-on-scroll">
                <img src="/作品2.png" alt="靶向放射性药物辐射剂量计算软件 THUNMDose" className="card-image card-image-contain" />
                <div className="card-content">
                  <span className="card-tag">横向开发 | 也是写过完整软件还做过转化的人</span>
                  <h3 className="card-title">靶向放射性药物辐射剂量计算软件 | THUNMDose</h3>
                  <p className="card-desc">
                    本人呕心沥血用AI写的剂量学软件，号称全流程覆盖！勾画、药代、剂量学方法……当然还在迭代开发，知识产权属于课题组。
                  </p>
                  <p className="card-desc-sub">
                    A dosimetry software I poured my heart into, built with AI — claimed to cover the full workflow:
                    contouring, pharmacokinetics, dosimetry methods... Still under iterative development; the
                    intellectual property belongs to our research group.
                  </p>
                </div>
              </article>

              <article className="card animate-on-scroll">
                <img src="/作品3.png" alt="甲状腺内I-131活度测量" className="card-image card-image-contain card-image-sm" />
                <div className="card-content">
                  <span className="card-tag">硕士研究方向 | 辐射探测、核应急、辐射防护</span>
                  <h3 className="card-title">甲状腺内I-131活度测量 | <sup>131</sup>I Activity Measurement</h3>
                  <p className="card-desc">
                    搞了个探测器结构出来，从设计、蒙卡、原型机，到实验、不确定度评价……必须感谢老哥，没他弄不出来这玩意儿，知识产权依然属于课题组。
                  </p>
                  <p className="card-desc-sub">
                    Built a detector structure from scratch — design, Monte Carlo simulation, prototype, experiments,
                    and uncertainty evaluation... I really have to thank my buddy; without him, this thing wouldn't
                    have come together, and the intellectual property still belongs to our research group.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="blog" className="section blog-section">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <h2 className="section-title">最新文章 | Latest Articles</h2>
              <a href="https://www.researchgate.net/profile/Hongming-Liu-8" className="view-all" target="_blank" rel="noreferrer">
                查看全部 View All
              </a>
            </div>
            <div className="grid">
              <article className="card animate-on-scroll">
                <div className="card-content">
                  <span className="card-tag">EJNMMI Physics</span>
                  <div className="blog-date">September 2025</div>
                  <h3 className="card-title">
                    Optimizing dosimetry in Y-90 microsphere radioembolization: GPU-accelerated Monte Carlo simulation
                    versus conventional methods for high-volume setting
                  </h3>
                  <p className="card-desc">
                    作者解读：拿了8个算例，评价了一下几种算法怎么样，然后发现GPU-MC没有绝对的速度优势，大概就这样。
                  </p>
                  <p className="card-desc-sub">
                    Author's take: I ran 8 benchmark cases, evaluated how several algorithms performed, and found that
                    GPU-MC doesn't hold an absolute speed advantage — roughly that's the gist of it.
                  </p>
                  <a
                    href="https://link.springer.com/article/10.1186/s40658-025-00794-9?utm_source=researchgate.net&utm_medium=article"
                    className="read-more"
                    target="_blank"
                    rel="noreferrer"
                  >
                    阅读更多 | Read More →
                  </a>
                </div>
              </article>

              <article className="card animate-on-scroll">
                <div className="card-content">
                  <span className="card-tag">Radiation Measurements</span>
                  <div className="blog-date">June 2023</div>
                  <h3 className="card-title">
                    Comprehensive study on uncertainties in 131I activity measurements in the thyroid gland
                  </h3>
                  <p className="card-desc">
                    作者解读：用MC把各种典型情景下的测量不确定度算了一下，在AI不盛行的年代，属于作者大力飞砖的代表作，参数还挺有意思的，可以参考一下哈~
                  </p>
                  <p className="card-desc-sub">
                    Author's take: I used MC to compute the measurement uncertainties across various typical scenarios.
                    In an era before AI took off, this stands as a representative work where the author really put in
                    the heavy lifting. The parameters are quite interesting — worth a look!
                  </p>
                  <a
                    href="https://www.sciencedirect.com/science/article/pii/S1350448723000471?via%3Dihub"
                    className="read-more"
                    target="_blank"
                    rel="noreferrer"
                  >
                    阅读更多 | Read More →
                  </a>
                </div>
              </article>

              <article className="card animate-on-scroll">
                <div className="card-content">
                  <span className="card-tag">Radiation Measurements</span>
                  <div className="blog-date">April 2022</div>
                  <h3 className="card-title">Measurement of 131I activity in thyroid using a dual-layer detector</h3>
                  <p className="card-desc">
                    作者解读：双层探测器从设计、蒙卡，到最终的实验结果都做了一遍。当时觉得不过如此，现在看反而是自己学术生涯中，唯一一篇链路全面的工作了。
                  </p>
                  <p className="card-desc-sub">
                    Author's take: The dual-layer detector was carried through the full chain — design, Monte Carlo
                    simulation, and the final experimental results. At the time it felt unremarkable, but looking back
                    it's the one paper in my academic career that covers the complete pipeline.
                  </p>
                  <a
                    href="https://www.sciencedirect.com/science/article/pii/S1350448722000397?via%3Dihub"
                    className="read-more"
                    target="_blank"
                    rel="noreferrer"
                  >
                    阅读更多 | Read More →
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="newsletter animate-on-scroll">
          <div className="container">
            <div className="newsletter-inner">
              <h2>保持关注 | Stay Updated</h2>
              <p>将设计、开发与产品思考的见解直接发送到您的邮箱。 Get insights on design, development, and product thinking delivered to your inbox.</p>
              <form className="form-group">
                <input type="email" placeholder="输入您的邮箱 | Enter your email" aria-label="Email address" />
                <button type="submit" className="btn-subscribe">
                  订阅 Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="contact-wrapper animate-on-scroll">
              <div className="contact-info">
                <h2 className="section-title">一起合作</h2>
                <span className="section-title-sub">Let's Work Together</span>
                <p className="contact-desc">
                  我始终乐于了解新的项目与机会。无论您是有疑问，还是只想打个招呼，都欢迎随时联系。
                </p>
                <p className="contact-desc-sub">
                  I'm always interested in hearing about new projects and opportunities. Whether you have a question or
                  just want to say hi, feel free to reach out.
                </p>
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
                </div>
              </div>
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">姓名 Name</label>
                    <input type="text" id="name" name="name" placeholder="您的姓名 | Your name" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">邮箱 Email</label>
                    <input type="email" id="email" name="email" placeholder="您的邮箱 | your@email.com" required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="subject">主题 Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="主题内容 | What's this about?" required />
                </div>
                <div className="form-field">
                  <label htmlFor="message">留言 Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="请详细说明 | Tell me more..." required></textarea>
                </div>
                <button type="submit" className="btn-submit">
                  发送信息 Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="logo">Liu.HM</div>
            <div className="footer-content">
              <nav className="footer-nav">
                <a href="/about">关于 About</a>
                <a href="#work">作品 Work</a>
                <a href="#blog">博客 Blog</a>
                <a href="#contact">联系 Contact</a>
              </nav>
              <div className="social-icons">
                <a href="#" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
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
