const config = require('../config.json')

class RadarPage {
  constructor() {
    this.blip = '.quadrant-group-second .blip-link'
    this.allBlips = '.blip-link'
    this.graphTitle = '.hero-banner__subtitle-text'
    this.quadrantList = '.quadrant-subnav__list-item'
    this.quadrantDropdown = '.quadrant-subnav__dropdown'
    this.quadrantSelector = '.quadrant-subnav__dropdown-selector'
    this.platformsSubnavItem = '.quadrant-subnav__list-item:nth-child(4)'
    this.searchBox = '.search-container__input'
    this.searchResultItems = '.ui-menu-item'
    this.alternateRadarsItems = '.alternative-radars__list-item'
    this.blip_selected = '.quadrant-table.selected .blip-list-item'
    this.blip_description = '.blip-item-description.expanded p'
    this.sheet2 = '.alternative'
    this.autocomplete = '.search-radar'
    this.search_value = 'Babel'
    this.search_item = '.ui-menu-item:first'
    this.quadrant = '#second-quadrant-mobile'
  }

  clickTheBlipFromInteractiveSection() {
    cy.get(this.blip).click()
  }

  clickTheBlip() {
    cy.get(this.blip_selected).click()
  }

  validateBlipDescription(text) {
    cy.get(this.blip_description).contains(text)
  }

  clickSheet2() {
    cy.get(this.sheet2).click()
  }

  searchTheBlip() {
    cy.get(this.autocomplete).type(this.search_value)
    cy.get(this.search_item).click()
  }

  validateBlipSearch() {
    cy.get(this.blip_selected).contains(this.search_value)
  }

  validateBlipCountForPublicGoogleSheet() {
    cy.get(this.allBlips).should('have.length', 103)
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
    for (const quadrant of config.PUBLIC_SHEET_QUADRANT_NAMES) {
      cy.get(`${this.quadrantList}:nth-child(${i})`).should('have.text', quadrant)
      i++
    }
  }

  validateSearchResults(query, results) {
    cy.get(this.searchBox).type(query)
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

  clickQuadrant() {
    cy.get(this.quadrant).click()
  }
}

module.exports = new RadarPage()
