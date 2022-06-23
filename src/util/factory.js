const d3 = require('d3')
const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  capitalize: require('lodash/capitalize'),
  each: require('lodash/each'),
}

const InputSanitizer = require('./inputSanitizer')
const Radar = require('../models/radar')
const Quadrant = require('../models/quadrant')
const Ring = require('../models/ring')
const Blip = require('../models/blip')
const GraphingRadar = require('../graphing/radar')
const QueryParams = require('./queryParamProcessor')
const MalformedDataError = require('../exceptions/malformedDataError')
const SheetNotFoundError = require('../exceptions/sheetNotFoundError')
const ContentValidator = require('./contentValidator')
const ExceptionMessages = require('./exceptionMessages')

const plotRadar = function (title, blips, currentRadarName, alternativeRadars) {
  if (title.endsWith('.csv')) {
    title = title.substring(0, title.length - 4)
  }
  if (title.endsWith('.json')) {
    title = title.substring(0, title.length - 5)
  }
  document.title = title
  d3.selectAll('.loading').remove()

  var rings = _.map(_.uniqBy(blips, 'ring'), 'ring')
  var ringMap = {}
  var maxRings = 4

  _.each(rings, function (ringName, i) {
    if (i === maxRings) {
      throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS)
    }
    ringMap[ringName] = new Ring(ringName, i)
  })

  var quadrants = {}
  _.each(blips, function (blip) {
    if (!quadrants[blip.quadrant]) {
      quadrants[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant))
    }
    quadrants[blip.quadrant].add(
      new Blip(blip.name, ringMap[blip.ring], blip.isNew.toLowerCase() === 'true', blip.topic, blip.description),
    )
  })

  var radar = new Radar()
  _.each(quadrants, function (quadrant) {
    radar.addQuadrant(quadrant)
  })

  if (alternativeRadars !== undefined || true) {
    alternativeRadars.forEach(function (sheetName) {
      radar.addAlternative(sheetName)
    })
  }

  if (currentRadarName !== undefined || true) {
    radar.setCurrentSheet(currentRadarName)
  }

  var size = window.innerHeight - 133 < 620 ? 620 : window.innerHeight - 133

  new GraphingRadar(size, radar).init().plot()
}

const CSVDocument = function (url) {
  var self = {}

  self.build = function () {
    d3.csv(url).then(createBlips)
  }

  var createBlips = function (data) {
    try {
      var columnNames = data.columns
      delete data.columns
      var contentValidator = new ContentValidator(columnNames)
      contentValidator.verifyContent()
      contentValidator.verifyHeaders()
      var blips = _.map(data, new InputSanitizer().sanitize)
      plotRadar(FileName(url), blips, 'CSV File', [])
    } catch (exception) {
      plotErrorMessage(exception)
    }
  }

  self.init = function () {
    plotLoading()
    return self
  }

  return self
}

const FileName = function (url) {
  var search = /([^\\/]+)$/
  var match = search.exec(decodeURIComponent(url.replace(/\+/g, ' ')))

  if (match != null) {
    return match[1]
  }

  return url
}

const GoogleSheetInput = function () {
  var self = {}
  var sheet

  self.build = function () {
    var queryString = window.location.href.match(/sheetId(.*)/)
    var queryParams = queryString ? QueryParams(queryString[0]) : {}

    sheet = CSVDocument(queryParams.sheetId)
    sheet.init().build()
  }

  return self
}

function plotLoading() {
  document.querySelector('.helper-description .loader-text').style.display = 'block'
}

function plotErrorMessage(exception) {
  showErrorMessage(exception)
}

function plotError(exception, container) {
  let message = "Oops! We can't find the Google Sheet you've entered"
  let faqMessage =
    'Please check <a href="https://www.thoughtworks.com/radar/how-to-byor">FAQs</a> for possible solutions.'
  if (exception instanceof MalformedDataError) {
    message = message.concat(exception.message)
  } else if (exception instanceof SheetNotFoundError) {
    message = exception.message
  } else {
    console.error(exception)
  }
  container = container.append('div').attr('class', 'error-container')
  const errorContainer = container.append('div').attr('class', 'error-container__message')
  errorContainer.append('div').append('p').html(message)
  errorContainer.append('div').append('p').html(faqMessage)

  let homePageURL = window.location.protocol + '//' + window.location.hostname
  homePageURL += window.location.port === '' ? '' : ':' + window.location.port
  const homePage = '<a href=' + homePageURL + '>GO BACK</a>'

  errorContainer.append('div').append('p').html(homePage)
}

function showErrorMessage(exception) {
  document.querySelector('.helper-description .loader-text').style.display = 'none'
  const container = d3.select('main').append('div').attr('class', 'error-container')
  plotError(exception, container)
}

module.exports = GoogleSheetInput
