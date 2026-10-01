import { ExternalLink, CheckCircle2, FolderGit2, AlertCircle } from 'lucide-react'
import { Github } from './Icons.jsx'
import { projects } from '../data/portfolioData.js'
import './Projects.css'

function ProjectCard({ project }) {
  const hasImage = project.image && !project.image.startsWith('[')
  const isGithubPlaceholder = !project.githubUrl || project.githubUrl.startsWith('[')
  const isLivePlaceholder = !project.liveUrl || project.liveUrl.startsWith('[')

  return (
    <article className="card project-card">
      <div className="project-thumb">
        {hasImage ? (
          <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" />
        ) : (
          <div className="project-thumb-empty" aria-hidden="true">
            <FolderGit2 size={36} className="project-empty-icon" />
            <span className="project-initial">{project.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="project-body">
        <div className="project-head">
          <h3 className="project-name">{project.name}</h3>
        </div>

        <p className="project-desc">{project.description}</p>

        {project.problem && !project.problem.startsWith('[') && (
          <div className="project-problem">
            <div className="project-problem-label">
              <AlertCircle size={12} />
              <span>Problem Solved</span>
            </div>
            <p className="project-problem-text">{project.problem}</p>
          </div>
        )}

        <ul className="project-features">
          {project.features.map((f, i) => (
            <li key={i}>
              <CheckCircle2 size={13} className="project-feature-check" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="project-tags">
          {project.technologies.map((t) => (
            <span className="badge" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="project-links">
          {!isGithubPlaceholder ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-project"
            >
              <Github size={15} />
              <span>Source Code</span>
            </a>
          ) : (
            <span className="btn-project-placeholder" title="Provide GitHub repository URL in portfolioData.js">
              <Github size={14} />
              <span>Repository Config Required</span>
            </span>
          )}

          {!isLivePlaceholder && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-project"
            >
              <span>Live Demo</span>
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <p className="section-eyebrow">04 — Projects</p>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-intro">
          Full-stack systems and technical coursework built with measurable purpose, clean code, and QA rigor.
        </p>

        <div className="project-grid">
          {projects.map((p) => (
            <ProjectCard project={p} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
