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

  it("show mount with doubleclick", () => {
    cy.viewport("macbook-15");
    const obj = {
      name: "123",
      position: "456",
      office: "789",
      extn: "123456",
      start_date: "wfwer",
      salary: "dawpoi",
      id: "1",
      isShowSalary: false,
    };
    const obj2 = {
      name: "123",
      position: "456",
      office: "789",
      extn: "123456",
      start_date: "wfwer",
      salary: "dawpoi",
      id: "1",
      isShowSalary: true,
    };
    cy.mount(
      <Provider store={store}>
        <DataTable {...obj} />
        <DataTable {...obj2} />
      </Provider>
    );

    cy.get('[data-hook="dtrControl"]').eq(0).wait(1000).dblclick().wait(1000);
    cy.get('[data-hook="input-edit"]').focus().type("123tuan");

    cy.get('[data-hook="td-position"]').eq(1).wait(1000).dblclick().wait(1000);
  });
});
