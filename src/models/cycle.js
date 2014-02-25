tr.models.Cycle = function (name) {
  var self = {};

  self.name = function () {
    return name;
  };

  return self;
};
