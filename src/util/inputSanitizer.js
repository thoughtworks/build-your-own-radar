const sanitizeHtml = require('sanitize-html')
const _ = {
  forOwn: require('lodash/forOwn'),
}

const InputSanitizer = function () {
  var relaxedOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'br', 'p', 'u'],
    allowedAttributes: {
      a: ['href'],
    },
  }

  var restrictedOptions = {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: function (text) {
      return text.replace(/&amp;/, '&')
    },
  }

  function trimWhiteSpaces(blip) {
    var processedBlip = {}
    _.forOwn(blip, function (value, key) {
      processedBlip[key.trim()] = value.trim()
    })
    return processedBlip
  }

  var self = {}
  self.sanitize = function (rawBlip) {
    var blip = trimWhiteSpaces(rawBlip)
    blip.description = sanitizeHtml(blip.description, relaxedOptions)
    blip.name = sanitizeHtml(blip.name, restrictedOptions)
    blip.isNew = sanitizeHtml(blip.isNew, restrictedOptions)
    blip.ring = sanitizeHtml(blip.ring, restrictedOptions)
    blip.quadrant = sanitizeHtml(blip.quadrant, restrictedOptions)
    blip.pros = sanitizeHtml(blip.pros, relaxedOptions)
    blip.cons = sanitizeHtml(blip.cons, relaxedOptions)
    blip.usedBy = sanitizeHtml(blip.usedBy, relaxedOptions)

    return blip
  }

  self.sanitizeForProtectedSheet = function (rawBlip, header) {
    var blip = trimWhiteSpaces(rawBlip)

    const descriptionIndex = header.indexOf('description')
    const nameIndex = header.indexOf('name')
    const isNewIndex = header.indexOf('isNew')
    const quadrantIndex = header.indexOf('quadrant')
    const ringIndex = header.indexOf('ring')
    const prosIndex = header.indexOf('pros')
    const consIndex = header.indexOf('cons')
    const usedByIndex = header.indexOf('usedBy')

    const description = descriptionIndex === -1 ? '' : blip[descriptionIndex]
    const name = nameIndex === -1 ? '' : blip[nameIndex]
    const isNew = isNewIndex === -1 ? '' : blip[isNewIndex]
    const ring = ringIndex === -1 ? '' : blip[ringIndex]
    const quadrant = quadrantIndex === -1 ? '' : blip[quadrantIndex]
    const pros = prosIndex === -1 ? '' : blip[prosIndex]
    const cons = consIndex === -1 ? '' : blip[consIndex]
    const usedBy = usedByIndex === -1 ? '' : blip[usedByIndex]

    blip.description = sanitizeHtml(description, relaxedOptions)
    blip.name = sanitizeHtml(name, restrictedOptions)
    blip.isNew = sanitizeHtml(isNew, restrictedOptions)
    blip.ring = sanitizeHtml(ring, restrictedOptions)
    blip.quadrant = sanitizeHtml(quadrant, restrictedOptions)
    blip.cons = sanitizeHtml(cons, relaxedOptions)
    blip.pros = sanitizeHtml(pros, relaxedOptions)
    blip.usedBy = sanitizeHtml(usedBy, relaxedOptions)

    return blip
  }

  return self
}

module.exports = InputSanitizer
