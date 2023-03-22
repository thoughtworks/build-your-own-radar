class InvalidContentError extends Error {
  constructor(message) {
    super(message)
    this.message = message
  }
}

module.exports = InvalidContentError
