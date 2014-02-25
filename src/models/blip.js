tr.models.Blip = function (name, cycle, isNew) {
  var self = {};

  self.name = function () {
    return name;
  };

  self.isNew = function () {
    return isNew;
  };

  self.cycle = function () {
    return cycle;
  };

  return self;
};
