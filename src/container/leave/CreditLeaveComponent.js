import React, { useEffect, useState } from "react";
import Loader from "../../component/common/Loader";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import {
  creditSingleUserLeave,
  getNewEmpListForLeaveCredit,
} from "../../action/LeaveActions";
import moment from "moment";

export const CreditLeaveComponent = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [count, setCount] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 20;
  useEffect(() => {
    loadList();
  }, []);
  console.log(employeeList);
  const rowStyle = (row, rowIndex) => {
    if (rowIndex % 2 === 0) {
      return {
        backgroundColor: "#efefef",
      };
    }
    return {
      backgroundColor: "#ffffff",
    };
  };
  const columns = [
    {
      dataField: "employeeId",
      text: "Employee Code",
      align: "center",
    },
    {
      dataField: "name",
      text: "Name",
      align: "center",
    },
    {
      dataField: "dateOfJoining",
      text: "Joining Date",
      align: "center",
      formatter: (cell) => moment(cell).format("DD-MM-YYYY"),
    },
    {
      dataField: "userId",
      text: "Employee Code",
      align: "center",
      formatter: (cell) => (
        <button onClick={() => creditLeave(cell)}> Credit Leave</button>
      ),
    },
  ];
  const loadList = (opage = page, olimit = limit) => {
    getNewEmpListForLeaveCredit(opage, olimit).then((res) => {
      setEmployeeList(res.result.list);
      setCount(res.result.count);
      setShowLoader(false);
    });
  };
  const creditLeave = (id) => {
    creditSingleUserLeave(id).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        loadList();
      }
    });
  };
  const onTableChange = (type, obj) => {
    setPage(obj.page);
    loadList(obj.page, obj.sizePerPage);
  };
  return showLoader ? (
    <Loader />
  ) : (
    <React.Fragment>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          page: page,
          sizePerPage: limit,
          totalSize: count,
          showTotal: true,
          pageStartIndex: 1,
          firstPageText: "First",
          prePageText: "Back",
          nextPageText: "Next",
          lastPageText: "Last",
          nextPageTitle: "First page",
          prePageTitle: "Pre page",
          firstPageTitle: "Next page",
          lastPageTitle: "Last page",
          withFirstAndLast: true,
          alwaysShowAllBtns: true,
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <React.Fragment>
            <BootstrapTable
              remote
              keyField="id"
              rowStyle={rowStyle}
              columns={columns}
              data={employeeList}
              onTableChange={onTableChange}
              {...paginationTableProps}
            />

            <div>
              <PaginationListStandalone {...paginationProps} />
            </div>
          </React.Fragment>
        )}
      </PaginationProvider>
    </React.Fragment>
  );
};
