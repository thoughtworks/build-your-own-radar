const d3 = require('d3')

function addListItem(quadrantList, name) {
  quadrantList.append('li').classed('quadrant-subnav__list-item', true).append('a').attr('href', '#').text(name)
}

function renderQuadrantSubnav(radarHeader, quadrants) {
  const subnavContainer = radarHeader.append('div').classed('quadrant-subnav', true)

  const subnavSelector = subnavContainer.append('span').classed('quadrant-subnav__selector', true).text('All quadrants')

  const quadrantList = subnavContainer.append('ul').classed('quadrant-subnav__list', true)
  addListItem(quadrantList, 'All quadrants')

  subnavSelector.on('click', function () {
    subnavSelector.classed('rotate', !d3.select('span.quadrant-subnav__selector').classed('rotate'))
    quadrantList.classed('show', !d3.select('ul.quadrant-subnav__list').classed('show'))
  })

  quadrants.forEach(function (quadrant) {
    addListItem(quadrantList, quadrant.quadrant.name())
  })
}

module.exports = {
  renderQuadrantSubnav,
}
