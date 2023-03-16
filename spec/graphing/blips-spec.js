const { calculateRadarBlipCoordinates } = require('../../src/graphing/blips')
const Chance = require('chance')
const { graphConfig } = require('../../src/graphing/config')
jest.mock('d3', () => {
  return {
    select: jest.fn(),
  }
})

const chance = Chance()
const chanceFloatingSpy = jest.spyOn(chance, 'floating')
const chanceIntegerSpy = jest
  .spyOn(chance, 'integer')
  .mockImplementationOnce((options) => {
    return options.max
  })
  .mockImplementation((options) => {
    return options.min
  })
describe('Blips', function () {
  it('should return coordinates which fall under the first quadrant and rings provided', function () {
    const startAngle = 0
    let minRadius = 160
    const maxRadius = 300
    const coordinates = calculateRadarBlipCoordinates(minRadius, maxRadius, startAngle, 'first', chance, { width: 22 })

    const minRadiusAfterThreshold = minRadius + graphConfig.blipWidth / 2
    const maxRadiusAfterThreshold = maxRadius - graphConfig.blipWidth
    const xCoordMaxValue =
      graphConfig.effectiveQuadrantWidth + maxRadiusAfterThreshold * -1 * 0.9978403633398593 + graphConfig.blipWidth
    const yCoordMaxValue = graphConfig.effectiveQuadrantHeight + maxRadiusAfterThreshold * -1 * 0.06568568557743505
    const xCoordMinValue = graphConfig.effectiveQuadrantWidth + minRadiusAfterThreshold * -1 * 0.9942914830326867
    const yCoordMinValue =
      graphConfig.effectiveQuadrantHeight + minRadiusAfterThreshold * -1 * 0.9942914830326867 - graphConfig.blipWidth

    expect(chanceFloatingSpy).toHaveBeenCalledWith({
      min: minRadiusAfterThreshold,
      max: maxRadiusAfterThreshold,
      fixed: 4,
    })
    expect(chanceIntegerSpy).toHaveBeenCalled()
    expect(parseFloat(coordinates[0].toFixed(3))).toBeLessThanOrEqual(parseFloat(xCoordMinValue.toFixed(3)))
    expect(parseFloat(coordinates[1].toFixed(1))).toBeGreaterThanOrEqual(parseFloat(yCoordMinValue.toFixed(1)))
    expect(parseFloat(coordinates[0].toFixed(3))).toBeLessThanOrEqual(parseFloat(xCoordMaxValue.toFixed(3)))
    expect(parseFloat(coordinates[1].toFixed(3))).toBeLessThanOrEqual(parseFloat(yCoordMaxValue.toFixed(3)))
  })

  it('should return coordinates for the second quadrant and consider the border offset provided', function () {
    const startAngle = -90
    let minRadius = 160
    const maxRadius = 300
    const blipWidth = 22
    const coordinates = calculateRadarBlipCoordinates(minRadius, maxRadius, startAngle, 'second', chance, {
      width: blipWidth,
    })

    const minRadiusAfterThreshold = minRadius + blipWidth / 2
    const maxRadiusAfterThreshold = maxRadius - blipWidth
    const xCoordMaxValue =
      graphConfig.quadrantWidth + maxRadiusAfterThreshold * -1 * 0.0707372016677029 + graphConfig.quadrantsGap + 10
    const yCoordMaxValue =
      graphConfig.quadrantHeight + maxRadiusAfterThreshold * 0.9999 * 0.27563735581699916 + graphConfig.quadrantsGap
    const xCoordMinValue =
      graphConfig.quadrantWidth + minRadiusAfterThreshold * -1 * 0.9942914830326867 + graphConfig.quadrantsGap + 10
    const yCoordMinValue =
      graphConfig.quadrantHeight + minRadiusAfterThreshold * 0.9999 * 0.10670657355889696 + graphConfig.quadrantsGap

    expect(chanceFloatingSpy).toHaveBeenCalledWith({
      min: minRadiusAfterThreshold,
      max: maxRadiusAfterThreshold,
      fixed: 4,
    })
    expect(chanceIntegerSpy).toHaveBeenCalled()
    expect(parseFloat(coordinates[0].toFixed(3))).toBeLessThanOrEqual(parseFloat(xCoordMinValue.toFixed(3)))
    expect(coordinates[1]).toBeGreaterThan(yCoordMinValue)
    expect(coordinates[0]).toBeLessThan(xCoordMaxValue)
    expect(coordinates[1]).toBeLessThan(yCoordMaxValue)
  })
})
