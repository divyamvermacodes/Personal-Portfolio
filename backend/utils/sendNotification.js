import nodemailer from 'nodemailer'

const escapeHtml = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export async function sendNotification({ name, email, subject, message }) {
  const { EMAIL_USER, EMAIL_PASS, NOTIFY_TO } = process.env
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('Email not configured; skipping notification.')
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  })

  await transporter.sendMail({
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    to: NOTIFY_TO || EMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><b>From:</b> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
           <p><b>Subject:</b> ${escapeHtml(subject)}</p>
           <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
  })
}