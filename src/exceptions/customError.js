const CustomError = function(message){
  this.message=message;
};

Object.setPrototypeOf(CustomError, Error);
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.name = "CustomError";
CustomError.prototype.message = "";
CustomError.prototype.constructor = CustomError;

module.exports = CustomError;
