import { BookOpen, ExternalLink, Check } from 'lucide-react'
import { courses } from '../data/portfolioData.js'
import './Courses.css'

function Courses() {
  return (
    <section id="courses">
      <div className="container">
        <p className="section-eyebrow">06 — Specialized Training</p>
        <h2 className="section-title">Relevant Courses</h2>
        <p className="section-intro">
          Curriculum and coursework in software engineering, testing standards, and systems architecture.
        </p>

        <div className="course-grid">
          {courses.map((c) => {
            const hasCert = c.certificateUrl && !c.certificateUrl.startsWith('[')
            return (
              <div className="card course-card" key={c.id}>
                <div className="course-head">
                  <div className="course-icon-badge">
                    <BookOpen size={16} color="var(--pass)" />
                  </div>
                  <div>
                    <h3 className="course-name">{c.name}</h3>
                    <p className="course-platform">{c.platform}</p>
                  </div>
                  <span className="badge course-date-badge">{c.completionDate}</span>
                </div>

                <ul className="course-skills">
                  {c.skills.map((s) => (
                    <li key={s} className="badge badge-pass">
                      <Check size={11} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

                {hasCert && (
                  <a
                    href={c.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="course-link"
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Courses
