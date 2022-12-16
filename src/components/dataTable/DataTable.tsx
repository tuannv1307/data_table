import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  Data_Tables,
  changeNameClick,
  editDataTable,
  showSalary,
} from "../../store/datatableReducer";
import DatePicker from "react-datepicker";
import "./datepicker.scss";
import { st, classes } from "./DataTable.st.css";
import moment from "moment";
import OutsideClickHandler from "react-outside-click-handler";
export type DataTableProps = {
  name?: string;
  position?: string;
  office?: string;
  extn?: string;
  start_date?: string;
  salary?: string;
  id?: string;
  isShowSalary?: boolean;
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

  const [isShowClick, setIsShowClick] = useState<boolean>(false);
  const [isShowDoubleClick, setIsShowDoubleClick] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(moment(start_date).toDate());
  const [inputEditData, setInputEditData] = useState<{
    nameI?: string;
    positionI?: string;
    officeI?: string;
    extnI?: string;
    start_dateI?: string | void;
  }>({
    nameI: name,
    positionI: position,
    officeI: office,
    extnI: extn,
    start_dateI: start_date,
  });
  const nameInputEdit = data.nameClick;

  const dispatch = useDispatch();

  let { nameI, positionI, officeI, extnI } = inputEditData;

  let timer = 0;
  let delay = 200;
  let prevent = false;

  const handleClickShow = (id?: string) => {
    timer = setTimeout(() => {
      if (!prevent) {
        let isShowSalaryIndex = !isShowSalary;
        setIsShowClick(!isShowClick);
        dispatch(showSalary({ id, isShowSalaryIndex }));
      }
      prevent = false;
    }, delay);
  };

  const handleDoubleCliclEdit = (type: string) => {
    const nameClick = type;
    dispatch(changeNameClick({ nameClick }));
    clearTimeout(timer);
    prevent = true;
    setIsShowDoubleClick(true);
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
      setInputEditData({
        nameI: name,
        positionI: position,
        officeI: office,
        extnI: extn,
        start_dateI: setStartDate(moment(start_date).toDate()),
      });
      setIsShowDoubleClick(false);
    }
  };

  useEffect(() => {}, []);

  const handleClickOutside = () => {
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
  };

  return (
    <>
      <tr className={st(classes.root, { isShowSalary })}>
        <>
          {isShowDoubleClick && nameInputEdit === "name" ? (
            <td className={st(classes.dtrControl)}>
              <OutsideClickHandler onOutsideClick={handleClickOutside}>
                <input
                  onChange={hanldeChangeInputEdit}
                  value={nameI}
                  type="text"
                  name="nameI"
                  autoFocus
                  className={st(classes.inputEdit, { nameInputEdit })}
                  onKeyDown={handleKeyDow}
                  data-hook="input-edit"
                />
              </OutsideClickHandler>
            </td>
          ) : (
            <td
              className={st(classes.dtrControl)}
              onClick={() => handleClickShow(id)}
              onDoubleClick={() => handleDoubleCliclEdit("name")}
              data-hook="dtrControl"
            >
              {name}
            </td>
          )}
        </>
        <>
          {isShowDoubleClick && nameInputEdit === "position" ? (
            <td>
              <OutsideClickHandler onOutsideClick={handleClickOutside}>
                <input
                  onChange={hanldeChangeInputEdit}
                  value={positionI}
                  type="text"
                  name="positionI"
                  autoFocus
                  className={st(classes.inputEdit, { nameInputEdit })}
                  onKeyDown={handleKeyDow}
                  data-hook="input-edit"
                />
              </OutsideClickHandler>
            </td>
          ) : (
            <td
              data-hook="td-position"
              onDoubleClick={() => handleDoubleCliclEdit("position")}
            >
              {position}
            </td>
          )}
        </>

        <>
          {id && isShowDoubleClick && nameInputEdit === "office" ? (
            <td>
              <OutsideClickHandler onOutsideClick={handleClickOutside}>
                <input
                  onChange={hanldeChangeInputEdit}
                  value={officeI}
                  type="text"
                  name="officeI"
                  autoFocus
                  className={st(classes.inputEdit, { nameInputEdit })}
                  onKeyDown={handleKeyDow}
                  data-hook="input-edit"
                />
              </OutsideClickHandler>
            </td>
          ) : (
            <td
              data-hook="td-office"
              onDoubleClick={() => handleDoubleCliclEdit("office")}
            >
              {office}
            </td>
          )}
        </>
        <>
          {isShowDoubleClick && nameInputEdit === "extn" ? (
            <td>
              <OutsideClickHandler onOutsideClick={handleClickOutside}>
                <input
                  onChange={hanldeChangeInputEdit}
                  value={extnI}
                  type="text"
                  name="extnI"
                  autoFocus
                  className={st(classes.inputEdit, { nameInputEdit })}
                  onKeyDown={handleKeyDow}
                  data-hook="input-edit"
                />
              </OutsideClickHandler>
            </td>
          ) : (
            <td
              data-hook="td-extn"
              onDoubleClick={() => handleDoubleCliclEdit("extn")}
            >
              {extn}
            </td>
          )}
        </>
        <>
          {id && isShowDoubleClick && nameInputEdit === "start_date" ? (
            <td>
              <OutsideClickHandler onOutsideClick={handleClickOutside}>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  onKeyDown={handleKeyDow}
                  showPopperArrow={false}
                  autoFocus
                  dateFormat="yyyy/MM/dd"
                  className={st(classes.inputEdit, { nameInputEdit })}
                />
              </OutsideClickHandler>
            </td>
          ) : (
            <td
              data-hook="td-start_date"
              onDoubleClick={() => handleDoubleCliclEdit("start_date")}
            >
              {moment(start_date).format("yyyy/MM/DD")}
            </td>
          )}
        </>
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
