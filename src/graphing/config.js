const graphConfig = {
  quadrantHeight: 512,
  quadrantWidth: 512,
  quadrantsGap: 32,
  minBlipWidth: 12,
  blipWidth: 22,
  blipFontSize: '14px',
}

function getGraphSize() {
  return graphConfig.quadrantHeight + graphConfig.quadrantWidth + graphConfig.quadrantsGap
}

module.exports = { graphConfig, getGraphSize }
