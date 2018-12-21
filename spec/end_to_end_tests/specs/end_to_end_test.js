var byorPage = require("../pageObjects/byor_page");
var basePage = require("../pageObjects/base_page");
var radarPage = require("../pageObjects/radar_page");
var config = require('../../../cypress.json');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

describe("Build your radar", function(){
    it("validate 1st sheet", function(){
        cy.visit(Cypress.env('host'));
        byorPage.provide_excel_name();
        byorPage.click_submit_button();
        radarPage.click_the_blip_from_interactive_section();
        radarPage.click_the_blip();
        radarPage.validate_blip_description("test");
    });
});

describe("Validate multiple sheet", function() {
    it("validate 2nd sheet", function () {
        cy.visit(Cypress.env('host'));
        byorPage.provide_excel_name();
        byorPage.click_submit_button();
        radarPage.click_sheet2();
        radarPage.click_the_blip_from_interactive_section();
        radarPage.click_the_blip();
        radarPage.validate_blip_description("testing");
    });
});


