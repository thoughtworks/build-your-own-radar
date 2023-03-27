const byorPage = require('../pageObjects/byor_page')
const radarPage = require('../pageObjects/radar_page')
const config = require('../../../src/config')
const featureToggles = config()[Cypress.env('TEST_ENV') ? Cypress.env('TEST_ENV') : 'development'].featureToggles
const testConfig = require('../config.json')

if (featureToggles.UIRefresh2022) {
  describe('Build radar with CSV', () => {
    beforeEach(function () {
      if (
        Cypress.currentTest.title !== 'verify url input and submit' &&
        Cypress.currentTest.title !== 'verify keypress / to focus url input'
      ) {
        cy.visit(Cypress.env('host') + `/?documentId=${encodeURIComponent(testConfig.CSV_FILE_URL)}`)
      } else {
        cy.visit(Cypress.env('host'))
      }
    })

    context('Desktop resolution (1440px)', () => {
      it('verify url input and submit', () => {
        byorPage.provideCsvName()
        byorPage.clickSubmitButton()

        radarPage.validateGraphTitle('Sheet')

        radarPage.validateMobileQuadrantsHidden()
        radarPage.validateGraphVisible()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify initial view of Radar', () => {
        radarPage.validateGraphTitle('Sheet')

        radarPage.validateMobileQuadrantsHidden()
        radarPage.validateGraphVisible()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify click on quadrant', () => {
        radarPage.clickQuadrantInFullRadarView('first')
        radarPage.validateActiveQuadrant('techniques', 'first')
        radarPage.validateRingsInQuadrantTable(4)
        radarPage.validateBlipsInQuadrantTable(2)
      })

      it('verify click on blip in quadrant table', () => {
        radarPage.clickQuadrantInFullRadarView('first')

        radarPage.clickBlipItemInQuadrantTable(1)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)
      })

      it('verify click on blip in Radar graph in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarView('first')

        radarPage.clickBlipItemInQuadrantTable(1)

        radarPage.clickBlipInRadarGraph(2)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
        radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)
      })

      it('verify click on blip in Radar graph', () => {
        radarPage.clickBlipInRadarGraph(2)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
        radarPage.validateActiveQuadrant('techniques', 'first')
      })

      it('verify click on quadrant in subnav', () => {
        radarPage.clickQuadrantInSubnav('tools')
        radarPage.validateActiveQuadrant('tools', 'third')
      })

      it('verify click on All quadrants in subnav', () => {
        radarPage.clickQuadrantInSubnav('tools')
        radarPage.clickQuadrantInSubnav('all-quadrants')
        radarPage.validateMobileQuadrantsHidden()
        radarPage.validateGraphVisible()
      })

      it('verify number of search results for query', () => {
        radarPage.validateSearchResults('framework', 3)
      })

      it('verify click on search result in Radar view', () => {
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(1)
        radarPage.validateActiveQuadrant('techniques', 'first')
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      })

      it('verify click on search result in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarView('first')
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(2)
        radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
      })

      it('verify keypress / to focus url input', () => {
        byorPage.typeString('/')
        byorPage.validateUrlInputFocused()

        byorPage.typeStringInUrlInput('abc/def 123/456')
        byorPage.validateUrlInputValue('abc/def 123/456')
      })

      it('verify keypress / to focus search', () => {
        radarPage.validateSearchVisible()

        radarPage.typeString('/')
        radarPage.validateSearchFocused()

        radarPage.typeStringInSearch('abc/def 123/456')
        radarPage.validateSearchValue('abc/def 123/456')
      })
    })

    context('Tablet resolution (1024px)', () => {
      beforeEach(function () {
        cy.viewport(1024, 768)
      })

      it('verify url input and submit', () => {
        byorPage.provideCsvName()
        byorPage.clickSubmitButton()

        radarPage.validateGraphTitle('Sheet')

        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify initial view of Radar', () => {
        radarPage.validateGraphTitle('Sheet')

        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify click on quadrant', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')
        radarPage.validateActiveQuadrant('techniques', 'first')
        radarPage.validateRingsInQuadrantTable(4)
        radarPage.validateBlipsInQuadrantTable(2)
      })

      it('verify click on blip in quadrant table', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')

        radarPage.clickBlipItemInQuadrantTable(1)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)
      })

      it('verify click on blip in Radar graph in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')

        radarPage.clickBlipItemInQuadrantTable(1)

        radarPage.clickBlipInRadarGraph(2)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
        radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)
      })

      it('verify selecting quadrant in subnav', () => {
        radarPage.validateSubnavDropdownHiddenTablet()
        radarPage.clickSubnavDropdownTablet()
        radarPage.validateSubnavDropdownVisibleTablet()
        radarPage.clickQuadrantInSubnav('tools')
        radarPage.validateSubnavDropdownHiddenTablet()
        radarPage.validateActiveQuadrant('tools', 'third')
      })

      it('verify click on All quadrants in subnav', () => {
        radarPage.clickSubnavDropdownTablet()
        radarPage.clickQuadrantInSubnav('tools')

        radarPage.clickSubnavDropdownTablet()
        radarPage.clickQuadrantInSubnav('all-quadrants')
        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
      })

      it('verify number of search results for query', () => {
        radarPage.validateSearchResults('framework', 3)
      })

      it('verify click on search result in Radar view', () => {
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(1)
        radarPage.validateActiveQuadrant('techniques', 'first')
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      })

      it('verify click on search result in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(2)
        radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
      })

      it('verify keypress / to focus url input', () => {
        byorPage.typeString('/')
        byorPage.validateUrlInputFocused()

        byorPage.typeStringInUrlInput('abc/def 123/456')
        byorPage.validateUrlInputValue('abc/def 123/456')
      })

      it('verify keypress / to focus search', () => {
        radarPage.validateSearchVisible()

        radarPage.typeString('/')
        radarPage.validateSearchFocused()

        radarPage.typeStringInSearch('abc/def 123/456')
        radarPage.validateSearchValue('abc/def 123/456')
      })
    })

    context('Mobile resolution (360px)', () => {
      beforeEach(function () {
        cy.viewport(360, 480)
      })

      it('verify url input and submit', () => {
        byorPage.provideCsvName()
        byorPage.clickSubmitButton()

        radarPage.validateGraphTitle('Sheet')

        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify initial view of Radar', () => {
        radarPage.validateGraphTitle('Sheet')

        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify click on quadrant', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')
        radarPage.validateActiveQuadrantInSubnav('techniques')
        radarPage.validateGraphHidden()
        radarPage.validateRingsInQuadrantTable(4)
        radarPage.validateBlipsInQuadrantTable(2)
      })

      it('verify click on blip in quadrant table', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')

        radarPage.clickBlipItemInQuadrantTable(1)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)
        radarPage.clickBlipItemInQuadrantTable(2)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
        radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)
      })

      it('verify selecting quadrant in subnav', () => {
        radarPage.validateSubnavDropdownHiddenTablet()
        radarPage.clickSubnavDropdownTablet()
        radarPage.validateSubnavDropdownVisibleTablet()
        radarPage.clickQuadrantInSubnav('tools')
        radarPage.validateSubnavDropdownHiddenTablet()
        radarPage.validateActiveQuadrantInSubnav('tools')
        radarPage.validateGraphHidden()
      })

      it('verify click on All quadrants in subnav', () => {
        radarPage.clickSubnavDropdownTablet()
        radarPage.clickQuadrantInSubnav('tools')

        radarPage.clickSubnavDropdownTablet()
        radarPage.clickQuadrantInSubnav('all-quadrants')
        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
      })

      it('verify number of search results for query', () => {
        radarPage.validateSearchResults('framework', 3)
      })

      it('verify click on search result in Radar view', () => {
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(1)
        radarPage.validateActiveQuadrantInSubnav('techniques')
        radarPage.validateGraphHidden()
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      })

      it('verify click on search result in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(2)
        radarPage.validateActiveQuadrantInSubnav('languages---frameworks')
        radarPage.validateGraphHidden()
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
      })

      it('verify keypress / to focus url input', () => {
        byorPage.typeString('/')
        byorPage.validateUrlInputFocused()

        byorPage.typeStringInUrlInput('abc/def 123/456')
        byorPage.validateUrlInputValue('abc/def 123/456')
      })

      it('verify keypress / to focus search', () => {
        radarPage.validateSearchVisible()

        radarPage.typeString('/')
        radarPage.validateSearchFocused()

        radarPage.typeStringInSearch('abc/def 123/456')
        radarPage.validateSearchValue('abc/def 123/456')
      })
    })
  })
} else {
  describe('Build radar with CSV (Old UI)', () => {
    it('Validate CSV file', () => {
      cy.visit(Cypress.env('host'))

      byorPage.provideCsvName()
      byorPage.clickSubmitButton()

      radarPage.clickTheBlipInFullRadarView()

      radarPage.clickTheBlip()
      radarPage.validateBlipDescriptionOld('Dragonfly')

      radarPage.searchTheBlip()
      radarPage.validateBlipSearch()
    })
  })
}

if (featureToggles.UIRefresh2022) {
  describe('Build radar with JSON', () => {
    beforeEach(function () {
      if (
        Cypress.currentTest.title !== 'verify url input and submit' &&
        Cypress.currentTest.title !== 'verify keypress / to focus url input'
      ) {
        cy.visit(Cypress.env('host') + `/?documentId=${encodeURIComponent(testConfig.JSON_FILE_URL)}`)
      } else {
        cy.visit(Cypress.env('host'))
      }
    })

    context('Desktop resolution (1440px)', () => {
      it('verify url input and submit', () => {
        byorPage.provideJsonName()
        byorPage.clickSubmitButton()

        radarPage.validateGraphTitle('Data')

        radarPage.validateMobileQuadrantsHidden()
        radarPage.validateGraphVisible()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify initial view of Radar', () => {
        radarPage.validateGraphTitle('Data')

        radarPage.validateMobileQuadrantsHidden()
        radarPage.validateGraphVisible()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify click on quadrant', () => {
        radarPage.clickQuadrantInFullRadarView('first')
        radarPage.validateActiveQuadrant('techniques', 'first')
        radarPage.validateRingsInQuadrantTable(4)
        radarPage.validateBlipsInQuadrantTable(2)
      })

      it('verify click on blip in quadrant table', () => {
        radarPage.clickQuadrantInFullRadarView('first')

        radarPage.clickBlipItemInQuadrantTable(1)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)
      })

      it('verify click on blip in Radar graph in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarView('first')

        radarPage.clickBlipItemInQuadrantTable(1)

        radarPage.clickBlipInRadarGraph(2)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
        radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)
      })

      it('verify click on blip in Radar graph', () => {
        radarPage.clickBlipInRadarGraph(2)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
        radarPage.validateActiveQuadrant('techniques', 'first')
      })

      it('verify click on quadrant in subnav', () => {
        radarPage.clickQuadrantInSubnav('tools')
        radarPage.validateActiveQuadrant('tools', 'third')
      })

      it('verify click on All quadrants in subnav', () => {
        radarPage.clickQuadrantInSubnav('tools')
        radarPage.clickQuadrantInSubnav('all-quadrants')
        radarPage.validateMobileQuadrantsHidden()
        radarPage.validateGraphVisible()
      })

      it('verify number of search results for query', () => {
        radarPage.validateSearchResults('framework', 3)
      })

      it('verify click on search result in Radar view', () => {
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(1)
        radarPage.validateActiveQuadrant('techniques', 'first')
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      })

      it('verify click on search result in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarView('first')
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(2)
        radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
      })

      it('verify keypress / to focus url input', () => {
        byorPage.typeString('/')
        byorPage.validateUrlInputFocused()

        byorPage.typeStringInUrlInput('abc/def 123/456')
        byorPage.validateUrlInputValue('abc/def 123/456')
      })

      it('verify keypress / to focus search', () => {
        radarPage.validateSearchVisible()

        radarPage.typeString('/')
        radarPage.validateSearchFocused()

        radarPage.typeStringInSearch('abc/def 123/456')
        radarPage.validateSearchValue('abc/def 123/456')
      })
    })

    context('Tablet resolution (1024px)', () => {
      beforeEach(function () {
        cy.viewport(1024, 768)
      })

      it('verify url input and submit', () => {
        byorPage.provideJsonName()
        byorPage.clickSubmitButton()

        radarPage.validateGraphTitle('Data')

        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify initial view of Radar', () => {
        radarPage.validateGraphTitle('Data')

        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify click on quadrant', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')
        radarPage.validateActiveQuadrant('techniques', 'first')
        radarPage.validateRingsInQuadrantTable(4)
        radarPage.validateBlipsInQuadrantTable(2)
      })

      it('verify click on blip in quadrant table', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')

        radarPage.clickBlipItemInQuadrantTable(1)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)
      })

      it('verify click on blip in Radar graph in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')

        radarPage.clickBlipItemInQuadrantTable(1)

        radarPage.clickBlipInRadarGraph(2)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
        radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)
      })

      it('verify selecting quadrant in subnav', () => {
        radarPage.validateSubnavDropdownHiddenTablet()
        radarPage.clickSubnavDropdownTablet()
        radarPage.validateSubnavDropdownVisibleTablet()
        radarPage.clickQuadrantInSubnav('tools')
        radarPage.validateSubnavDropdownHiddenTablet()
        radarPage.validateActiveQuadrant('tools', 'third')
      })

      it('verify click on All quadrants in subnav', () => {
        radarPage.clickSubnavDropdownTablet()
        radarPage.clickQuadrantInSubnav('tools')

        radarPage.clickSubnavDropdownTablet()
        radarPage.clickQuadrantInSubnav('all-quadrants')
        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
      })

      it('verify number of search results for query', () => {
        radarPage.validateSearchResults('framework', 3)
      })

      it('verify click on search result in Radar view', () => {
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(1)
        radarPage.validateActiveQuadrant('techniques', 'first')
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      })

      it('verify click on search result in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(2)
        radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
      })

      it('verify keypress / to focus url input', () => {
        byorPage.typeString('/')
        byorPage.validateUrlInputFocused()

        byorPage.typeStringInUrlInput('abc/def 123/456')
        byorPage.validateUrlInputValue('abc/def 123/456')
      })

      it('verify keypress / to focus search', () => {
        radarPage.validateSearchVisible()

        radarPage.typeString('/')
        radarPage.validateSearchFocused()

        radarPage.typeStringInSearch('abc/def 123/456')
        radarPage.validateSearchValue('abc/def 123/456')
      })
    })

    context('Mobile resolution (360px)', () => {
      beforeEach(function () {
        cy.viewport(360, 480)
      })

      it('verify url input and submit', () => {
        byorPage.provideJsonName()
        byorPage.clickSubmitButton()

        radarPage.validateGraphTitle('Data')

        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify initial view of Radar', () => {
        radarPage.validateGraphTitle('Data')

        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
        radarPage.validateQuadrantOrder()
        radarPage.validateRingOrder()
      })

      it('verify click on quadrant', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')
        radarPage.validateActiveQuadrantInSubnav('techniques')
        radarPage.validateGraphHidden()
        radarPage.validateRingsInQuadrantTable(4)
        radarPage.validateBlipsInQuadrantTable(2)
      })

      it('verify click on blip in quadrant table', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')

        radarPage.clickBlipItemInQuadrantTable(1)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)
        radarPage.clickBlipItemInQuadrantTable(2)
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
        radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)
      })

      it('verify selecting quadrant in subnav', () => {
        radarPage.validateSubnavDropdownHiddenTablet()
        radarPage.clickSubnavDropdownTablet()
        radarPage.validateSubnavDropdownVisibleTablet()
        radarPage.clickQuadrantInSubnav('tools')
        radarPage.validateSubnavDropdownHiddenTablet()
        radarPage.validateActiveQuadrantInSubnav('tools')
        radarPage.validateGraphHidden()
      })

      it('verify click on All quadrants in subnav', () => {
        radarPage.clickSubnavDropdownTablet()
        radarPage.clickQuadrantInSubnav('tools')

        radarPage.clickSubnavDropdownTablet()
        radarPage.clickQuadrantInSubnav('all-quadrants')
        radarPage.validateMobileQuadrantsVisible()
        radarPage.validateGraphHidden()
      })

      it('verify number of search results for query', () => {
        radarPage.validateSearchResults('framework', 3)
      })

      it('verify click on search result in Radar view', () => {
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(1)
        radarPage.validateActiveQuadrantInSubnav('techniques')
        radarPage.validateGraphHidden()
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      })

      it('verify click on search result in quadrant view', () => {
        radarPage.clickQuadrantInFullRadarViewTablet('first')
        radarPage.triggerSearch('framework')
        radarPage.clickSearchResult(2)
        radarPage.validateActiveQuadrantInSubnav('languages---frameworks')
        radarPage.validateGraphHidden()
        radarPage.validateBlipDescriptionVibisbleInQuadrantTable(7)
      })

      it('verify keypress / to focus url input', () => {
        byorPage.typeString('/')
        byorPage.validateUrlInputFocused()

        byorPage.typeStringInUrlInput('abc/def 123/456')
        byorPage.validateUrlInputValue('abc/def 123/456')
      })

      it('verify keypress / to focus search', () => {
        radarPage.validateSearchVisible()

        radarPage.typeString('/')
        radarPage.validateSearchFocused()

        radarPage.typeStringInSearch('abc/def 123/456')
        radarPage.validateSearchValue('abc/def 123/456')
      })
    })
  })
} else {
  describe('Build radar with JSON (Old UI)', () => {
    it('Validate JSON file', () => {
      cy.visit(Cypress.env('host'))

      byorPage.provideJsonName()
      byorPage.clickSubmitButton()

      radarPage.clickTheBlipInFullRadarView()

      radarPage.clickTheBlip()
      radarPage.validateBlipDescriptionOld('Dragonfly')

      radarPage.searchTheBlip()
      radarPage.validateBlipSearch()
    })
  })
}

if (featureToggles.UIRefresh2022) {
  describe('Build radar with public Google Sheet', () => {
    it('Validate public Google Sheet', () => {
      cy.visit(Cypress.env('host'))

      byorPage.typeString('/')
      byorPage.validateUrlInputFocused()

      byorPage.typeStringInUrlInput('abc/def 123/456')
      byorPage.validateUrlInputValue('abc/def 123/456')

      byorPage.providePublicSheetUrl()
      byorPage.clickSubmitButton()

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

      radarPage.validateSearchVisible()

      radarPage.typeString('/')
      radarPage.validateSearchFocused()

      radarPage.typeStringInSearch('abc/def 123/456')
      radarPage.validateSearchValue('abc/def 123/456')

      radarPage.clickAlternateRadarItem(2)
      radarPage.validateActiveAlternateRadar(2)
      radarPage.validateInactiveAlternateRadar(1)
    })

    it('Validate public Google Sheet in tablet', () => {
      cy.viewport(1024, 768)
      cy.visit(Cypress.env('host'))

      byorPage.typeString('/')
      byorPage.validateUrlInputFocused()

      byorPage.typeStringInUrlInput('abc/def 123/456')
      byorPage.validateUrlInputValue('abc/def 123/456')

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

      radarPage.validateSearchVisible()

      radarPage.typeString('/')
      radarPage.validateSearchFocused()

      radarPage.typeStringInSearch('abc/def 123/456')
      radarPage.validateSearchValue('abc/def 123/456')

      radarPage.clickAlternateRadarItem(2)
      radarPage.validateActiveAlternateRadar(2)
      radarPage.validateInactiveAlternateRadar(1)
    })

    it('Validate public Google Sheet in mobile', () => {
      cy.viewport(360, 480)
      cy.visit(Cypress.env('host'))

      byorPage.typeString('/')
      byorPage.validateUrlInputFocused()

      byorPage.typeStringInUrlInput('abc/def 123/456')
      byorPage.validateUrlInputValue('abc/def 123/456')

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

      radarPage.validateSearchVisible()

      radarPage.typeString('/')
      radarPage.validateSearchFocused()

      radarPage.typeStringInSearch('abc/def 123/456')
      radarPage.validateSearchValue('abc/def 123/456')

      radarPage.clickAlternateRadarItem(2)
      radarPage.validateActiveAlternateRadar(2)
      radarPage.validateInactiveAlternateRadar(1)
    })
  })
} else {
  describe('Build radar with public Google Sheet (Old UI)', () => {
    it('Validate public Google sheet', () => {
      cy.visit(Cypress.env('host'))

      byorPage.providePublicSheetUrl()
      byorPage.clickSubmitButton()

      radarPage.validateBlipCountForPublicGoogleSheet()
    })
  })
}
