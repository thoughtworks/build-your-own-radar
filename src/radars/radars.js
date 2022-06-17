const config = require('../config')

if (config.featureToggles.DefaultRadars) {
  config.radars.forEach((radar) => {
    require('./' + radar.file)
  })
}
