import { useEffect, ChangeEvent } from "react";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import store from "./store/store";
import DataTables from "./components/DataTables";
import { st, classes } from "./App.st.css";
import "./globals.st.css";
import {
  Data_Tables,
  getData,
  searchData,
  showDataTable,
} from "./store/datatableReducer";
import { dataSet } from "./constants";
import PaginatePage from "./components/PaginatePage/PaginatePage";

const showDataLength = (
  arr: {
    id?: string;
    name?: string;
    position?: string;
    office?: string;
    extn?: string;
    salary?: string;
    start_date?: string;
  }[],
  value: number
) => {
  return _.slice(arr, 0, _.toNumber(value));
};

const getPaginatedData = (
  dataTable: {
    id?: string;
    name?: string;
    position?: string;
    office?: string;
    extn?: string;
    salary?: string;
    start_date?: string;
  }[],
  currentPage: number,
  sizeData: number
) => {
  const startIndex = currentPage * sizeData - sizeData;
  const endIndex = startIndex + sizeData;
  return _.slice(dataTable, startIndex, endIndex);
};

function App() {
  const data: Data_Tables = useSelector(
    (state: { datatable: Data_Tables }) => state.datatable
  );
  const dispatch = useDispatch();
  let dataTable: any = data?.data;
  const sizeData = data?.sizeData;
  let currentPage = data?.currentPage;
  const typeArr = data?.typeArr;
  let searchDataTable = data?.searchDataTable;

  useEffect(() => {
    dispatch(getData(dataSet));
  }, [dispatch]);

  const handleChangesizeData = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(showDataTable(_.toNumber(e.target.value)));
  };

  const handleSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    searchDataTable = e.target.value;
    dispatch(searchData({ searchDataTable }));
  };

  dataTable = _.filter(dataTable, (data) => {
    return (
      (data.name &&
        data.name
          .toString()
          .toLowerCase()
          .indexOf(searchDataTable.toLowerCase()) > -1) ||
      (data.position &&
        data.position
          .toString()
          .toLowerCase()
          .indexOf(searchDataTable.toLowerCase()) > -1) ||
      (data.office &&
        data.office
          .toString()
          .toLowerCase()
          .indexOf(searchDataTable.toLowerCase()) > -1) ||
      (data.extn &&
        data.extn
          .toString()
          .toLowerCase()
          .indexOf(searchDataTable.toLowerCase()) > -1) ||
      (data.start_date &&
        data.start_date
          .toString()
          .toLowerCase()
          .indexOf(searchDataTable.toLowerCase()) > -1)
    );
  });
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
              data-hook="seclect-length-data"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
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
              onInput={handleSearchData}
              data-hook="input-search"
            />
          </label>
        </div>
        <DataTables
          dataTable={
            typeArr === "DATA_SET_LENGTH"
              ? showDataLength(dataTable, sizeData)
              : getPaginatedData(dataTable, currentPage, sizeData)
          }
        />
        <PaginatePage />
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
