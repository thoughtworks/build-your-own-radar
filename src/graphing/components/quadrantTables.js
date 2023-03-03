const d3 = require('d3')

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
    .on('click', function (e) {
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

  blipItem.on('mouseover', mouseOver).on('mouseout', mouseOut).on('focusin', mouseOver).on('focusout', mouseOut)
  blipGroupItem.on('mouseover', mouseOver).on('mouseout', mouseOut).on('focusin', mouseOver).on('focusout', mouseOut)
}

function renderQuadrantTables(quadrants, rings) {
  const radarContainer = d3.select('#radar')

  quadrants.forEach(function (quadrant) {
    const quadrantContainer = radarContainer.append('div').classed('quadrant-table', true).classed(quadrant.order, true)

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
