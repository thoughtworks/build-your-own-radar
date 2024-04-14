const config = () => {
  const env = {
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
  return process.env.ENVIRONMENT ? env[process.env.ENVIRONMENT] : env
}
module.exports = config
