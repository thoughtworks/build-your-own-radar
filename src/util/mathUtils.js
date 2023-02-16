function toRadian(angleInDegrees) {
  return (Math.PI * angleInDegrees) / 180
}

function center(pointA, pointB) {
  return Math.round((pointA - pointB) / 2)
}
module.exports = {
  toRadian,
  center,
}
