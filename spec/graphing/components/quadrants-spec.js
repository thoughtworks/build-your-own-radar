const { wrapQuadrantNameInMultiLine } = require('../../../src/graphing/components/quadrants')
jest.mock('d3', () => {
  return {
    select: jest.fn(),
  }
})

describe('Quadrants', function () {
  let element, mockedD3Element, quadrantGroup, tip
  beforeEach(() => {
    document.body.innerHTML = '<div id="my-elem">' + '</div>'

    window.Element.prototype.getBoundingClientRect = function () {
      return {
        x: 0,
        y: 0,
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: this.textContent.length * 10,
      }
    }
    element = document.querySelector('#my-elem')
    mockedD3Element = { node: () => element }
    quadrantGroup = { on: jest.fn() }
    tip = { show: jest.fn(), hide: jest.fn() }
  })

  it('should render the text in one line if length is not above the max length', function () {
    element.innerHTML = 'Tools'
    wrapQuadrantNameInMultiLine(mockedD3Element, false, quadrantGroup, tip)
    let expectedTSpanTags = element.querySelectorAll('tspan')
    expect(expectedTSpanTags).toHaveLength(1)
    expect(expectedTSpanTags[0].textContent).toEqual('Tools')
    expect(expectedTSpanTags[0].getAttribute('dy')).toBeNull()
  })

  it('should render the text in two lines if length is above the max length', function () {
    element.innerHTML = 'Languages & Frameworks'
    wrapQuadrantNameInMultiLine(mockedD3Element, false, quadrantGroup, tip)
    let expectedTSpanTags = element.querySelectorAll('tspan')
    expect(expectedTSpanTags).toHaveLength(2)
    expect(expectedTSpanTags[0].textContent).toEqual('Languages & ')
    expect(expectedTSpanTags[1].textContent).toEqual('Frameworks')
    expect(expectedTSpanTags[0].getAttribute('dy')).toBe('-20')
    expect(expectedTSpanTags[1].getAttribute('dy')).toBe('20')
  })

  it('should split the first word by hyphen and render the text in two lines if its longer than max length', function () {
    element.innerHTML = 'Pneumonoultramicroscopic'
    wrapQuadrantNameInMultiLine(mockedD3Element, false, quadrantGroup, tip)
    let expectedTSpanTags = element.querySelectorAll('tspan')
    expect(expectedTSpanTags).toHaveLength(2)
    expect(expectedTSpanTags[0].textContent).toEqual('Pneumonoultram-')
    expect(expectedTSpanTags[1].textContent).toEqual('icroscopic ')
    expect(expectedTSpanTags[0].getAttribute('dy')).toBe('-20')
    expect(expectedTSpanTags[1].getAttribute('dy')).toBe('20')
  })

  it('should split the first word by hyphen and render the text in two lines with ellipsis if its longer than max length after splitting also', function () {
    element.innerHTML = 'Pneumonoultramicro scopicsilicovolcanoconiosis'
    wrapQuadrantNameInMultiLine(mockedD3Element, false, quadrantGroup, tip)
    let expectedTSpanTags = element.querySelectorAll('tspan')
    expect(expectedTSpanTags).toHaveLength(2)
    expect(expectedTSpanTags[0].textContent).toEqual('Pneumonoultram-')
    expect(expectedTSpanTags[1].textContent).toEqual('icro scopics...')
    expect(expectedTSpanTags[0].getAttribute('dy')).toBe('-20')
    expect(expectedTSpanTags[1].getAttribute('dy')).toBe('20')
  })

  it('should render the text in two lines with ellipsis if its longer than max length', function () {
    element.innerHTML = 'Pneumonoultra microscopicsilicovolcanoconiosis'
    wrapQuadrantNameInMultiLine(mockedD3Element, false, quadrantGroup, tip)
    let expectedTSpanTags = element.querySelectorAll('tspan')
    expect(expectedTSpanTags).toHaveLength(2)
    expect(expectedTSpanTags[0].textContent).toEqual('Pneumonoultra ')
    expect(expectedTSpanTags[1].textContent).toEqual('microscopics...')
    expect(expectedTSpanTags[0].getAttribute('dy')).toBe('-20')
    expect(expectedTSpanTags[1].getAttribute('dy')).toBe('20')
  })
})
