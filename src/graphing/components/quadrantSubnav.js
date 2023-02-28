const d3 = require('d3')

function addListItem(quadrantList, name, callback) {
  quadrantList
    .append('li')
    .classed('quadrant-subnav__list-item', true)
    .append('a')
    .attr('href', 'javascript:void(0)')
    .text(name)
    .on('click', function (e) {
      d3.select('li.quadrant-subnav__list-item.active-item').classed('active-item', false)

      const listItem = e.target.parentElement
      d3.select(listItem).classed('active-item', true)

      d3.select('span.quadrant-subnav__dropdown-selector').text(e.target.innerText)

      if (callback) {
        callback()
      }
    })
}

function renderQuadrantSubnav(radarHeader, quadrants, renderFullRadar) {
  const subnavContainer = radarHeader.append('div').classed('quadrant-subnav', true)

  const subnavDropdown = subnavContainer.append('div').classed('quadrant-subnav__dropdown', true)
  const subnavSelector = subnavDropdown
    .append('span')
    .classed('quadrant-subnav__dropdown-selector', true)
    .text('All quadrants')

  const quadrantList = subnavContainer.append('ul').classed('quadrant-subnav__list', true)
  addListItem(quadrantList, 'All quadrants', renderFullRadar)
  d3.select('li.quadrant-subnav__list-item').classed('active-item', true)

  subnavDropdown.on('click', function () {
    subnavSelector.classed('rotate', !d3.select('span.quadrant-subnav__dropdown-selector').classed('rotate'))
    quadrantList.classed('show', !d3.select('ul.quadrant-subnav__list').classed('show'))
  })

  quadrants.forEach(function (quadrant) {
    addListItem(quadrantList, quadrant.quadrant.name())
  })
}

module.exports = {
  renderQuadrantSubnav,
}
