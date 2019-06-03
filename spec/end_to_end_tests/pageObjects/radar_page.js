class RadarPage {
  constructor () {
    this.blip = '.quadrant-group-second .blip-link'
    this.blip_selected = '.quadrant-table.selected .blip-list-item'
    this.blip_description = '.blip-item-description.expanded p'
    this.sheet2 = '.alternative'
    this.autocomplete = '.search-radar'
    this.search_value = 'Babel'
    this.search_item = '.ui-menu-item:first'
    this.title = '.radar-title .radar-title__text h1'
    this.subtitle = '.radar-title .radar-sub-title__text h2'
  }

  clickTheBlipFromInteractiveSection () {
    cy.get(this.blip).click()
  }

  clickTheBlip () {
    cy.get(this.blip_selected).click()
  }

  validateBlipDescription (text) {
    expect(cy.get(this.blip_description).contains(text))
  }

  clickSheet2 () {
    cy.get(this.sheet2).click()
  }

  searchTheBlip () {
    cy.get(this.autocomplete).type(this.search_value)
    cy.get(this.search_item).click()
  }

  validateBlipSearch () {
    expect(cy.get(this.blip_selected).contains(this.search_value))
  }

  verifyTitle (title) {
    expect(cy.get(this.title).contains(title))
  }

  verifySubTitle (subtitle) {
    expect(cy.get(this.subtitle).contains(subtitle))
  }

  verifyEmptySubTitle () {
    expect(cy.get(this.subtitle).empty)
  }
}

module.exports = new RadarPage()
