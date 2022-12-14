import { ChangeEvent, useState, KeyboardEvent } from "react";
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
  const [isShowClick, setIsShowClick] = useState<boolean>(false);
  const [isShowDoubleClick, setIsShowDoubleClick] = useState<boolean>(false);
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

  let { nameI, positionI, officeI, extnI, start_dateI } = inputEditData;

  const dispatch = useDispatch();

  let timer = 0;
  let delay = 200;
  let prevent = false;

  const handleClickShow = () => {
    timer = setTimeout(() => {
      if (!prevent) {
        setIsShowClick(!isShowClick);
      }
      prevent = false;
    }, delay);
  };

  const handleDoubleCliclEdit = () => {
    clearTimeout(timer);
    prevent = true;
    setIsShowDoubleClick(!isShowDoubleClick);
  };

  const hanldeChangeInputEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEditData({ ...inputEditData, [e.target.name]: e.target.value });
  };

  const handleKeyDow = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (id) {
        dispatch(
          editDataTable({ nameI, positionI, officeI, extnI, start_dateI, id })
        );
        setIsShowDoubleClick(!isShowDoubleClick);
      }
    } else if (e.key === "Escape") {
      setIsShowDoubleClick(!isShowDoubleClick);
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
      {isShowDoubleClick ? (
        <>
          <tr>
            <td>
              <input
                onChange={hanldeChangeInputEdit}
                value={nameI}
                type="text"
                name="nameI"
                autoFocus
                className={st(classes.inputEdit)}
                onKeyDown={handleKeyDow}
                // onBlur={handleBlurEdit}
                data-hook="input-edit"
              />
            </td>
            <td>
              <input
                onChange={hanldeChangeInputEdit}
                value={positionI}
                type="text"
                name="positionI"
                className={st(classes.inputEdit)}
                onKeyDown={handleKeyDow}
                //  onBlur={handleBlurEdit}
                data-hook="input-edit"
              />
            </td>
            <td>
              <input
                onChange={hanldeChangeInputEdit}
                value={officeI}
                type="text"
                name="officeI"
                className={st(classes.inputEdit)}
                onKeyDown={handleKeyDow}
                //   onBlur={handleBlurEdit}
                data-hook="input-edit"
              />
            </td>
            <td>
              <input
                onChange={hanldeChangeInputEdit}
                value={extnI}
                type="text"
                name="extnI"
                className={st(classes.inputEdit)}
                onKeyDown={handleKeyDow}
                //  onBlur={handleBlurEdit}
                data-hook="input-edit"
              />
            </td>
            <td>
              <input
                onChange={hanldeChangeInputEdit}
                value={start_dateI}
                type="text"
                name="start_dateI"
                className={st(classes.inputEdit)}
                onKeyDown={handleKeyDow}
                // onBlur={handleBlurEdit}
                data-hook="input-edit"
              />
            </td>
          </tr>
        </>
      ) : (
        <>
          <tr className={st(classes.root, { isShowClick })}>
            <td
              className={st(classes.dtrControl)}
              onClick={handleClickShow}
              onDoubleClick={handleDoubleCliclEdit}
              data-hook="dtrControl"
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
        </>
      )}
    </>
  );
};

export default DataTable;
