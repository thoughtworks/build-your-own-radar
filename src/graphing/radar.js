const d3 = require('d3')
const { default: d3tip } = require('d3-tip')
const _ = require('lodash/core')

const RingCalculator = require('../util/ringCalculator')
const { plotRadarBlips } = require('./blips')
const { graphConfig, getGraphSize } = require('./config')

const { renderBanner } = require('./components/banner')
const { renderQuadrantSubnav } = require('./components/quadrantSubnav')
const { renderSearch } = require('./components/search')
const { renderAlternativeRadars } = require('./components/alternativeRadars')
const { renderButtons } = require('./components/buttons')
const {
  renderRadarQuadrants,
  renderMobileView,
  renderRadarLegends,
  removeScrollListener,
} = require('./components/quadrants')
const { renderQuadrantTables } = require('./components/quadrantTables')
const { addQuadrantNameInPdfView, addRadarLinkInPdfView } = require('./pdfPage')

const { toRadian } = require('../util/mathUtils')

const ANIMATION_DURATION = 1000

const Radar = function (size, radar) {
  const CENTER = size / 2
  var svg, radarElement

  var tip = d3tip()
    .attr('class', 'd3-tip')
    .html(function (text) {
      return text
    })

  tip.direction(function () {
    return 'n'
  })

  var ringCalculator = new RingCalculator(radar.rings().length, CENTER)

  var self = {}

  function plotLines(quadrantGroup, quadrant) {
    const startX = size * (1 - (-Math.sin(toRadian(quadrant.startAngle)) + 1) / 2)
    const endX = size * (1 - (-Math.sin(toRadian(quadrant.startAngle - 90)) + 1) / 2)

    let startY = size * (1 - (Math.cos(toRadian(quadrant.startAngle)) + 1) / 2)
    let endY = size * (1 - (Math.cos(toRadian(quadrant.startAngle - 90)) + 1) / 2)

    if (startY > endY) {
      const aux = endY
      endY = startY
      startY = aux
    }
    const strokeWidth = graphConfig.quadrantsGap

    quadrantGroup
      .append('line')
      .attr('x1', CENTER)
      .attr('y1', startY)
      .attr('x2', CENTER)
      .attr('y2', endY)
      .attr('stroke-width', strokeWidth)

    quadrantGroup
      .append('line')
      .attr('x1', endX)
      .attr('y1', CENTER)
      .attr('x2', startX)
      .attr('y2', CENTER)
      .attr('stroke-width', strokeWidth)
  }

  function plotRingNames(quadrantGroup, rings, quadrant) {
    rings.forEach(function (ring, i) {
      const ringNameWithEllipsis = ring.name().length > 6 ? ring.name().slice(0, 6) + '...' : ring.name()
      if (quadrant.order === 'third' || quadrant.order === 'fourth') {
        quadrantGroup
          .append('text')
          .attr('class', 'line-text')
          .attr('y', CENTER + 5)
          .attr('x', CENTER + (ringCalculator.getRingRadius(i) + ringCalculator.getRingRadius(i + 1)) / 2)
          .attr('text-anchor', 'middle')
          .text(ringNameWithEllipsis)
      } else {
        quadrantGroup
          .append('text')
          .attr('class', 'line-text')
          .attr('y', CENTER + 5)
          .attr('x', CENTER - (ringCalculator.getRingRadius(i) + ringCalculator.getRingRadius(i + 1)) / 2)
          .attr('text-anchor', 'middle')
          .text(ringNameWithEllipsis)
      }
    })
  }

  function renderFullRadar() {
    removeScrollListener()

    d3.select('#auto-complete').property('value', '')

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })

    d3.select('#radar-plot').classed('sticky', false)
    d3.select('#radar-plot').classed('quadrant-view', false)
    d3.select('#radar-plot').classed('enable-transition', true)

    d3.select('#radar-plot').attr('data-quadrant-selected', null)

    const size = getGraphSize()
    d3.select('.home-link').remove()
    d3.select('.legend').remove()
    d3.select('#radar').classed('mobile', false)
    d3.select('.all-quadrants-mobile').classed('show-all-quadrants-mobile', true)

    d3.select('li.quadrant-subnav__list-item.active-item').classed('active-item', false)
    d3.select('li.quadrant-subnav__list-item').classed('active-item', true)

    d3.select('.quadrant-subnav__dropdown-selector').text('All quadrants')

    d3tip()
      .attr('class', 'd3-tip')
      .html(function (text) {
        return text
      })
      .hide()

    d3.selectAll('g.blip-link').attr('opacity', 1.0)

    svg.style('left', 0).style('right', 0).style('top', 0).attr('transform', 'scale(1)').style('transform', 'scale(1)')

    d3.selectAll('.button').classed('selected', false).classed('full-view', true)

    d3.selectAll('.quadrant-table').classed('selected', false)
    d3.selectAll('.home-link').classed('selected', false)

    d3.selectAll('.quadrant-group')
      .style('display', 'block')
      .transition()
      .duration(ANIMATION_DURATION)
      .style('transform', 'scale(1)')
      .style('opacity', '1')
      .attr('transform', 'translate(0,0)')

    d3.select('#radar-plot').attr('width', size).attr('height', size)
    d3.select(`svg#radar-plot`).style('padding', '0')

    const radarLegendsContainer = d3.select('.radar-legends')
    radarLegendsContainer.attr('class', 'radar-legends')
    radarLegendsContainer.attr('style', null)

    d3.selectAll('svg#radar-plot a').attr('aria-hidden', null).attr('tabindex', null)
    d3.selectAll('.quadrant-table button').attr('aria-hidden', 'true').attr('tabindex', -1)
    d3.selectAll('.blip-list__item-container__name').attr('aria-expanded', 'false')

    d3.selectAll(`.quadrant-group rect:nth-child(2n)`).attr('tabindex', 0)
  }

  function hideTooltipOnScroll(tip) {
    window.addEventListener('scroll', () => {
      tip.hide().style('left', 0).style('top', 0)
    })
  }

  self.init = function () {
    radarElement = d3.select('#radar')
    return self
  }

  self.plot = function () {
    var rings, quadrants, alternatives, currentSheet

    rings = radar.rings()
    quadrants = radar.quadrants()
    alternatives = radar.getAlternatives()
    currentSheet = radar.getCurrentSheet()

    const radarHeader = d3.select('main .graph-header')
    const radarFooter = d3.select('main .graph-footer')

    renderBanner(renderFullRadar)

    renderQuadrantSubnav(radarHeader, quadrants, renderFullRadar)
    renderSearch(radarHeader, quadrants)
    renderAlternativeRadars(radarFooter, alternatives, currentSheet)
    renderQuadrantTables(quadrants, rings)
    renderButtons(radarFooter)

    const landingPageElements = document.querySelectorAll('main .home-page')
    landingPageElements.forEach((elem) => {
      elem.style.display = 'none'
    })

    svg = radarElement.append('svg').call(tip)

    const legendHeight = 40
    radarElement.style('height', size + legendHeight + 'px')
    svg.attr('id', 'radar-plot').attr('width', size).attr('height', size)

    _.each(quadrants, function (quadrant) {
      let quadrantGroup
      quadrantGroup = renderRadarQuadrants(size, svg, quadrant, rings, ringCalculator, tip)
      plotLines(quadrantGroup, quadrant)
      const ringTextGroup = quadrantGroup.append('g')
      plotRingNames(ringTextGroup, rings, quadrant)
      plotRadarBlips(quadrantGroup, rings, quadrant, tip)
      renderMobileView(quadrant)
      addQuadrantNameInPdfView(quadrant.order, quadrant.quadrant.name())
    })

    renderRadarLegends(radarElement)
    hideTooltipOnScroll(tip)
    addRadarLinkInPdfView()
  }

  return self
}

module.exports = Radar
