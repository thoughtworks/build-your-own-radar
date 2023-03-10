function getElementWidth(element) {
  return element.node().getBoundingClientRect().width
}

function getElementHeight(element) {
  return element.node().getBoundingClientRect().height
}

module.exports = {
  getElementWidth,
  getElementHeight,
}
