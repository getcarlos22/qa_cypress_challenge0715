
import Nl_helper from '../../../support/helpers/Nl_helper';
import Nl_template_PO from '../../../support/pageObjects/Nl_template_PO';
/// <reference types="Cypress" />

describe('Check tracking parameters for non-product links', () => {
/** @type {Nl_helper} */
const nl_helper = new Nl_helper();

 /** @type {object} */
const nl_url_list = nl_helper.getTestData('nl_urls.json');

 for(let url in nl_url_list) {



 /** @type {string} */
//let nl_url = "https://news.shopping.check24.de/u/gm.php?prm=ebdoJ4DPl1_766749435_7203916_15&_esuh=_10_be0d3562e434e9bd22d671b841efd26c973833aa2f3e3154e5f13993e837d649";
let nl_url = nl_url_list[url];
 describe(`nl_url: ${nl_url}`, () => {
 /** @type {Nl_template_PO} */
const nl_template = new Nl_template_PO(nl_url);

 // Ignore errors from the site itself
Cypress.on('uncaught:exception', () => {
return false;
});

 //filter out all links which contain utm_campaign
it('C962349 Check if utm_campaign value of all non product links is the same, url', () => {
//open nl
cy.visit(nl_template.url);
//filter out all links which contain utm_campaign
cy.get('a[href*="utm_campaign"').each(page => {
//check if the links were found
cy.request(page.prop('href'))
})

 });
//check if all parameter values are equal to each other
it('check if all parameter values are equal to each other ', () => {
cy.visit(nl_template.url);
cy.get('a[href*="utm_campaign"').invoke('attr', 'href').should('contain', 'utm_campaign')
.then(href => {cy.request(href).its('status').should('eq', 200);})

 });

it('C955682 Check if wpset value of all non product links is the same, url: ',() => {
//open nl
cy.visit(nl_template.url);
//filter out all links which contain wpset
cy.get('a[href*="wpset"').each(page => {
//check if the links were found
cy.request(page.prop('href'))
})
});

 //check if all parameter values are equal to each other
it('check if all parameter values are equal to each other ', () => {
cy.visit(nl_template.url);
cy.get('a[href*="wpset"').invoke('attr', 'href').should('contain', 'wpset')
.then(href => {cy.request(href).its('status').should('eq', 200);})

 });
});
 }

});