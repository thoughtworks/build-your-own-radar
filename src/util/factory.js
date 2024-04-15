/* eslint no-constant-condition: "off" */

const d3 = require('d3')
const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  each: require('lodash/each'),
}

const InputSanitizer = require('./inputSanitizer')
const Radar = require('../models/radar')
const Quadrant = require('../models/quadrant')
const Ring = require('../models/ring')
const Blip = require('../models/blip')
const GraphingRadar = require('../graphing/radar')
const MalformedDataError = require('../exceptions/malformedDataError')
const SheetNotFoundError = require('../exceptions/sheetNotFoundError')
const ContentValidator = require('./contentValidator')
const Sheet = require('./sheet')
const ExceptionMessages = require('./exceptionMessages')
const GoogleAuth = require('./googleAuth')
const { getDocumentOrSheetId, getSheetName } = require('./urlUtils')
const { getGraphSize, graphConfig, isValidConfig } = require('../graphing/config')
const InvalidConfigError = require('../exceptions/invalidConfigError')
const InvalidContentError = require('../exceptions/invalidContentError')
const FileNotFoundError = require('../exceptions/fileNotFoundError')

function validateInputQuadrantOrRingName(allQuadrantsOrRings, quadrantOrRing) {
  const quadrantOrRingNames = Object.keys(allQuadrantsOrRings)
  const regexToFixLanguagesAndFrameworks = /(-|\s+)(and)(-|\s+)|\s*(&)\s*/g
  const formattedInputQuadrant = quadrantOrRing.toLowerCase().replace(regexToFixLanguagesAndFrameworks, ' & ')
  return quadrantOrRingNames.find((quadrantOrRing) => quadrantOrRing.toLowerCase() === formattedInputQuadrant)
}

const plotRadarGraph = function (title, blips, currentRadarName, alternativeRadars) {
  document.title = title.replace(/.(csv|json)$/, '')

  d3.selectAll('.loading').remove()

  const ringMap = graphConfig.rings.reduce((allRings, ring, index) => {
    allRings[ring] = new Ring(ring, index)
    return allRings
  }, {})

  const quadrants = graphConfig.quadrants.reduce((allQuadrants, quadrant) => {
    allQuadrants[quadrant] = new Quadrant(quadrant)
    return allQuadrants
  }, {})

  blips.forEach((blip) => {
    const currentQuadrant = validateInputQuadrantOrRingName(quadrants, blip.quadrant)
    const ring = validateInputQuadrantOrRingName(ringMap, blip.ring)
    if (currentQuadrant && ring) {
      const blipObj = new Blip(
        blip.name,
        ringMap[ring],
        blip.isNew.toLowerCase() === 'true',
        blip.topic,
        blip.description,
      )
      quadrants[currentQuadrant].add(blipObj)
    }
  })

  const radar = new Radar()
  radar.addRings(Object.values(ringMap))

  _.each(quadrants, function (quadrant) {
    radar.addQuadrant(quadrant)
  })

  alternativeRadars.forEach(function (sheetName) {
    radar.addAlternative(sheetName)
  })

  radar.setCurrentSheet(currentRadarName)

  const size = getGraphSize()
  new GraphingRadar(size, radar).init().plot()
}

const GoogleSheet = function (sheetReference, sheetName) {
  var self = {}

  self.build = function () {
    var sheet = new Sheet(sheetReference)
    sheet.validate(function (error, apiKeyEnabled) {
      if (error instanceof SheetNotFoundError) {
        plotErrorMessage(error)
        return
      }

      self.authenticate(false, apiKeyEnabled)
    })
  }

  function createBlipsForProtectedSheet(documentTitle, values, sheetNames) {
    if (!sheetName) {
      sheetName = sheetNames[0]
    }
    values.forEach(function () {
      var contentValidator = new ContentValidator(values[0])
      contentValidator.verifyContent()
      contentValidator.verifyHeaders()
    })

    const all = values
    const header = all.shift()
    var blips = _.map(all, (blip) => new InputSanitizer().sanitizeForProtectedSheet(blip, header))
    const title = documentTitle

    plotRadarGraph(title, blips, sheetName, sheetNames)
  }

  self.authenticate = function (force = false, apiKeyEnabled, callback) {
    GoogleAuth.loadGoogle(force, async function () {
      self.error = false
      const sheet = new Sheet(sheetReference)
      await sheet.getSheet()
      if (sheet.sheetResponse.status === 403 && !GoogleAuth.gsiInitiated && !force) {
        // private sheet
        GoogleAuth.loadGSI()
      } else {
        await sheet.processSheetResponse(sheetName, createBlipsForProtectedSheet, (error) => {
          if (error.status === 403) {
            self.error = true
            plotUnauthorizedErrorMessage()
          } else if (error instanceof MalformedDataError) {
            plotErrorMessage(error)
          } else {
            plotErrorMessage(sheet.createSheetNotFoundError())
          }
        })
        if (callback) {
          callback()
        }
      }
    })
  }

  self.init = function () {
    plotLoading()
    return self
  }

  return self
}

const CSVDocument = function (url) {
  var self = {}

  self.build = function () {
    d3.csv(url)
      .then(createBlips)
      .catch(() => {
        const fileNotFoundError = new FileNotFoundError(`Oops! We can't find the CSV file you've entered`)
        plotErrorMessage(fileNotFoundError)
      })
  }

  var createBlips = function (data) {
    try {
      var columnNames = data.columns
      delete data.columns
      var contentValidator = new ContentValidator(columnNames)
      contentValidator.verifyContent()
      contentValidator.verifyHeaders()
      var blips = _.map(data, new InputSanitizer().sanitize)
      plotRadarGraph(FileName(url), blips, 'CSV File', [])
    } catch (exception) {
      const invalidContentError = new InvalidContentError(ExceptionMessages.INVALID_CSV_CONTENT)
      plotErrorMessage(invalidContentError)
    }
  }

  self.init = function () {
    plotLoading()
    return self
  }

  return self
}

const JSONFile = function (url) {
  var self = {}

  self.build = function () {
    d3.json(url)
      .then(createBlips)
      .catch(() => {
        const fileNotFoundError = new FileNotFoundError(`Oops! We can't find the JSON file you've entered`)
        plotErrorMessage(fileNotFoundError)
      })
  }

  var createBlips = function (data) {
    try {
      var columnNames = Object.keys(data[0])
      var contentValidator = new ContentValidator(columnNames)
      contentValidator.verifyContent()
      contentValidator.verifyHeaders()
      var blips = _.map(data, new InputSanitizer().sanitize)
      plotRadarGraph(FileName(url), blips, 'JSON File', [])
    } catch (exception) {
      const invalidContentError = new InvalidContentError(ExceptionMessages.INVALID_JSON_CONTENT)
      plotErrorMessage(invalidContentError)
    }
  }

  self.init = function () {
    plotLoading()
    return self
  }

  return self
}

const DomainName = function (url) {
  var search = /.+:\/\/([^\\/]+)/
  var match = search.exec(decodeURIComponent(url.replace(/\+/g, ' ')))
  return match == null ? null : match[1]
}

const FileName = function (url) {
  var search = /([^\\/]+)$/
  var match = search.exec(decodeURIComponent(url.replace(/\+/g, ' ')))
  if (match != null) {
    return match[1]
  }
  return url
}

const Factory = function () {
  var self = {}
  var sheet

  self.build = function () {
    if (!isValidConfig()) {
      plotError(new InvalidConfigError(ExceptionMessages.INVALID_CONFIG))
      return
    }

    window.addEventListener('keydown', function (e) {
      if (e.key === '/') {
        const inputElement =
          d3.select('input.search-container__input').node() || d3.select('.input-sheet-form input').node()

        if (document.activeElement !== inputElement) {
          e.preventDefault()
          inputElement.focus()
          inputElement.scrollIntoView({
            behavior: 'smooth',
          })
        }
      }
    })

    const domainName = DomainName(window.location.search.substring(1))

    const paramId = getDocumentOrSheetId()
    if (paramId && paramId.endsWith('.csv')) {
      sheet = CSVDocument(paramId)
      sheet.init().build()
    } else if (paramId && paramId.endsWith('.json')) {
      sheet = JSONFile(paramId)
      sheet.init().build()
    } else if (domainName && domainName.endsWith('google.com') && paramId) {
      const sheetName = getSheetName()
      sheet = GoogleSheet(paramId, sheetName)
      sheet.init().build()
    } else {
      setDocumentTitle()
    }
  }

  return self
}

function setDocumentTitle() {
  document.title = 'Build your own Radar'
}

function plotLoading() {
  document.querySelector('.helper-description > p').style.display = 'none'
  document.querySelector('.input-sheet-form').style.display = 'none'
  document.querySelector('.helper-description .loader-text').style.display = 'block'
}

function plotErrorMessage(exception) {
  showErrorMessage(exception)
}

function plotError(exception) {
  let message
  let faqMessage = 'Please check <a href="https://www.thoughtworks.com/radar/byor">FAQs</a> for possible solutions.'
  message = exception.message
  if (exception instanceof SheetNotFoundError) {
    const href = 'https://www.thoughtworks.com/radar/byor'
    faqMessage = `You can also check the <a href="${href}">FAQs</a> for other possible solutions`
  }
  if (exception instanceof InvalidConfigError) {
    faqMessage = ''
    d3.selectAll('.input-sheet-form form input').attr('disabled', true)
  }

  d3.selectAll('.error-container__message').remove()
  const container = d3.select('#error-container')

  const errorContainer = container.append('div').attr('class', 'error-container__message')
  errorContainer.append('p').html(message)
  errorContainer.append('p').html(faqMessage)
  d3.select('.input-sheet-form.home-page p').attr('class', 'with-error')

  document.querySelector('.helper-description > p').style.display = 'block'
  document.querySelector('.input-sheet-form').style.display = 'block'
}

function showErrorMessage(exception) {
  document.querySelector('.helper-description .loader-text').style.display = 'none'
  plotError(exception)
}

function plotUnauthorizedErrorMessage() {
  let content
  const helperDescription = d3.select('.helper-description')
  content = d3.select('main')
  helperDescription.style('display', 'none')
  d3.selectAll('.loader-text').remove()
  d3.selectAll('.error-container').remove()

  const currentUser = GoogleAuth.getEmail()
  let homePageURL = window.location.protocol + '//' + window.location.hostname
  homePageURL += window.location.port === '' ? '' : ':' + window.location.port
  const goBack = '<a href=' + homePageURL + '>GO BACK</a>'
  const message = `<strong>Oops!</strong> Looks like you are accessing this sheet using <b>${currentUser}</b>, which does not have permission.Try switching to another account.`

  const container = content.append('div').attr('class', 'error-container')

  const errorContainer = container.append('div').attr('class', 'error-container__message')

  errorContainer.append('div').append('p').attr('class', 'error-title').html(message)
  const button = errorContainer.append('button').attr('class', 'button switch-account-button').text('Switch account')

  errorContainer
    .append('div')
    .append('p')
    .attr('class', 'error-subtitle')
    .html(`or ${goBack} to try a different sheet.`)

  button.on('click', () => {
    let sheet
    sheet = GoogleSheet(getDocumentOrSheetId(), getSheetName())

    sheet.authenticate(true, false, () => {
      if (!sheet.error) {
        helperDescription.style('display', 'block')
        errorContainer.remove()
      } else if (sheet.error) {
        helperDescription.style('display', 'none')
      } else {
        content.remove()
      }
    })
  })
}

module.exports = Factory
