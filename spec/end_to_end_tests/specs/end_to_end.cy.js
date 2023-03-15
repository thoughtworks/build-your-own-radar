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
    if (featureToggles.UIRefresh2022) {
      radarPage.validateGraphTitle('Sheet')

      radarPage.validateMobileQuadrantsHidden()
      radarPage.validateGraphVisible()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickQuadrantInFullRadarView('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateRingsInQuadrantTable(4)
      radarPage.validateBlipsInQuadrantTable(2)

      radarPage.clickBlipItemInQuadrantTable(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)

      radarPage.resetRadarView()

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateActiveQuadrant('techniques', 'first')

      radarPage.clickQuadrantInSubnav('tools')
      radarPage.validateActiveQuadrant('tools', 'third')

      radarPage.clickQuadrantInSubnav('all-quadrants')
      radarPage.validateMobileQuadrantsHidden()
      radarPage.validateGraphVisible()

      radarPage.resetRadarView()

      radarPage.validateSearchResults('framework', 3)
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)

      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(2)
      radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
    } else {
      radarPage.clickTheBlipInFullRadarView()
      radarPage.clickTheBlip()
      radarPage.validateBlipDescriptionOld('Dragonfly')
      radarPage.searchTheBlip()
      radarPage.validateBlipSearch()
    }
  })

  if (featureToggles.UIRefresh2022) {
    it('Validate CSV file in tablet', () => {
      cy.viewport(1024, 768)
      cy.visit(Cypress.env('host'))

      byorPage.provideCsvName()
      byorPage.clickSubmitButton()

      radarPage.validateGraphTitle('Sheet')

      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateRingsInQuadrantTable(4)
      radarPage.validateBlipsInQuadrantTable(2)

      radarPage.clickBlipItemInQuadrantTable(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)

      radarPage.resetRadarView()

      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.clickSubnavDropdownTablet()
      radarPage.validateSubnavDropdownVisibleTablet()
      radarPage.clickQuadrantInSubnav('tools')
      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.validateActiveQuadrant('tools', 'third')

      radarPage.clickSubnavDropdownTablet()
      radarPage.clickQuadrantInSubnav('all-quadrants')
      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()

      radarPage.resetRadarView()

      radarPage.validateSearchResults('framework', 3)
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)

      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(2)
      radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
    })

    it('Validate CSV file in mobile', () => {
      cy.viewport(360, 480)
      cy.visit(Cypress.env('host'))

      byorPage.provideCsvName()
      byorPage.clickSubmitButton()

      radarPage.validateGraphTitle('Sheet')

      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrantInSubnav('techniques')
      radarPage.validateGraphHidden()
      radarPage.validateRingsInQuadrantTable(4)
      radarPage.validateBlipsInQuadrantTable(2)

      radarPage.clickBlipItemInQuadrantTable(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)

      radarPage.resetRadarView()

      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.clickSubnavDropdownTablet()
      radarPage.validateSubnavDropdownVisibleTablet()
      radarPage.clickQuadrantInSubnav('tools')
      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.validateActiveQuadrantInSubnav('tools')
      radarPage.validateGraphHidden()
      radarPage.validateGraphHidden()

      radarPage.clickSubnavDropdownTablet()
      radarPage.clickQuadrantInSubnav('all-quadrants')
      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()

      radarPage.resetRadarView()

      radarPage.validateSearchResults('framework', 3)
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrantInSubnav('techniques')
      radarPage.validateGraphHidden()
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)

      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(2)
      radarPage.validateActiveQuadrantInSubnav('languages---frameworks')
      radarPage.validateGraphHidden()
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
    })
  }
})

describe('Build radar with JSON', () => {
  it('Validate JSON file', () => {
    cy.visit(Cypress.env('host'))

    byorPage.provideJsonName()
    byorPage.clickSubmitButton()
    if (featureToggles.UIRefresh2022) {
      radarPage.validateGraphTitle('Data')

      radarPage.validateMobileQuadrantsHidden()
      radarPage.validateGraphVisible()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickQuadrantInFullRadarView('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateRingsInQuadrantTable(4)
      radarPage.validateBlipsInQuadrantTable(2)

      radarPage.clickBlipItemInQuadrantTable(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)

      radarPage.resetRadarView()

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateActiveQuadrant('techniques', 'first')

      radarPage.clickQuadrantInSubnav('tools')
      radarPage.validateActiveQuadrant('tools', 'third')

      radarPage.clickQuadrantInSubnav('all-quadrants')
      radarPage.validateMobileQuadrantsHidden()
      radarPage.validateGraphVisible()

      radarPage.resetRadarView()

      radarPage.validateSearchResults('framework', 3)
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)

      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(2)
      radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
    } else {
      radarPage.clickTheBlipInFullRadarView()
      radarPage.clickTheBlip()
      radarPage.validateBlipDescriptionOld('Dragonfly')
    }
  })

  if (featureToggles.UIRefresh2022) {
    it('Validate JSON file in tablet', () => {
      cy.viewport(1024, 768)
      cy.visit(Cypress.env('host'))

      byorPage.provideJsonName()
      byorPage.clickSubmitButton()

      radarPage.validateGraphTitle('Data')

      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateRingsInQuadrantTable(4)
      radarPage.validateBlipsInQuadrantTable(2)

      radarPage.clickBlipItemInQuadrantTable(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)

      radarPage.resetRadarView()

      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.clickSubnavDropdownTablet()
      radarPage.validateSubnavDropdownVisibleTablet()
      radarPage.clickQuadrantInSubnav('tools')
      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.validateActiveQuadrant('tools', 'third')

      radarPage.clickSubnavDropdownTablet()
      radarPage.clickQuadrantInSubnav('all-quadrants')
      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()

      radarPage.resetRadarView()

      radarPage.validateSearchResults('framework', 3)
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)

      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(2)
      radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
    })

    it('Validate JSON file in mobile', () => {
      cy.viewport(360, 480)
      cy.visit(Cypress.env('host'))

      byorPage.provideJsonName()
      byorPage.clickSubmitButton()

      radarPage.validateGraphTitle('Data')

      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrantInSubnav('techniques')
      radarPage.validateGraphHidden()
      radarPage.validateRingsInQuadrantTable(4)
      radarPage.validateBlipsInQuadrantTable(2)

      radarPage.clickBlipItemInQuadrantTable(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)

      radarPage.resetRadarView()

      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.clickSubnavDropdownTablet()
      radarPage.validateSubnavDropdownVisibleTablet()
      radarPage.clickQuadrantInSubnav('tools')
      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.validateActiveQuadrantInSubnav('tools')
      radarPage.validateGraphHidden()
      radarPage.validateGraphHidden()

      radarPage.clickSubnavDropdownTablet()
      radarPage.clickQuadrantInSubnav('all-quadrants')
      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()

      radarPage.resetRadarView()

      radarPage.validateSearchResults('framework', 3)
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrantInSubnav('techniques')
      radarPage.validateGraphHidden()
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)

      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(2)
      radarPage.validateActiveQuadrantInSubnav('languages---frameworks')
      radarPage.validateGraphHidden()
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
    })
  }
})
describe('Build radar with public Google Sheet', () => {
  it('Validate public Google Sheet', () => {
    cy.visit(Cypress.env('host'))

    byorPage.providePublicSheetUrl()
    byorPage.clickSubmitButton()

    if (featureToggles.UIRefresh2022) {
      radarPage.validateGraphTitle(testConfig.PUBLIC_GOOGLE_SHEET_TITLE)

      radarPage.validateMobileQuadrantsHidden()
      radarPage.validateGraphVisible()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickQuadrantInFullRadarView('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateRingsInQuadrantTable(4)
      radarPage.validateBlipsInQuadrantTable(26)
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickBlipItemInQuadrantTable(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)

      radarPage.resetRadarView()

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateActiveQuadrant('techniques', 'first')

      radarPage.clickQuadrantInSubnav('tools')
      radarPage.validateActiveQuadrant('tools', 'third')

      radarPage.clickQuadrantInSubnav('all-quadrants')
      radarPage.validateMobileQuadrantsHidden()
      radarPage.validateGraphVisible()

      radarPage.resetRadarView()

      radarPage.validateSearchResults('framework', 25)
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(5)

      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(8)
      radarPage.validateActiveQuadrant('platforms', 'second')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(41)

      radarPage.resetRadarView()

      radarPage.clickAlternateRadarItem(2)
      radarPage.validateActiveAlternateRadar(2)
      radarPage.validateInactiveAlternateRadar(1)
    } else {
      radarPage.validateBlipCountForPublicGoogleSheet()
    }
  })

  if (featureToggles.UIRefresh2022) {
    it('Validate public Google Sheet in tablet', () => {
      cy.viewport(1024, 768)
      cy.visit(Cypress.env('host'))

      byorPage.providePublicSheetUrl()
      byorPage.clickSubmitButton()

      radarPage.validateGraphTitle(testConfig.PUBLIC_GOOGLE_SHEET_TITLE)

      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateRingsInQuadrantTable(4)
      radarPage.validateBlipsInQuadrantTable(26)

      radarPage.clickBlipItemInQuadrantTable(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)

      radarPage.resetRadarView()

      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.clickSubnavDropdownTablet()
      radarPage.validateSubnavDropdownVisibleTablet()
      radarPage.clickQuadrantInSubnav('tools')
      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.validateActiveQuadrant('tools', 'third')

      radarPage.clickSubnavDropdownTablet()
      radarPage.clickQuadrantInSubnav('all-quadrants')
      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()

      radarPage.resetRadarView()

      radarPage.validateSearchResults('framework', 25)
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(5)

      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(8)
      radarPage.validateActiveQuadrant('platforms', 'second')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(41)

      radarPage.resetRadarView()

      radarPage.clickAlternateRadarItem(2)
      radarPage.validateActiveAlternateRadar(2)
      radarPage.validateInactiveAlternateRadar(1)
    })

    it('Validate public Google Sheet in mobile', () => {
      cy.viewport(360, 480)
      cy.visit(Cypress.env('host'))

      byorPage.providePublicSheetUrl()
      byorPage.clickSubmitButton()

      radarPage.validateGraphTitle(testConfig.PUBLIC_GOOGLE_SHEET_TITLE)

      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()
      radarPage.validateQuadrantOrder()
      radarPage.validateRingOrder()

      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrantInSubnav('techniques')
      radarPage.validateGraphHidden()
      radarPage.validateRingsInQuadrantTable(4)
      radarPage.validateBlipsInQuadrantTable(26)

      radarPage.clickBlipItemInQuadrantTable(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)

      radarPage.resetRadarView()

      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.clickSubnavDropdownTablet()
      radarPage.validateSubnavDropdownVisibleTablet()
      radarPage.clickQuadrantInSubnav('tools')
      radarPage.validateSubnavDropdownHiddenTablet()
      radarPage.validateActiveQuadrantInSubnav('tools')
      radarPage.validateGraphHidden()

      radarPage.clickSubnavDropdownTablet()
      radarPage.clickQuadrantInSubnav('all-quadrants')
      radarPage.validateMobileQuadrantsVisible()
      radarPage.validateGraphHidden()

      radarPage.resetRadarView()

      radarPage.validateSearchResults('framework', 25)
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrantInSubnav('techniques')
      radarPage.validateGraphHidden()
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(5)

      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(8)
      radarPage.validateActiveQuadrantInSubnav('platforms')
      radarPage.validateGraphHidden()
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(41)

      radarPage.resetRadarView()

      radarPage.clickAlternateRadarItem(2)
      radarPage.validateActiveAlternateRadar(2)
      radarPage.validateInactiveAlternateRadar(1)
    })
  }
})
