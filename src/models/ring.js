const Ring = (name, order) => {
  var self = {};

  self.name = () => name;

  self.order = () => order;

  return self;
};

module.exports = Ring;
