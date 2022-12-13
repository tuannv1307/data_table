import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type DataTables = {
  data?: [];
  sizeData?: string;
  valueBtn?: string;
  disabled?: boolean;
  isSort?: boolean;
  isShowASC: {
    nameA: boolean;
    positionA: boolean;
    officeA: boolean;
    extnA: boolean;
    startDateA: boolean;
  };
  isShowDESC: {
    nameD: boolean;
    positionD: boolean;
    officeD: boolean;
    extnD: boolean;
    startDateD: boolean;
  };
};

export type Actions = {
  getData: (state: any, action: any) => void;
  showDataTable: (state: any, action: any) => void;
  editDataTable: (state: any, action: any) => void;
  sortDesc: (state: any, action: any) => void;
  sortAsc: (state: any, action: any) => void;
  changeIsSort: (state: any, action: any) => void;
  changeIsShow: (state: any, action: any) => void;
};

const initialData: DataTables = {
  data: [],
  sizeData: "10",
  valueBtn: "1" || "2" || "3" || "4" || "5" || "6",
  disabled: false,
  isSort: false,
  isShowASC: {
    nameA: true,
    positionA: false,
    officeA: false,
    extnA: false,
    startDateA: false,
  },
  isShowDESC: {
    nameD: false,
    positionD: false,
    officeD: false,
    extnD: false,
    startDateD: false,
  },
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
    changeIsSort: (state, action) => {
      const {
        payload: { isSort },
      } = action;

      state.isSort = !isSort;
      state.isSort = _.cloneDeep(state.isSort);
      state = _.cloneDeep(state);
    },
    changeIsShow: (state, action) => {
      const {
        payload: {
          isShowNameA,
          isShowPositionA,
          isShowOfficeA,
          isShowExtnA,
          isShowStartDateA,
        },
      } = action;
      const showA = {
        nameA: isShowNameA,
        positionA: isShowPositionA,
        officeA: isShowOfficeA,
        extnA: isShowExtnA,
        startDateA: isShowStartDateA,
      };
      const {
        payload: {
          isShowNameD,
          isShowPositionD,
          isShowOfficeD,
          isShowExtnD,
          isShowStartDateD,
        },
      } = action;
      const showD = {
        nameD: isShowNameD,
        positionD: isShowPositionD,
        officeD: isShowOfficeD,
        extnD: isShowExtnD,
        startDateD: isShowStartDateD,
      };
      state.isShowASC = showA;
      state.isShowDESC = showD;
      state.isShowASC = _.cloneDeep(state.isShowASC);
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
  changeIsShow,
} = dataTablesSlice.actions;

export default dataTablesSlice.reducer;
