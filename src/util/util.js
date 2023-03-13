function getRingIdString(ringName) {
  return ringName.replaceAll(/[^a-zA-Z0-9]/g, '-').toLowerCase()
}

module.exports = {
  getRingIdString,
}
