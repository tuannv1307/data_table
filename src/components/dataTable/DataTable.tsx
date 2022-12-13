import { ChangeEvent, useState } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { editDataTable } from "../../store/datatableReducer";
import { st, classes } from "./DataTable.st.css";

export type DataTableProps = {
  name?: string;
  position?: string;
  office?: string;
  extn?: string;
  start_date?: string;
  salary?: string;
  id?: string;
};

const DataTable = ({
  name,
  position,
  office,
  extn,
  start_date,
  salary,
  id,
}: DataTableProps) => {
  const [isShowClick, setIsShowClick] = useState(false);
  const [isShowDoubleClick, setIsShowDoubleClick] = useState(false);
  const [inputEditData, setInputEditData] = useState<{
    nameI?: string;
    positionI?: string;
    officeI?: string;
    extnI?: string;
    start_dateI?: string;
    salaryI?: string;
  }>({
    nameI: name,
    positionI: position,
    officeI: office,
    extnI: extn,
    start_dateI: start_date,
    salaryI: salary,
  });
  let { nameI, positionI, officeI, extnI, start_dateI, salaryI } =
    inputEditData;
  const dispatch = useDispatch();

  const handleClickShow = () => {
    setIsShowClick(!isShowClick);
  };
  const handleDoubleCliclEdit = () => {
    setTimeout(() => {
      setIsShowDoubleClick(!isShowDoubleClick);
    }, 200);
  };

  const hanldeChangeInputEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEditData({ ...inputEditData, [e.target.name]: e.target.value });
  };

  const hanldeSubmitEditData = () => {
    if (id) {
      dispatch(
        editDataTable({ nameI, positionI, officeI, extnI, start_dateI, id })
      );
      setIsShowDoubleClick(!isShowDoubleClick);
    }
  };
  return (
    <>
      <tr className={st(classes.root, { isShowClick })}>
        <td
          className={st(classes.dtrControl)}
          onClick={handleClickShow}
          onDoubleClick={handleDoubleCliclEdit}
        >
          {name}
        </td>
        <td>{position}</td>

        <td>{office}</td>
        <td>{extn}</td>
        <td>{start_date}</td>
      </tr>
      {isShowClick ? (
        <tr>
          <>
            <td colSpan={1}>
              <span className={st(classes.salaryTitle)}>Salary</span>{" "}
              <span className={st(classes.salaryContent)}>{salary}</span>
            </td>
            <td colSpan={4}></td>
          </>
        </tr>
      ) : null}
      {isShowDoubleClick ? (
        <>
          <tr>
            <td>
              <label>Name:</label>
              <input
                onChange={hanldeChangeInputEdit}
                value={nameI}
                type="text"
                name="nameI"
                autoFocus
                className={st(classes.inputEdit)}
              />
            </td>
            <td>
              <label>Position:</label>
              <input
                onChange={hanldeChangeInputEdit}
                value={positionI}
                type="text"
                name="positionI"
                className={st(classes.inputEdit)}
              />
            </td>
            <td>
              <label>Office:</label>
              <input
                onChange={hanldeChangeInputEdit}
                value={officeI}
                type="text"
                name="officeI"
                className={st(classes.inputEdit)}
              />
            </td>
            <td>
              <label>Extn. :</label>
              <input
                onChange={hanldeChangeInputEdit}
                value={extnI}
                type="text"
                name="extnI"
                className={st(classes.inputEdit)}
              />
            </td>
            <td>
              <label>Start date:</label>
              <input
                onChange={hanldeChangeInputEdit}
                value={start_dateI}
                type="text"
                name="start_dateI"
                className={st(classes.inputEdit)}
              />
            </td>
          </tr>
          <tr className={st(classes.trBtnSave)}>
            <td colSpan={5}>
              <button onClick={hanldeSubmitEditData}>Save</button>
            </td>
          </tr>
        </>
      ) : null}
    </>
  );
};

export default DataTable;
