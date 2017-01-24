const Blip = function (name, ring, growth, topic, description) {
  var self, number;

  self = {};
  number = -1;

  self.name = function () {
    return name;
  };

  self.topic = function () {
    return topic || '';
  };

  self.description = function () {
    return description || '';
  };

  self.growth = function () {
    return growth;
  };

  self.ring = function () {
    return ring;
  };

  self.number = function () {
    return number;
  };

  self.setNumber = function (newNumber) {
    number = newNumber;
  };

  return self;
};

module.exports = Blip;