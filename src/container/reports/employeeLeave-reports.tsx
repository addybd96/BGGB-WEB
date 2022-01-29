import React from "react";
import { Link } from "react-router-dom";
import CONSTANT from "./../../constant";
import { getCookie } from "../../utils";
import {
    getEmployeeLeaveReports,
  getEmployeeReports,
  getWorkDesignationStatus,
} from "../../action/ReportsAction";
import Sidebar from "../../component/common/Sidebar";
import Header from "../../component/common/Header";
import Loader from "../../component/common/Loader";
import XLSX from "xlsx";

class EmployeeLeaveReports extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      employee: [],
      showLoader: false,
      date: null,
      workRoleList: null,
      designationList: null,
      statusList: null,
      workRole: null,
      designation: null,
      status: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
    this.loadData();
  }

  loadData = () => {
    this.setState({ showLoader: true });
    getWorkDesignationStatus().then((res: any) => {
      this.setState({
        workRoleList: res.workRoleList,
        designationList: res.designationList,
        statusList: res.statusList,
        showLoader: false,
      });
    });
   
  };

  onSubmit = () => {
    console.log(
      this.state.date,
      this.state.workRole,
      this.state.designation,
      this.state.status
    );
    let data={
        date:  this.state.date,
        workRole:this.state.workRole,
        designation:this.state.designation,
        status:this.state.status
    }
    getEmployeeLeaveReports(data).then((res: any) => {
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
        "Employee Code": item.employeeId,
        "Employee Name": item.empName,
        "Employee Branch/Office": item.branchName,
        "Employee Designation": item.designationName,
      });
    });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
  };

  public render() {
    const {
      employee,
      showLoader,
      workRoleList,
      statusList,
      designationList,
    } = this.state;
    console.log(designationList,'designationList');
    
    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />

            <div className="col-lg-11">
              <div className="card-body">
                {/* <button
                  className="btn btn-success pull-right mb-1"
                  onClick={this.downloadToExcel}
                >
                  Export To Excel
                </button> */}
                <div className="row">
                  <div className="col-lg-6 form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                      className={"form-control"}
                      name={"date"}
                      value={this.state.date}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Leave Status </label>
                      <select
                        className={"form-control"}
                        name="status"
                        value={this.state.status}
                        onChange={(event) =>
                          this.setState({ status: event.target.value })
                        }
                      >
                        <option>Select Status</option>
                        {statusList !== null &&
                          statusList !== undefined &&
                          statusList.length > 0 &&
                          statusList.map(function(item: any, index: number) {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className=" row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Designation </label>
                      <select
                        className={"form-control"}
                        name="designation"
                        value={this.state.designation}
                        onChange={(event) =>
                          this.setState({ designation: event.target.value })
                        }
                      >
                        <option>Select Designation</option>
                        {designationList !== null &&
                          designationList !== undefined &&
                          designationList.length > 0 &&
                          designationList.map(function(
                            item: any,
                            index: number
                          ) {
                            return (
                              <option key={index} value={item.designationId}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Work Role </label>
                      <select
                        className={"form-control"}
                        name="workrole"
                        value={this.state.workRole}
                        onChange={(event) =>
                          this.setState({ workRole: event.target.value })
                        }
                      >
                        <option>Select workRole</option>
                        {workRoleList !== null &&
                          workRoleList !== undefined &&
                          workRoleList.length > 0 &&
                          workRoleList.map(function(item: any, index: number) {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 ">
                    <button type="button" className="btn btn-primary  pull-right" onClick={this.onSubmit}>
                      Filter
                    </button>
                  </div>
                </div>

                <div className="card-header">Employee Leave Reports</div>
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
                          Employee Branch/Office sol id{" "}
                        </th>
                        <th className="text-center colspan-2 " scope="col ">
                          {" "}
                          Employee Designation{" "}
                        </th>
                        <th className="text-center colspan-2 " scope="col ">
                          {" "}
                          Employee Workrole{" "}
                        </th>
                        <th className="text-center colspan-2 " scope="col ">
                          {" "}
                           Leave Type{" "}
                        </th>
                        <th className="text-center colspan-2 " scope="col ">
                          {" "}
                          Leave From Date
                           {" "}
                        </th>
                        <th className="text-center colspan-2 " scope="col ">
                          {" "}
                          Leave To Date{" "}
                        </th>
                        <th className="text-center colspan-2 " scope="col ">
                          {" "}
                          Leave To Reason{" "}
                        </th>
                        <th className="text-center colspan-2 " scope="col ">
                          {" "}
                           Status{" "}
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
                              <td className="text-center"> {l.employeename} </td>
                              <td className="text-center"> {l.soul} </td>
                              <td className="text-center">
                                {" "}
                                {l.designationname}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.workrolename}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.leavetype}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.fromDate}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.toDate}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.reason}{" "}
                              </td>
                              <td className="text-center">
                                {" "}
                                {l.statusname}{" "}
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

export default EmployeeLeaveReports;
