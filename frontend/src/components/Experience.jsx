import { Briefcase, Calendar, Building2, CheckCircle2, Award, ArrowUpRight } from 'lucide-react'
import { experience, profile } from '../data/portfolioData.js'
import './Experience.css'

function Experience() {
  const realExp = experience.filter(
    (e) => e.organization && !e.organization.startsWith('[')
  )

  return (
    <section id="experience">
      <div className="container">
        <p className="section-eyebrow">08 — Industry Experience</p>
        <h2 className="section-title">Internships & Professional Work</h2>
        <p className="section-intro">
          Practical application of engineering principles, testing methodologies, and collaborative software delivery.
        </p>

        {realExp.length > 0 ? (
          <div className="exp-list">
            {realExp.map((exp) => (
              <div className="card exp-card" key={exp.id}>
                <div className="exp-head">
                  <div className="exp-title-block">
                    <div className="exp-icon-box">
                      <Briefcase size={18} color="var(--pass)" />
                    </div>
                    <div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <p className="exp-org">
                        <Building2 size={13} />
                        <span>{exp.organization}</span>
                      </p>
                    </div>
                  </div>
                  <span className="badge badge-pass exp-duration">
                    <Calendar size={12} />
                    <span>{exp.duration}</span>
                  </span>
                </div>

                <ul className="exp-responsibilities">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i}>
                      <CheckCircle2 size={13} className="exp-check" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-tags">
                  {exp.technologies.map((t) => (
                    <span className="badge" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                {exp.achievements && (
                  <div className="exp-achievement-box">
                    <Award size={14} color="var(--amber)" />
                    <p className="exp-achievement-text">{exp.achievements}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card exp-open-banner">
            <div className="exp-open-icon">
              <Briefcase size={26} color="var(--pass)" />
            </div>
            <div className="exp-open-text">
              <div className="badge badge-pass exp-status-pill">
                <span>{profile.availability}</span>
              </div>
              <h3 className="exp-open-title">Actively Seeking SDE & QA Engineering Internships</h3>
              <p className="exp-open-desc">
                Currently in the final year of B.Tech Information Technology. Ready to deliver immediate value in full-stack development, automated API testing, and quality assurance.
              </p>
              <div className="exp-open-cta">
                <a href="#contact" className="btn btn-primary">
                  <span>Discuss Opportunities</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Experience
