import React, { useEffect } from "react";
import { dataSet } from "../../constants";

import { st, classes } from "./DataTable.st.css";
const DataTable = () => {
  useEffect(() => {}, []);

  return (
    <table id="example" className={st(classes.root)}>
      <thead>
        <tr>
          <th className={st(classes.name)}>Name</th>
          <th className={st(classes.position)}>Position</th>
          <th className={st(classes.office)}>Office</th>
          <th className={st(classes.extn)}>Extn.</th>
          <th className={st(classes.StartDate)}>Start date</th>
          {/* <th>Salary</th> */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
        </tr>
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
