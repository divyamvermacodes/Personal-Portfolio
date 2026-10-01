import Contact from '../models/Contact.js'
import { sendNotification } from '../utils/sendNotification.js'

export async function createContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body

    const contact = await Contact.create({ name, email, subject, message })

    // Fire-and-forget: a failed email shouldn't make the visitor's request fail
    sendNotification({ name, email, subject, message }).catch((err) =>
      console.error('Email notification failed:', err.message)
    )

    res.status(201).json({
      success: true,
      message: 'Message received. Thanks for reaching out!',
      data: { id: contact._id, createdAt: contact.createdAt },
    })
  } catch (err) {
    next(err)
  }
}

export async function listContactMessages(req, res, next) {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(100)
    res.status(200).json({ success: true, count: messages.length, data: messages })
  } catch (err) {
    next(err)
  }
}