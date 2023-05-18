const byorPage = require('../pageObjects/byor_page')
const radarPage = require('../pageObjects/radar_page')
const testConfig = require('../config.json')

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
      radarPage.validateRingsInQuadrantTable(3)
      radarPage.validateBlipsInQuadrantTable(32)
    })

    it('verify click on blip in quadrant table', () => {
      radarPage.clickQuadrantInFullRadarView('first')

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescription('component visual regression testing')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
    })

    it('verify click on blip in Radar graph in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarView('first')

      radarPage.clickBlipItemInQuadrantTable(2)

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(3)
    })

    it('verify click on blip in Radar graph', () => {
      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateActiveQuadrant('techniques', 'first')
    })

    it('verify click on group-blip in Radar graph', () => {
      radarPage.clickBlipInRadarGraph('first-adopt-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
    })

    it('verify group-blip text in Radar graph', () => {
      radarPage.validateBlipText('blip-link-first-adopt-group-new-blips', '2 new blips')
      radarPage.validateBlipText('blip-link-first-adopt-group-existing-blips', '9 existing blips')
    })

    it('verify group-blip tooltip text with all blip names in Radar graph', () => {
      radarPage.validateBlipToolTip(
        'blip-link-first-adopt-group-new-blips',
        '1. Path-to-production mapping3. Team cognitive load',
      )
      radarPage.validateBlipToolTip(
        'blip-link-first-adopt-group-existing-blips',
        '4. Threat modeling5. Backstage6. Delta Lake7. Delta Lake8. Great Expectations9. Kotest10. NestJS11. React Query12. Swift Package Manager',
      )
    })

    it('verify group-blip tooltip text with click-to-view-all text in Radar graph', () => {
      radarPage.validateBlipToolTip('blip-link-first-assess-group-new-blips', 'Click to view all')
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
      radarPage.validateSearchResults('framework', 10)
    })

    it('verify click on search result in Radar view', () => {
      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
    })

    it('verify click on search result in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarView('first')
      radarPage.triggerSearch('carbon lang')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(38)
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

    it('verify click on group-blip in Radar graph', () => {
      radarPage.clickBlipInRadarGraph('first-assess-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
    })

    it('verify group-blip text in Radar graph', () => {
      radarPage.validateBlipText('blip-link-first-adopt-group-new-blips', '2 new blips')
      radarPage.validateBlipText('blip-link-first-adopt-group-existing-blips', '9 existing blips')
    })

    it('verify group-blip text does not appear in quadrant view', () => {
      radarPage.clickBlipInRadarGraph('first-adopt-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateNoBlipToolTip('blip-link-first-adopt-group-new-blips')
      radarPage.validateNoBlipToolTip('blip-link-first-adopt-group-existing-blips')
    })

    it('blip in table gets highlighted on hover on blip in graph', () => {
      radarPage.clickBlipInRadarGraph('first-adopt-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
      const blipId = '2'
      radarPage.hoverBlipInRadarGraph(blipId)
      radarPage.validBlipHighlightedInQuadrantTable(blipId)
    })

    it('verify group-blip tooltip text with click-to-view-all text in Radar graph', () => {
      radarPage.validateBlipToolTip('blip-link-first-assess-group-new-blips', 'Click to view all')
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
      radarPage.validateRingsInQuadrantTable(3)
      radarPage.validateBlipsInQuadrantTable(32)
    })

    it('verify click on blip in quadrant table', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescription('component visual regression testing')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
    })

    it('verify click on blip in Radar graph in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')

      radarPage.clickBlipItemInQuadrantTable(2)

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(3)
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
      radarPage.validateSearchResults('framework', 10)
    })

    it('verify click on search result in Radar view', () => {
      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
    })

    it('verify click on search result in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.triggerSearch('carbon lang')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(38)
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
    it('verify click on group-blip in Radar graph', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.clickBlipInRadarGraph('first-assess-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
    })

    it('verify group-blip text in Radar graph', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipText('blip-link-first-adopt-group-new-blips', '2 new blips')
      radarPage.validateBlipText('blip-link-first-adopt-group-existing-blips', '9 existing blips')
    })

    it('verify group-blip text does not appear in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateNoBlipToolTip('blip-link-first-adopt-group-new-blips')
      radarPage.validateNoBlipToolTip('blip-link-first-adopt-group-existing-blips')
    })

    it('blip in table gets highlighted on hover on blip in graph', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      const blipId = '2'
      radarPage.hoverBlipInRadarGraph(blipId)
      radarPage.validBlipHighlightedInQuadrantTable(blipId)
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
      radarPage.validateRingsInQuadrantTable(3)
      radarPage.validateBlipsInQuadrantTable(32)
    })

    it('verify click on blip in quadrant table', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescription('component visual regression testing')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(3)
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
      radarPage.validateSearchResults('framework', 10)
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
      radarPage.triggerSearch('carbon lang')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrantInSubnav('languages---frameworks')
      radarPage.validateGraphHidden()
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(38)
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
      radarPage.validateRingsInQuadrantTable(3)
      radarPage.validateBlipsInQuadrantTable(32)
    })

    it('verify click on blip in quadrant table', () => {
      radarPage.clickQuadrantInFullRadarView('first')

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescription('component visual regression testing')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
    })

    it('verify click on blip in Radar graph in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarView('first')

      radarPage.clickBlipItemInQuadrantTable(2)

      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(1)
    })

    it('verify click on blip in Radar graph', () => {
      radarPage.clickBlipInRadarGraph(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
      radarPage.validateActiveQuadrant('techniques', 'first')
    })

    it('verify click on group-blip in Radar graph', () => {
      radarPage.clickBlipInRadarGraph('first-adopt-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
    })

    it('verify group-blip text in Radar graph', () => {
      radarPage.validateBlipText('blip-link-first-adopt-group-new-blips', '2 new blips')
      radarPage.validateBlipText('blip-link-first-adopt-group-existing-blips', '9 existing blips')
    })

    it('verify group-blip tooltip text with all blip names in Radar graph', () => {
      radarPage.validateBlipToolTip(
        'blip-link-first-adopt-group-new-blips',
        '1. Path-to-production mapping3. Team cognitive load',
      )
      radarPage.validateBlipToolTip(
        'blip-link-first-adopt-group-existing-blips',
        '4. Threat modeling5. Backstage6. Delta Lake7. Delta Lake8. Great Expectations9. Kotest10. NestJS11. React Query12. Swift Package Manager',
      )
    })

    it('verify group-blip tooltip text with click-to-view-all text in Radar graph', () => {
      radarPage.validateBlipToolTip('blip-link-first-assess-group-new-blips', 'Click to view all')
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
      radarPage.validateSearchResults('framework', 10)
    })

    it('verify click on search result in Radar view', () => {
      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
    })

    it('verify click on search result in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarView('first')
      radarPage.triggerSearch('carbon lang')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(38)
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

    it('verify click on group-blip in Radar graph', () => {
      radarPage.clickBlipInRadarGraph('first-assess-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
    })

    it('verify group-blip text in Radar graph', () => {
      radarPage.validateBlipText('blip-link-first-adopt-group-new-blips', '2 new blips')
      radarPage.validateBlipText('blip-link-first-adopt-group-existing-blips', '9 existing blips')
    })

    it('verify group-blip text does not appear in quadrant view', () => {
      radarPage.clickBlipInRadarGraph('first-adopt-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateNoBlipToolTip('blip-link-first-adopt-group-new-blips')
      radarPage.validateNoBlipToolTip('blip-link-first-adopt-group-existing-blips')
    })

    it('blip in table gets highlighted on hover on blip in graph', () => {
      radarPage.clickBlipInRadarGraph('first-adopt-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
      const blipId = '2'
      radarPage.hoverBlipInRadarGraph(blipId)
      radarPage.validBlipHighlightedInQuadrantTable(blipId)
    })

    it('verify group-blip tooltip text with click-to-view-all text in Radar graph', () => {
      radarPage.validateBlipToolTip('blip-link-first-assess-group-new-blips', 'Click to view all')
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
      radarPage.validateRingsInQuadrantTable(3)
      radarPage.validateBlipsInQuadrantTable(32)
    })

    it('verify click on blip in quadrant table', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescription('component visual regression testing')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
    })

    it('verify click on blip in Radar graph in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')

      radarPage.clickBlipItemInQuadrantTable(2)

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
      radarPage.validateSearchResults('framework', 10)
    })

    it('verify click on search result in Radar view', () => {
      radarPage.triggerSearch('framework')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)
    })

    it('verify click on search result in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.triggerSearch('carbon lang')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrant('languages---frameworks', 'fourth')
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(38)
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

    it('verify click on group-blip in Radar graph', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.clickBlipInRadarGraph('first-assess-group-new-blips')
      radarPage.validateActiveQuadrant('techniques', 'first')
    })

    it('verify group-blip text in Radar graph', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateBlipText('blip-link-first-adopt-group-new-blips', '2 new blips')
      radarPage.validateBlipText('blip-link-first-adopt-group-existing-blips', '9 existing blips')
    })

    it('verify group-blip text does not appear in quadrant view', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      radarPage.validateNoBlipToolTip('blip-link-first-adopt-group-new-blips')
      radarPage.validateNoBlipToolTip('blip-link-first-adopt-group-existing-blips')
    })

    it('blip in table gets highlighted on hover on blip in graph', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.validateActiveQuadrant('techniques', 'first')
      const blipId = '2'
      radarPage.hoverBlipInRadarGraph(blipId)
      radarPage.validBlipHighlightedInQuadrantTable(blipId)
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
      radarPage.validateRingsInQuadrantTable(3)
      radarPage.validateBlipsInQuadrantTable(32)
    })

    it('verify click on blip in quadrant table', () => {
      radarPage.clickQuadrantInFullRadarViewTablet('first')
      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescription('component visual regression testing')
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
      radarPage.validateSearchResults('framework', 10)
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
      radarPage.triggerSearch('carbon lang')
      radarPage.clickSearchResult(1)
      radarPage.validateActiveQuadrantInSubnav('languages---frameworks')
      radarPage.validateGraphHidden()
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(38)
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

describe('Validate public Google Sheet', () => {
  beforeEach(function () {
    if (Cypress.currentTest.title !== 'Validate public Google Sheet') {
      cy.visit(Cypress.env('host') + `/?documentId=${encodeURIComponent(testConfig.PUBLIC_GOOGLE_SHEET_URL)}`)
    }
  })

  context('Desktop resolution (1440px)', () => {
    it('Validate public Google Sheet in desktop', () => {
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

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)

      radarPage.clickBlipInRadarGraph(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(2)

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

      radarPage.validateBlipToolTip('blip-link-second-trial-group-new-blips', 'Click to view all')
      radarPage.validateBlipToolTip(
        'blip-link-second-trial-group-existing-blips',
        '30. Colima32. DataHub34. eBPF39. Teleport51. Apache Superset56. Excalidraw60. Spectral',
      )

      radarPage.clickBlipInRadarGraph('second-trial-group-new-blips')
      radarPage.validateActiveQuadrant('platforms', 'second')

      radarPage.validateBlipText('blip-link-second-trial-group-new-blips', '17 new blips')
      radarPage.validateBlipText('blip-link-second-trial-group-existing-blips', '7 existing blips')

      radarPage.validateNoBlipToolTip('blip-link-second-trial-group-new-blips')
      radarPage.validateNoBlipToolTip('blip-link-second-trial-group-existing-blips')

      radarPage.hoverBlipInRadarGraph(41)
      radarPage.validBlipHighlightedInQuadrantTable(41)

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
  })

  context('Tablet resolution (1024px)', () => {
    beforeEach(function () {
      cy.viewport(1024, 768)
    })
    it('Validate public Google Sheet', () => {
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

      radarPage.clickBlipItemInQuadrantTable(2)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(2)

      radarPage.clickBlipInRadarGraph(1)
      radarPage.validateBlipDescriptionVibisbleInQuadrantTable(1)
      radarPage.validateBlipDescriptionHiddenInQuadrantTable(2)

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

      radarPage.clickQuadrantInFullRadarViewTablet('second')
      radarPage.validateActiveQuadrant('platforms', 'second')
      radarPage.validateBlipText('blip-link-second-trial-group-new-blips', '17 new blips')
      radarPage.validateBlipText('blip-link-second-trial-group-existing-blips', '7 existing blips')

      radarPage.validateNoBlipToolTip('blip-link-second-trial-group-new-blips')
      radarPage.validateNoBlipToolTip('blip-link-second-trial-group-existing-blips')

      radarPage.hoverBlipInRadarGraph(41)
      radarPage.validBlipHighlightedInQuadrantTable(41)

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
  })

  context('Mobile resolution (360px)', () => {
    beforeEach(function () {
      cy.viewport(360, 480)
    })
    it('Validate public Google Sheet', () => {
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
})
