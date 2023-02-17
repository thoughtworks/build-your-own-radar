const config = () => {
  const env = {
    production: {
      featureToggles: {
        UIRefresh2022: false,
      },
    },
    development: {
      featureToggles: {
        UIRefresh2022: false,
      },
    },
  }
  return process.env.ENVIRONMENT ? env[process.env.ENVIRONMENT] : env
}
module.exports = config
