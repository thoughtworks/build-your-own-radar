const quadrantSize = 512
const quadrantGap = 32

const graphConfig = {
  quadrantHeight: quadrantSize + quadrantGap / 2,
  quadrantWidth: quadrantSize + quadrantGap / 2,
  effectiveQuadrantHeight: quadrantSize,
  effectiveQuadrantWidth: quadrantSize,
  quadrantsGap: quadrantGap,
  minBlipWidth: 12,
  blipWidth: 22,
  blipFontSize: '14px',
}

function getScale() {
  return window.innerWidth < 1800 ? 1.25 : 1.5
}

function getGraphSize() {
  return graphConfig.quadrantHeight + graphConfig.quadrantWidth
}

function getScaledQuadrantWidth(scale) {
  return graphConfig.effectiveQuadrantWidth * scale
}

function getScaledQuadrantWidthWithGap(scale) {
  return (graphConfig.effectiveQuadrantWidth + graphConfig.quadrantsGap) * scale
}

function getScaledQuadrantHeight(scale) {
  return graphConfig.effectiveQuadrantHeight * scale
}

function getScaledQuadrantHeightWithGap(scale) {
  return (graphConfig.effectiveQuadrantHeight + graphConfig.quadrantsGap) * scale
}

module.exports = {
  graphConfig,
  getScale,
  getGraphSize,
  getScaledQuadrantWidth,
  getScaledQuadrantWidthWithGap,
  getScaledQuadrantHeight,
  getScaledQuadrantHeightWithGap,
}
