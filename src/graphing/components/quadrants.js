const d3 = require('d3')
const { getElementWidth } = require('../../util/htmlUtil')
const { toRadian } = require('../../util/mathUtils')
const { graphConfig, getGraphSize, getScaledQuadrantWidth, getScaledQuadrantHeightWithGap, getScale } = require('../config')

const ANIMATION_DURATION = 1000

let prevLeft, prevTop
let quadrantScrollHandlerReference
function selectRadarQuadrant(order, startAngle, name) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })

  const svg = d3.select('svg#radar-plot')
  svg.attr('data-quadrant-selected', order)

  svg.classed('sticky', false)
  svg.classed('enable-transition', true)

  const size = getGraphSize()

  d3.selectAll('.quadrant-table').classed('selected', false)
  d3.selectAll('.quadrant-table.' + order).classed('selected', true)

  d3.selectAll('.blip-item-description').classed('expanded', false)

  const scale = getScale()

  const adjustX = Math.sin(toRadian(startAngle)) - Math.cos(toRadian(startAngle))
  const adjustY = Math.cos(toRadian(startAngle)) + Math.sin(toRadian(startAngle))

  const translateXAll = (((1 - adjustX) / 2) * size * scale) / 2 + ((1 - adjustX) / 2) * (1 - scale / 2) * size
  const translateYAll = (((1 + adjustY) / 2) * size * scale) / 2

  const radarContainer = d3.select('#radar')
  const parentWidth = radarContainer.node().getBoundingClientRect().width
  const translateLeftRightValues = {
    first: {
      left: parentWidth - graphConfig.effectiveQuadrantWidth * scale,
      top: 0,
      right: 'unset',
    },
    second: {
      left: parentWidth - graphConfig.effectiveQuadrantWidth * scale,
      top: 0,
      right: 'unset',
    },
    third: {
      left: 0,
      top: 0,
      right: 'unset',
    },
    fourth: {
      left: 0,
      top: 0,
      right: 'unset',
    },
  }

  svg
    .style(
      'left',
      window.innerWidth < 1280
        ? `calc((100% - ${graphConfig.effectiveQuadrantWidth * scale}px) / 2)`
        : translateLeftRightValues[order].left + 'px',
    )
    .style('top', translateLeftRightValues[order].top + 'px')
    .style('right', translateLeftRightValues[order].right)
    .style('box-sizing', 'border-box')

  if (window.innerWidth < 1280) {
    svg.style('margin', 'unset')
  }

  svg
    .attr('transform', `scale(${scale})`)
    .style('transform-origin', `0 0`)
    .attr('width', graphConfig.effectiveQuadrantWidth)
    .attr('height', graphConfig.effectiveQuadrantHeight + graphConfig.quadrantsGap)
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
  d3.select(`li#subnav-item-${name.replaceAll(/\s+/g, '')}`).classed('active-item', true)
  d3.select('#radar').classed('mobile', true) // shows the table
  d3.select('.all-quadrants-mobile').classed('show-all-quadrants-mobile', false) // hides the quadrants

  if (order === 'first' || order === 'second') {
    d3.select('.radar-legends').classed('right-view', true)
  } else {
    d3.select('.radar-legends').classed('left-view', true)
  }

  if (window.innerWidth < 1280) {
    d3.select('#radar').style('height', null)
  }

  const radarLegendsContainer = d3.select('.radar-legends')
  radarLegendsContainer.style('top', `${getScaledQuadrantHeightWithGap(scale)}px`)

  if (window.innerWidth >= 1280) {
    if (order === 'first' || order === 'second') {
      radarLegendsContainer.style(
        'left',
        `${parentWidth -
        getScaledQuadrantWidth(scale) +
        (getScaledQuadrantWidth(scale) / 2 - getElementWidth(radarLegendsContainer) / 2)
        }px`,
      )
    } else {
      radarLegendsContainer.style(
        'left',
        `${getScaledQuadrantWidth(scale) / 2 - getElementWidth(radarLegendsContainer) / 2}px`,
      )
    }

    prevLeft = d3.select('#radar-plot').style('left')
    prevTop = d3.select('#radar-plot').style('top')
    stickQuadrantOnScroll()
  } else {
    radarLegendsContainer.style('left', `${window.innerWidth / 2 - getElementWidth(radarLegendsContainer) / 2}px`)
  }
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

  let quadrantNamesSplit = quadrantNameToDisplay.split(/[^a-zA-Z0-9]/g)
  if (quadrantNamesSplit.length > 1) {
    quadrantNameGroup
      .append('text')
      .text(quadrantNamesSplit[0])
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'end')
      .attr('transform', 'translate(-48, -20)')
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

function quadrantScrollHandler(
  scale,
  radarElement,
  offset,
  selectedOrder,
  leftQuadrantLeftValue,
  rightQuadrantLeftValue,
  quadrantHeight,
  quadrantTableOffset,
  quadrantTableHeight,
  radarLegendsContainer,
  radarLegendsWidth,
) {
  radarElement.classed('enable-transition', false)

  if (window.scrollY >= offset) {
    radarElement.classed('sticky', true)
    radarLegendsContainer.classed('sticky', true)

    if (window.scrollY + 60 + quadrantHeight >= quadrantTableOffset) {
      radarElement.classed('sticky', false)
      radarLegendsContainer.classed('sticky', false)

      radarElement.style('top', `${quadrantTableHeight - quadrantHeight - 60}px`)
      radarElement.style('left', prevLeft)

      radarLegendsContainer.style(
        'top',
        `${quadrantTableHeight - quadrantHeight - 60 + getScaledQuadrantHeightWithGap(scale)}px`,
      )
      radarLegendsContainer.style(
        'left',
        `${parseFloat(prevLeft.slice(0, -2)) + (getScaledQuadrantWidth(scale) / 2 - radarLegendsWidth / 2)}px`,
      )
    } else {
      if (selectedOrder === 'first' || selectedOrder === 'second') {
        radarElement.style('left', `${leftQuadrantLeftValue}px`)
        radarLegendsContainer.style(
          'left',
          `${leftQuadrantLeftValue + (getScaledQuadrantWidth(scale) / 2 - getElementWidth(radarLegendsContainer) / 2)
          }px`,
        )
      } else {
        radarElement.style('left', `${rightQuadrantLeftValue}px`)
        radarLegendsContainer.style(
          'left',
          `${rightQuadrantLeftValue + (getScaledQuadrantWidth(scale) / 2 - getElementWidth(radarLegendsContainer) / 2)
          }px`,
        )
      }

      radarLegendsContainer.style('top', `${getScaledQuadrantHeightWithGap(scale) + 60}px`)
    }
  } else {
    radarElement.style('top', prevTop)
    radarElement.style('left', prevLeft)
    radarElement.classed('sticky', false)

    radarLegendsContainer.style('top', `${parseFloat(prevTop.slice(0, -2)) + getScaledQuadrantHeightWithGap(scale)}px`)
    radarLegendsContainer.style(
      'left',
      `${parseFloat(prevLeft.slice(0, -2)) + (getScaledQuadrantWidth(scale) / 2 - radarLegendsWidth / 2)}px`,
    )
    radarLegendsContainer.classed('sticky', false)
  }
}

function stickQuadrantOnScroll() {
  const scale = getScale()

  const radarContainer = d3.select('#radar')
  const radarElement = d3.select('#radar-plot')
  const selectedQuadrantTableHTMLElement = d3.select('.quadrant-table.selected').node()
  const radarLegendsContainer = d3.select('.radar-legends')

  const radarHeight = graphConfig.effectiveQuadrantHeight * scale + graphConfig.quadrantsGap * scale
  const offset = radarContainer.node().offsetTop - 60
  const radarWidth = radarContainer.node().getBoundingClientRect().width
  const selectedOrder = radarElement.attr('data-quadrant-selected')

  const leftQuadrantLeftValue =
    (window.innerWidth + radarWidth) / 2 - graphConfig.quadrantWidth * scale + (graphConfig.quadrantsGap / 2) * scale
  const rightQuadrantLeftValue = (window.innerWidth - radarWidth) / 2

  const quadrantHeight = radarHeight
  const quadrantTableHeight = selectedQuadrantTableHTMLElement.getBoundingClientRect().height
  const quadrantTableOffset = offset + quadrantTableHeight

  const radarLegendsWidth = getElementWidth(radarLegendsContainer)

  quadrantScrollHandlerReference = quadrantScrollHandler.bind(
    this,
    scale,
    radarElement,
    offset,
    selectedOrder,
    leftQuadrantLeftValue,
    rightQuadrantLeftValue,
    quadrantHeight,
    quadrantTableOffset,
    quadrantTableHeight,
    radarLegendsContainer,
    radarLegendsWidth,
  )

  window.addEventListener('scroll', quadrantScrollHandlerReference)
}

function removeScrollListener() {
  window.removeEventListener('scroll', quadrantScrollHandlerReference)
}

module.exports = {
  selectRadarQuadrant,
  renderRadarQuadrants,
  renderRadarLegends,
  renderMobileView,
  mouseoverQuadrant,
  mouseoutQuadrant,
  removeScrollListener,
}
