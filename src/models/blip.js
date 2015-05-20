tr.models.Blip = function (name, cycle, isNew, description) {
  var self, number;

  self = {};
  number = -1;

  self.name = function () {
    return name;
  };

  self.description = function () {
    return description || '';
  };

  self.isNew = function () {
    return isNew;
  };

  self.cycle = function () {
    return cycle;
  };

  self.number = function () {
    return number;
  };

  self.setNumber = function (newNumber) {
    number = newNumber;
  };

  return self;
};
