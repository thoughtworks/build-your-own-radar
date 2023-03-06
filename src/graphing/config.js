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

function getGraphSize() {
  return graphConfig.quadrantHeight + graphConfig.quadrantWidth
}

module.exports = { graphConfig, getGraphSize }
