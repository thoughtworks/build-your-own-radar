class InvalidConfigError extends Error {
  constructor(message) {
    super(message)
    this.message = message
  }
}

module.exports = InvalidConfigError
