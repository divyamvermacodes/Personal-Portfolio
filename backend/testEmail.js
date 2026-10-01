import 'dotenv/config'
import { sendNotification } from './utils/sendNotification.js'

try {
  await sendNotification({
    name: 'Test',
    email: process.env.EMAIL_USER,
    subject: 'Test email',
    message: 'If you see this, email sending works.',
  })
  console.log('Sent OK')
} catch (err) {
  console.error('FAILED:', err.message)
}