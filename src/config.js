const config = {
  production: {
    featureToggles: {
      UIRefresh2022: false,
      DefaultRadars: false,
    },
  },
  development: {
    featureToggles: {
      UIRefresh2022: true,
      DefaultRadars: false,
    },
  },
  radars : [
    {
      'file': '2021.csv',
      'name': 'of 2021'
    }
  ]
}
module.exports = process.env.ENVIRONMENT ? config[process.env.ENVIRONMENT] : config
