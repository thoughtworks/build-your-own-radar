const Blip = require('../../src/models/blip')
const Ring = require('../../src/models/ring')

describe('Blip', function () {
  var blip

  beforeEach(function () {
    blip = new Blip('My Blip', new Ring('My Ring'))
  })

  it('has a name', function () {
    expect(blip.name()).toEqual('My Blip')
  })

  it('has a ring', function () {
    expect(blip.ring().name()).toEqual('My Ring')
  })

  it('has a default number', function () {
    expect(blip.number()).toEqual(-1)
  })

  it('sets the number', function () {
    blip.setNumber(1)
    expect(blip.number()).toEqual(1)
  })

  it('is new', function () {
    blip = new Blip('My Blip', new Ring('My Ring'), true)

    expect(blip.isNew()).toBe(true)
  })

  it('is not new', function () {
    blip = new Blip('My Blip', new Ring('My Ring'), false)

    expect(blip.isNew()).toBe(false)
  })
})
