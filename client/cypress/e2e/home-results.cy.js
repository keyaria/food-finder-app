/// <reference types="cypress" />

describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("has a google map", () => {
    // comes from Google Maps
    cy.get(".gm-style").should("be.visible");
  });

  it("gets a restaurant and displays on load", () => {
    cy.get('[data-testid="restaurant"]').should("exist");

    // ratings should be visible
    cy.get(".rr--box").should("be.visible");
  });

  it("able to type input", () => {
    cy.get('[data-testid="search"]').type("kebab");
    cy.get('[data-testid="search"]').should("have.value", "kebab");
  });

  it("should redirect to restaurant page onClick", () => {
    cy.get('[data-testid="heading"]').click();
    expect("photos").to.be.exist;
  });
});
