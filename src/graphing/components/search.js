const AutoComplete = require('../../util/autoComplete')

function renderSearch(radarHeader, quadrants) {
  const searchContainer = radarHeader.append('div').classed('search-container', true)

  searchContainer
    .append('input')
    .classed('search-container__input', true)
    .attr('placeholder', 'Search this radar')
    .attr('id', 'auto-complete')

  searchContainer.append('button').classed('search-container__btn', true).text('Search')

  AutoComplete('#auto-complete', quadrants, function (_e, ui) {
    console.log(_e)
    console.log(ui)
  })
}

module.exports = {
  renderSearch,
}
