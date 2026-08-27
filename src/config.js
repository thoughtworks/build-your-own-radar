const config = () => {
  const env = {
    production: {
      featureToggles: {
        normalizeRingNameHoldToCaution: true,
      },
    },
    development: {
      featureToggles: {
        normalizeRingNameHoldToCaution: true,
      },
    },
  }
  return process.env.ENVIRONMENT ? env[process.env.ENVIRONMENT] : env
}
module.exports = config
