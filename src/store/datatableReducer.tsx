import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type Data_Tables = {
  data: {
    id?: string;
    name?: string;
    position?: string;
    office?: string;
    extn?: string;
    salary?: string;
    start_date?: string;
  }[];
  sizeData: number;
  valueBtn?: string;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  isSort?: boolean;
  sortName: string;

  currentPage: number;
  totalPages: number;
  arrBtnPage: number[];
  limitBtn: number;
  typeArr: string;
  searchDataTable: string;
};

export type Actions = {
  getData: (
    state: Data_Tables,
    action: PayloadAction<
      {
        id?: string;
        name?: string;
        position?: string;
        office?: string;
        extn?: string;
        salary?: string;
        start_date?: string;
      }[]
    >
  ) => void;

  showDataTable: (state: Data_Tables, action: PayloadAction<number>) => void;

  editDataTable: (
    state: Data_Tables,
    action: PayloadAction<{
      id?: string;
      nameI?: string;
      positionI?: string;
      officeI?: string;
      extnI?: string;
      start_dateI?: string;
    }>
  ) => void;

  sortDesc: (
    state: Data_Tables,
    action: PayloadAction<{ nameSort: string }>
  ) => void;

  sortAsc: (
    state: Data_Tables,
    action: PayloadAction<{ nameSort: string }>
  ) => void;

  changeIsSort: (
    state: Data_Tables,
    action: PayloadAction<{ isSort?: boolean }>
  ) => void;

  setCurrentPage: (
    state: Data_Tables,
    action: PayloadAction<{ currentPage: number }>
  ) => void;

  searchData: (
    state: Data_Tables,
    action: PayloadAction<{ searchDataTable: string }>
  ) => void;
};

const initialData: Data_Tables = {
  data: [],
  sizeData: 10,
  disabledPrev: false,
  disabledNext: false,
  isSort: false,
  sortName: "name",

  currentPage: 1,
  totalPages: 6,
  arrBtnPage: [],
  limitBtn: 6,
  typeArr: "DATA_SET_LENGTH",
  searchDataTable: "",
};

export type TicTacToeActionPayload = {};

const dataTablesSlice = createSlice<Data_Tables, Actions>({
  name: "datatable",
  initialState: initialData as Data_Tables,
  reducers: {
    getData: (state, action) => {
      const datas = action.payload;
      state.data = datas;
      state.disabledPrev = state.currentPage === 1 ? true : false;
      state.disabledNext = state.currentPage === state.limitBtn ? true : false;
      const sort = _.sortBy(state.data, ["name"]);
      const arrPages = [];
      for (let index = 1; index <= state.limitBtn; index++) {
        arrPages.push(index);
      }
      state.arrBtnPage = _.cloneDeep(arrPages);
      state.data = _.cloneDeep(sort);
      state.data = _.cloneDeep(state.data);
      state = _.cloneDeep(state);
    },

    showDataTable: (state, action) => {
      let size = action.payload;
      state.sizeData = _.cloneDeep(size);
      const beforeNumber = state.data.length / state.sizeData;
      var valueLimit = parseInt(beforeNumber.toString().split(".")[0]);
      state.limitBtn = valueLimit + 1;
      const arrPages = [];
      for (let index = 1; index <= state.limitBtn; index++) {
        arrPages.push(index);
      }
      state.currentPage = 1;
      state.disabledPrev = state.currentPage === 1 ? true : false;
      state.disabledNext = state.currentPage === state.limitBtn ? true : false;
      state.limitBtn = _.cloneDeep(state.limitBtn);
      state.arrBtnPage = _.cloneDeep(arrPages);
      state.arrBtnPage = _.cloneDeep(state.arrBtnPage);
      state.typeArr = "DATA_SET_LENGTH";
      state = _.cloneDeep(state);
    },

    editDataTable: (state, action) => {
      const {
        payload: { id, nameI, positionI, officeI, extnI, start_dateI },
      } = action;
      if (id) {
        const newData = state.data.map((item) =>
          item.id === id
            ? {
                ...item,
                name: nameI,
                position: positionI,
                office: officeI,
                extn: extnI,
                start_date: start_dateI,
              }
            : item
        );
        state.data = _.cloneDeep(newData);
      }
    },

    sortDesc: (state, action) => {
      const {
        payload: { nameSort },
      } = action;
      let sort = _.sortBy(state.data, [nameSort]);
      sort = _.reverse(sort);
      state.sortName = nameSort;
      state.sortName = _.cloneDeep(state.sortName);
      state.data = _.cloneDeep(sort);
      state = _.cloneDeep(state);
    },

    sortAsc: (state, action) => {
      const {
        payload: { nameSort },
      } = action;
      const sort = _.sortBy(state.data, [nameSort]);
      state.sortName = nameSort;
      state.sortName = _.cloneDeep(state.sortName);
      state.data = _.cloneDeep(sort);
      state = _.cloneDeep(state);
    },

    changeIsSort: (state, action) => {
      const {
        payload: { isSort },
      } = action;
      state.isSort = !isSort;
      state.isSort = _.cloneDeep(state.isSort);
      state = _.cloneDeep(state);
    },

    setCurrentPage: (state, action) => {
      const {
        payload: { currentPage },
      } = action;
      state.currentPage = currentPage;
      state.disabledPrev = state.currentPage === 1 ? true : false;
      state.disabledNext = state.currentPage === state.limitBtn ? true : false;
      state.currentPage = _.cloneDeep(state.currentPage);
      state.typeArr = "DATA_SET_PAGINATE";
      state = _.cloneDeep(state);
    },
    searchData: (state, action) => {
      const {
        payload: { searchDataTable },
      } = action;
      state.searchDataTable = searchDataTable;
      state.searchDataTable = _.cloneDeep(state.searchDataTable);
      state = _.cloneDeep(state);
    },
  },
  extraReducers: {},
});

export const {
  getData,
  showDataTable,
  editDataTable,
  sortDesc,
  sortAsc,
  changeIsSort,
  setCurrentPage,
  searchData,
} = dataTablesSlice.actions;

export default dataTablesSlice.reducer;
