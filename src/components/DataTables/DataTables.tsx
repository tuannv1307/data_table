import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  Data_Tables,
  changeIsSort,
  sortAsc,
  sortDesc,
  changeName,
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
  const data: Data_Tables = useSelector(
    (state: { datatable: Data_Tables }) => state.datatable
  );

  let isSorted = data?.isSort;
  let sortName = data?.sortName;

  const dispatch = useDispatch();

  const handleClickIsSort = (type: string) => {
    let isSort;
    if (sortName === type) {
      isSort = !isSorted;
    } else {
      isSort = true;
    }
    const nameSort = type;
    dispatch(changeName({ nameSort }));
    dispatch(changeIsSort({ isSort }));
    if (isSort === true) {
      dispatch(sortAsc({ nameSort }));
    } else if (isSort === false) {
      dispatch(sortDesc({ nameSort }));
    }
  };

  const handleChangeClassNameSort = (type: string) => sortName === type;

  return (
    <table id="example" className={st(classes.root, { isSorted })}>
      <thead>
        <tr>
          <th
            className={st(classes.sorting, {
              sortingName: handleChangeClassNameSort("name"),
              sortName: "name",
            })}
            onClick={() => handleClickIsSort("name")}
            data-hook="sorting"
          >
            Name
          </th>
          <th
            className={st(classes.sorting, {
              sortingName: handleChangeClassNameSort("position"),
              sortName: "position",
            })}
            onClick={() => handleClickIsSort("position")}
            data-hook="sorting"
          >
            Position
          </th>
          <th
            className={st(classes.sorting, {
              sortingName: handleChangeClassNameSort("office"),
              sortName: "office",
            })}
            onClick={() => handleClickIsSort("office")}
            data-hook="sorting"
          >
            Office
          </th>
          <th
            className={st(classes.sorting, {
              sortingName: handleChangeClassNameSort("extn"),
              sortName: "extn",
            })}
            onClick={() => handleClickIsSort("extn")}
            data-hook="sorting"
          >
            Extn.
          </th>
          <th
            className={st(classes.sorting, {
              sortingName: handleChangeClassNameSort("start_date"),
              sortName: "start_date",
            })}
            onClick={() => handleClickIsSort("start_date")}
            data-hook="sorting"
          >
            Start date
          </th>
        </tr>
      </thead>
      <tbody>
        {dataTable && dataTable?.length > 0 ? (
          _.map(dataTable, (dataT, index) => (
            <DataTable {...dataT} key={index} />
          ))
        ) : (
          <tr>
            <td className={st(classes.notFound)} colSpan={5}>
              No data found, please try again!
            </td>
          </tr>
        )}
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
