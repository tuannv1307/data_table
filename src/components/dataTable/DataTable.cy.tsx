import { Provider } from "react-redux";
import store from "../../store/store";
import DataTable from "./DataTable";

describe("App.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("is true", () => {
    cy.viewport(1000, 1000);
    expect(true).to.be.true; // yup, fine
  });

  it("show mount with click", () => {
    cy.viewport("macbook-15");
    const arr = {
      name: "123",
      position: "456",
      office: "789",
      extn: "123456",
      start_date: "wfwer",
      salary: "dawpoi",
      id: "1",
    };
    cy.mount(
      <Provider store={store}>
        <DataTable {...arr} />
        <DataTable {...arr} />
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
