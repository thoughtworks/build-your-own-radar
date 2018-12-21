var config = require('../../../cypress.json');

class byor_page{

    constructor(){
        this.text_box="[name='sheetId']";
        this.submit=".button";
    }
    provide_excel_name = function() {
        cy.get(this.text_box).type(config.excel);
    }

    click_submit_button = function() {
        cy.get(this.submit).click();
    }
}

module.exports = new byor_page();