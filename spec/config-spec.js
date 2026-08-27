const config = require('../src/config')

describe('Config Test', () => {
  it('should return all env when no env defined', () => {
    const actual = config()
    expect(actual).toStrictEqual({
      production: { featureToggles: { normalizeRingNameHoldToCaution: true } },
      development: { featureToggles: { normalizeRingNameHoldToCaution: true } },
    })
  })

  it('should return the given env', () => {
    const oldEnv = process.env
    process.env.ENVIRONMENT = 'development'
    const actual = config()
    expect(actual).toStrictEqual({
      featureToggles: { normalizeRingNameHoldToCaution: true },
    })

    process.env = oldEnv
  })
})
