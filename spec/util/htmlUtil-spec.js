const { getElementWidth, getElementHeight, decodeHTML } = require('../../src/util/htmlUtil')

describe('HTML Utils', () => {
  let mockWidth, mockHeight, mockD3Element

  beforeEach(() => {
    mockWidth = 10
    mockHeight = 10

    mockD3Element = {
      node: function () {
        return {
          getBoundingClientRect: function () {
            return {
              width: mockWidth,
              height: mockHeight,
            }
          },
        }
      },
    }
  })

  it('should return width of D3 element', () => {
    expect(getElementWidth(mockD3Element)).toEqual(mockWidth)
  })

  it('should return height of D3 element', () => {
    expect(getElementHeight(mockD3Element)).toEqual(mockHeight)
  })

  it('should decode encoded HTML entity', () => {
    expect(decodeHTML('&lt;&gt;&amp;&quot;&apos;')).toEqual(`<>&"'`)
  })
})
