class radar_page{

    constructor(){
        this.blip=".quadrant-group-second .blip-link";
        this.blip_selected=".quadrant-table.selected .blip-list-item";
        this.blip_description=".blip-item-description.expanded p";
        this.sheet2=".alternative";
    }

    click_the_blip_from_interactive_section = function() {
        cy.get(this.blip).click();
    }

    click_the_blip = function() {
        cy.get(this.blip_selected).click();
    }


    validate_blip_description = function(text) {
        expect(cy.get(this.blip_description).contains(text));
    }

    click_sheet2 = function() {
        cy.get(this.sheet2).click();
    }
}

module.exports = new radar_page();