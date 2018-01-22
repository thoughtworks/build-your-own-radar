const SheetNotFoundError = function(message){
    this.message=message;
};

Object.setPrototypeOf(SheetNotFoundError, Error);
SheetNotFoundError.prototype = Object.create(Error.prototype);
SheetNotFoundError.prototype.name = "SheetNotFoundError";
SheetNotFoundError.prototype.message = "";
SheetNotFoundError.prototype.constructor = SheetNotFoundError;

module.exports = SheetNotFoundError;
