import { GraduationCap, Calendar, BookOpen } from 'lucide-react'
import { educationTimeline } from '../data/portfolioData.js'
import './Education.css'

function Education() {
  return (
    <section id="education">
      <div className="container">
        <p className="section-eyebrow">05 — Academic Background</p>
        <h2 className="section-title">Education</h2>
        <p className="section-intro">
          Formal engineering foundations in Information Technology and computer science principles.
        </p>

        <div className="education-timeline">
          {educationTimeline.map((edu) => (
            <div className="card timeline-card" key={edu.id}>
              <div className="timeline-node-wrapper">
                <div className="timeline-node">
                  <GraduationCap size={16} color="var(--pass)" />
                </div>
              </div>

              <div className="timeline-content">
                <div className="timeline-head">
                  <span className="badge badge-pass timeline-duration-badge">
                    <Calendar size={12} />
                    <span>{edu.duration}</span>
                  </span>
                  <h3 className="timeline-degree">{edu.degree}</h3>
                  <p className="timeline-institution">
                    {edu.institution} <span className="timeline-divider">•</span> {edu.branch}
                  </p>
                </div>

                {edu.details && (
                  <div className="timeline-details-box">
                    <div className="timeline-details-label">
                      <BookOpen size={13} />
                      <span>Curriculum & Key Subjects</span>
                    </div>
                    <p className="timeline-details-text">{edu.details}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
