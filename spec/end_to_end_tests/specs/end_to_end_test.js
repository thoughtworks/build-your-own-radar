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

describe('Build your radar with csv file', function () {

  it('display title and subtitle for csv', function () {
    const baseUrl = Cypress.env('host')
    let csvUrlPath = encodeURI(baseUrl + 'resources/sampleBlips.csv')
    cy.visit(baseUrl + '?title=buildyourownradar&subtitle=byor&sheetId=' + csvUrlPath)
    radarPage.verifyTitle('buildyourownradar')
    radarPage.verifySubTitle('byor')
  })

  it('display default title as sheetId and subtitle as empty for csv path when params not given', function () {
    const baseUrl = Cypress.env('host')
    let csvUrlPath = encodeURI(baseUrl + 'resources/sampleBlips.csv')
    cy.visit(baseUrl + '?sheetId=' + csvUrlPath)
    radarPage.verifyTitle('sampleBlips')
    radarPage.verifyEmptySubTitle()
  })
})

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
