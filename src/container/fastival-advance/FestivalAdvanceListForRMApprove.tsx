import * as React from "react";
import * as moment from "moment";
import { getLeaveTypeList } from "../../action/SettingsActions";
import {
  onChange,
  setOptions,
  isEmpty,
  setError,
  validateForm,
} from "./../../utils";
import Loader from "../../component/common/Loader";
import NumberFormat from "react-number-format";
import {
  approve,
  getFestivalDetailById,
} from "../../action/FastivalAdvanceAction";
import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import CONSTANT from "../../constant";

class FestivalAdvanceListForRMApprove extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      amount: { name: "amount", value: "", error: "", isRequired: true },
      reason: { name: "reason", value: "", error: "", isRequired: true },
      // isTenureManual: { value: false, name: 'optHundredFiftyHRA', error: '', isRequired: false },
      tenure: { name: "tenure", value: "", error: "", options: [] },
      showLoader: false,
      tenureMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      data: null,
      Status: "",
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.loadList();
  }

  public render() {
    let {
      application_date,
      approval_amount,
      claimed_amount,
      reason,
      salary_basic,
      salary_cca,
      salary_da,
      salary_hra,
      salary_pqp,
      salary_spAllowance,
      salary_sppay,
      salary_totalAllowance,
      status,
    } = this.state.data ? this.state.data : "";
    const { showLoader } = this.state;

    //console.table([empId, fromDate, toDate, dayType, type, reason, showLoader])

    if (showLoader) return <Loader />;

    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11">
              <form onSubmit={this._submitForm}>
                <div className="col-lg-12 mt-4">
                  <div className="row">
                    <div className="col-lg-12 pl-0">
                      <h5 className="heading-h1">Approve Festival Advance</h5>
                    </div>
                  </div>
                </div>

                <div className="card mt-2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-6 form-group">
                            <label>Claimed Amount</label>
                            <NumberFormat
                              allowLeadingZeros={false}
                              allowNegative={false}
                              thousandSeparator={false}
                              className="form-control"
                              placeholder="Enter amount"
                              value={claimed_amount}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                          {/* <div className="col-lg-3 form-group d-flex justify-content-center align-items-center mt-4">
                                                <label className="mt-1">Opt for select tenure ?&nbsp;&nbsp;&nbsp; </label>
                                                <input type="checkbox" onChange={this.onCheckboxChange} checked={isTenureManual.value} />
                                            </div> */}
                          <div className="col-lg-6 form-group">
                            <label>Application Applied Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={moment(application_date).format(
                                "YYYY-MM-DD"
                              )}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-6 form-group">
                            <label>Basic Amount</label>
                            <NumberFormat
                              className="form-control"
                              placeholder="Enter amount"
                              value={salary_basic}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                          {/* <div className="col-lg-3 form-group d-flex justify-content-center align-items-center mt-4">
                                                <label className="mt-1">Opt for select tenure ?&nbsp;&nbsp;&nbsp; </label>
                                                <input type="checkbox" onChange={this.onCheckboxChange} checked={isTenureManual.value} />
                                            </div> */}
                          <div className="col-lg-6 form-group">
                            <label>Pqp Amount</label>
                            <NumberFormat
                              className="form-control"
                              placeholder="Enter amount"
                              value={salary_pqp}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-6 form-group">
                            <label>Sppay Amount</label>
                            <NumberFormat
                              className="form-control"
                              placeholder="Enter amount"
                              value={salary_sppay}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                          {/* <div className="col-lg-3 form-group d-flex justify-content-center align-items-center mt-4">
                                                <label className="mt-1">Opt for select tenure ?&nbsp;&nbsp;&nbsp; </label>
                                                <input type="checkbox" onChange={this.onCheckboxChange} checked={isTenureManual.value} />
                                            </div> */}
                          <div className="col-lg-6 form-group">
                            <label>Hra Amount</label>
                            <NumberFormat
                              className="form-control"
                              placeholder="Enter amount"
                              value={salary_hra}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-6 form-group">
                            <label>DA Amount</label>
                            <NumberFormat
                              className="form-control"
                              placeholder="Enter amount"
                              value={salary_da}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                          {/* <div className="col-lg-3 form-group d-flex justify-content-center align-items-center mt-4">
                                                <label className="mt-1">Opt for select tenure ?&nbsp;&nbsp;&nbsp; </label>
                                                <input type="checkbox" onChange={this.onCheckboxChange} checked={isTenureManual.value} />
                                            </div> */}
                          <div className="col-lg-6 form-group">
                            <label>CCA Amount</label>
                            <NumberFormat
                              className="form-control"
                              placeholder="Enter amount"
                              value={salary_cca}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-6 form-group">
                            <label>Special Allowance Amount</label>
                            <NumberFormat
                              allowLeadingZeros={false}
                              allowNegative={false}
                              thousandSeparator={false}
                              className="form-control"
                              placeholder="Enter amount"
                              value={salary_spAllowance}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                          {/* <div className="col-lg-3 form-group d-flex justify-content-center align-items-center mt-4">
                                                <label className="mt-1">Opt for select tenure ?&nbsp;&nbsp;&nbsp; </label>
                                                <input type="checkbox" onChange={this.onCheckboxChange} checked={isTenureManual.value} />
                                            </div> */}
                          <div className="col-lg-6 form-group">
                            <label>Approval Amount by reporting manager</label>
                            <NumberFormat
                              className="form-control"
                              placeholder="Enter amount"
                              value={claimed_amount}
                              onChange={this._onChange}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-6 form-group">
                            <label>Status</label>
                            <select
                              disabled={
                                status == "pending" || status == "forward"
                                  ? false
                                  : true
                              }
                              onChange={(e: any) => {
                                let Status = this.state.State;
                                Status = e.target.value;
                                this.setState({
                                  Status: Status,
                                });
                              }}
                              className="form-control"
                              name="status"
                              value={this.state.Status}
                            >
                              <option>Please select status</option>
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="forward">Forward</option>
                              <option value="reject">Reject</option>
                            </select>
                          </div>
                          <div className="col-lg-6 form-group">
                            <label>Remarks</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Please write your remarks here"
                              value={this.state.remarksRM}
                              onChange={(e) => {
                                this.setState({
                                  remarksRM: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {status !== "approved" && (
                        <div className="col-lg-12 ">
                          <button
                            type="submit"
                            className="col-lg-2 btn primary-control pull-right"
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderTypeSelect = (type: any) => {
    if (this.state.leaveTypes.options)
      return (
        <select
          name={type.name}
          value={type.value}
          onChange={this._onChange}
          className={
            type.error.length > 0 ? "form-control is-invalid" : "form-control"
          }
        >
          <React.Fragment>
            <option>--Select--</option>
            {this.state.leaveTypes.options.map((dep: any, dIndex: number) => {
              return (
                <option key={dIndex} value={dep.id}>
                  {dep.name}
                </option>
              );
            })}
          </React.Fragment>
        </select>
      );
    else return null;
  };

  onChange = (e: any) => {
    const name = e.target.name;
    let value = e.target.value;
    onChange(this, name, value);
  };
  private _onChange = (e: any, callback?: any) => {
    const name = e.target.name;
    const value = e.target.value;
    onChange(this, name, value);
  };

  private _setError = (name: string, error: string) => {
    setError(this, name, error);
  };

  private _clearFormError() {
    this._setError("reason", "");
  }

  private _getJsonToPOST(state: any) {
    const stateData = JSON.parse(JSON.stringify(state));
    const jsonToReturn = {
      amount: stateData.amount.value,
      reason: stateData.reason.value,
    };
    return jsonToReturn;
  }

  // private onCheckboxChange = (e: any) => {
  //     this.setState({ isTenureManual: { ...this.state.isTenureManual, value: e.target.checked } })
  // }

  _submitForm = (e: any) => {
    e.preventDefault();
    this.setState({
      showLoader: true,
    });
    let data = this.state.data;
    let model = {
      ...data,
      status: this.state.Status,
      reason: this.state.remarksRM,
      approval_date: moment().format("YYYY-MM-DD"),
      approval_amount: data.claimed_amount,
    };
    approve(model)
      .then((response: any) => {
        this.setState({
          showLoader: false,
        });
        if (response) {
          alert("record update sucessfully");
          this.props.history.push(CONSTANT.url.festivalAdvanceEmpForRM);
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.setState({
          showLoader: false,
        });
      });
  };

  loadList = () => {
    this.setState({ showLoader: true });
    const { id } = this.props.match.params;
    let data = {
      id: id,
    };
    getFestivalDetailById(data)
      .then((response: any) => {
        this.setState({
          data: response.result[0],
          showLoader: false,
        });
      })
      .catch((err: any) => {
        console.log(err);
        this.setState({
          showLoader: false,
        });
      });
  };
}

export default FestivalAdvanceListForRMApprove;
