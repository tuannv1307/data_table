import { useState, useEffect, ChangeEvent } from "react";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import store from "./store/store";
import DataTables from "./components/DataTables";
import { st, classes } from "./App.st.css";

import "./globals.st.css";
import { getData, showDataTable } from "./store/datatableReducer";
import { dataSet } from "./constants";

const showData = (arr: [], value: string) => {
  return arr.filter((i, index) => index < _.toNumber(value));
};

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.datatable);
  let dataTable = data?.data;
  const lengthData = dataTable?.length;
  const sizeData = data?.sizeData;
  const valueBtn = data?.valueBtn;
  const disabled = data?.disabled;

  useEffect(() => {
    dispatch(getData(dataSet));
  }, [dispatch]);

  const handleChangesizeData = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(showDataTable(e.target.value));
    showData(dataTable, sizeData);
  };

  // const [curentBtn, setCurrentBtn] = useState(false);

  const handleClickBtn = (value: string) => {
    // setCurrentBtn(!curentBtn);
    return value;
  };

  const handleClickBtnPrevious = (type: string) => {
    console.log(type);
  };

  console.log(data);

  return (
    <div className={st(classes.root)} data-hook="app">
      <div className={st(classes.dataTablesWrapper)}>
        <div className={st(classes.dataTablesLength)}>
          <label>
            Show{" "}
            <select
              className={st(classes.selectLength)}
              onChange={handleChangesizeData}
              value={sizeData}
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
        <DataTables dataTable={showData(dataTable, sizeData)} />
        <div className={st(classes.footer)}>
          <div
            className={st(classes.dataTablesInfo)}
            id="example_info"
            role="status"
            aria-live="polite"
          >
            Showing 1 to {showData(dataTable, sizeData).length} of {lengthData}{" "}
            entries
          </div>
          <div className={st(classes.dataTablesPaginate)} id="example_paginate">
            <a
              // className="paginate_button previous disabled"
              className={st(classes.paginateButton, { disabled })}
              onClick={() => handleClickBtnPrevious("PREVIOUS")}
            >
              Previous
            </a>
            <span>
              <a
                className={st(classes.paginateButton, { curentBtn: "1" })}
                onClick={() => handleClickBtn("1")}
              >
                1
              </a>
              <a
                className={st(classes.paginateButton, { curentBtn: "2" })}
                onClick={() => handleClickBtn("2")}
              >
                2
              </a>
              <a
                className={st(classes.paginateButton, { curentBtn: "3" })}
                onClick={() => handleClickBtn("3")}
              >
                3
              </a>
              <a
                className={st(classes.paginateButton, { curentBtn: "4" })}
                onClick={() => handleClickBtn("4")}
              >
                4
              </a>
              <a
                className={st(classes.paginateButton, { curentBtn: "5" })}
                onClick={() => handleClickBtn("5")}
              >
                5
              </a>
              <a
                className={st(classes.paginateButton, { curentBtn: "6" })}
                onClick={() => handleClickBtn("6")}
              >
                6
              </a>
            </span>
            <a
              className={st(classes.paginateButton, { disabled })}
              onClick={() => handleClickBtnPrevious("NEXT")}
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
