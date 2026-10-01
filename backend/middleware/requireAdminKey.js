// Minimal protection for the "list messages" endpoint.
// Set ADMIN_KEY in your .env and pass it as `x-admin-key` header when fetching messages.
// For real production use, replace this with proper authentication (JWT/session-based).
export function requireAdminKey(req, res, next) {
  const key = req.header('x-admin-key')

  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({
      success: false,
      message: 'ADMIN_KEY is not configured on the server.',
    })
  }

  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' })
  }

  next()
}
