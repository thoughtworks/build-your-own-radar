var byorPage = require('../pageObjects/byor_page')
var radarPage = require('../pageObjects/radar_page')

describe('Build radar with CSV', () => {
  it('Validate CSV file', () => {
    cy.visit(Cypress.env('host'))
    byorPage.provideCsvName()
    byorPage.clickSubmitButton()
    radarPage.clickTheBlipFromInteractiveSection()
    radarPage.clickTheBlip()
    radarPage.validateBlipDescription('test')
  })

  it('Validate search', () => {
    cy.visit(Cypress.env('host'))
    byorPage.provideCsvName()
    byorPage.clickSubmitButton()
    radarPage.searchTheBlip()
    radarPage.validateBlipSearch()
  })
})

describe('Build radar with JSON', () => {
  it('Validate JSON file', () => {
    cy.visit(Cypress.env('host'))
    byorPage.provideJsonName()
    byorPage.clickSubmitButton()
    radarPage.clickTheBlipFromInteractiveSection()
    radarPage.clickTheBlip()
    radarPage.validateBlipDescription('test')
  })
})
