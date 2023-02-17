var byorPage = require('../pageObjects/byor_page')
var radarPage = require('../pageObjects/radar_page')
const config = require('../../../src/config')
const featureToggles = config().development.featureToggles

describe('Build radar with CSV', () => {
  it('Validate CSV file', () => {
    cy.visit(Cypress.env('host'))
    byorPage.provideCsvName()
    byorPage.clickSubmitButton()
    radarPage.clickTheBlipFromInteractiveSection()
    radarPage.clickTheBlip()
    radarPage.validateBlipDescription('test')
    if (featureToggles.UIRefresh2022) {
      cy.get('.quadrants-container').should('exist')
      cy.get('#radar-plot').should('exist')
    }
  })

  it('Validate search', () => {
    cy.visit(Cypress.env('host'))
    byorPage.provideCsvName()
    byorPage.clickSubmitButton()
    radarPage.searchTheBlip()
    radarPage.validateBlipSearch()
  })

  if (featureToggles.UIRefresh2022) {
    it('Validate CSV file in mobile', () => {
      cy.viewport(1024, 768)
      cy.visit(Cypress.env('host'))
      byorPage.provideCsvName()
      console.log('after input')
      byorPage.clickSubmitButton()
      cy.get('.quadrants-container').should('not.exist')
      cy.get('#radar-plot').should('not.exist')
      radarPage.clickQuadrant()
      radarPage.clickTheBlip()
      radarPage.validateBlipDescription('test')
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
    radarPage.validateBlipDescription('test')
    if (featureToggles.UIRefresh2022) {
      cy.get('.quadrants-container').should('exist')
      cy.get('#radar-plot').should('exist')
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
      radarPage.validateBlipDescription('test')
    })
  }
})

describe('Build radar with public google sheet', () => {
  it('Validate public google sheet file', () => {
    cy.visit(Cypress.env('host'))
    byorPage.providePublicSheetUrl()
    byorPage.clickSubmitButton()
    radarPage.validateBlipCountForPublicGoogleSheet()
    if (featureToggles.UIRefresh2022) {
      cy.get('.quadrants-container').should('exist')
      cy.get('#radar-plot').should('exist')
    }
  })
})
