const byorPage = require('../pageObjects/byor_page')
const radarPage = require('../pageObjects/radar_page')
const config = require('../../../src/config')
const featureToggles = config()[Cypress.env('TEST_ENV') ? Cypress.env('TEST_ENV') : 'development'].featureToggles
const testConfig = require('../config.json')

describe('Build radar with CSV', () => {
  it('Validate CSV file', () => {
    cy.visit(Cypress.env('host'))
    byorPage.provideCsvName()
    byorPage.clickSubmitButton()
    radarPage.clickTheBlipFromInteractiveSection()
    radarPage.clickTheBlip()
    radarPage.validateBlipDescription('description')
    if (featureToggles.UIRefresh2022) {
      cy.get('#radar-plot').should('exist')
      radarPage.validateGraphTitle('Sheet')
      radarPage.validateQuadrantNames()
      radarPage.validateSearchResults('description', 2)
    }
  })

  if (featureToggles.UIRefresh2022) {
    it('Validate CSV file in mobile', () => {
      cy.viewport(1024, 768)
      cy.visit(Cypress.env('host'))
      byorPage.provideCsvName()
      byorPage.clickSubmitButton()
      cy.get('#radar-plot').should('not.exist')
      radarPage.clickQuadrant()
      radarPage.clickTheBlip()
      radarPage.validateBlipDescription('description')
      radarPage.validateQuadrantSubnavClick('Platforms')
    })
  } else {
    it('Validate search', () => {
      cy.visit(Cypress.env('host'))
      byorPage.provideCsvName()
      byorPage.clickSubmitButton()
      radarPage.searchTheBlip()
      radarPage.validateBlipSearch()
    })
  }
})

describe('Build radar with JSON', () => {
  it('Validate JSON file', () => {
    cy.visit(Cypress.env('host'))
    byorPage.provideJsonName()
    byorPage.clickSubmitButton()
    radarPage.clickTheBlipFromInteractiveSection()
    radarPage.clickTheBlip()
    radarPage.validateBlipDescription('description')
    if (featureToggles.UIRefresh2022) {
      cy.get('#radar-plot').should('exist')
      radarPage.validateGraphTitle('Data')
      radarPage.validateQuadrantNames()
      radarPage.validateSearchResults('description', 2)
    }
  })

  if (featureToggles.UIRefresh2022) {
    it('Validate JSON file in mobile', () => {
      cy.viewport(1024, 768)
      cy.visit(Cypress.env('host'))
      byorPage.provideJsonName()
      byorPage.clickSubmitButton()
      radarPage.clickQuadrant()
      radarPage.clickTheBlip()
      radarPage.validateBlipDescription('description')
      radarPage.validateQuadrantSubnavClick('Platforms')
    })
  }
})

describe('Build radar with public Google Sheet', () => {
  it('Validate public Google Sheet', () => {
    cy.visit(Cypress.env('host'))
    byorPage.providePublicSheetUrl()
    byorPage.clickSubmitButton()
    radarPage.validateBlipCountForPublicGoogleSheet()
    if (featureToggles.UIRefresh2022) {
      cy.get('#radar-plot').should('exist')
      radarPage.validateGraphTitle(testConfig.PUBLIC_GOOGLE_SHEET_TITLE)
      radarPage.validateQuadrantNamesForPublicGoogleSheet()
      radarPage.validateSearchResults('react', 6)
      radarPage.validateAlternateRadarsForPublicGoogleSheet()
    }
  })

  if (featureToggles.UIRefresh2022) {
    it('Validate public Google Sheet in mobile', () => {
      cy.viewport(1024, 768)
      cy.visit(Cypress.env('host'))
      byorPage.providePublicSheetUrl()
      byorPage.clickSubmitButton()
      radarPage.clickQuadrant()
      radarPage.validateQuadrantSubnavClick('Platforms')
    })

    it('Validate quadrants and rings order', () => {
      cy.visit(Cypress.env('host'))
      byorPage.providePublicSheetUrl()
      byorPage.clickSubmitButton()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()
    })
  }
})
