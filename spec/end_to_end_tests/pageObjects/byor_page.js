var config = require('../../../cypress.json')

class ByorPage {
  constructor () {
    this.text_box = "[name='sheetId']"
    this.submit = '.button'
  }

  provideExcelName () {
    cy.get(this.text_box).type(config.excel)
  }

  clickSubmitButton () {
    cy.get(this.submit).click()
  }
}

module.exports = new ByorPage()
