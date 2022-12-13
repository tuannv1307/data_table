import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type DataTables = {
  data?: [];
  sizeData?: string;
  valueBtn?: string;
  disabled?: boolean;
  isSort?: boolean;
};

export type Actions = {
  getData: (state: any, action: any) => void;
  showDataTable: (state: any, action: any) => void;
  editDataTable: (state: any, action: any) => void;
  sortDesc: (state: any, action: any) => void;
  sortAsc: (state: any, action: any) => void;
  changeSort: (state: any, action: any) => void;
};

const initialData: DataTables = {
  data: [],
  sizeData: "10",
  valueBtn: "1" || "2" || "3" || "4" || "5" || "6",
  disabled: false,
  isSort: false,
};

export type TicTacToeActionPayload = {};

const dataTablesSlice = createSlice<DataTables, Actions>({
  name: "datatable",
  initialState: initialData as DataTables,
  reducers: {
    getData: (state, action) => {
      const datas = action.payload;
      state.sizeData = "10";
      state.data = datas;
      state.valueBtn = "1";
      state.disabled = state.valueBtn === "1" ? true : false;
      const sort = _.sortBy(state.data, ["name"]);
      state.data = _.cloneDeep(sort);
      state.data = _.cloneDeep(state.data);
      state = _.cloneDeep(state);
    },

    showDataTable: (state, action) => {
      let size = action.payload;
      state.sizeData = _.cloneDeep(size);
    },

    editDataTable: (state, action) => {
      const {
        payload: { id, nameI, positionI, officeI, extnI, start_dateI },
      } = action;
      if (id) {
        const newData = state.data.map((item: any) =>
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
    changeSort: (state, action) => {
      const {
        payload: { isSort },
      } = action;

      state.isSort = !isSort;
      state.isSort = _.cloneDeep(state.isSort);
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
  changeSort,
} = dataTablesSlice.actions;

export default dataTablesSlice.reducer;
