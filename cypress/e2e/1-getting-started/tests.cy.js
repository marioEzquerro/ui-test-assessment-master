/// <reference types="cypress" />

describe('City of origin tests', () => {
  beforeEach(() => {
    cy.visit('./ui-test-assessment-master/employees.html')
  })

  it('view city with nothing selected', () => {
    cy.selectNothing()
  })

  it('view randomly selected employee with one item selected', () => {
    cy.selectRandomEmpoyee()
    cy.clickViewEmployeeData()

    //validate result
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 1)
  })

  it('view selected employee Laura', () => {
    cy.get('#row5treeGrid .jqx-tree-grid-checkbox').click()
    cy.clickViewEmployeeData()

    //validate result
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 1)
    cy.get('#listBoxContentlistBoxSelected').invoke('text').then((text) => {
      cy.fixture('employeeData.json').then((data) => {
        expect(text).to.equal(data.lauraLocation)
      })
    })
  })

  it.skip('view data from 2 random people', () => {
    cy.selectMultipleRandomEmpoyee()

    //validate result
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 2)
  })

  it('deploy collapsed item and select Robert', () => {
    cy.clickCollapseButton()
    cy.get('#row6treeGrid .jqx-tree-grid-checkbox').click()

    cy.clickViewEmployeeData()

    //validate result
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 1)
    cy.get('#listBoxContentlistBoxSelected').invoke('text').then((text) => {
      cy.fixture('employeeData.json').then((data) => {
        expect(text).to.equal(data.robertLocation)
      })
    })
  })

  it('select and print all names and locations', () => {
    cy.clickCollapseButton()
    cy.get(".jqx-tree-grid-checkbox").click({ multiple: true })
    cy.clickViewEmployeeData()

    //validate result
    cy.get('#listBoxContentlistBoxSelected').children().should('have.length', 9)
  })
})
