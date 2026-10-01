import { Mail, Terminal } from 'lucide-react'
import { Github, Linkedin } from './Icons.jsx'
import { profile, nav } from '../data/portfolioData.js'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()
  const hasGithub = profile.github && !profile.github.startsWith('[')
  const hasLinkedin = profile.linkedin && !profile.linkedin.startsWith('[')
  const hasEmail = profile.email && !profile.email.startsWith('[')

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <Terminal size={16} color="var(--pass)" />
            <span>dv<span className="navbar-logo-accent">@</span>portfolio:~$</span>
          </div>
          <p className="footer-name">{profile.name}</p>
          <p className="footer-tagline">{profile.tagline}</p>
          <div className="footer-status-pill">
            <span className="footer-status-dot" />
            <span>Open to Internships & Engineering Roles</span>
          </div>
        </div>

        <div className="footer-links-col">
          <p className="footer-col-title">Navigation</p>
          <ul className="footer-nav-list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="footer-nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-social-col">
          <p className="footer-col-title">Connect</p>
          <div className="footer-social-links">
            {hasGithub && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-item"
              >
                <Github size={15} />
                <span>GitHub</span>
              </a>
            )}
            {hasLinkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-item"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>
            )}
            {hasEmail && (
              <a href={`mailto:${profile.email}`} className="footer-social-item">
                <Mail size={15} />
                <span>Email</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-copy">
          © {year} {profile.name}. Designed & engineered with React, Three.js & QA precision.
        </p>
      </div>
    </footer>
  )
}

export default Footer
