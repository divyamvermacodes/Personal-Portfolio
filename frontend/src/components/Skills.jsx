import { Code2, Layout, Server, Database, ShieldCheck, Wrench, Check } from 'lucide-react'
import { skills } from '../data/portfolioData.js'
import './Skills.css'

const categoryIcons = {
  'Programming Languages': Code2,
  'Frontend': Layout,
  'Backend': Server,
  'Databases': Database,
  'Testing & QA': ShieldCheck,
  'Tools & DevOps': Wrench,
}

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <p className="section-eyebrow">02 — Technical Stack</p>
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-intro">
          Core engineering competencies, languages, frameworks, and quality assurance methods.
        </p>

        <div className="skills-grid">
          {skills.map((group) => {
            const Icon = categoryIcons[group.category] || Code2
            return (
              <div className="card skills-card" key={group.category}>
                <div className="skills-card-header">
                  <div className="skills-category-icon">
                    <Icon size={18} color="var(--pass)" />
                  </div>
                  <h3 className="skills-category-name">{group.category}</h3>
                  <span className="skills-count-pill">{group.items.length}</span>
                </div>

                <ul className="skills-list">
                  {group.items.map((item) => (
                    <li key={item} className="badge skills-badge">
                      <Check size={11} className="skills-check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
