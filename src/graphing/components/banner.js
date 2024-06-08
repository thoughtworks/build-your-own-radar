const d3 = require('d3')

const { addPdfCoverTitle } = require('../pdfPage')

function renderBanner(renderFullRadar) {
  const documentTitle = document.title[0].toUpperCase() + document.title.slice(1)

  document.title = documentTitle
  d3.select('.hero-banner__wrapper').append('p').classed('hero-banner__subtitle-text', true).text(document.title)
  d3.select('.hero-banner__title-text').on('click', renderFullRadar)

  addPdfCoverTitle(documentTitle)
}

module.exports = {
  renderBanner,
}
