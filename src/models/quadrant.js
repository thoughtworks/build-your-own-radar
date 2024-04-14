// biome-ignore lint/complexity/useArrowFunction: applying fix breaks the code
const Quadrant = function (name) {
  let self, blips;

  self = {};
  blips = [];

  self.name = () => name;

  self.add = (newBlips) => {
    if (Array.isArray(newBlips)) {
      blips = blips.concat(newBlips);
    } else {
      blips.push(newBlips);
    }
  };

  self.blips = () => blips.slice(0);

  return self;
};

module.exports = Quadrant;
