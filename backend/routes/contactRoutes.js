import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { createContactMessage, listContactMessages } from '../controllers/contactController.js'
import { contactValidationRules, handleValidationErrors } from '../middleware/validateContact.js'
import { requireAdminKey } from '../middleware/requireAdminKey.js'

const router = Router()

// Limits abuse of the public contact form (10 submissions per 15 min per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent. Please try again later.',
  },
})

// POST /api/contact — public, rate-limited, validated
router.post('/', contactLimiter, contactValidationRules, handleValidationErrors, createContactMessage)

// GET /api/contact — admin-only, for reviewing submissions
router.get('/', requireAdminKey, listContactMessages)

export default router
