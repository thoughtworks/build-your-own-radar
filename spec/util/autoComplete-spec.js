const { normalizeText } = require('../../src/util/textNormalizer')

describe('autoComplete', () => {
  describe('normalizeText', () => {
    it('should convert text to lowercase', () => {
      expect(normalizeText('HELLO WORLD')).toBe('hello world')
      expect(normalizeText('Test Case')).toBe('test case')
    })

    it('should remove Portuguese accents', () => {
      expect(normalizeText('Autorização')).toBe('autorizacao')
      expect(normalizeText('Experiência')).toBe('experiencia')
      expect(normalizeText('ação')).toBe('acao')
      expect(normalizeText('coração')).toBe('coracao')
    })

    it('should remove Spanish accents', () => {
      expect(normalizeText('señor')).toBe('senor')
      expect(normalizeText('niño')).toBe('nino')
      expect(normalizeText('mañana')).toBe('manana')
    })

    it('should remove French accents', () => {
      expect(normalizeText('café')).toBe('cafe')
      expect(normalizeText('résumé')).toBe('resume')
      expect(normalizeText('naïve')).toBe('naive')
      expect(normalizeText('façade')).toBe('facade')
    })

    it('should remove German umlauts', () => {
      expect(normalizeText('über')).toBe('uber')
      expect(normalizeText('Mädchen')).toBe('madchen')
      expect(normalizeText('schön')).toBe('schon')
    })

    it('should handle mixed accented and non-accented text', () => {
      expect(normalizeText('Continuous Delivery práticas')).toBe('continuous delivery praticas')
      expect(normalizeText('Test Automation técnicas')).toBe('test automation tecnicas')
    })

    it('should preserve text without accents', () => {
      expect(normalizeText('hello world')).toBe('hello world')
      expect(normalizeText('Kubernetes')).toBe('kubernetes')
      expect(normalizeText('React.js')).toBe('react.js')
    })

    it('should handle empty string', () => {
      expect(normalizeText('')).toBe('')
    })

    it('should handle numbers and special characters', () => {
      expect(normalizeText('Test123!')).toBe('test123!')
      expect(normalizeText('hello@world.com')).toBe('hello@world.com')
    })
  })
})
