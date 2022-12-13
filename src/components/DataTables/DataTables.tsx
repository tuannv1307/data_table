import _ from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsShow,
  changeIsSort,
  sortAsc,
  sortDesc,
} from "../../store/datatableReducer";
import DataTable from "../dataTable";
import { st, classes } from "./DataTables.st.css";

export type DataTablesProps = {
  dataTable?: {
    name?: string;
    position?: string;
    office?: string;
    extn?: string;
    start_date?: string;
    salary?: string;
  }[];
};
const DataTables = ({ dataTable }: DataTablesProps) => {
  const data = useSelector((state: any) => state.datatable);

  let isSorted = data?.isSort;
  let isShowA = data?.isShowASC;
  let isShowD = data?.isShowDESC;
  const dispatch = useDispatch();

  const handleClickIsSort = (type: string) => {
    const isSort = isSorted;
    const nameSort = type;
    dispatch(changeIsSort({ isSort }));
    if (isSort) {
      dispatch(sortAsc({ nameSort }));
    } else {
      dispatch(sortDesc({ nameSort }));
    }
    if (type === "name") {
      const isShowNameA = !isShowA?.nameA;
      const isShowPositionA = false;
      const isShowOfficeA = false;
      const isShowExtnA = false;
      const isShowStartDateA = false;
      const isShowNameD = isShowA?.nameA;
      const isShowPositionD = false;
      const isShowOfficeD = false;
      const isShowExtnD = false;
      const isShowStartDateD = false;
      dispatch(
        changeIsShow({
          isShowNameA,
          isShowPositionA,
          isShowOfficeA,
          isShowExtnA,
          isShowStartDateA,
          isShowNameD,
          isShowPositionD,
          isShowOfficeD,
          isShowExtnD,
          isShowStartDateD,
        })
      );
    } else if (type === "position") {
      isSorted = false;
      const isShowNameA = false;
      const isShowPositionA = !isShowA?.positionA;
      const isShowOfficeA = false;
      const isShowExtnA = false;
      const isShowStartDateA = false;
      const isShowNameD = false;
      const isShowPositionD = isShowA?.positionA;
      const isShowOfficeD = false;
      const isShowExtnD = false;
      const isShowStartDateD = false;
      dispatch(
        changeIsShow({
          isShowNameA,
          isShowPositionA,
          isShowOfficeA,
          isShowExtnA,
          isShowStartDateA,
          isShowNameD,
          isShowPositionD,
          isShowOfficeD,
          isShowExtnD,
          isShowStartDateD,
        })
      );
    } else if (type === "office") {
      const isShowNameA = false;
      const isShowPositionA = false;
      const isShowOfficeA = !isShowA?.officeA;
      const isShowExtnA = false;
      const isShowStartDateA = false;
      const isShowNameD = false;
      const isShowPositionD = false;
      const isShowOfficeD = isShowA?.officeA;
      const isShowExtnD = false;
      const isShowStartDateD = false;
      dispatch(
        changeIsShow({
          isShowNameA,
          isShowPositionA,
          isShowOfficeA,
          isShowExtnA,
          isShowStartDateA,
          isShowNameD,
          isShowPositionD,
          isShowOfficeD,
          isShowExtnD,
          isShowStartDateD,
        })
      );
    } else if (type === "extn") {
      const isShowNameA = false;
      const isShowPositionA = false;
      const isShowOfficeA = false;
      const isShowExtnA = !isShowA?.extnA;
      const isShowStartDateA = false;
      const isShowNameD = false;
      const isShowPositionD = false;
      const isShowOfficeD = false;
      const isShowExtnD = isShowA?.extnA;
      const isShowStartDateD = false;
      dispatch(
        changeIsShow({
          isShowNameA,
          isShowPositionA,
          isShowOfficeA,
          isShowExtnA,
          isShowStartDateA,
          isShowNameD,
          isShowPositionD,
          isShowOfficeD,
          isShowExtnD,
          isShowStartDateD,
        })
      );
    } else {
      const isShowNameA = false;
      const isShowPositionA = false;
      const isShowOfficeA = false;
      const isShowExtnA = false;
      const isShowStartDateA = !isShowA?.startDateA;
      const isShowNameD = false;
      const isShowPositionD = false;
      const isShowOfficeD = false;
      const isShowExtnD = false;
      const isShowStartDateD = isShowA?.startDateA;
      dispatch(
        changeIsShow({
          isShowNameA,
          isShowPositionA,
          isShowOfficeA,
          isShowExtnA,
          isShowStartDateA,
          isShowNameD,
          isShowPositionD,
          isShowOfficeD,
          isShowExtnD,
          isShowStartDateD,
        })
      );
    }
  };

  return (
    <table id="example" className={st(classes.root)}>
      <thead>
        <tr>
          <th
            className={st(classes.sorting, {
              sortingAsc: isShowA?.nameA,
              sortingDesc: isShowD?.nameD,
            })}
            onClick={() => handleClickIsSort("name")}
          >
            Name
          </th>
          <th
            className={st(classes.sorting, {
              sortingAsc: isShowA?.positionA,
              sortingDesc: isShowD?.positionD,
            })}
            onClick={() => handleClickIsSort("position")}
          >
            Position
          </th>
          <th
            className={st(classes.sorting, {
              sortingAsc: isShowA?.officeA,
              sortingDesc: isShowD?.officeD,
            })}
            onClick={() => handleClickIsSort("office")}
          >
            Office
          </th>
          <th
            className={st(classes.sorting, {
              sortingAsc: isShowA?.extnA,
              sortingDesc: isShowD?.extnD,
            })}
            onClick={() => handleClickIsSort("extn")}
          >
            Extn.
          </th>
          <th
            className={st(classes.sorting, {
              sortingAsc: isShowA?.startDateA,
              sortingDesc: isShowD?.startDateD,
            })}
            onClick={() => handleClickIsSort("start_date")}
          >
            Start date
          </th>
        </tr>
      </thead>
      <tbody>
        {_.map(dataTable, (dataT, index) => (
          <DataTable {...dataT} key={index} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Extn.</th>
          <th>Start date</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default DataTables;
