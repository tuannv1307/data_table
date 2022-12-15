import { Provider } from "react-redux";
import store from "../../store/store";
import DataTables from "./DataTables";
describe("App.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("is true", () => {
    cy.viewport(1000, 1000);
    expect(true).to.be.true; // yup, fine
  });
  it("show mount no data", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <DataTables />
      </Provider>
    );
  });
  it("show mount with data", () => {
    cy.viewport("macbook-15");
    const dataTable = [
      {
        name: "abc",
        position: "bcb",
        office: "dawd",
        extn: "hfth",
        start_date: "jyh",
        salary: "hrbed",
      },
      {
        name: "yww",
        position: "qwr",
        office: "mnb",
        extn: "ouy",
        start_date: "czvb",
        salary: "fsec",
      },
      {
        name: "fcfaw",
        position: "fscxv",
        office: "poiu",
        extn: "dawvv",
        start_date: "ooiem",
        salary: "string",
      },
    ];
    cy.mount(
      <Provider store={store}>
        <DataTables dataTable={dataTable} />
      </Provider>
    );

    cy.get('[data-hook="sorting"]').eq(0).wait(1000).click().wait(1000).click();
    cy.get('[data-hook="sorting"]').eq(1).wait(1000).click().wait(1000).click();
    cy.get('[data-hook="sorting"]').eq(2).wait(1000).click().wait(1000).click();
    cy.get('[data-hook="sorting"]').eq(3).wait(1000).click().wait(1000).click();
    cy.get('[data-hook="sorting"]').eq(4).wait(1000).click().wait(1000).click();
  });
  it("show mount with data", () => {
    cy.viewport("macbook-15");

    const dataTable = [
      {
        name: "abc",
        position: "bcb",
        office: "dawd",
        extn: "hfth",
        start_date: "jyh",
        salary: "hrbed",
      },
      {
        name: "yww",
        position: "qwr",
        office: "mnb",
        extn: "ouy",
        start_date: "czvb",
        salary: "fsec",
      },
      {
        name: "fcfaw",
        position: "fscxv",
        office: "poiu",
        extn: "dawvv",
        start_date: "ooiem",
        salary: "string",
      },
    ];

    cy.mount(
      <Provider store={store}>
        <DataTables dataTable={dataTable} />
      </Provider>
    );

    cy.get('[data-hook="dtrControl"]')
      .eq(0)
      .wait(1000)
      .click()
      .wait(1000)
      .click();
    cy.get('[data-hook="dtrControl"]').eq(0).wait(1000).dblclick().wait(1000);
    cy.get('[data-hook="input-edit"]')
      .eq(1)
      .focus()
      .type("123tuan")
      .trigger("keydown", { key: "Enter" });
  });
});
