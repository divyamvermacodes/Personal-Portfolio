import { useEffect, useState } from 'react'
import { FileDown, Menu, X, Terminal } from 'lucide-react'
import { Github, Linkedin } from './Icons.jsx'
import { nav, profile } from '../data/portfolioData.js'
import './Navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = () => setOpen(false)

  const hasGithub = profile.github && !profile.github.startsWith('[')
  const hasLinkedin = profile.linkedin && !profile.linkedin.startsWith('[')

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="container navbar-inner" aria-label="Main Navigation">
        <a href="#top" className="navbar-logo" aria-label="Home">
          <Terminal size={17} className="navbar-logo-icon" />
          <span>dv<span className="navbar-logo-accent">@</span>portfolio:~$</span>
        </a>

        <ul className={`navbar-links ${open ? 'navbar-links-open' : ''}`}>
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={active === item.href ? 'nav-active' : ''}
                onClick={handleLinkClick}
              >
                {item.label}
              </a>
            </li>
          ))}

          <li className="navbar-mobile-socials">
            <div className="navbar-social-icons">
              {hasGithub && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-icon-link"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </a>
              )}
              {hasLinkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-icon-link"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
            <a href={profile.resumeUrl} className="btn btn-primary" download onClick={handleLinkClick}>
              <FileDown size={16} />
              Download CV
            </a>
          </li>
        </ul>

        <div className="navbar-actions">
          <div className="navbar-desktop-socials">
            {hasGithub && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-icon-link"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            )}
            {hasLinkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-icon-link"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>

          <a href={profile.resumeUrl} className="btn btn-primary navbar-cta-desktop" download>
            <FileDown size={15} />
            <span>Download CV</span>
          </a>

          <button
            className="navbar-toggle"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
