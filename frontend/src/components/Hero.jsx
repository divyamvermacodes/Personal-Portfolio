import { useEffect, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  FileDown,
  ArrowRight,
  Mail,
  Play,
  CheckCircle2,
  Terminal,
  FolderGit2,
} from 'lucide-react'
import { Github, Linkedin } from './Icons.jsx'
import { profile, heroChecks } from '../data/portfolioData.js'
import './Hero.css'

const ThreeCanvas = lazy(() => import('./ThreeCanvas.jsx'))

function Hero() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (visibleCount >= heroChecks.length) return
    const timer = setTimeout(() => setVisibleCount((v) => v + 1), 380)
    return () => clearTimeout(timer)
  }, [visibleCount])

  const allDone = visibleCount >= heroChecks.length

  const handleRerun = () => {
    setVisibleCount(0)
  }

  const hasGithub = profile.github && !profile.github.startsWith('[')
  const hasLinkedin = profile.linkedin && !profile.linkedin.startsWith('[')
  const hasEmail = profile.email && !profile.email.startsWith('[')

  return (
    <header id="top" className="hero">
      <Suspense fallback={null}>
        <ThreeCanvas />
      </Suspense>

      <div className="container hero-grid">
        {/* Left Hero Copy */}
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="badge badge-pass hero-availability">
            <span className="hero-dot" />
            <span>{profile.availability}</span>
          </div>

          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={16} />
            </a>
            <a href={profile.resumeUrl} className="btn btn-outline" download>
              <FileDown size={16} />
              <span>Download CV</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              <span>Contact Me</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="hero-social">
            {hasGithub && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="GitHub profile"
              >
                <Github size={17} />
                <span>GitHub</span>
              </a>
            )}
            {hasLinkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={17} />
                <span>LinkedIn</span>
              </a>
            )}
            {hasEmail && (
              <a
                href={`mailto:${profile.email}`}
                className="hero-social-link"
                aria-label="Send direct email"
              >
                <Mail size={17} />
                <span>Email</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Right Hero Terminal */}
        <motion.div
          className="hero-terminal"
          role="region"
          aria-label="Automated QA test suite terminal"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-amber" />
              <span className="terminal-dot dot-green" />
            </div>

            <div className="terminal-tabs">
              <span className="terminal-tab active">
                <Terminal size={12} />
                <span>skills.test.js</span>
              </span>
              <span className="terminal-tab">
                <FolderGit2 size={12} />
                <span>divyam.config.ts</span>
              </span>
            </div>

            <button
              onClick={handleRerun}
              className="terminal-rerun-btn"
              title="Re-run Test Suite"
              disabled={!allDone}
              aria-label="Re-run tests"
            >
              <Play size={11} fill={allDone ? 'currentColor' : 'none'} />
              <span>Run</span>
            </button>
          </div>

          <div className="terminal-body">
            <div className="terminal-line terminal-cmd">
              <span className="terminal-prompt">$</span>
              <span className="terminal-cmd-text">npm test -- candidate-readiness</span>
            </div>

            <div className="terminal-checks-list">
              {heroChecks.slice(0, visibleCount).map((check) => (
                <div key={check.label} className="terminal-line terminal-check-line">
                  <span className="terminal-check-icon">
                    <CheckCircle2 size={15} />
                  </span>
                  <span className="terminal-check-name">{check.label}</span>
                  <span className="terminal-check-duration">({check.duration || '90ms'})</span>
                  <span className="terminal-status-badge">{check.status}</span>
                </div>
              ))}
            </div>

            {allDone && (
              <motion.div
                className="terminal-summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="terminal-summary-row">
                  <span className="summary-label">Test Suites:</span>
                  <span className="summary-pass">1 passed</span>, 1 total
                </div>
                <div className="terminal-summary-row">
                  <span className="summary-label">Tests:</span>
                  <span className="summary-pass">{heroChecks.length} passed</span>,{' '}
                  {heroChecks.length} total
                </div>
                <div className="terminal-summary-row">
                  <span className="summary-label">Time:</span>
                  <span>1.42s</span>
                </div>
                <div className="terminal-summary-ready">
                  <span>Ran all test suites. Ready for deployment.</span>
                  <span className="terminal-cursor" aria-hidden="true" />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </header>
  )
}

export default Hero
