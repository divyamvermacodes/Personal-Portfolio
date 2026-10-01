import { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Mail,
  MapPin,
  Copy,
  Check,
  Send,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import { Github, Linkedin } from './Icons.jsx'
import { profile } from '../data/portfolioData.js'
import './Contact.css'

const initialForm = { name: '', email: '', subject: '', message: '' }
const API_URL = import.meta.env.VITE_API_URL || ''

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please provide your name.'
  if (!form.email.trim()) {
    errors.email = 'Please provide your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.subject.trim()) errors.subject = 'Subject line is required.'
  if (!form.message.trim()) {
    errors.message = 'Message content cannot be blank.'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.'
  }
  return errors
}

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverError, setServerError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    if (!profile.email || profile.email.startsWith('[')) return
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('loading')
    setServerError('')

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.message || 'Server received your request but encountered an error.')
      }

      setStatus('success')
      setForm(initialForm)

      // Celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#3b82f6', '#f59e0b'],
        })
      } catch (err) {
        // Fallback gracefully if confetti fails
      }
    } catch (err) {
      setStatus('error')
      setServerError(
        err.message || 'Unable to connect to contact server right now.'
      )
    }
  }

  const hasGithub = profile.github && !profile.github.startsWith('[')
  const hasLinkedin = profile.linkedin && !profile.linkedin.startsWith('[')
  const hasEmail = profile.email && !profile.email.startsWith('[')

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    form.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
  )}`

  return (
    <section id="contact">
      <div className="container">
        <p className="section-eyebrow">10 — Communication</p>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-intro">
          Interested in discussing internship opportunities, engineering roles, or collaboration? Reach out directly.
        </p>

        <div className="contact-grid">
          {/* Direct channels card */}
          <div className="card contact-info-card">
            <h3 className="contact-info-heading">Direct Channels</h3>
            <p className="contact-info-sub">
              Fastest response via email or LinkedIn.
            </p>

            <div className="contact-channel-item">
              <span className="contact-info-label">Email</span>
              <div className="contact-email-row">
                <a
                  href={`mailto:${profile.email}`}
                  className="contact-channel-link"
                >
                  <Mail size={16} color="var(--pass)" />
                  <span>{profile.email}</span>
                </a>
                {hasEmail && (
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="contact-copy-btn"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copied ? <Check size={14} color="var(--pass)" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="contact-channel-item">
              <span className="contact-info-label">Social & Code</span>
              <div className="contact-links-list">
                {hasGithub ? (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    <Github size={15} />
                    <span>GitHub Profile</span>
                    <ExternalLink size={12} className="link-arrow" />
                  </a>
                ) : (
                  <span className="contact-placeholder-item">
                    <Github size={14} /> GitHub: Config in portfolioData.js
                  </span>
                )}

                {hasLinkedin ? (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn Profile</span>
                    <ExternalLink size={12} className="link-arrow" />
                  </a>
                ) : (
                  <span className="contact-placeholder-item">
                    <Linkedin size={14} /> LinkedIn: Config in portfolioData.js
                  </span>
                )}
              </div>
            </div>

            <div className="contact-channel-item">
              <span className="contact-info-label">Based in</span>
              <p className="contact-location-val">
                <MapPin size={15} color="var(--pass)" />
                <span>{profile.location}</span>
              </p>
            </div>
          </div>

          {/* Contact form card */}
          <form className="card contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p className="form-error" id="name-error">
                    <AlertCircle size={12} />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="email">Your Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p className="form-error" id="email-error">
                    <AlertCircle size={12} />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Internship opportunity / Project collaboration"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && (
                <p className="form-error" id="subject-error">
                  <AlertCircle size={12} />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about the role, your team, or your project..."
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p className="form-error" id="message-error">
                  <AlertCircle size={12} />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            <div className="contact-form-actions">
              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={status === 'loading'}
              >
                <Send size={15} />
                <span>{status === 'loading' ? 'Transmitting…' : 'Send Message'}</span>
              </button>

              {status === 'error' && (
                <a
                  href={mailtoHref}
                  className="btn btn-outline contact-fallback-btn"
                  title="Send via default mail app"
                >
                  <Mail size={14} />
                  <span>Send via Mail App</span>
                </a>
              )}
            </div>

            {status === 'success' && (
              <div className="form-status form-status-success" role="status">
                <CheckCircle2 size={16} />
                <span>Message received! Thank you for reaching out — I&apos;ll get back to you shortly.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="form-status form-status-error" role="alert">
                <AlertCircle size={16} />
                <span>
                  {serverError} You can also click &quot;Send via Mail App&quot; above or email directly at {profile.email}.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact