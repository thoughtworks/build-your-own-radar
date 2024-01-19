const Radar = require('../../src/models/radar')
const Quadrant = require('../../src/models/quadrant')
const Ring = require('../../src/models/ring')
const Blip = require('../../src/models/blip')
const MalformedDataError = require('../../src/exceptions/malformedDataError')
const ExceptionMessages = require('../../src/util/exceptionMessages')
const { graphConfig } = require('../../src/graphing/config')

describe('Radar', function () {
  beforeEach(() => {
    process.env.ENVIRONMENT = 'development'
  })

  it('has no quadrants by default', function () {
    var radar = new Radar()

    expect(radar.quadrants()[0].quadrant).not.toBeDefined()
    expect(radar.quadrants()[1].quadrant).not.toBeDefined()
    expect(radar.quadrants()[2].quadrant).not.toBeDefined()
    expect(radar.quadrants()[3].quadrant).not.toBeDefined()
  })

  it('sets the first quadrant', function () {
    var quadrant, radar, blip

    blip = new Blip('A', new Ring('First'))
    quadrant = new Quadrant('First')
    quadrant.add([blip])
    radar = new Radar()

    radar.addQuadrant(quadrant)

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant)
    expect(radar.quadrants()[0].quadrant.blips()[0].blipText()).toEqual(1)
  })

  it('sets the second quadrant', function () {
    var quadrant, radar, blip

    blip = new Blip('A', new Ring('First'))
    quadrant = new Quadrant('Second')
    quadrant.add([blip])
    radar = new Radar()

    radar.addQuadrant(quadrant)

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant)
    expect(radar.quadrants()[0].quadrant.blips()[0].blipText()).toEqual(1)
  })

  it('sets the third quadrant', function () {
    var quadrant, radar, blip

    blip = new Blip('A', new Ring('First'))
    quadrant = new Quadrant('Third')
    quadrant.add([blip])
    radar = new Radar()

    radar.addQuadrant(quadrant)

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant)
    expect(radar.quadrants()[0].quadrant.blips()[0].blipText()).toEqual(1)
  })

  it('sets the fourth quadrant', function () {
    var quadrant, radar, blip

    blip = new Blip('A', new Ring('First'))
    quadrant = new Quadrant('Fourth')
    quadrant.add([blip])
    radar = new Radar()

    radar.addQuadrant(quadrant)

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant)
    expect(radar.quadrants()[0].quadrant.blips()[0].blipText()).toEqual(1)
  })

  it('sets the current sheet', function () {
    const radar = new Radar()
    let sheetName = 'The current sheet'
    radar.setCurrentSheet(sheetName)
    expect(radar.getCurrentSheet()).toEqual(sheetName)
  })

  it('throws an error if too many quadrants are added', function () {
    var quadrant, radar, blip

    blip = new Blip('A', new Ring('First'))
    quadrant = new Quadrant('First')
    quadrant.add([blip])
    radar = new Radar()

    radar.addQuadrant(quadrant)
    radar.addQuadrant(new Quadrant('Second'))
    radar.addQuadrant(new Quadrant('Third'))
    radar.addQuadrant(new Quadrant('Fourth'))

    expect(function () {
      radar.addQuadrant(new Quadrant('Fifth'))
    }).toThrow(new MalformedDataError(ExceptionMessages.TOO_MANY_QUADRANTS))
  })

  describe('blip numbers', function () {
    var firstQuadrant, secondQuadrant, radar, firstRing

    beforeEach(function () {
      firstRing = new Ring('Adopt', 0)
      firstQuadrant = new Quadrant('First')
      secondQuadrant = new Quadrant('Second')
      firstQuadrant.add([new Blip('A', firstRing), new Blip('B', firstRing)])
      secondQuadrant.add([new Blip('C', firstRing), new Blip('D', firstRing)])
      radar = new Radar()
    })

    it('sets blip numbers starting on the first quadrant', function () {
      radar.addQuadrant(firstQuadrant)

      expect(radar.quadrants()[0].quadrant.blips()[0].blipText()).toEqual(1)
      expect(radar.quadrants()[0].quadrant.blips()[1].blipText()).toEqual(2)
    })

    it('continues the number from the previous quadrant set', function () {
      radar.addQuadrant(firstQuadrant)
      radar.addQuadrant(secondQuadrant)

      expect(radar.quadrants()[1].quadrant.blips()[0].blipText()).toEqual(3)
      expect(radar.quadrants()[1].quadrant.blips()[1].blipText()).toEqual(4)
    })
  })

  describe('alternatives', function () {
    it('returns a provided alternatives', function () {
      var radar = new Radar()

      var alternative1 = 'alternative1'
      var alternative2 = 'alternative2'

      radar.addAlternative(alternative1)
      radar.addAlternative(alternative2)

      expect(radar.getAlternatives()).toEqual([alternative1, alternative2])
    })
  })

  describe('rings : new UI', function () {
    let quadrant,
      radar,
      firstRing,
      secondRing,
      otherQuadrant,
      thirdRing,
      fourthRing,
      invalidRing,
      rings = []

    beforeEach(function () {
      process.env.ENVIRONMENT = 'development'
      firstRing = new Ring('hold', 0)
      secondRing = new Ring('ADOPT', 1)
      thirdRing = new Ring('TRiAl', 2)
      fourthRing = new Ring('assess', 3)
      invalidRing = new Ring('invalid', 3)
      quadrant = new Quadrant('Fourth')
      otherQuadrant = new Quadrant('Other')
      radar = new Radar()
      graphConfig.rings.forEach((ring, index) => rings.push(new Ring(ring, index)))
      radar.addRings(rings)
    })

    it('returns an array of rings in configured order and ignore the order in which blips are provided', function () {
      quadrant.add([
        new Blip('A', firstRing),
        new Blip('B', secondRing),
        new Blip('C', thirdRing),
        new Blip('D', fourthRing),
      ])

      radar.addQuadrant(quadrant)
      radar.addQuadrant(otherQuadrant)
      radar.addQuadrant(otherQuadrant)
      radar.addQuadrant(otherQuadrant)

      expect(radar.rings()[0].name().toLowerCase()).toEqual(secondRing.name().toLowerCase())
      expect(radar.rings()[1].name().toLowerCase()).toEqual(thirdRing.name().toLowerCase())
      expect(radar.rings()[2].name().toLowerCase()).toEqual(fourthRing.name().toLowerCase())
      expect(radar.rings()[3].name().toLowerCase()).toEqual(firstRing.name().toLowerCase())
    })

    it('should not return invalid rings other than the configured ones', function () {
      quadrant.add([new Blip('A', firstRing), new Blip('E', invalidRing)])

      radar.addQuadrant(quadrant)

      expect(radar.rings()[3].name().toLowerCase()).toEqual(firstRing.name().toLowerCase())
      expect(
        radar
          .rings()
          .map((ring) => ring.name().toLowerCase())
          .includes(invalidRing.name().toLowerCase()),
      ).toBe(false)
    })
  })
})
