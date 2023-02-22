const { constructSheetUrl } = require('../../util/urlUtils')

function renderAlternativeRadars(radarFooter, alternatives, currentSheet) {
  const alternativesContainer = radarFooter.append('div').classed('alternative-radars', true)

  for (let i = 0; alternatives.length > 0; i++) {
    const list = alternatives.splice(0, 5)

    const alternativesList = alternativesContainer
      .append('ul')
      .classed(`alternative-radars__list`, true)
      .classed(`alternative-radars__list__row-${i}`, true)

    list.forEach(function (alternative) {
      const alternativeListItem = alternativesList
        .append('li')
        .classed('alternative-radars__list-item', true)

      alternativeListItem
        .append('a')
        .classed('alternative-radars__list-item-link', true)
        .attr('href', constructSheetUrl(alternative))
        .text(alternative)

      if (currentSheet === alternative) {
        alternativeListItem.classed('active', true)
      }
    })
  }
}

module.exports = {
  renderAlternativeRadars,
}
