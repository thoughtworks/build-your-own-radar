const config = require('../config.json')

class ByorPage {
  constructor() {
    this.textBox = "[name='documentId']"
    this.submit = 'input[type=submit]'
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
