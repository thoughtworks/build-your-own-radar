var byorPage = require('../pageObjects/byor_page')
// var basePage = require('../pageObjects/base_page')
var radarPage = require('../pageObjects/radar_page')
// var config = require('../../../cypress.json')

// Cypress.on('uncaught:exception', (err, runnable) => {
//   if (err) {
//     console.log(err.stack)
//   }
//   return false
// })

describe('Build your radar', function () {
  it('validate 1st sheet', function () {
    cy.visit(Cypress.env('host'))
    byorPage.provideExcelName()
    byorPage.clickSubmitButton()
    radarPage.clickTheBlipFromInteractiveSection()
    radarPage.clickTheBlip()
    radarPage.validateBlipDescription('test')
  })
})

describe('Validate multiple sheet', function () {
  it('validate 2nd sheet', function () {
    cy.visit(Cypress.env('host'))
    byorPage.provideExcelName()
    byorPage.clickSubmitButton()
    radarPage.clickSheet2()
    radarPage.clickTheBlipFromInteractiveSection()
    radarPage.clickTheBlip()
    radarPage.validateBlipDescription('testing')
  })
})

describe('Validate search', function () {
  it('validate search', function () {
    cy.visit(Cypress.env('host'))
    byorPage.provideExcelName()
    byorPage.clickSubmitButton()
    radarPage.searchTheBlip()
    radarPage.validateBlipSearch()
  })
})
