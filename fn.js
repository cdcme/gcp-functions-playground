const escapeHtml = require('escape-html')

exports.helloHttp = (req, res) => {
  const now = new Date()
  const message = escapeHtml(req.query.name || req.body.name || 'World')

  //console.info(`[INFO] ${now} ${req.headers.host} ${req.headers['user-agent']}`)

  res.send(`Hello, ${message}!`)
}
