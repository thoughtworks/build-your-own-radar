const d3 = require('d3')

const config = require('../../config')
const featureToggles = config().featureToggles

function renderBanner(redrawFullRadar) {
  if (featureToggles.UIRefresh2022) {
    document.title = document.title[0].toUpperCase() + document.title.slice(1)

    d3.select('.hero-banner__wrapper').append('p').classed('hero-banner__subtitle-text', true).text(document.title)

    d3.select('.hero-banner__title-text').on('click', redrawFullRadar)
  } else {
    const header = d3.select('body').insert('header', '#radar')
    header
      .append('div')
      .attr('class', 'radar-title')
      .append('div')
      .attr('class', 'radar-title__text')
      .append('h1')
      .text(document.title)
      .style('cursor', 'pointer')
      .on('click', redrawFullRadar)

    header
      .select('.radar-title')
      .append('div')
      .attr('class', 'radar-title__logo')
      .html('<a href="https://www.thoughtworks.com"> <img src="/images/logo.png" /> </a>')
  }
}

module.exports = {
  renderBanner,
}
