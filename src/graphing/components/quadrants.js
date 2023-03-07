const d3 = require('d3')
const { toRadian } = require('../../util/mathUtils')
const { graphConfig, getGraphSize } = require('../config')

const ANIMATION_DURATION = 1000

function selectRadarQuadrant(order, startAngle, name) {
  const svg = d3.select('svg#radar-plot')
  const size = getGraphSize()

  d3.selectAll('.quadrant-table').classed('selected', false)
  d3.selectAll('.quadrant-table.' + order).classed('selected', true)

  d3.selectAll('.blip-item-description').classed('expanded', false)

  const scale = 1.5

  const adjustX = Math.sin(toRadian(startAngle)) - Math.cos(toRadian(startAngle))
  const adjustY = Math.cos(toRadian(startAngle)) + Math.sin(toRadian(startAngle))

  const translateXAll = (((1 - adjustX) / 2) * size * scale) / 2 + ((1 - adjustX) / 2) * (1 - scale / 2) * size
  const translateYAll = (((1 + adjustY) / 2) * size * scale) / 2

  const translateLeftRightValues = {
    first: { left: 376, top: 0 },
    second: { left: 376, top: 0 },
    third: { left: -854, top: 0 },
    fourth: { left: -854, top: 0 },
  }

  svg
    .style('left', translateLeftRightValues[order].left + 'px')
    .style('top', translateLeftRightValues[order].top + 'px')
  svg
    .attr('transform', 'scale(1.5)')
    .style('transform-origin', `0 0`)
    .attr('width', graphConfig.quadrantWidth)
    .attr('height', graphConfig.quadrantHeight + graphConfig.quadrantsGap)
  svg.classed('quadrant-view', true)

  const quadrantGroupTranslate = {
    first: { x: 0, y: 0 },
    second: { x: 0, y: -512 },
    third: { x: -544, y: 0 },
    fourth: { x: -544, y: -512 },
  }

  d3.select('.quadrant-group-' + order)
    .transition()
    .duration(ANIMATION_DURATION)
    .style('transform', `translate(${quadrantGroupTranslate[order].x}px, ${quadrantGroupTranslate[order].y}px)`)
    .style('left', 'unset')
    .style('right', 0)

  d3.selectAll('.quadrant-group-' + order + ' .blip-link text').each(function () {
    d3.select(this.parentNode).transition().duration(ANIMATION_DURATION)
  })

  d3.selectAll('.quadrant-group').style('opacity', 1)

  d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')')
    .transition()
    .duration(ANIMATION_DURATION)
    .style('opacity', '0')
    .style('pointer-events', 'none')
    .attr('transform', 'translate(' + translateXAll + ',' + translateYAll + ')scale(0)')
    .style('transform', null)

  d3.select('li.quadrant-subnav__list-item.active-item').classed('active-item', false)
  d3.select(`li#subnav-item-${name.replaceAll('/\\s+/g', '')}`).classed('active-item', true)
  d3.select('#radar').classed('mobile', true) // shows the table
  d3.select('.all-quadrants-mobile').classed('show-all-quadrants-mobile', false) // hides the quadrants
  // stickQuadrantOnScroll()
}

function renderRadarQuadrantName(quadrant, parentGroup) {
  const adjustX = Math.sin(toRadian(quadrant.startAngle)) - Math.cos(toRadian(quadrant.startAngle))
  const adjustY = -Math.cos(toRadian(quadrant.startAngle)) - Math.sin(toRadian(quadrant.startAngle))
  const quadrantNameGroup = parentGroup.append('g').classed('quadrant-name-group', true)

  let quadrantNameToDisplay = quadrant.quadrant.name()
  let translateX,
    translateY,
    anchor,
    ctaArrowXOffset,
    ctaArrowYOffset = -12

  let quadrantNamesSplit = quadrantNameToDisplay.split(/[^a-zA-Z0-9\s]/g)
  if (quadrantNamesSplit.length > 1) {
    quadrantNameGroup
      .append('text')
      .text(quadrantNamesSplit[0])
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'end')
      .attr('transform', 'translate(-45, -20)')
    quadrantNameToDisplay = quadrantNamesSplit.slice(1).join(' ')
  } else {
    quadrantNameToDisplay = quadrantNamesSplit[0]
  }

  if (adjustX < 0) {
    anchor = 'start'
    translateX = 60
    ctaArrowXOffset = quadrantNameToDisplay.length * 11
  } else {
    anchor = 'end'
    translateX = graphConfig.quadrantWidth * 2 - 50
    ctaArrowXOffset = 10
  }
  if (adjustY < 0) {
    translateY = 60
  } else {
    translateY = graphConfig.quadrantWidth * 2 - 60
  }

  const quadrantName = quadrantNameGroup.append('text')
  const ctaArrow = quadrantNameGroup
    .append('polygon')
    .attr('class', 'quadrant-name-cta')
    .attr('points', '5.2105e-4 11.753 1.2874 13 8 6.505 1.2879 0 0 1.2461 5.4253 6.504')
    .attr('fill', '#e16a7c')
  quadrantNameGroup.attr('transform', 'translate(' + translateX + ', ' + translateY + ')')
  quadrantName.text(quadrantNameToDisplay).attr('font-weight', 'bold').attr('text-anchor', anchor)
  ctaArrow.attr('transform', `translate(${ctaArrowXOffset}, ${ctaArrowYOffset})`)
}

function renderRadarQuadrants(size, svg, quadrant, rings, ringCalculator) {
  const quadrantGroup = svg
    .append('g')
    .attr('class', 'quadrant-group quadrant-group-' + quadrant.order)
    .on('mouseover', mouseoverQuadrant.bind({}, quadrant.order))
    .on('mouseout', mouseoutQuadrant.bind({}, quadrant.order))
    .on('click', selectRadarQuadrant.bind({}, quadrant.order, quadrant.startAngle, quadrant.quadrant.name()))

  const rectCoordMap = {
    first: { x: 0, y: 0, strokeDashArray: '0,512,1024,512' },
    second: { x: 0, y: 544, strokeDashArray: '1024,1024' },
    third: { x: 544, y: 0, strokeDashArray: '0,1024,1024' },
    fourth: { x: 544, y: 544, strokeDashArray: '512,1024,512' },
  }

  quadrantGroup
    .append('rect')
    .attr('width', '512px')
    .attr('height', '512px')
    .attr('fill', '#edf1f3')
    .attr('x', rectCoordMap[quadrant.order].x)
    .attr('y', rectCoordMap[quadrant.order].y)
    .style('pointer-events', 'none')

  rings.forEach(function (ring, i) {
    const arc = d3
      .arc()
      .innerRadius(ringCalculator.getRingRadius(i))
      .outerRadius(ringCalculator.getRingRadius(i + 1))
      .startAngle(toRadian(quadrant.startAngle))
      .endAngle(toRadian(quadrant.startAngle - 90))

    quadrantGroup
      .append('path')
      .attr('d', arc)
      .attr('class', 'ring-arc-' + ring.order())
      .attr('transform', 'translate(' + 528 + ', ' + 528 + ')')
  })
  quadrantGroup
    .append('rect')
    .attr('width', '512px')
    .attr('height', '512px')
    .attr('fill', 'transparent')
    .attr('stroke', 'black')
    .attr('x', rectCoordMap[quadrant.order].x)
    .attr('y', rectCoordMap[quadrant.order].y)
    .attr('stroke-dasharray', rectCoordMap[quadrant.order].strokeDashArray)
    .attr('stroke-width', 2)
    .attr('stroke', '#71777d')

  renderRadarQuadrantName(quadrant, quadrantGroup)
  return quadrantGroup
}

function renderRadarLegends(radarElement) {
  const legendsContainer = radarElement.append('div').classed('radar-legends', true)

  const newImage = legendsContainer
    .append('img')
    .attr('src', '/images/new.svg')
    .attr('width', '37px')
    .attr('height', '37px')
    .attr('alt', 'new blip legend icon')
    .node().outerHTML
  const noChangeImage = legendsContainer
    .append('img')
    .attr('src', '/images/no-change.svg')
    .attr('width', '37px')
    .attr('height', '37px')
    .attr('alt', 'no change blip legend icon')
    .node().outerHTML

  legendsContainer.html(`${newImage} New ${noChangeImage} No change`)
}

function renderMobileView(quadrant) {
  const quadrantBtn = d3.select('.all-quadrants-mobile').append('button')
  quadrantBtn
    .attr('class', 'all-quadrants-mobile--btn')
    .style('background-image', `url('/images/${quadrant.order}-quadrant-btn-bg.svg')`)
    .attr('id', quadrant.order + '-quadrant-mobile')
    .append('div')
    .attr('class', 'btn-text-wrapper')
    .text(quadrant.quadrant.name().replace(/[^a-zA-Z0-9\s!&]/g, ' '))
  quadrantBtn.node().onclick = () => {
    selectRadarQuadrant(quadrant.order, quadrant.startAngle, quadrant.quadrant.name())
  }
}

function mouseoverQuadrant(order) {
  d3.select('.quadrant-group-' + order).style('opacity', 1)
  d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')').style('opacity', 0.3)
}

function mouseoutQuadrant(order) {
  d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')').style('opacity', 1)
}

// function stickQuadrantOnScroll (){
//   let element,quadrantTable, offset;
//     element = d3.select('#radar').node();
//     quadrantTable = d3.select('.quadrant-table.selected').node();
//     offset = element.offsetTop;
//
//   window.addEventListener('scroll', function() {
//     if (window.pageYOffset >= offset) {
//       d3.select('#radar-plot.quadrant-view').classed('sticky', true)
//       const stopOffset = quadrantTable.offsetTop;
//       const elementHeight = element.offsetHeight;
//       if (window.pageYOffset + elementHeight >= stopOffset) {
//         console.
//         d3.select('#radar-plot.quadrant-view').classed('sticky', false)
//       }
//     } else {
//       d3.select('#radar-plot.quadrant-view').classed('sticky', false)
//     }
//   });
// }

module.exports = {
  selectRadarQuadrant,
  renderRadarQuadrants,
  renderRadarLegends,
  renderMobileView,
  mouseoverQuadrant,
  mouseoutQuadrant,
}
