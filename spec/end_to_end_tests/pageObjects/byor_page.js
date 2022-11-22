const config = require('../../../cypress.json')
const environment = require('/src/config')

class ByorPage {
  constructor() {
    this.text_box = "[name='sheetId']"
    this.submit = environment[Cypress.env('TEST_ENV') ? Cypress.env('TEST_ENV') : 'development'].featureToggles
      .UIRefresh2022
      ? 'input[type=submit]'
      : '.button'
  }

  provideExcelName() {
    cy.get(this.text_box).type(config.excel)
  }

  provideCsvName() {
    cy.get(this.text_box).type(config.csv)
  }

  provideJsonName() {
    cy.get(this.text_box).type(config.json)
  }

  clickSubmitButton() {
    cy.get(this.submit).click()
  }
}

module.exports = new ByorPage()
