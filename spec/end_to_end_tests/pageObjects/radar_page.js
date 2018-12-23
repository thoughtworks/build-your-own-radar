class RadarPage {
  constructor () {
    this.blip = '.quadrant-group-second .blip-link'
    this.blip_selected = '.quadrant-table.selected .blip-list-item'
    this.blip_description = '.blip-item-description.expanded p'
    this.sheet2 = '.alternative'
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
}

module.exports = new RadarPage()
