import App from "./App";

describe("App.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(2000);
  // });

  it("is true", () => {
    cy.viewport(1000, 1000);
    expect(true).to.be.true; // yup, fine
  });

  it("show mount", () => {
    cy.viewport("macbook-15");

    cy.mount(<App />);
  });
  it("show mount with select length data", () => {
    cy.viewport("macbook-15");

    cy.mount(<App />);
    cy.get('[data-hook="seclect-length-data"]')
      .select(1)
      .should("have.value", 25)
      .wait(2000)
      .select(0);
  });

  it.only("show mount with input search", () => {
    cy.viewport("macbook-15");

    cy.mount(<App />);
    cy.get('[data-hook="input-search"]')
      .type("b")
      .wait(2000)
      .type("a")
      .wait(2000)
      .type("a")
      .wait(2000)
      .clear();
  });
});
