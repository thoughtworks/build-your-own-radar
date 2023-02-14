const d3 = require('d3')
const { constructSheetUrl } = require('../../util/urlUtils')

function renderAlternativeRadars(radarFooter, alternatives, currentSheet) {
  const alternativesContainer = radarFooter
    .append('div')
    .classed('alternative-radars', true)

  for (let i = 0; alternatives.length > 0; i++) {
    const list = alternatives.splice(0, 5)

    const alternativesList = alternativesContainer
      .append('ul')
      .classed(`alternative-radars__list`, true)
      .classed(`alternative-radars__list__row-${i}`, true)

    list.forEach(function (alternative) {
      const alternativeLink = alternativesList
        .append('li')
        .classed('alternative-radars__list-item', true)
        .append('a')
        .classed('alternative-radars__list-item-link', true)
        .attr('href', constructSheetUrl(alternative))
        .text(alternative)

      if (currentSheet === alternative) {
        alternativeLink.classed('active', true)
      }
    })
  }
}

module.exports = {
  renderAlternativeRadars
}