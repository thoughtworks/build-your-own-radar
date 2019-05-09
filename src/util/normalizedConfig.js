let config
try {
  config = require('../../config.json')
} catch (e) {
  console.log('no config.json available.')
}
let normalizedConfig = {}

function getConfig (blips = []) {
  if ((normalizedConfig.quadrants || []).length === 4 && (normalizedConfig.rings || []).length) return normalizedConfig

  // create a config if we dont have one.
  const configuration = createConfig(blips)
  normalizedConfig = configuration
  return normalizedConfig
}

function createConfig (blips) {
  let configuration = config

  // if we have no config, get our config from the google doc or csv
  if (!configuration && blips.length) {
    console.log('no config.json available.')
    configuration = {
      quadrants: [],
      rings: [],
      legend: {
        triangleKey: 'New or moved',
        circleKey: 'No change'
      }
    }

    blips.forEach((blip) => {
      if (!configuration.quadrants.includes(blip.quadrant)) {
        configuration.quadrants.push(blip.quadrant)
      }
      if (!configuration.rings.includes(blip.ring)) {
        configuration.rings.push(blip.ring)
      }
    })
  }

  if ((normalizedConfig.quadrants || []).length && (normalizedConfig.rings || []).length) {
    configuration.quadrants = configuration.quadrants.map(el => el.toLowerCase())
    configuration.rings = configuration.rings.map(el => el.toLowerCase())
  }

  return configuration
}

module.exports = { getConfig }
