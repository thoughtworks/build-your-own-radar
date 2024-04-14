// biome-ignore lint/complexity/useArrowFunction: applying fix breaks the code
const Ring = function (name, order) {
  var self = {};

  self.name = () => name;

  self.order = () => order;

  return self;
};

module.exports = Ring;
