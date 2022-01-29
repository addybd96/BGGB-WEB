import React from "react";
import { Link } from "react-router-dom";
import CONSTANT from "./../../constant";
import { getCookie } from "../../utils";
import { getReportingManagerDetails } from "../../action/ReportsAction";
import Sidebar from "../../component/common/Sidebar";
import Header from "../../component/common/Header";
import Loader from "../../component/common/Loader";
import XLSX from "xlsx";
import Pagination from "react-js-pagination";

class ReportingManagerDetails extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      employee: [],
      showLoader: false,
      activePage: 1,
      totalCount:null
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
    this.loadData(1);
  }

  loadData = (pageNumber: any) => {
    this.setState({ showLoader: true, employee: [] });
    let data = {
      pageNumber: pageNumber,
    };
    getReportingManagerDetails(data).then((res: any) => {
      debugger
      this.setState({ showLoader: false });
      if (res) {
        this.setState({ employee: res.superAdminData, totalCount:res.total });
      }
    });
  };

  downloadToExcel = () => {
    let employee = this.state.employee;

    if (employee.length === 0) {
      alert("No records found.");
      return;
    }
    // let filename = `${l.currentTarget.value}.xlsx`;
    let filename = "employee-reports.xlsx";
    let dataToExport: any = [];
    var ws_name = "Sheet1";
    const data = employee.map((item: any, index: number) => {
      dataToExport.push({
        "Employee Code": item.employeeId,
        "Employee Name": item.empName,
        "Employee Branch/Office": item.branchName,
        "Employee Designation": item.designationName,
        "Rep Manager Code": item.reportingManagerEmployeeId,
        "Reporting Manager Name": item.reportingManagerName,
        "Reporting Manager Branch/Office": item.reportingManagerBranchName,
        "Reporting Manager Designation": item.reportingManagerDesignationName,
      });
    });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
  };

  handlePageChange(pageNumber: any) {
    debugger;
    this.setState({ activePage: pageNumber });
    this.loadData(pageNumber);
  }

  public render() {
    const { employee, showLoader } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />

            <div className="col-lg-11">
              <div className="card-body">
                <button
                  className="btn btn-success pull-right mb-1"
                  onClick={this.downloadToExcel}
                >
                  Export To Excel
                </button>
                <div className="card-header">Employee Reports</div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          {" "}
                          S. NO.{" "}
                        </th>
                        <th className="text-center" scope="col">
                          {" "}
                          Employee Code{" "}
                        </th>
                        <th className="text-center" scope="col">
                          {" "}
                          Employee Name{" "}
                        </th>
                        <th className="text-center" scope="col">
                          {" "}
                          Employee Branch/Office{" "}
                        </th>
                        <th className="text-center colspan-2 " scope="col ">
                          {" "}
                          Employee Designation{" "}
                        </th>
                        <th className="text-center" scope="col">
                          {" "}
                          Reporting Manager Code{" "}
                        </th>
                        <th className="text-center" scope="col">
                          {" "}
                          Reporting Manager Name{" "}
                        </th>
                        <th className="text-center" scope="col">
                          {" "}
                          Reporting Manager Branch/Office{" "}
                        </th>
                        <th className="text-center colspan-2 " scope="col ">
                          {" "}
                          Reporting Manager Designation{" "}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {employee === undefined && (
                        <tr>
                          <td className="text-center" colSpan={12}>
                            Loading...
                          </td>
                        </tr>
                      )}
                      {employee !== undefined && employee.length === 0 && (
                        <tr>
                          <td className="text-center" colSpan={12}>
                            No records found
                          </td>
                        </tr>
                      )}
                      {employee !== undefined &&
                        employee.length > 0 &&
                        employee.map((l: any, i: any) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td className="text-center"> {l.employeeId} </td>
                              <td className="text-center"> {l.empName} </td>
                              <td className="text-center"> {l.branchName} </td>
                              <td className="text-center">
                                {" "}
                                {l.designationName}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.reportingManagerEmployeeId}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.reportingManagerName}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.reportingManagerBranchName}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.reportingManagerDesignationName}{" "}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div
              style={{
                clear: "both",
                position: "relative",
                fontSize: "14px",
              }}
            >
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={50}
                totalItemsCount={this.state.totalCount}
                pageRangeDisplayed={10}
                onChange={this.handlePageChange.bind(this)}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
              </div>
            </div>
          </div>
        </div>

        {showLoader && <Loader />}
    
      </React.Fragment>
    );
  }
}

export default ReportingManagerDetails;
