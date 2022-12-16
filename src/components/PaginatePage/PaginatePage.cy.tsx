import { Provider } from "react-redux";
import store from "../../store/store";
import PaginatePage from "./PaginatePage";

let dataTable = [
  {
    id: "1",
    name: "daw",
    position: "dawddaw2",
    office: "ddawdaw",
    extn: "ddadadawd",
    start_date: "2001/12/31",
    isShowSalary: false,
  },
];

describe("App.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("is true", () => {
    cy.viewport(1000, 1000);
    expect(true).to.be.true; // yup, fine
  });

  it("show mount", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <PaginatePage dataTable={dataTable} />
      </Provider>
    );
  });

  it("show mount data-info", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <PaginatePage dataTable={dataTable} />
      </Provider>
    );

    cy.get('[data-hook="data-info"]').contains(
      "Showing 1 to 1 of 1 entries (filtered from 0 total entries)"
    );
  });

  it("show mount click", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <PaginatePage dataTable={dataTable} />
      </Provider>
    );

    cy.get('[data-hook="previous"]')
      .contains("Previous")
      .invoke("show")
      .trigger("click")
      .trigger("click");

    cy.wait(1000);

    cy.get('[data-hook="next"]')
      .contains("Next")
      .invoke("show")
      .trigger("click")
      .trigger("click")
      .trigger("click")
      .trigger("click")
      .trigger("click");

    cy.wait(1000);

    cy.get('[data-hook="previous"]')
      .contains("Previous")
      .invoke("show")
      .trigger("click")
      .trigger("click")
      .trigger("click")
      .trigger("click")
      .trigger("click");
  });
});
