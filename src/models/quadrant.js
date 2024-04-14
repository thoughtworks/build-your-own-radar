class Quadrant {
  constructor(name) {
    this.name = name;
    this.blips = [];
  }

  add(newBlips) {
    if (Array.isArray(newBlips)) {
      this.blips = this.blips.concat(newBlips);
    } else {
      this.blips.push(newBlips);
    }
  }
}
module.exports = Quadrant;
