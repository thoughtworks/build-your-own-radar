function getRingIdString(ringName) {
  return ringName.replaceAll(/[^a-zA-Z0-9]/g, '-').toLowerCase()
}

function replaceSpaceWithHyphens(anyString) {
  return anyString.trim().replace(/\s+/g, '-').toLowerCase()
}

function removeAllSpaces(blipId) {
  return blipId.toString().replace(/\s+/g, '')
}

module.exports = {
  getRingIdString,
  replaceSpaceWithHyphens,
  removeAllSpaces,
}
