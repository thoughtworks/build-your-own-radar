const config = {
  production: {
    featureToggles: {
      UIRefresh2022: true,
    },
  },
  development: {
    featureToggles: {
      UIRefresh2022: true,
    },
  },
}
module.exports = process.env.ENVIRONMENT ? config[process.env.ENVIRONMENT] : config
