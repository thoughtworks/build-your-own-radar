function addListItem(quadrantList, name) {
  quadrantList
    .append('li')
    .classed('quadrant-subnav__list-item', true)
    .append('a')
    .attr('href', '#')
    .text(name)
}

function renderQuadrantSubnav(radarHeader, quadrants) {
  const subnavContainer = radarHeader.append('div').classed('quadrant-subnav', true)
  const quadrantList = subnavContainer.append('ul').classed('quadrant-subnav__list', true)
  addListItem(quadrantList, 'All quadrants')

  quadrants.forEach(function (quadrant) {
    addListItem(quadrantList, quadrant.quadrant.name())
  })
}

module.exports = {
  renderQuadrantSubnav
}