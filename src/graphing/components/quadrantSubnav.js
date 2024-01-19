const d3 = require('d3')
const { selectRadarQuadrant, removeScrollListener } = require('./quadrants')
const { getRingIdString } = require('../../util/stringUtil')
const { uiConfig } = require('../config')

function addListItem(quadrantList, name, callback) {
  quadrantList
    .append('li')
    .attr('id', `subnav-item-${getRingIdString(name)}`)
    .classed('quadrant-subnav__list-item', true)
    .attr('title', name)
    .append('button')
    .classed('quadrant-subnav__list-item__button', true)
    .attr('role', 'tab')
    .text(name)
    .on('click', function (e) {
      d3.select('#radar').classed('no-blips', false)
      d3.select('#auto-complete').property('value', '')
      removeScrollListener()

      d3.select('.graph-header').node().scrollIntoView({
        behavior: 'smooth',
      })

      d3.select('span.quadrant-subnav__dropdown-selector').text(e.target.innerText)

      const subnavArrow = d3.select('.quadrant-subnav__dropdown-arrow')
      subnavArrow.classed('rotate', !d3.select('span.quadrant-subnav__dropdown-arrow').classed('rotate'))
      quadrantList.classed('show', !d3.select('ul.quadrant-subnav__list').classed('show'))

      const subnavDropdown = d3.select('.quadrant-subnav__dropdown')
      subnavDropdown.attr('aria-expanded', subnavDropdown.attr('aria-expanded') === 'false' ? 'true' : 'false')

      d3.selectAll('.blip-list__item-container.expand').classed('expand', false)

      if (callback) {
        callback()
      }
    })
}

function renderQuadrantSubnav(radarHeader, quadrants, renderFullRadar) {
  const subnavContainer = radarHeader.append('nav').classed('quadrant-subnav', true)

  const subnavDropdown = subnavContainer
    .append('div')
    .classed('quadrant-subnav__dropdown', true)
    .attr('aria-expanded', 'false')
  subnavDropdown.append('span').classed('quadrant-subnav__dropdown-selector', true).text('All quadrants')
  const subnavArrow = subnavDropdown.append('span').classed('quadrant-subnav__dropdown-arrow', true)

  const quadrantList = subnavContainer.append('ul').classed('quadrant-subnav__list', true)
  addListItem(quadrantList, 'All quadrants', renderFullRadar)
  d3.select('li.quadrant-subnav__list-item').classed('active-item', true).select('button').attr('aria-selected', 'true')

  subnavDropdown.on('click', function () {
    subnavArrow.classed('rotate', !d3.select('span.quadrant-subnav__dropdown-arrow').classed('rotate'))
    quadrantList.classed('show', !d3.select('ul.quadrant-subnav__list').classed('show'))

    subnavDropdown.attr('aria-expanded', subnavDropdown.attr('aria-expanded') === 'false' ? 'true' : 'false')
  })

  quadrants.forEach(function (quadrant) {
    addListItem(quadrantList, quadrant.quadrant.name(), () =>
      selectRadarQuadrant(quadrant.order, quadrant.startAngle, quadrant.quadrant.name()),
    )
  })

  const subnavOffset =
    (window.innerWidth < 1024 ? uiConfig.tabletBannerHeight : uiConfig.bannerHeight) + uiConfig.headerHeight

  window.addEventListener('scroll', function () {
    if (subnavOffset <= window.scrollY) {
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
