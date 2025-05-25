const sanitize = require('sanitizer')

const sanitizeBody = (data: { [x: string]: any }) => {
  try {
    Object.keys(data).forEach((key) => {
      data[key] = sanitize.escape(data[key])
    })
    return data
  } catch (error) {
    console.error('Sanitization error:', error)
    return data
  }
}

module.exports = sanitizeBody
