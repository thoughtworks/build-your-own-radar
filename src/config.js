const config = {
  production: {
    featureToggles: {
      UIRefresh2022: false,
    },
    tenant: {
      // Allows customization/styling of the Radar for your own use.
      bannerText:
        '<div><h1>Build your own radar</h1><p>Once you\'ve <a href ="https://www.thoughtworks.com/radar/byor">created your Radar</a>, you can use this service' +
        ' to generate an <br />interactive version of your Technology Radar. Not sure how? <a href ="https://www.thoughtworks.com/radar/how-to-byor">Read this first.</a></p></div>',
      footerText:
        'Powered by <a href="https://www.thoughtworks.com"> Thoughtworks</a>. ' +
        'By using this service you agree to <a href="https://www.thoughtworks.com/radar/tos">Thoughtworks\' terms of use</a>. ' +
        'You also agree to our <a href="https://www.thoughtworks.com/privacy-policy">privacy policy</a>, which describes how we will gather, use and protect any personal data contained in your public Google Sheet. ' +
        'This software is <a href="https://github.com/thoughtworks/build-your-own-radar">open source</a> and available for download and self-hosting.',
      logo: {
        url: 'https://www.thoughtworks.com',
        // Add the appropriate image to src/images
        image: '/images/tw-logo.png',
      },
    },
  },
  development: {
    featureToggles: {
      UIRefresh2022: true,
    },
    tenant: {
      // Allows customization/styling of the Radar for your own use.
      bannerText:
        '<div><h1>Build your own radar</h1><p>Once you\'ve <a href ="https://www.thoughtworks.com/radar/byor">created your Radar</a>, you can use this service' +
        ' to generate an <br />interactive version of your Technology Radar. Not sure how? <a href ="https://www.thoughtworks.com/radar/how-to-byor">Read this first.</a></p></div>',
      footerText:
        'Powered by <a href="https://www.thoughtworks.com"> Thoughtworks</a>. ' +
        'By using this service you agree to <a href="https://www.thoughtworks.com/radar/tos">Thoughtworks\' terms of use</a>. ' +
        'You also agree to our <a href="https://www.thoughtworks.com/privacy-policy">privacy policy</a>, which describes how we will gather, use and protect any personal data contained in your public Google Sheet. ' +
        'This software is <a href="https://github.com/thoughtworks/build-your-own-radar">open source</a> and available for download and self-hosting.',
      logo: {
        url: 'https://www.thoughtworks.com',
        // Add the appropriate image to src/images
        image: '/images/tw-logo.png',
      },
    },
  },
}
module.exports = process.env.ENVIRONMENT ? config[process.env.ENVIRONMENT] : config
