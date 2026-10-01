import { FileText, FileDown, ExternalLink, CheckCircle2 } from 'lucide-react'
import { profile } from '../data/portfolioData.js'
import './Resume.css'

function Resume() {
  return (
    <section id="resume">
      <div className="container">
        <p className="section-eyebrow">09 — Formal Credentials</p>
        <h2 className="section-title">Resume & Curriculum Vitae</h2>
        <p className="section-intro">
          Comprehensive summary of academic coursework, project accomplishments, and technical proficiencies.
        </p>

        <div className="card resume-card">
          <div className="resume-icon-area">
            <div className="resume-icon-box">
              <FileText size={38} color="var(--pass)" />
            </div>
            <div className="resume-badges">
              <span className="badge badge-pass">
                <CheckCircle2 size={11} /> ATS-Optimized
              </span>
              <span className="badge">PDF Format</span>
            </div>
          </div>

          <div className="resume-info">
            <h3 className="resume-heading">{profile.name} — Curriculum Vitae</h3>
            <p className="resume-sub">
              Complete engineering profile including academic coursework, verified QA testing methodologies, technical project repositories, and technical stack proficiencies.
            </p>

            <div className="resume-actions">
              <a href={profile.resumeUrl} className="btn btn-primary" download>
                <FileDown size={16} />
                <span>Download CV (PDF)</span>
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <span>View in New Tab</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
