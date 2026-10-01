import { Target, Compass, GraduationCap, MapPin, Sparkles, CheckCircle2 } from 'lucide-react'
import { about, profile } from '../data/portfolioData.js'
import './About.css'

function About() {
  return (
    <section id="about">
      <div className="container">
        <p className="section-eyebrow">01 — About</p>
        <h2 className="section-title">Who I Am & Engineering Mindset</h2>
        <p className="section-intro">
          Bridging full-stack application development with meticulous quality engineering.
        </p>

        <div className="about-grid">
          {/* Summary & Career Ambition */}
          <div className="card about-summary-card">
            <div className="about-summary-text">
              {about.summary.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="about-goals-grid">
              <div className="about-goal-item">
                <div className="about-goal-icon">
                  <Target size={18} color="var(--pass)" />
                </div>
                <div>
                  <p className="about-goal-label">Immediate Focus</p>
                  <p className="about-goal-text">{about.goals.shortTerm}</p>
                </div>
              </div>

              <div className="about-goal-item">
                <div className="about-goal-icon">
                  <Compass size={18} color="var(--accent)" />
                </div>
                <div>
                  <p className="about-goal-label">Long-Term Vision</p>
                  <p className="about-goal-text">{about.goals.longTerm}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics / Focus Areas */}
          <div className="card about-facts-card">
            <div className="about-facts-section">
              <div className="about-subhead">
                <Sparkles size={16} color="var(--pass)" />
                <h3 className="about-facts-title">Core Focus Areas</h3>
              </div>
              <ul className="about-tags-list">
                {about.specializations.map((s) => (
                  <li key={s} className="badge badge-accent">
                    <CheckCircle2 size={13} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-education-highlight">
              <div className="about-subhead">
                <GraduationCap size={18} color="var(--pass)" />
                <h3 className="about-facts-title">Current Academic Status</h3>
              </div>
              <div className="about-edu-box">
                <p className="about-degree-name">{about.education.degree}</p>
                <div className="about-edu-meta">
                  <span className="badge badge-pass">{about.education.year}</span>
                  <span className="about-location">
                    <MapPin size={13} />
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
