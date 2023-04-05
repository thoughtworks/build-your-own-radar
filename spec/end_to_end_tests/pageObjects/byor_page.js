const config = require('../config.json')
const environment = require('../../../src/config')

class ByorPage {
  constructor() {
    if (environment()[Cypress.env('TEST_ENV') ? Cypress.env('TEST_ENV') : 'development'].featureToggles.UIRefresh2022) {
      this.textBox = "[name='documentId']"
      this.submit = 'input[type=submit]'
    } else {
      this.textBox = "[name='sheetId']"
      this.submit = 'button'
    }
  }

  provideCsvName() {
    cy.get(this.textBox).clear()
    cy.get(this.textBox).type(config.CSV_FILE_URL)
  }

  provideJsonName() {
    cy.get(this.textBox).clear()
    cy.get(this.textBox).type(config.JSON_FILE_URL)
  }

  providePublicSheetUrl() {
    cy.get(this.textBox).clear()
    cy.get(this.textBox).type(config.PUBLIC_GOOGLE_SHEET_URL)
  }

  clickSubmitButton() {
    cy.get(this.submit).click()
  }

  typeString(string) {
    cy.get('body').type(string)
  }

  typeStringInUrlInput(string) {
    cy.get(this.textBox).clear()
    cy.get(this.textBox).type(string)
  }

  validateUrlInputFocused() {
    cy.get(this.textBox).should('have.focus')
  }

  validateUrlInputValue(value) {
    cy.get(this.textBox).should('have.value', value)
  }
}

module.exports = new ByorPage()
