import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataSet } from "../../constants";
import { getData } from "../../store/datatableReducer";

import { st, classes } from "./DataTable.st.css";
const DataTable = () => {
  const data = useSelector((state: any) => state.datatable);
  const [isShow, setIsShow] = useState(false);
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData(dataSet));
  }, []);
  const handleClickShow = () => {
    setIsShow(!isShow);
  };

  const abc = _.map(data, (i) => console.log(i));

  console.log(abc);

  return (
    <table id="example" className={st(classes.root)}>
      <thead>
        <tr>
          <th className={st(classes.name, classes.sorting)}>Name</th>
          <th className={st(classes.position, classes.sorting)}>Position</th>
          <th className={st(classes.office, classes.sorting)}>Office</th>
          <th className={st(classes.extn, classes.sorting)}>Extn.</th>
          <th className={st(classes.StartDate, classes.sorting)}>Start date</th>
          {/* <th>Salary</th> */}
        </tr>
      </thead>
      <tbody>
        <>
          <tr>
            <td className={st(classes.dtrControl)} onClick={handleClickShow}>
              1
            </td>
            <td>1</td>

            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>{isShow ? <td colSpan={5}>5</td> : ""}</tr>
        </>
      </tbody>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Extn.</th>
          <th>Start date</th>
          {/* <th>Salary</th> */}
        </tr>
      </tfoot>
    </table>
  );
};

export default DataTable;
