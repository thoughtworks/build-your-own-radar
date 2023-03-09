const d3 = require('d3')
const { graphConfig } = require('../config')

function renderBlipDescription(blip, ring, quadrant, tip) {
  const blipItem = d3
    .select(`.quadrant-table.${quadrant.order} ul:nth-of-type(${ring.order() + 1})`)
    .append('li')
    .classed('blip-list__item', true)
  const blipItemDiv = blipItem
    .append('div')
    .classed('blip-list__item-container', true)
    .attr('data-blip-id', blip.number())

  const blipItemContainer = blipItemDiv
    .append('button')
    .classed('blip-list__item-container__name', true)
    .on('click search-result-click', function (e) {
      e.stopPropagation()

      const expandFlag = d3.select(e.target.parentElement).classed('expand')

      d3.selectAll('.blip-list__item-container.expand').classed('expand', false)
      d3.select(e.target.parentElement).classed('expand', !expandFlag)
    })

  blipItemContainer
    .append('span')
    .classed('blip-list__item-container__name-value', true)
    .text(`${blip.number()}. ${blip.name()}`)
  blipItemContainer.append('span').classed('blip-list__item-container__name-arrow', true)

  blipItemDiv.append('div').classed('blip-list__item-container__description', true).html(blip.description())

  const blipGroupItem = d3.select(`g a#blip-link-${blip.number()}`)

  const mouseOver = function (e) {
    const blipId = d3.select(e.target.parentElement).attr('data-blip-id')

    d3.selectAll('g > a.blip-link').attr('opacity', 0.3)
    d3.select(`g > a.blip-link[data-blip-id="${blipId}"`).attr('opacity', 1.0)

    blipItem.classed('highlight', true)

    tip.show(blip.name(), blipGroupItem.node())
  }

  const mouseOut = function () {
    d3.selectAll('g > a.blip-link').attr('opacity', 1.0)

    blipItem.classed('highlight', false)

    tip.hide().style('left', 0).style('top', 0)
  }

  const blipClick = function (e) {
    const blipId = d3.select(e.target.parentElement).attr('data-blip-id')

    d3.selectAll('.blip-list__item-container.expand').classed('expand', false)
    d3.select(`.blip-list__item-container[data-blip-id="${blipId}"`).classed('expand', true)
  }

  blipItem.on('mouseover', mouseOver).on('mouseout', mouseOut).on('focusin', mouseOver).on('focusout', mouseOut)
  blipGroupItem
    .on('mouseover', mouseOver)
    .on('mouseout', mouseOut)
    .on('focusin', mouseOver)
    .on('focusout', mouseOut)
    .on('click', blipClick)
}

function renderQuadrantTables(quadrants, rings) {
  const radarContainer = d3.select('#radar')

  const quadrantTablesContainer = radarContainer.append('div').classed('quadrant-table__container', true)
  quadrants.forEach(function (quadrant) {
    const scale = window.innerWidth < 1800 ? 1.25 : 1.5
    let quadrantContainer
    if (window.innerWidth < 1280 && window.innerWidth >= 768) {
      // Additional margin for radar-legends height (42px) and it's padding
      quadrantContainer = quadrantTablesContainer
        .append('div')
        .classed('quadrant-table', true)
        .classed(quadrant.order, true)
        .style(
          'margin',
          `${graphConfig.effectiveQuadrantHeight * scale + graphConfig.quadrantsGap * scale + 64 + 42}px auto 0px`,
        )
        .style('left', '0')
        .style('right', 0)
    } else {
      quadrantContainer = quadrantTablesContainer
        .append('div')
        .classed('quadrant-table', true)
        .classed(quadrant.order, true)
    }

    rings.forEach(function (ring) {
      quadrantContainer.append('h2').classed('quadrant-table__ring-name', true).text(ring.name())
      quadrantContainer.append('ul').classed('blip-list', true)
    })
  })
}

module.exports = {
  renderQuadrantTables,
  renderBlipDescription,
}
