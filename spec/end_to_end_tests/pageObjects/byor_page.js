const config = require('../config.json')
const environment = require('../../../src/config')

class ByorPage {
  constructor() {
    if (environment()[Cypress.env('TEST_ENV') ? Cypress.env('TEST_ENV') : 'development'].featureToggles.UIRefresh2022) {
      this.text_box = "[name='documentId']"
      this.submit = 'input[type=submit]'
    } else {
      this.text_box = "[name='sheetId']"
      this.submit = 'button'
    }
  }

  provideCsvName() {
    cy.get(this.text_box).type(config.CSV_FILE_URL)
  }

  provideJsonName() {
    cy.get(this.text_box).type(config.JSON_FILE_URL)
  }

  clickSubmitButton() {
    cy.get(this.submit).click()
  }

  providePublicSheetUrl() {
    cy.get(this.text_box).type(config.PUBLIC_GOOGLE_SHEET_URL)
  }
}

module.exports = new ByorPage()
