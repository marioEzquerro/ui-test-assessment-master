/// <reference types="cypress" />

describe('City of origin tests', () => {
  beforeEach(() => {
    cy.visit('./ui-test-assessment-master/employees.html')
  })

  it.only('view city with nothing selected', () => {
    cy.selectNothing()
  })

  it('view randomly selected employee with one item selected', () => {
    cy.get('.jqx-tree-grid-checkbox').then(($checkboxes) => {
      const checkboxes = $checkboxes.toArray()
      const randomCheckbox = Cypress._.sample(checkboxes)
      cy.get(randomCheckbox).click()
    })

    cy.clickViewEmployeeData()
    // TODO: check for proper name of selected?
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 1)
  })

  it('view selected employee Laura', () => {
    cy.get('#row5treeGrid .jqx-tree-grid-checkbox').click()
    cy.clickViewEmployeeData()
    
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 1)
    cy.get('#listBoxContentlistBoxSelected').invoke('text').then((text) => {
      cy.fixture('employeeData.json').then((data) => {
        expect(text).to.equal(data.lauraLocation)
      })
    })
  })

  it.skip('view data from 2 random people', () => {
    cy.get('.jqx-tree-grid-checkbox')
      .then(($checkboxes) => {
        const checkboxes = $checkboxes.toArray()
        // Use Lodash to select a certain number of random checkboxes
        const randomCheckboxes = Cypress._.sampleSize(checkboxes, 2)
        Cypress._.forEach(randomCheckboxes, ($checkbox) => {
          // fails here
          cy.wrap($checkbox).click()
        })
      })
  })

  it('deploy collapsed item and select Robert', () => {
    cy.get('.jqx-tree-grid-collapse-button').click()
    cy.get('#row6treeGrid .jqx-tree-grid-checkbox').click()
    
    cy.clickViewEmployeeData()
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 1)

    cy.get('#listBoxContentlistBoxSelected').invoke('text').then((text) => {
      cy.fixture('employeeData.json').then((data) => {
        expect(text).to.equal(data.robertLocation)
      })
    })
  })

  it('select and print all names and locations', () => {
    cy.get('.jqx-tree-grid-collapse-button').click()
    cy.get(".jqx-tree-grid-checkbox").click({ multiple: true })  
    cy.clickViewEmployeeData()
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 9)
  })
})
