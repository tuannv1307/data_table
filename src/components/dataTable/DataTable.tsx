import { ChangeEvent, useState, KeyboardEvent } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  Data_Tables,
  changeName,
  editDataTable,
  showSalary,
} from "../../store/datatableReducer";
import DatePicker from "react-datepicker";
import "./datepicker.scss";
import { st, classes } from "./DataTable.st.css";
import moment from "moment";

export type DataTableProps = {
  name?: string;
  position?: string;
  office?: string;
  extn?: string;
  start_date?: string;
  salary?: string;
  id?: string;
  isShowSalary: boolean;
};

const DataTable = ({
  name,
  position,
  office,
  extn,
  start_date,
  salary,
  id,
  isShowSalary,
}: DataTableProps) => {
  const data: Data_Tables = useSelector(
    (state: { datatable: Data_Tables }) => state.datatable
  );
  // let isShowSalaryIndex = data?.isShowSalaryIndex;
  const [isShowClick, setIsShowClick] = useState<boolean>(false);
  const [isShowDoubleClick, setIsShowDoubleClick] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [inputEditData, setInputEditData] = useState<{
    nameI?: string;
    positionI?: string;
    officeI?: string;
    extnI?: string;
    start_dateI?: string;
  }>({
    nameI: name,
    positionI: position,
    officeI: office,
    extnI: extn,
    start_dateI: start_date,
  });
  const nameInputEdit = data.sortName;
  const dispatch = useDispatch();
  let { nameI, positionI, officeI, extnI, start_dateI } = inputEditData;

  let timer = 0;
  let delay = 200;
  let prevent = false;

  const handleClickShow = (id?: string) => {
    timer = setTimeout(() => {
      if (!prevent) {
        if (id) {
          let isShowSalaryIndex = !isShowSalary;
          setIsShowClick(!isShowClick);
          dispatch(showSalary({ id, isShowSalaryIndex }));
        }
      }
      prevent = false;
    }, delay);
  };

  const handleDoubleCliclEdit = (type: string, value?: string) => {
    const nameSort = type;
    dispatch(changeName({ nameSort }));
    clearTimeout(timer);
    prevent = true;
    if (value === id) {
      setIsShowDoubleClick(true);
    } else {
      setIsShowDoubleClick(false);
    }
  };
  const hanldeChangeInputEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEditData({ ...inputEditData, [e.target.name]: e.target.value });
  };

  const handleKeyDow = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (id) {
        dispatch(
          editDataTable({
            nameI,
            positionI,
            officeI,
            extnI,
            start_dateI: startDate.toString(),
            id,
          })
        );
        setIsShowDoubleClick(false);
      }
    } else if (e.key === "Escape") {
      setIsShowDoubleClick(false);
    }
  };

  const handleBlurEdit = () => {
    if (id) {
      dispatch(
        editDataTable({ nameI, positionI, officeI, extnI, start_dateI, id })
      );
      setIsShowDoubleClick(!isShowDoubleClick);
    }
  };

  return (
    <>
      <tr className={st(classes.root, { isShowSalary })}>
        <td
          className={st(classes.dtrControl)}
          onClick={() => handleClickShow(id)}
          onDoubleClick={() => handleDoubleCliclEdit("name", id)}
          data-hook="dtrControl"
        >
          {isShowDoubleClick && nameInputEdit === "name" ? (
            <input
              onChange={hanldeChangeInputEdit}
              value={nameI}
              type="text"
              name="nameI"
              autoFocus
              className={st(classes.inputEdit)}
              onKeyDown={handleKeyDow}
              data-hook="input-edit"
            />
          ) : (
            <span>{name}</span>
          )}
        </td>
        <td onDoubleClick={() => handleDoubleCliclEdit("position", id)}>
          {isShowDoubleClick && nameInputEdit === "position" ? (
            <input
              onChange={hanldeChangeInputEdit}
              value={positionI}
              type="text"
              name="positionI"
              className={st(classes.inputEdit)}
              onKeyDown={handleKeyDow}
              data-hook="input-edit"
            />
          ) : (
            <span>{position}</span>
          )}
        </td>

        <td onDoubleClick={() => handleDoubleCliclEdit("office", id)}>
          {id && isShowDoubleClick && nameInputEdit === "office" ? (
            <input
              onChange={hanldeChangeInputEdit}
              value={officeI}
              type="text"
              name="officeI"
              className={st(classes.inputEdit)}
              onKeyDown={handleKeyDow}
              data-hook="input-edit"
            />
          ) : (
            <span> {office}</span>
          )}
        </td>
        <td onDoubleClick={() => handleDoubleCliclEdit("extn", id)}>
          {isShowDoubleClick && nameInputEdit === "extn" ? (
            <input
              onChange={hanldeChangeInputEdit}
              value={extnI}
              type="text"
              name="extnI"
              className={st(classes.inputEdit)}
              onKeyDown={handleKeyDow}
              data-hook="input-edit"
            />
          ) : (
            <span>{extn}</span>
          )}
        </td>
        <td onDoubleClick={() => handleDoubleCliclEdit("start_date", id)}>
          {isShowDoubleClick && nameInputEdit === "start_date" ? (
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              onKeyDown={handleKeyDow}
              showPopperArrow={false}
            />
          ) : (
            <span>{moment(start_date).format("yyyy/MM/DD")}</span>
          )}
        </td>
      </tr>
      {isShowSalary ? (
        <tr>
          <>
            <td colSpan={1}>
              <span className={st(classes.salaryTitle)}>Salary</span>
              <span className={st(classes.salaryContent)}>{salary}</span>
            </td>
            <td colSpan={4}></td>
          </>
        </tr>
      ) : null}
    </>
  );
};

export default DataTable;
