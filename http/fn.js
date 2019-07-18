'use strict'

const escapeHtml = require('escape-html')

exports.helloHttp = (req, res) => {
  const now = new Date()
  const message = escapeHtml(req.query.name || req.body.name || 'World')

  res.send(`Hello, ${message}!`)
}
