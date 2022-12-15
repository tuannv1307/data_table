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
    isShowSalary?: boolean;
  }[];
  sizeData: number;

  disabledPrev?: boolean;
  disabledNext?: boolean;
  isSort?: boolean;
  sortName: string;
  currentPage: number;
  linitPageData: number;
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
        isShowSalary?: boolean;
      }[]
    >
  ) => void;

  showDataTable: (state: Data_Tables, action: PayloadAction<number>) => void;
  showSalary: (
    state: Data_Tables,
    action: PayloadAction<{ id?: string; isShowSalaryIndex: boolean }>
  ) => void;
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
  changeName: (state: any, action: any) => void;
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

  setLimitPageData: (state: any, action: any) => void;
  setBtnPrevAndNext: (state: any, action: any) => void;
};

const initialData: Data_Tables = {
  data: [],
  sizeData: 10,

  disabledPrev: false,
  disabledNext: false,
  isSort: false,
  sortName: "name",
  currentPage: 1,
  linitPageData: 1,
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
      const sort = _.sortBy(state.data, ["name"]);
      state.data = _.cloneDeep(sort);
      state = _.cloneDeep(state);
    },

    showDataTable: (state, action) => {
      let size = action.payload;
      state.sizeData = _.cloneDeep(size);
      state.currentPage = 1;
      state.typeArr = "DATA_SET_LENGTH";
    },
    showSalary: (state, action) => {
      const { id, isShowSalaryIndex } = action.payload;
      const index = _.findIndex(state.data, (item) => item.id == id);
      state.data[index].isShowSalary = isShowSalaryIndex;
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

    changeName: (state, action) => {
      const {
        payload: { nameSort },
      } = action;
      state.isSort = true;
      state.sortName = nameSort;
      state = _.cloneDeep(state);
    },

    sortDesc: (state, action) => {
      const {
        payload: { nameSort },
      } = action;
      let sort = _.sortBy(state.data, [nameSort]);
      sort = _.reverse(sort);

      state.data = _.cloneDeep(sort);
      state = _.cloneDeep(state);
    },

    sortAsc: (state, action) => {
      const {
        payload: { nameSort },
      } = action;
      const sort = _.sortBy(state.data, [nameSort]);

      state.data = _.cloneDeep(sort);
      state = _.cloneDeep(state);
    },

    changeIsSort: (state, action) => {
      const {
        payload: { isSort },
      } = action;
      state.isSort = !isSort;
      state = _.cloneDeep(state);
    },

    setCurrentPage: (state, action) => {
      const {
        payload: { currentPage },
      } = action;
      state.currentPage = currentPage;

      state.typeArr = "DATA_SET_PAGINATE";
      state = _.cloneDeep(state);
    },

    setBtnPrevAndNext: (state, action) => {
      const {
        payload: { disabledPrev, disabledNext },
      } = action;
      state.disabledPrev = disabledPrev;
      state.disabledNext = disabledNext;
      state = _.cloneDeep(state);
    },

    searchData: (state, action) => {
      const {
        payload: { searchDataTable },
      } = action;
      state.currentPage = 1;
      state.searchDataTable = searchDataTable;

      state = _.cloneDeep(state);
    },
    setLimitPageData: (state, action) => {
      const {
        payload: { linitPageData },
      } = action;
      state.linitPageData = linitPageData;
      state = _.cloneDeep(state);
    },
  },

  extraReducers: {},
});

export const {
  getData,
  showDataTable,
  showSalary,
  editDataTable,
  sortDesc,
  sortAsc,
  changeIsSort,
  setCurrentPage,
  setBtnPrevAndNext,
  searchData,
  changeName,
  setLimitPageData,
} = dataTablesSlice.actions;

export default dataTablesSlice.reducer;
