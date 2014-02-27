tr.models.Blip = function (name, cycle, isNew) {
  var self, number;

  self = {};
  number = -1;

  self.name = function () {
    return name;
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
