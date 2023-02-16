const d3 = require('d3')
const Chance = require('chance')
const { graphConfig } = require('./config')
const { toRadian } = require('../util/mathUtils')
const { selectQuadrant } = require('./components/quadrants')

const getRingRadius = function (ringIndex) {
  const ratios = [0, 0.316, 0.652, 0.832, 0.992]
  const radius = ratios[ringIndex] * graphConfig.quadrantWidth
  return radius || 0
}
function addRing(ring, order) {
  const table = d3.select('.quadrant-table.' + order)
  table.append('h3').text(ring)
  return table.append('ul')
}

function getBorderWidthOffset(quadrantOrder, adjustY, adjustX) {
  let borderWidthYOffset = 0,
    borderWidthXOffset = 0

  if (quadrantOrder !== 'first') {
    borderWidthYOffset = adjustY < 0 ? -graphConfig.quadrantsGap : graphConfig.quadrantsGap
    borderWidthXOffset = adjustX > 0 ? graphConfig.quadrantsGap + 10 : 0
  }
  return { borderWidthYOffset, borderWidthXOffset }
}

function calculateRadarBlipCoordinates(minRadius, maxRadius, startAngle, quadrantOrder, chance) {
  const adjustX = Math.sin(toRadian(startAngle)) - Math.cos(toRadian(startAngle))
  const adjustY = -Math.cos(toRadian(startAngle)) - Math.sin(toRadian(startAngle))
  const { borderWidthYOffset, borderWidthXOffset } = getBorderWidthOffset(quadrantOrder, adjustY, adjustX)
  const radius = chance.floating({
    min: minRadius + graphConfig.blipWidth / 2,
    max: maxRadius - graphConfig.blipWidth,
  })

  let angleDelta = (Math.asin(graphConfig.blipWidth / 2 / radius) * 180) / (Math.PI - 1.25)
  angleDelta = angleDelta > 45 ? 45 : angleDelta
  const angle = toRadian(chance.integer({ min: angleDelta, max: 90 - angleDelta }))

  let x = graphConfig.quadrantWidth + radius * Math.cos(angle) * adjustX + borderWidthXOffset
  let y = graphConfig.quadrantHeight + radius * Math.sin(angle) * adjustY + borderWidthYOffset

  return avoidBoundaryCollision(x, y, adjustX, adjustY)
}

function thereIsCollision(coordinates, allCoordinates) {
  return allCoordinates.some(function (currentCoordinates) {
    return (
      Math.abs(currentCoordinates[0] - coordinates[0]) < graphConfig.blipWidth + 10 &&
      Math.abs(currentCoordinates[1] - coordinates[1]) < graphConfig.blipWidth + 10
    )
  })
}

function avoidBoundaryCollision(x, y, adjustX, adjustY) {
  const size = graphConfig.quadrantWidth * 2 + graphConfig.quadrantsGap
  if (
    (adjustY > 0 && y + graphConfig.blipWidth > size) ||
    (adjustY < 0 && y + graphConfig.blipWidth > graphConfig.quadrantHeight)
  ) {
    y = y - graphConfig.blipWidth
  }
  if (adjustX < 0 && x - graphConfig.blipWidth > graphConfig.quadrantWidth) {
    x += graphConfig.blipWidth
  }
  if (adjustX > 0 && x + graphConfig.blipWidth < graphConfig.quadrantWidth + graphConfig.quadrantsGap) {
    x -= graphConfig.blipWidth
  }
  return [x, y]
}

function findBlipCoordinates(blip, minRadius, maxRadius, startAngle, allBlipCoordinatesInRing, quadrantOrder) {
  const maxIterations = 200
  const chance = new Chance(Math.PI * graphConfig.quadrantWidth * graphConfig.blipWidth * graphConfig.blipFontSize)
  let coordinates = calculateRadarBlipCoordinates(minRadius, maxRadius, startAngle, quadrantOrder, chance)
  let iterationCounter = 0
  let foundAPlace = false

  while (iterationCounter < maxIterations) {
    if (thereIsCollision(coordinates, allBlipCoordinatesInRing)) {
      coordinates = calculateRadarBlipCoordinates(minRadius, maxRadius, startAngle, quadrantOrder, chance)
    } else {
      foundAPlace = true
      break
    }
    iterationCounter++
  }

  if (!foundAPlace && blip.width > graphConfig.minBlipWidth) {
    blip.width = blip.width - 1
    return findBlipCoordinates(blip, minRadius, maxRadius, startAngle, allBlipCoordinatesInRing, quadrantOrder)
  } else {
    return coordinates
  }
}

function blipAssistiveText(blip) {
  return `${blip.ring().name()} ring, ${blip.name()}, ${blip.isNew() ? 'New' : 'No change'} blip.`
}
function addOuterCircle(parentSvg, order) {
  parentSvg
    .append('path')
    .attr('opacity', '1')
    .attr('class', order)
    .attr(
      'd',
      'M18 36C8.07 36 0 27.93 0 18S8.07 0 18 0c9.92 0 18 8.07 18 18S27.93 36 18 36zM18 3.14C9.81 3.14 3.14 9.81 3.14 18S9.81 32.86 18 32.86S32.86 26.19 32.86 18S26.19 3.14 18 3.14z',
    )
}

function drawBlipCircle(group, blip, xValue, yValue, order) {
  group
    .attr('transform', `scale(1) translate(${xValue - 16}, ${yValue - 8})`)
    .attr('aria-label', blipAssistiveText(blip))
  group.append('circle').attr('r', '12').attr('cx', '18').attr('cy', '18').attr('class', order)
}

function newBlip(blip, xValue, yValue, order, group) {
  drawBlipCircle(group, blip, xValue, yValue, order)
  addOuterCircle(group, order)
}

function noChangeBlip(blip, xValue, yValue, order, group) {
  drawBlipCircle(group, blip, xValue, yValue, order)
}

function drawBlipInCoordinates(blip, coordinates, order, quadrantGroup, ringList, tip, startAngle) {
  let x = coordinates[0]
  let y = coordinates[1]

  const group = quadrantGroup
    .append('g')
    .append('a')
    .attr('onclick', () => {
      selectQuadrant.bind({}, order, startAngle)
    })
    .attr('href', 'javascript:void(0)')
    .attr('class', 'blip-link')
    .attr('id', 'blip-link-' + blip.number())
  if (blip.isNew()) {
    newBlip(blip, x, y, order, group)
  } else {
    noChangeBlip(blip, x, y, order, group)
  }
  group
    .append('text')
    .attr('x', 18)
    .attr('y', 24)
    .attr('font-size', graphConfig.blipFontSize)
    .attr('font-style', 'normal')
    .attr('font-weight', 'bold')
    .attr('fill', 'white')
    .text(blip.number())
    .style('text-anchor', 'middle')

  const blipListItem = ringList.append('li')
  const blipText = blip.number() + '. ' + blip.name() + (blip.topic() ? '. - ' + blip.topic() : '')
  blipListItem
    .append('div')
    .attr('class', 'blip-list-item')
    .attr('id', 'blip-list-item-' + blip.number())
    .text(blipText)

  const blipItemDescription = blipListItem
    .append('div')
    .attr('id', 'blip-description-' + blip.number())
    .attr('class', 'blip-item-description')
  if (blip.description()) {
    blipItemDescription.append('p').html(blip.description())
  }

  const mouseOver = function () {
    d3.selectAll('g.blip-link').attr('opacity', 0.3)
    group.attr('opacity', 1.0)
    blipListItem.selectAll('.blip-list-item').classed('highlight', true)
    tip.show(blip.name(), group.node())
  }

  const mouseOut = function () {
    d3.selectAll('g.blip-link').attr('opacity', 1.0)
    blipListItem.selectAll('.blip-list-item').classed('highlight', false)
    tip.hide().style('left', 0).style('top', 0)
  }

  blipListItem.on('mouseover', mouseOver).on('mouseout', mouseOut)
  group.on('mouseover', mouseOver).on('mouseout', mouseOut)

  const clickBlip = function () {
    d3.select('.blip-item-description.expanded').node() !== blipItemDescription.node() &&
      d3.select('.blip-item-description.expanded').classed('expanded', false)
    blipItemDescription.classed('expanded', !blipItemDescription.classed('expanded'))

    blipItemDescription.on('click', function () {
      d3.event.stopPropagation()
    })
  }

  group.on('click', clickBlip)
  blipListItem.on('click', clickBlip)
}

const plotRadarBlips = function (parentElement, rings, quadrantWrapper, tooltip) {
  let blips, quadrant, startAngle, order

  quadrant = quadrantWrapper.quadrant
  startAngle = quadrantWrapper.startAngle
  order = quadrantWrapper.order

  d3.select('.quadrant-table.' + order)
    .append('h2')
    .attr('class', 'quadrant-table__name')
    .text(quadrant.name())

  blips = quadrant.blips()
  rings.forEach(function (ring, i) {
    const ringBlips = blips.filter(function (blip) {
      return blip.ring() === ring
    })

    if (ringBlips.length === 0) {
      return
    }

    const offset = 10
    const minRadius = getRingRadius(i) + offset
    const maxRadius = getRingRadius(i + 1) - offset
    const ringList = addRing(ring.name(), order)
    const allBlipCoordinatesInRing = []

    ringBlips.forEach(function (blip) {
      const coordinates = findBlipCoordinates(blip, minRadius, maxRadius, startAngle, allBlipCoordinatesInRing, order)
      allBlipCoordinatesInRing.push(coordinates)
      drawBlipInCoordinates(blip, coordinates, order, parentElement, ringList, tooltip, startAngle)
    })
  })
}

module.exports = { calculateRadarBlipCoordinates, plotRadarBlips }
