import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Data_Tables,
  setBtnPrevAndNext,
  setCurrentPage,
  setLimitPageData,
} from "../../store/datatableReducer";

import { st, classes } from "./PaginatePage.st.css";

export type PaginatePageProps = {
  dataTable: {
    id?: string | undefined;
    name?: string | undefined;
    position?: string | undefined;
    office?: string | undefined;
    extn?: string | undefined;
    salary?: string | undefined;
    start_date?: string | undefined;
  }[];
};

const PaginatePage = ({ dataTable }: PaginatePageProps) => {
  const data: Data_Tables = useSelector(
    (state: { datatable: Data_Tables }) => state.datatable
  );
  const dispatch = useDispatch();

  const lengthData = dataTable?.length;
  const sizeData = data?.sizeData;
  let disabledPrev = data?.disabledPrev;
  let disabledNext = data?.disabledNext;
  let currentPage = data?.currentPage;
  let linitPageData = data?.linitPageData;
  let startIndex = currentPage * sizeData - sizeData;
  const endIndex = Math.min(startIndex + sizeData, lengthData);
  linitPageData = _.size(dataTable) / sizeData;
  linitPageData = Math.ceil(linitPageData);
  const handleClickBtn = (item: number) => {
    dispatch(setCurrentPage({ currentPage: item }));
  };

  const handleClickBtnPrevAndNext = (type: string) => {
    if (!disabledPrev) {
      if (type === "PREVIOUS") {
        if (currentPage === 1) {
          return;
        }
        currentPage = currentPage - 1;
        dispatch(setCurrentPage({ currentPage }));
      }
    }
    if (!disabledNext) {
      if (type === "NEXT") {
        if (currentPage === linitPageData) {
          return;
        }
        currentPage = currentPage + 1;
        dispatch(setCurrentPage({ currentPage }));
      }
    }
  };

  useEffect(() => {
    disabledPrev = currentPage === 1 ? true : false;
    disabledNext =
      currentPage === linitPageData ? true : false || linitPageData === 0;
    dispatch(setBtnPrevAndNext({ disabledPrev, disabledNext }));
  }, [currentPage, linitPageData]);

  useEffect(() => {
    dispatch(setLimitPageData({ linitPageData }));
  }, [linitPageData]);

  const arrBTN = [];
  for (let index = 1; index <= linitPageData; index++) {
    arrBTN.push(index);
  }
  console.log(data);
  return (
    <div className={st(classes.root)}>
      <div className={st(classes.dataTablesInfo)} data-hook="data-info">
        {dataTable?.length === data?.data?.length
          ? `Showing ${startIndex + 1} to ${endIndex} of ${lengthData} entries `
          : `Showing ${
              dataTable.length > 0 ? startIndex + 1 : startIndex
            } to ${lengthData} of ${lengthData} entries (filtered from ${
              data?.data?.length
            } total entries)`}
      </div>
      <div className={st(classes.dataTablesPaginate)}>
        <a
          className={st(classes.paginateButton, { disabledPrev })}
          onClick={() => handleClickBtnPrevAndNext("PREVIOUS")}
          data-hook="previous"
        >
          Previous
        </a>
        <span>
          {arrBTN &&
            _.map(arrBTN, (item, index) => (
              <a
                className={st(classes.paginateButton, {
                  curentBtn: item === currentPage,
                })}
                onClick={() => handleClickBtn(item)}
                key={index}
                data-hook="btn-item-page"
              >
                {item}
              </a>
            ))}
        </span>
        <a
          className={st(classes.paginateButton, { disabledNext })}
          onClick={() => handleClickBtnPrevAndNext("NEXT")}
          data-hook="next"
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default PaginatePage;
