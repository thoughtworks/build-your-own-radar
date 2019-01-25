const UnauthorizedError = function (message) {
  this.message = message
}

Object.setPrototypeOf(UnauthorizedError, Error)
UnauthorizedError.prototype = Object.create(Error.prototype)
UnauthorizedError.prototype.name = 'UnauthorizedError'
UnauthorizedError.prototype.message = ''
UnauthorizedError.prototype.constructor = UnauthorizedError

module.exports = UnauthorizedError
