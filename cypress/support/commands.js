// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("clickViewEmployeeData", () => {
    cy.contains('View selected data').click()
})

Cypress.Commands.add("selectNothing", () => {
    cy.contains('View selected data').click()
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 0)
})

Cypress.Commands.add("selectRandomEmpoyee", () => {
    cy.get('.jqx-tree-grid-checkbox').then(($checkboxes) => {
        const checkboxes = $checkboxes.toArray()
        const randomCheckbox = Cypress._.sample(checkboxes)
        cy.get(randomCheckbox).click()
    })
})

Cypress.Commands.add("selectMultipleRandomEmpoyee", () => {
    cy.get('.jqx-tree-grid-checkbox')
        .then(($checkboxes) => {
            const checkboxes = $checkboxes.toArray()
            const randomCheckboxes = Cypress._.sampleSize(checkboxes, 2)
            cy.get(randomCheckboxes).click({ multiple: true })
        })
})

Cypress.Commands.add("checkAllEmployees", () => {
    return cy.get("tbody").find("tr").find(".jqx-tree-grid-checkbox").as("employeesCheck").click({ multiple: true })
})