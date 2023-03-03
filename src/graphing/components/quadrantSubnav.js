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

      const subnavArrow = d3.select('.quadrant-subnav__dropdown-arrow')
      subnavArrow.classed('rotate', !d3.select('span.quadrant-subnav__dropdown-arrow').classed('rotate'))
      quadrantList.classed('show', !d3.select('ul.quadrant-subnav__list').classed('show'))

      if (callback) {
        callback()
      }
    })
}

function renderQuadrantSubnav(radarHeader, quadrants, renderFullRadar) {
  const subnavContainer = radarHeader.append('div').classed('quadrant-subnav', true)

  const subnavDropdown = subnavContainer.append('div').classed('quadrant-subnav__dropdown', true)
  subnavDropdown.append('span').classed('quadrant-subnav__dropdown-selector', true).text('All quadrants')
  const subnavArrow = subnavDropdown.append('span').classed('quadrant-subnav__dropdown-arrow', true)

  const quadrantList = subnavContainer.append('ul').classed('quadrant-subnav__list', true)
  addListItem(quadrantList, 'All quadrants', renderFullRadar)
  d3.select('li.quadrant-subnav__list-item').classed('active-item', true)

  subnavDropdown.on('click', function () {
    subnavArrow.classed('rotate', !d3.select('span.quadrant-subnav__dropdown-arrow').classed('rotate'))
    quadrantList.classed('show', !d3.select('ul.quadrant-subnav__list').classed('show'))
  })

  quadrants.forEach(function (quadrant) {
    addListItem(quadrantList, quadrant.quadrant.name())
  })

  let subnavOffset
  window.addEventListener('load', function () {
    subnavOffset = d3.select('.quadrant-subnav').node().offsetTop
  })

  window.addEventListener('scroll', function () {
    if (subnavOffset <= window.pageYOffset) {
      d3.select('.quadrant-subnav').classed('sticky', true)
      d3.select('.search-container').classed('sticky-offset', true)
    } else {
      d3.select('.quadrant-subnav').classed('sticky', false)
      d3.select('.search-container').classed('sticky-offset', false)
    }
  })
}

module.exports = {
  renderQuadrantSubnav,
}
