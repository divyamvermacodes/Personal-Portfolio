// Catches errors from any route/controller and returns a consistent JSON shape.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err.stack)

  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error.' : err.message,
  })
}

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` })
}
