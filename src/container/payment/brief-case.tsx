import * as React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import CONSTANT from "../../constant";
import Loader from "../../component/common/Loader";
import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import { onChange, textTransform } from "../../utils";
import { getBriefCaseAlneByUserId } from "../../action/payment";
import { updatePayment } from "../../action/payment";
import XLSX from "xlsx";
import dateFormat, { masks } from "dateformat";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: undefined,
      showLoader: false,
      updatePayment: false,
      currentDate: undefined,
      currentStatus: undefined,
      transactionId: undefined,
      selectedPending: true,
      status: { name: "status", value: "", error: "", isRequired: true },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
    this.loadData();
  }

  public render() {
    const { list, status, showLoader } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11">
              <div className="card mt-3">
                <div className="card-header">
                  <div className="float-left ">
                    <select
                      onChange={this.onChange}
                      className={
                        status.error.length > 0
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name={status.name}
                      value={status.value}
                    >
                      <option value="false">Pending</option>
                      <option value="true">Completed</option>
                    </select>
                  </div>
                  <div className="pull-right ">
                    <button
                      type="button"
                      className="btn btn-secondary mr-1"
                      onClick={this.downloadToExcel}
                    >
                      Download To Excel
                    </button>
                    {this.state.selectedPending && (
                      <button
                        type="button"
                        className="btn btn-primary ml-1"
                        onClick={this.updatePayment}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
                {this.state.updatePayment && (
                  <div className="col-lg-11">
                    <form>
                      <div className="col-lg-12 mt-4">
                        <div className="row">
                          <div className="col-lg-12 pl-0"></div>
                        </div>
                      </div>

                      <div className="card mt-2">
                        <div className="card-header">
                          <b>Update Payment </b>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-lg-12 mb-2">
                              <div className="row">
                                <div className="col-lg-6 form-group">
                                  <label>Date</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={this.state.currentDate}
                                    onChange={(e) =>
                                      this.setState({
                                        currentDate: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="col-lg-6 form-group">
                                  <label> Transaction Id</label>
                                  <input
                                    className="form-control"
                                    value={this.state.transactionId}
                                    onChange={(e) => {
                                      this.setState({
                                        transactionId: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="col-lg-6 form-group">
                                  <label> Status</label>
                                  <select
                                    className="form-control"
                                    value={this.state.currentStatus}
                                    onChange={(e) => {
                                      this.setState({
                                        currentStatus: e.target.value,
                                      });
                                    }}
                                  >
                                    <option value="false">Pending</option>
                                    <option value="true">Completed</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 ">
                              <button
                                type="submit"
                                className="col-lg-2 btn primary-control pull-right"
                                onClick={this.handleSumbit}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="text-center" scope="col">
                            <input
                              type="checkbox"
                              onClick={(e) => this.selectAllHandler(e)}
                            />
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            S. NO.{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Name{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Amount{" "}
                          </th>
                          {/* <th className="text-center" scope="col">  Download Excel </th> */}
                          <th className="text-center" scope="col">
                            {" "}
                            Transaction{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            FromDate{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            ToDate{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Transaction Date
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Status{" "}
                          </th>
                          {/* <th className="text-center" scope="col">  Action </th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {list === undefined && (
                          <tr>
                            <td className="text-center" colSpan={10}>
                              Loading...
                            </td>
                          </tr>
                        )}
                        {list !== undefined && list.length === 0 && (
                          <tr>
                            <td className="text-center" colSpan={10}>
                              No records found
                            </td>
                          </tr>
                        )}
                        {list !== undefined &&
                          list.length > 0 &&
                          list.map((l: any, i: any) => {
                          const oldDate= new Date(dateFormat(l.toDate, "mmmm-yyyy"));
                          oldDate.setFullYear(oldDate.getFullYear()-3)

                            return (
                              <tr key={i}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={l.check}
                                    onClick={(e) =>
                                      this.selectSingleCheckHandler(i, e)
                                    }
                                  />
                                </td>
                                <td className="text-center"> {i + 1} </td>
                                <td className="text-center">
                                  {" "}
                                  {l.name} ({l.employeeId}){" "}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {l.actualAmount}{" "}
                                </td>
                                {/* <td><button className=" btn btn-secondary" name = {l.userId} onClick={(e)=>this.downloadExcel(e)}>Download Excel</button> </td> */}
                                <td className="text-center"> {l.trnId} </td>
                                <td className="text-center">
                                {dateFormat(oldDate, "mmmm-yyyy")}
                                </td>
                                <td className="text-center">
                                  {dateFormat(l.toDate, "mmmm-yyyy")}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {l.trndate
                                    ? moment(l.trndate).format("YYYY")
                                    : "Not add by Account Dp."}{" "}
                                </td>
                                <td
                                  className={`text-center ${
                                    l.trnStatus
                                      ? "text-success"
                                      : "text-warning"
                                  }`}
                                >
                                  {l.trnStatus ? "Completed" : "Pending"}
                                </td>
                                {/* <td className="text-center">
                                                                    <Link to={`${CONSTANT.url.payment.updateTrans}?id=${l.id}&name=${l.name}(${l.employeeId})&sch=perquisites&tb=briefCaseAllowance`} >
                                                                        <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                                                                    </Link>

                                                                </td> */}
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
        </div>
        {showLoader && <Loader />}
      </React.Fragment>
    );
  }
  onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      selectedPending: !this.state.selectedPending,
    });

    onChange(this, name, value, () => {
      this.loadData(value);
    });
  };

  updatePayment = (e: any) => {
    this.setState({
      updatePayment: !this.state.updatePayment,
    });
  };

  downloadToExcel = () => {
    let list = this.state.list;

    if (list.length === 0) {
      alert("No records found.");
      return;
    }
    // let filename = `${l.currentTarget.value}.xlsx`;
    let filename = "Briefcase-allowance.xlsx";
    let dataToExport: any = [];
    var ws_name = "Sheet1";
    const data = list
      .filter((item: any) =>
        // l.currentTarget.name ? item.userId == l.currentTarget.name : true
        item.check ? item : ""
      )
      .map((item: any, index: number) => {
        const oldDate= new Date(dateFormat(item.toDate, "mmmm-yyyy"));
        oldDate.setFullYear(oldDate.getFullYear()-3)
        delete item.code;
        dataToExport.push({
          "Ec Number": item.employeeId,
          Name: item.name,
          Amount: item.actualAmount,
          Sol: item.soul,
          Particular: `Briefcase allowance for the block of ( ${dateFormat(
            oldDate,
            "mmmm-yyyy"
          )} - ${dateFormat(item.toDate, "mmmm-yyyy")} )`,
          "Account Number": item.accountNumber,
        });
      });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
  };

  handleSumbit = (e: any) => {
    e.preventDefault();
    let list = this.state.list;
    let newList = list.filter((data: any, index: any) => {
      return data.check ? data : "";
    });

    let updatedList = newList.map((data: any, index: any) => {
      data.trnId = this.state.transactionId;
      data.trnStatus = this.state.currentStatus;
      data.trndate = this.state.currentDate;
      return data;
    });
    updatePayment(updatedList).then((res: any) => {
      this.setState({ showLoader: false });
      if (res) {
        alert("record update sucessfully");
        this.props.history.goBack();
      }
    });
  };

  selectAllHandler = (e: any) => {
    let value = e.target.checked;
    let list = this.state.list;
    let updatedList = list.map((data: any, index: any) => {
      data.check = value;
      return data;
    });
    this.setState({
      list: updatedList,
    });
  };

  selectSingleCheckHandler = (index: any, e: any) => {
    let value = e.target.checked;
    let list = this.state.list;
    list[index].check = value;
    this.setState({
      list: list,
    });
  };

  loadData = (status?: any) => {
    let list = this.state.list;
    list = [];
    this.setState({
      list: list,
    });
    this.setState({ showLoader: true });
    getBriefCaseAlneByUserId({ status }).then((res: any) => {
      status
        ? this.setState({
            showLoader: false,
            list: res ? res : "",
          })
        : this.setState({ showLoader: false });
      for (let i = 0; i < res.length; i++) {
        let tempRes = {
          accountNumber: res[i] ? res[i].accountNumber : "",
          actualAmount: res[i] ? res[i].actualAmount : "",
          amount: res[i] ? res[i].amount : "",
          createdAt: res[i] ? res[i].createdAt : "",
          createdBy: res[i] ? res[i].createdBy : "",
          createdOn: res[i] ? res[i].createdOn : "",
          date: res[i] ? res[i].date : "",
          employeeId: res[i] ? res[i].employeeId : "",
          forwardToId: res[i] ? res[i].forwardToId : "",
          id: res[i] ? res[i].id : "",
          modifiedAt: res[i] ? res[i].modifiedAt : "",
          modifiedBy: res[i] ? res[i].modifiedBy : "",
          modifiedOn: res[i] ? res[i].modifiedOn : "",
          name: res[i] ? res[i].name : "",
          scheme: res[i] ? res[i].scheme : "",
          status: res[i] ? res[i].status : "",
          trnId: res[i] ? res[i].trnId : "",
          trnStatus: res[i] ? res[i].trnStatus : "",
          trndate: res[i] ? res[i].trndate : "",
          userId: res[i] ? res[i].userId : "",
          userRc: res[i] ? res[i].userRc : "",
          toDate:res[i] ? res[i].toDate : "",
          soul: res[i] ? res[i].soul :"",
          check: false,
          sch: "perquisites",
          tb: "briefCaseAllowance",
        };
        list = [...list, tempRes];
      }

      this.setState({ list: list });
    });
  };

  downloadExcel = (l: any) => {
    const { list } = this.state;
    if (list.length === 0) {
      alert("No records found.");
      return;
    }
    let filename = `${l.currentTarget.name}.xlsx`;
    let dataToExport: any = [];
    var ws_name = "Sheet1";
    const data = list
      .filter((item: any) =>
        l.currentTarget.name ? item.userId == l.currentTarget.name : true
      )
      .map((item: any, index: number) => {
        delete item.code;
        dataToExport.push({
          "Ec Number": item.employeeId,
          Name: item.name,
          Amount: item.actualAmount,
          "Account Number": item.accountNumber,
        });
      });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
  };
}

export default ComponentName;
