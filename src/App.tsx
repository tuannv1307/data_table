import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import store from "./store/store";
import DataTable from "./components/DataTable/DataTable";
import { st, classes } from "./App.st.css";

import "./globals.st.css";

function App() {
  const tableRef = useRef();

  console.log(tableRef.current);
  return (
    <div className={st(classes.root)} data-hook="app">
      <div className={st(classes.dataTablesWrapper)}>
        <div className={st(classes.dataTablesLength)}>
          <label>
            Show{" "}
            <select
              name="example_length"
              aria-controls="example"
              className={st(classes.selectLength)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            entries
          </label>
        </div>
        <div id="example_filter" className={st(classes.dataTablesFilter)}>
          <label>
            Search:
            <input
              type="search"
              className={st(classes.inputSearch)}
              placeholder=""
              aria-controls="example"
            />
          </label>
        </div>
        <DataTable />
        <div className={st(classes.footer)}>
          <div
            className={st(classes.dataTablesInfo)}
            id="example_info"
            role="status"
            aria-live="polite"
          >
            Showing 1 to 10 of 57 entries
          </div>
          <div className={st(classes.dataTablesPaginate)} id="example_paginate">
            <a
              // className="paginate_button previous disabled"
              className={st(classes.paginateButton)}
              aria-controls="example"
              data-dt-idx="previous"
              id="example_previous"
            >
              Previous
            </a>
            <span>
              <a
                className={st(classes.paginateButton)}
                aria-controls="example"
                data-dt-idx="0"
              >
                1
              </a>
              <a
                className={st(classes.paginateButton)}
                aria-controls="example"
                data-dt-idx="1"
              >
                2
              </a>
              <a
                className={st(classes.paginateButton)}
                aria-controls="example"
                data-dt-idx="2"
              >
                3
              </a>
              <a
                className={st(classes.paginateButton)}
                aria-controls="example"
                data-dt-idx="3"
              >
                4
              </a>
              <a
                className={st(classes.paginateButton)}
                aria-controls="example"
                data-dt-idx="4"
              >
                5
              </a>
              <a
                className={st(classes.paginateButton)}
                aria-controls="example"
                data-dt-idx="5"
              >
                6
              </a>
            </span>
            <a
              className={st(classes.paginateButton)}
              aria-controls="example"
              data-dt-idx="next"
              id="example_next"
            >
              Next
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppProvider;
