/* global gapi */
const SheetNotFoundError = require('../../src/exceptions/sheetNotFoundError')
const UnauthorizedError = require('../../src/exceptions/unauthorizedError')
const ExceptionMessages = require('./exceptionMessages')
const config = require('../config')

const Sheet = function (sheetReference) {
  var self = {}
  const featureToggles = config().featureToggles

  ;(function () {
    var matches = sheetReference.match('https:\\/\\/docs.google.com\\/spreadsheets\\/d\\/(.*?)($|\\/$|\\/.*|\\?.*)')
    self.id = matches !== null ? matches[1] : sheetReference
  })()

  self.validate = function (callback) {
    var apiKeyEnabled = process.env.API_KEY || false
    var feedURL = 'https://docs.google.com/spreadsheets/d/' + self.id

    // TODO: Move this out (as HTTPClient)
    var xhr = new XMLHttpRequest()
    xhr.open('GET', feedURL, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return callback(null, apiKeyEnabled)
        } else if (xhr.status === 404) {
          return callback(self.createSheetNotFoundError(), apiKeyEnabled)
        } else {
          return callback(new UnauthorizedError(ExceptionMessages.UNAUTHORIZED), apiKeyEnabled)
        }
      }
    }
    xhr.send(null)
  }

  self.createSheetNotFoundError = function () {
    const exceptionMessage = featureToggles.UIRefresh2022
      ? ExceptionMessages.SHEET_NOT_FOUND_NEW
      : ExceptionMessages.SHEET_NOT_FOUND
    return new SheetNotFoundError(exceptionMessage)
  }

  self.getSheet = async function () {
    try {
      self.sheetResponse = await gapi.client.sheets.spreadsheets.get({ spreadsheetId: self.id })
    } catch (error) {
      self.sheetResponse = error
    }
  }

  self.getData = function (range) {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: self.id,
      range: range,
    })
  }

  self.processSheetResponse = async function (sheetName, createBlips, handleError) {
    return self.sheetResponse.status !== 200
      ? handleError(self.sheetResponse)
      : processSheetData(sheetName, createBlips, handleError)
  }

  function processSheetData(sheetName, createBlips, handleError) {
    const sheetNames = self.sheetResponse.result.sheets.map((s) => s.properties.title)
    sheetName = !sheetName ? sheetNames[0] : sheetName
    self
      .getData(sheetName + '!A1:E')
      .then((r) => createBlips(self.sheetResponse.result.properties.title, r.result.values, sheetNames))
      .catch(handleError)
  }

  return self
}

module.exports = Sheet
