const d3 = require('d3')
const { graphConfig, getScale, uiConfig } = require('../config')
const { stickQuadrantOnScroll } = require('./quadrants')
const { removeAllSpaces } = require('../../util/stringUtil')

function fadeOutAllBlips() {
  d3.selectAll('g > a.blip-link').attr('opacity', 0.3)
}

function fadeInSelectedBlip(selectedBlipOnGraph) {
  selectedBlipOnGraph.attr('opacity', 1.0)
}

function highlightBlipInTable(selectedBlip) {
  selectedBlip.classed('highlight', true)
}

function highlightBlipInGraph(blipIdToFocus) {
  fadeOutAllBlips()
  const selectedBlipOnGraph = d3.select(`g > a.blip-link[data-blip-id='${blipIdToFocus}'`)
  fadeInSelectedBlip(selectedBlipOnGraph)
}

function renderBlipDescription(blip, ring, quadrant, tip, groupBlipTooltipText) {
  let blipTableItem = d3.select(`.quadrant-table.${quadrant.order} ul[data-ring-order='${ring.order()}']`)
  if (!groupBlipTooltipText) {
    blipTableItem = blipTableItem.append('li').classed('blip-list__item', true)
    const blipItemDiv = blipTableItem
      .append('div')
      .classed('blip-list__item-container', true)
      .attr('data-blip-id', blip.id())

    if (blip.groupIdInGraph()) {
      blipItemDiv.attr('data-group-id', blip.groupIdInGraph())
    }

    const blipItemContainer = blipItemDiv
      .append('button')
      .classed('blip-list__item-container__name', true)
      .attr('aria-expanded', 'false')
      .attr('aria-controls', `blip-description-${blip.id()}`)
      .attr('aria-hidden', 'true')
      .attr('tabindex', -1)
      .on('click search-result-click', function (e) {
        e.stopPropagation()

        const expandFlag = d3.select(e.target.parentElement).classed('expand')

        d3.selectAll('.blip-list__item-container.expand').classed('expand', false)
        d3.select(e.target.parentElement).classed('expand', !expandFlag)

        d3.selectAll('.blip-list__item-container__name').attr('aria-expanded', 'false')
        d3.select('.blip-list__item-container.expand .blip-list__item-container__name').attr('aria-expanded', 'true')

        if (window.innerWidth >= uiConfig.tabletViewWidth) {
          stickQuadrantOnScroll()
        }
      })

    blipItemContainer
      .append('span')
      .classed('blip-list__item-container__name-value', true)
      .text(`${blip.blipText()}. ${blip.name()}`)
    blipItemContainer.append('span').classed('blip-list__item-container__name-arrow', true)

    blipItemDiv
      .append('div')
      .classed('blip-list__item-container__description', true)
      .attr('id', `blip-description-${blip.id()}`)
      .html(blip.description())
  }
  const blipGraphItem = d3.select(`g a#blip-link-${removeAllSpaces(blip.id())}`)
  const mouseOver = function (e) {
    const targetElement = e.target.classList.contains('blip-link') ? e.target : e.target.parentElement
    const isGroupIdInGraph = !targetElement.classList.contains('blip-link') ? true : false
    const blipWrapper = d3.select(targetElement)
    const blipIdToFocus = blip.groupIdInGraph() ? blipWrapper.attr('data-group-id') : blipWrapper.attr('data-blip-id')
    const selectedBlipOnGraph = d3.select(`g > a.blip-link[data-blip-id='${blipIdToFocus}'`)
    highlightBlipInGraph(blipIdToFocus)
    highlightBlipInTable(blipTableItem)

    const isQuadrantView = d3.select('svg#radar-plot').classed('quadrant-view')
    const displayToolTip = blip.isGroup() ? !isQuadrantView : !blip.groupIdInGraph()
    const toolTipText = blip.isGroup() ? groupBlipTooltipText : blip.name()

    if (displayToolTip && !isGroupIdInGraph) {
      tip.show(toolTipText, selectedBlipOnGraph.node())

      const selectedBlipCoords = selectedBlipOnGraph.node().getBoundingClientRect()

      const tipElement = d3.select('div.d3-tip')
      const tipElementCoords = tipElement.node().getBoundingClientRect()

      tipElement
        .style(
          'left',
          `${parseInt(
            selectedBlipCoords.left + window.scrollX - tipElementCoords.width / 2 + selectedBlipCoords.width / 2,
          )}px`,
        )
        .style('top', `${parseInt(selectedBlipCoords.top + window.scrollY - tipElementCoords.height)}px`)
    }
  }

  const mouseOut = function () {
    d3.selectAll('g > a.blip-link').attr('opacity', 1.0)
    blipTableItem.classed('highlight', false)
    tip.hide().style('left', 0).style('top', 0)
  }

  const blipClick = function (e) {
    const isQuadrantView = d3.select('svg#radar-plot').classed('quadrant-view')
    const targetElement = e.target.classList.contains('blip-link') ? e.target : e.target.parentElement
    if (isQuadrantView) {
      e.stopPropagation()
    }

    const blipId = d3.select(targetElement).attr('data-blip-id')
    highlightBlipInGraph(blipId)

    d3.selectAll('.blip-list__item-container.expand').classed('expand', false)

    let selectedBlipContainer = d3.select(`.blip-list__item-container[data-blip-id="${blipId}"`)
    selectedBlipContainer.classed('expand', true)

    setTimeout(
      () => {
        if (window.innerWidth >= uiConfig.tabletViewWidth) {
          stickQuadrantOnScroll()
        }

        const isGroupBlip = isNaN(parseInt(blipId))
        if (isGroupBlip) {
          selectedBlipContainer = d3.select(`.blip-list__item-container[data-group-id="${blipId}"`)
        }
        const elementToFocus = selectedBlipContainer.select('button.blip-list__item-container__name')
        elementToFocus.node()?.scrollIntoView({
          behavior: 'smooth',
        })
      },
      isQuadrantView ? 0 : 1500,
    )
  }

  !groupBlipTooltipText &&
    blipTableItem.on('mouseover', mouseOver).on('mouseout', mouseOut).on('focusin', mouseOver).on('focusout', mouseOut)
  blipGraphItem
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
    const scale = getScale()
    let quadrantContainer
    if (window.innerWidth < uiConfig.tabletViewWidth && window.innerWidth >= uiConfig.mobileViewWidth) {
      quadrantContainer = quadrantTablesContainer
        .append('div')
        .classed('quadrant-table', true)
        .classed(quadrant.order, true)
        .style(
          'margin',
          `${
            graphConfig.quadrantHeight * scale +
            graphConfig.quadrantsGap * scale +
            graphConfig.quadrantsGap * 2 +
            uiConfig.legendsHeight
          }px auto 0px`,
        )
        .style('left', '0')
        .style('right', 0)
    } else {
      quadrantContainer = quadrantTablesContainer
        .append('div')
        .classed('quadrant-table', true)
        .classed(quadrant.order, true)
    }

    const ringNames = Array.from(
      new Set(
        quadrant.quadrant
          .blips()
          .map((blip) => blip.ring())
          .map((ring) => ring.name()),
      ),
    )
    ringNames.forEach(function (ringName) {
      quadrantContainer
        .append('h2')
        .classed('quadrant-table__ring-name', true)
        .attr('data-ring-name', ringName)
        .text(ringName)
      quadrantContainer
        .append('ul')
        .classed('blip-list', true)
        .attr('data-ring-order', rings.filter((ring) => ring.name() === ringName)[0].order())
    })
  })
}

module.exports = {
  renderQuadrantTables,
  renderBlipDescription,
}
