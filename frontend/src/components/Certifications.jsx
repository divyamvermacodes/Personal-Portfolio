import { Award, ExternalLink, Calendar, Key } from 'lucide-react'
import { certifications } from '../data/portfolioData.js'
import './Certifications.css'

function Certifications() {
  const realCerts = certifications.filter(
    (c) => c.name && !c.name.startsWith('[')
  )

  return (
    <section id="certifications">
      <div className="container">
        <p className="section-eyebrow">07 — Credentials</p>
        <h2 className="section-title">Certifications & Accreditations</h2>
        <p className="section-intro">
          Verified industry credentials and professional technical certifications.
        </p>

        {realCerts.length > 0 ? (
          <div className="cert-grid">
            {realCerts.map((cert) => (
              <div className="card cert-card" key={cert.id}>
                <div className="cert-icon-wrapper">
                  <Award size={20} color="var(--pass)" />
                </div>
                <div className="cert-info">
                  <h3 className="cert-name">{cert.name}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <div className="cert-meta">
                    <span className="cert-meta-item">
                      <Calendar size={12} />
                      {cert.date}
                    </span>
                    {cert.credentialId && (
                      <span className="cert-meta-item">
                        <Key size={12} />
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-link"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card cert-placeholder-box">
            <div className="cert-placeholder-icon">
              <Award size={28} color="var(--pass)" />
            </div>
            <div>
              <h3 className="cert-placeholder-title">Certifications Pending Configuration</h3>
              <p className="cert-placeholder-desc">
                Add your verified certifications in <code>portfolioData.js</code> (AWS, Oracle Java, ISTQB, or Coursera certificates) to display them here with live verification links.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Certifications
