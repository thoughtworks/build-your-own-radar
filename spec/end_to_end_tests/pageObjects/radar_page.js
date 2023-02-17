class RadarPage {
  constructor() {
    this.blip = '.quadrant-group-second .blip-link'
    this.allBlips = '.blip-link'
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

  clickQuadrant() {
    cy.get(this.quadrant).click()
  }
}

module.exports = new RadarPage()
