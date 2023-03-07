const d3 = require('d3')
const { selectRadarQuadrant, mouseoverQuadrant, mouseoutQuadrant } = require('./quadrants')

function addListItem(quadrantList, name, callback, order) {
  quadrantList
    .append('li')
    .attr('id', `subnav-item-${name.replaceAll('/\\s+/g', '')}`)
    .classed('quadrant-subnav__list-item', true)
    .append('a')
    .attr('href', 'javascript:void(0)')
    .text(name)
    .on('click', function (e) {
      d3.select('span.quadrant-subnav__dropdown-selector').text(e.target.innerText)

      const subnavArrow = d3.select('.quadrant-subnav__dropdown-arrow')
      subnavArrow.classed('rotate', !d3.select('span.quadrant-subnav__dropdown-arrow').classed('rotate'))
      quadrantList.classed('show', !d3.select('ul.quadrant-subnav__list').classed('show'))

      if (callback) {
        callback()
      }
    })
    .on('mouseover', () => mouseoverQuadrant(order))
    .on('mouseout', () => mouseoutQuadrant(order))
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
    addListItem(
      quadrantList,
      quadrant.quadrant.name(),
      () => selectRadarQuadrant(quadrant.order, quadrant.startAngle, quadrant.quadrant.name()),
      quadrant.order,
    )
  })

  let subnavOffset
  document.onreadystatechange = function () {
    console.log(document.readyState)
    if (document.readyState === 'complete') {
      subnavOffset = d3.select('.quadrant-subnav').node().offsetTop
    }
  }

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
