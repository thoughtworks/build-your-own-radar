const quadrantSize = 512
const quadrantGap = 32

const graphConfig = {
  effectiveQuadrantHeight: quadrantSize + quadrantGap / 2,
  effectiveQuadrantWidth: quadrantSize + quadrantGap / 2,
  quadrantHeight: quadrantSize,
  quadrantWidth: quadrantSize,
  quadrantsGap: quadrantGap,
  minBlipWidth: 12,
  blipWidth: 22,
  rings: ['Adopt', 'Trial', 'Assess', 'Hold'],
  quadrants: ['Techniques', 'Platforms', 'Tools', 'Languages & Frameworks'],
}

const uiConfig = {
  subnavHeight: 60,
  bannerHeight: 200,
  tabletBannerHeight: 300,
  headerHeight: 80,
  legendsHeight: 42,
  tabletViewWidth: 1280,
  mobileViewWidth: 768,
}

function getScale() {
  return window.innerWidth < 1800 ? 1.25 : 1.5
}

function getGraphSize() {
  return graphConfig.effectiveQuadrantHeight + graphConfig.effectiveQuadrantWidth
}

function getScaledQuadrantWidth(scale) {
  return graphConfig.quadrantWidth * scale
}

function getScaledQuadrantWidthWithGap(scale) {
  return (graphConfig.quadrantWidth + graphConfig.quadrantsGap) * scale
}

function getScaledQuadrantHeight(scale) {
  return graphConfig.quadrantHeight * scale
}

function getScaledQuadrantHeightWithGap(scale) {
  return (graphConfig.quadrantHeight + graphConfig.quadrantsGap) * scale
}

module.exports = {
  graphConfig,
  uiConfig,
  getScale,
  getGraphSize,
  getScaledQuadrantWidth,
  getScaledQuadrantWidthWithGap,
  getScaledQuadrantHeight,
  getScaledQuadrantHeightWithGap,
}
