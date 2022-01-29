import React from "react";
import { Link } from "react-router-dom";
import CONSTANT from "./../../constant";
import { getCookie } from "../../utils";
import { getEmployeeReports } from "../../action/ReportsAction";
import Sidebar from "../../component/common/Sidebar";
import Header from "../../component/common/Header";
import Loader from "../../component/common/Loader";
import XLSX from "xlsx";

class EmployeeReports extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      employee: [],
      showLoader: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
    this.loadData();
  }

  loadData = () => {
    this.setState({ showLoader: true });
    getEmployeeReports().then((res: any) => {
      this.setState({ showLoader: false });
      if (res) {
        this.setState({ employee: res });
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
            "Employee Code":item.employeeId,
            "Employee Name":item.empName,
            "Employee Branch/Office":item.branchName,
            "Employee Designation":item.designationName
        });
      });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
  };

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
              <button className="btn btn-success pull-right mb-1" onClick={this.downloadToExcel}>Export To Excel</button>
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
                      </tr>
                    </thead>

                    <tbody>
                      {employee === undefined && (
                        <tr>
                          <td className="text-center" colSpan={5}>
                            Loading...
                          </td>
                        </tr>
                      )}
                      {employee !== undefined && employee.length === 0 && (
                        <tr>
                          <td className="text-center" colSpan={5}>
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
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
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

export default EmployeeReports;
