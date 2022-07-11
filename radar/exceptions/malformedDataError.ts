export function MalformedDataError(message) {
    // @ts-ignore
    this.message = message;
}

Object.setPrototypeOf(MalformedDataError, Error);
MalformedDataError.prototype = Object.create(Error.prototype);
MalformedDataError.prototype.name = 'MalformedDataError';
MalformedDataError.prototype.message = '';
MalformedDataError.prototype.constructor = MalformedDataError;
