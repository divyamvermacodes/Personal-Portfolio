import { body, validationResult } from 'express-validator'

export const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 100 })
    .withMessage('Name must be under 100 characters.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Enter a valid email address.')
    .normalizeEmail(),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required.')
    .isLength({ max: 150 })
    .withMessage('Subject must be under 150 characters.'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required.')
    .isLength({ min: 10, max: 3000 })
    .withMessage('Message must be between 10 and 3000 characters.'),
]

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    })
  }
  next()
}
