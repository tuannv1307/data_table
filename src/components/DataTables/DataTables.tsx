import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { changeSort, sortAsc, sortDesc } from "../../store/datatableReducer";
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
  // const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getData(dataSet));
  // }, []);

  // const handleClickShow = () => {
  //   setIsShow(!isShow);
  // };
  const handleClickSortAsc = (type: string) => {
    const nameSort = type;
    dispatch(sortAsc({ nameSort }));
  };
  const handleClickSortDesc = (type: string) => {
    const nameSort = type;
    dispatch(sortDesc({ nameSort }));
  };
  // console.log(handleClickSortDesc(type))

  const handleClickIsSort = (type: string) => {
    const isSort = data?.isSort;
    const nameSort = type;
    dispatch(changeSort({ isSort }));
    if (isSort) {
      dispatch(sortAsc({ nameSort }));
    } else {
      dispatch(sortDesc({ nameSort }));
    }
  };

  return (
    <table id="example" className={st(classes.root)}>
      <thead>
        <tr>
          <th
            className={st(classes.name, classes.sorting)}
            onClick={() => handleClickIsSort("name")}
          >
            Name
          </th>
          <th
            className={st(classes.position, classes.sorting)}
            onClick={() => handleClickIsSort("position")}
          >
            Position
          </th>
          <th
            className={st(classes.office, classes.sorting)}
            onClick={() => handleClickIsSort("office")}
          >
            Office
          </th>
          <th
            className={st(classes.extn, classes.sorting)}
            onClick={() => handleClickIsSort("extn")}
          >
            Extn.
          </th>
          <th
            className={st(classes.StartDate, classes.sorting)}
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
