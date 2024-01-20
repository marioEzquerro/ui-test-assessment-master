/// <reference types="cypress" />



describe('City of origin tests', () => {
  beforeEach(() => {
    cy.visit('./ui-test-assessment-master/employees.html')
  })

  it('view city with nothing selected', () => {
    cy.contains('View selected data').click()
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 0)
  })

  it('view randomly selected employee with one item selected', () => {
    cy.get('span.jqx-tree-grid-checkbox').then(($checkboxes) => {
      const checkboxes = $checkboxes.toArray();
      const randomCheckbox = Cypress._.sample(checkboxes);
      cy.wrap(randomCheckbox).click();
    })

    cy.contains('View selected from "Nancy"').click()
    // TODO: check for proper name of selected?
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 1)
  })
})
