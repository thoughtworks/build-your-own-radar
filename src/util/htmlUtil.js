function getElementWidth(element) {
  return element.node().getBoundingClientRect().width
}

function decodeHTML(encodedText) {
  const parser = new DOMParser()
  return parser.parseFromString(encodedText, 'text/html').body.textContent
}

function getElementHeight(element) {
  return element.node().getBoundingClientRect().height
}

module.exports = {
  getElementWidth,
  getElementHeight,
  decodeHTML,
}
