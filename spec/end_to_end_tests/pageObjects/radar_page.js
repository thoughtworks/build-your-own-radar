const config = require('../config.json')

class RadarPage {
  constructor() {
    this.blip = '.quadrant-group-second .blip-link:nth-of-type(1)'
    this.allBlips = '.blip-link'
    this.bannerTitle = '.hero-banner__title-text'
    this.graphTitle = '.hero-banner__subtitle-text'
    this.quadrantList = '.quadrant-subnav__list-item'
    this.quadrantDropdown = '.quadrant-subnav__dropdown'
    this.quadrantSelector = '.quadrant-subnav__dropdown-selector'
    this.platformsSubnavItem = '.quadrant-subnav__list-item:nth-child(3)'
    this.searchBox = '.search-container__input'
    this.searchResultItems = '.ui-menu-item'
    this.alternateRadarsItems = '.alternative-radars__list-item'
    this.blipSelectedOld = '.quadrant-table.selected .blip-list-item.highlight'
    this.blipDescriptionOld = '.blip-item-description.expanded p'
    this.blipDescription = '.blip-list__item-container.expand .blip-list__item-container__description'
    this.autocomplete = '.search-radar'
    this.searchValue = 'Component'
    this.searchItem = '.ui-menu-item:first'
    this.quadrant = '#second-quadrant-mobile'
    this.firstQuadrant = '.quadrant-group-first'
    this.quadrantTableRings = '.quadrant-table.selected .quadrant-table__ring-name'
    this.quadrantTableBlips = '.quadrant-table.selected .blip-list__item'
    this.subnavDropdown = '.quadrant-subnav__dropdown'
    this.subnavList = '.quadrant-subnav__list'
    this.radarGraphSvg = 'svg#radar-plot'
    this.mobileQuadrants = '.all-quadrants-mobile'
    this.tooltip = '.d3-tip'
    this.quadrantTableBlip = function (blipId) {
      return `.quadrant-table.selected .blip-list__item-container[data-blip-id="${blipId}"]`
    }
    this.quadrantTableBlipDescription = function (blipId) {
      return `.quadrant-table.selected .blip-list__item-container[data-blip-id="${blipId}"] #blip-description-${blipId}`
    }
    this.radarGraphBlip = function (blipId) {
      return `a.blip-link[data-blip-id="${blipId}"]`
    }
    this.subnavQuadrant = function (quadrantName) {
      return `.quadrant-subnav__list-item#subnav-item-${quadrantName}`
    }
    this.quadrantGraph = function (quadrantOrder) {
      return `.quadrant-group-${quadrantOrder}`
    }
    this.quadrantGraphTablet = function (quadrantOrder) {
      return `#${quadrantOrder}-quadrant-mobile`
    }
    this.searchResultByIndex = function (index) {
      return `.ui-menu-item:nth-child(${index})`
    }
    this.alternateRadarsItemByIndex = function (index) {
      return `.alternative-radars__list-item:nth-child(${index})`
    }

    this.quadrantNameGroup = function (order) {
      return `.quadrant-group.quadrant-group-${order} .quadrant-name-group`
    }

    this.quadrantRingName = function (order, index) {
      return `.quadrant-group-${order} .line-text:nth-of-type(${index})`
    }
  }

  clickTheBlipInFullRadarView() {
    cy.get(this.blip).click()
  }

  clickTheBlip() {
    cy.get(this.blipSelectedOld).click()
  }

  clickQuadrantInFullRadarView(quadrantOrder) {
    cy.get(this.quadrantGraph(quadrantOrder)).click()
  }

  clickQuadrantInFullRadarViewTablet(quadrantOrder) {
    cy.get(this.quadrantGraphTablet(quadrantOrder)).click()
  }

  clickBlipItemInQuadrantTable(blipId) {
    cy.get(this.quadrantTableBlip(blipId)).click()
  }

  clickBlipInRadarGraph(blipId) {
    cy.get(this.radarGraphBlip(blipId)).click()
  }

  hoverBlipInRadarGraph(blipId) {
    cy.get(this.radarGraphBlip(blipId)).trigger('mouseover')
  }

  clickQuadrantInSubnav(quadrantName) {
    cy.get(this.subnavQuadrant(quadrantName)).click()
  }

  clickSubnavDropdownTablet() {
    cy.get(this.subnavDropdown).click()
  }

  clickSearchResult(index) {
    cy.get(this.searchResultByIndex(index)).click()
  }

  clickAlternateRadarItem(index) {
    cy.get(this.alternateRadarsItemByIndex(index)).click()
  }

  searchTheBlip() {
    cy.get(this.autocomplete).type(this.searchValue)
    cy.get(this.searchItem).click()
  }

  triggerSearch(query) {
    cy.get(this.searchBox).clear()
    cy.get(this.searchBox).type(query)
  }

  typeString(string) {
    cy.get('body').type(string)
  }

  typeStringInSearch(string) {
    cy.get(this.searchBox).clear()
    cy.get(this.searchBox).type(string)
  }

  validateBlipDescription(text) {
    cy.get(this.blipDescription).contains(text)
  }

  validateBlipText(blipId, text) {
    cy.get(`#${blipId}`).contains(text)
  }

  validateNoBlipToolTip(blipId) {
    cy.get(`#${blipId}`).trigger('mouseout') // cleanup of previous hover
    cy.get(`#${blipId}`).trigger('mouseover')
    cy.get(this.tooltip).should('have.attr', 'style').and('contains', 'opacity: 0')
    cy.get(this.tooltip).should('have.attr', 'style').and('contains', 'pointer-events: none')
  }

  validateBlipToolTip(blipId, text) {
    cy.get(`#${blipId}`).trigger('mouseover')
    cy.get(this.tooltip).contains(text)
  }

  validateBlipDescriptionOld(text) {
    cy.get(this.blipDescriptionOld).contains(text)
  }

  validateBlipSearch() {
    cy.get(this.blipSelectedOld).contains(this.searchValue)
  }

  validateBlipCountForPublicGoogleSheet() {
    cy.get(this.allBlips).should('have.length', 115)
  }

  validateGraphTitle(title) {
    cy.get(this.graphTitle).should('have.text', title)
  }

  validateQuadrantNames() {
    cy.get(this.quadrantList).should('have.length', 5)

    let i = 1
    for (const quadrant of config.QUADRANT_NAMES) {
      cy.get(`${this.quadrantList}:nth-child(${i})`).should('have.text', quadrant)
      i++
    }
  }

  validateQuadrantNamesForPublicGoogleSheet() {
    cy.get(this.quadrantList).should('have.length', 5)

    let i = 1
    for (const quadrant of config.QUADRANT_NAMES) {
      cy.get(`${this.quadrantList}:nth-child(${i})`).should('have.text', quadrant)
      i++
    }
  }

  validateSearchResults(query, results) {
    this.triggerSearch(query)
    cy.get(this.searchResultItems).should('have.length', results)
  }

  validateAlternateRadarsForPublicGoogleSheet() {
    cy.get(this.alternateRadarsItems).should('have.length', 2)

    let i = 1
    for (const name of config.PUBLIC_GOOGLE_SHEET_RADAR_SHEET_NAMES) {
      cy.get(`${this.alternateRadarsItems}:nth-child(${i})`).should('have.text', name)
      i++
    }
  }

  validateQuadrantSubnavClick(name) {
    cy.get(this.quadrantDropdown).click()
    cy.get(this.platformsSubnavItem).click()
    cy.get(this.quadrantSelector).should('have.text', name)
  }

  validateRingsInQuadrantTable(count) {
    cy.get(this.quadrantTableRings).should('have.length', count)
  }

  validateBlipsInQuadrantTable(count) {
    cy.get(this.quadrantTableBlips).should('have.length', count)
  }

  validateBlipDescriptionVibisbleInQuadrantTable(blipId) {
    cy.get(this.quadrantTableBlip(blipId)).should('have.class', 'expand')
    cy.get(this.quadrantTableBlipDescription(blipId)).should('be.visible')
  }

  validBlipHighlightedInQuadrantTable(blipId) {
    cy.get(this.quadrantTableBlip(blipId)).parent('.blip-list__item').should('have.class', 'highlight')
  }

  validateBlipDescriptionHiddenInQuadrantTable(blipId) {
    cy.get(this.quadrantTableBlip(blipId)).should('not.have.class', 'expand')
    cy.get(this.quadrantTableBlipDescription(blipId)).should('be.hidden')
  }

  validateQuadrantGraphVisible(quadrantOrder) {
    cy.get(this.quadrantGraph(quadrantOrder)).should('be.visible')
  }

  validateQuadrantGraphHidden(quadrantOrder) {
    cy.get(this.quadrantGraph(quadrantOrder)).should('be.hidden')
  }

  validateActiveQuadrantInSubnav(quadrantName) {
    cy.get(this.subnavQuadrant(quadrantName)).should('have.class', 'active-item')
  }

  validateSubnavDropdownVisibleTablet() {
    cy.get(this.subnavList).should('be.visible')
  }

  validateSubnavDropdownHiddenTablet() {
    cy.get(this.subnavList).should('be.hidden')
  }

  validateActiveAlternateRadar(index) {
    cy.get(this.alternateRadarsItemByIndex(index)).should('have.class', 'active')
  }

  validateInactiveAlternateRadar(index) {
    cy.get(this.alternateRadarsItemByIndex(index)).should('not.have.class', 'active')
  }

  validateMobileQuadrantsVisible() {
    cy.get(this.mobileQuadrants).should('be.visible')
  }

  validateMobileQuadrantsHidden() {
    cy.get(this.mobileQuadrants).should('be.hidden')
  }

  validateGraphVisible() {
    cy.get(this.radarGraphSvg).should('be.visible')
  }

  validateGraphHidden() {
    cy.get(this.radarGraphSvg).should('be.hidden')
  }

  validateQuadrantOrder() {
    let i = 1
    for (const order of config.QUADRANT_ORDERS) {
      cy.get(this.quadrantNameGroup(order)).should('have.text', config.QUADRANT_NAMES[i])
      i += 1
    }
  }

  validateRingOrder() {
    let i = 1
    for (const order of config.QUADRANT_ORDERS) {
      cy.get(this.quadrantRingName(order, i)).should('have.text', config.RING_NAMES[i - 1])
      i += 1
    }
  }

  validateActiveQuadrant(quadrantName, quadrantOrder) {
    this.validateQuadrantGraphVisible(quadrantOrder)

    for (const order of config.QUADRANT_ORDERS.filter(function (order) {
      return order !== quadrantOrder
    })) {
      this.validateQuadrantGraphHidden(order)
    }

    this.validateActiveQuadrantInSubnav(quadrantName)
  }

  validateSearchVisible() {
    cy.get(this.searchBox).should('be.visible')
  }

  validateSearchFocused() {
    cy.get(this.searchBox).should('have.focus')
  }

  validateSearchValue(value) {
    cy.get(this.searchBox).should('have.value', value)
  }

  resetRadarView() {
    cy.get(this.bannerTitle).click()
  }
}

module.exports = new RadarPage()
