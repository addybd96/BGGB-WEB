import * as React from "react";
import * as moment from "moment";
import NumberFormat from "react-number-format";
import { getBasicInfo, getLeaveTypeList } from "../../action/SettingsActions";
import {
  onChange,
  setOptions,
  isEmpty,
  setError,
  validateForm,
} from "./../../utils";
import Loader from "../../component/common/Loader";

class AddLeaveComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showLoader: false,
      fromDate: { name: "fromDate", value: "", error: "", isRequired: true },
      toDate: { name: "toDate", value: "", error: "", isRequired: true },
      leaveTypes: {
        name: "leaveTypes",
        value: "",
        error: "",
        isRequired: true,
        options: [],
      },
      dayType: { name: "dayType", value: "", error: "", isRequired: false },
      reason: { name: "reason", value: "", error: "", isRequired: true },
      address: { name: "address", value: "", error: "", isRequired: true },
      phone: { name: "phone", value: "", error: "", isRequired: true },
      willLeaveHO: {
        name: "willLeaveHO",
        value: "",
        error: "",
        isRequired: true,
      },
      medicalCert: {
        name: "medicalCert",
        value: "",
        error: "",
        isRequired: false,
      },
      disableStatus: true,
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.loadList();
  }

  public render() {
    const {
      disableStatus,
      fromDate,
      toDate,
      dayType,
      leaveTypes,
      reason,
      address,
      phone,
      willLeaveHO,
      medicalCert,
      showLoader,
    } = this.state;

    //console.table([empId, fromDate, toDate, dayType, type, reason, showLoader])

    if (showLoader) return <Loader />;

    return (
      <React.Fragment>
        <div className="col-lg-11">
          <form onSubmit={this._submitForm}>
            <div className="col-lg-12 mt-4">
              <div className="row">
                <div className="col-lg-12 pl-0">
                  <h5 className="heading-h1">Apply Leave</h5>
                </div>
              </div>
            </div>

            <div className="card mt-2">
              <div className="card-header">
                <b>Leave</b>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <div className="row">
                      <div className="col-lg-6 form-group">
                        <label>Type of Leave</label>

                        {this.renderTypeSelect(leaveTypes)}
                      </div>
                      <div className="col-lg-3 form-group">
                        <label>Status</label>
                        <select
                          disabled={disableStatus}
                          name={dayType.name}
                          value={dayType.value}
                          onChange={this._onChange}
                          className={
                            dayType.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                        >
                          <option>--Select--</option>
                          <option value="FD">Full Pay</option>
                          <option value="HD">Half Pay</option>
                        </select>
                      </div>

                      <div className="col-lg-3 form-group">
                        <label>Will Leave Head Quarter ?</label>
                        <select
                          name={willLeaveHO.name}
                          value={willLeaveHO.value}
                          onChange={this._onChange}
                          className={
                            willLeaveHO.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                        >
                          <option>--Select--</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-2">
                    <div className="row">
                      <div className="col-lg-6 form-group">
                        <label>From Date</label>
                        <input
                          type="date"
                          name={fromDate.name}
                          value={fromDate.value}
                          onChange={this._onChange}
                          className={
                            fromDate.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          placeholder="Enter Name"
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>To Date</label>
                        <input
                          type="date"
                          name={toDate.name}
                          value={toDate.value}
                          onChange={this._onChange}
                          className={
                            toDate.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="row">
                      <div className="col-lg-12 form-group">
                        <label>Supporting Document</label>
                        <input
                          name={medicalCert.name}
                          className={
                            medicalCert.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control p-1"
                          }
                          type="file"
                          onChange={this.onFileChange}
                        />
                      </div>
                      <div className="col-lg-12 form-group">
                        <label>Reason for leave</label>
                        <textarea
                          name={reason.name}
                          value={reason.value}
                          onChange={this._onChange}
                          className={
                            reason.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          rows={5}
                          id="comment"
                          placeholder="Enter Reason for leave"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="row">
                      <div className="col-lg-12 form-group">
                        <label>Contact Number</label>
                        <NumberFormat
                          allowLeadingZeros={false}
                          allowNegative={false}
                          thousandSeparator={false}
                          className={
                            phone.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          placeholder=""
                          name={phone.name}
                          value={phone.value}
                          onChange={this._onChange}
                        />
                      </div>
                      <div className="col-lg-12 form-group">
                        <label>Contact Address</label>
                        <textarea
                          name={address.name}
                          value={address.value}
                          onChange={this._onChange}
                          className={
                            address.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          rows={5}
                          id="comment"
                          placeholder="Contact address while you'll be on leave"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 ">
                    <button
                      type="submit"
                      className="col-lg-2 btn primary-control pull-right"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }

  private onFileChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.files[0];
    onChange(this, name, value);
  };

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

  private _onChange = (e: any, callback?: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "leaveTypes" && value === "3") {
      this.setState({ disableStatus: false });
      this.setState({
        medicalCert: { ...this.state.medicalCert, isRequired: true },
      });
      this.setState({
        dayType: { ...this.state.dayType, isRequired: true },
      });
    } else if (name === "leaveTypes" && value !== "3") {
      this.setState({ disableStatus: true });
      this.setState({
        medicalCert: { ...this.state.medicalCert, isRequired: false },
      });
      this.setState({
        dayType: { ...this.state.dayType, isRequired: false },
      });
    }
    onChange(this, name, value);
  };

  private _setError = (name: string, error: string) => {
    setError(this, name, error);
  };

  private _clearFormError() {
    this._setError("isFormValid", "");
    this._setError("fromDate", "");
    this._setError("toDate", "");
    this._setError("dayType", "");
    this._setError("type", "");
    this._setError("reason", "");
  }

  private _getJsonToPOST(state: any) {
    const stateData = JSON.parse(JSON.stringify(state));

    let formData = new FormData();
    formData.append("toDate", stateData.toDate.value);
    formData.append("fromDate", stateData.fromDate.value);
    formData.append("leaveType", stateData.leaveTypes.value);
    formData.append("dayType", stateData.dayType.value);
    formData.append("reason", stateData.reason.value);

    formData.append("address", stateData.address.value);
    formData.append("phone", stateData.phone.value);
    formData.append("willLeaveHO", stateData.willLeaveHO.value);

    formData.append("file", this.state.medicalCert.value);

    // const jsonToReturn = {
    //     toDate: stateData.toDate.value,
    //     fromDate: stateData.fromDate.value,
    //     leaveType: stateData.leaveTypes.value,
    //     dayType: stateData.dayType.value,
    //     // leaveTypeDate: Date.parse(stateData.leaveTypeDate.value) / 1000,
    //     reason: stateData.reason.value,

    // };

    return formData;
  }

  _submitForm = (e: any) => {
    debugger;
    e.preventDefault();
    this._clearFormError();

    if (validateForm(this)) {
      let status = true;
      const { fromDate, toDate, leaveTypes, medicalCert } = this.state;
      let fDate = moment(fromDate.value);
      let tDate = moment(toDate.value);

      let t = new Date(toDate.value);
      let f = new Date(fromDate.value);

      if (t < f) {
        alert("Date range is in reverse");
        return;
      }

      let diff = tDate.diff(fDate, "days");

      if (leaveTypes.value == 1) {
        //casual
        if (diff > 6) {
          status = false;
          alert("Casual Leave cannot be applied for more than 6 days");
        }
      } else if (leaveTypes.value == 2) {
        //privilege
      } else if (leaveTypes.value == 3) {
        //sick
        if (medicalCert.value === "") {
          this._setError(medicalCert.name, "Cannot be empty");
          status = false;
        }
      } else if (leaveTypes.value == 4) {
        //extraordinary
        if (diff > 90) {
          status = false;
          alert("Extraordinary Leave cannot be applied for more than 90 days");
        }
      } else if (leaveTypes.value == 5) {
        //special
      } else if (leaveTypes.value == 6) {
        //maternity
        if (diff > 180) {
          status = false;
          alert("Paternity Leave cannot be applied for more than 90 days");
        }
      } else if (leaveTypes.value == 7) {
        //paternity
        if (diff > 15) {
          status = false;
          alert("Paternity Leave cannot be applied for more than 90 days");
        }
      }
      if (status) {
        this.props.onSubmit(this._getJsonToPOST(this.state));
      }
    }
  };

  loadList = () => {
    this.setState({ showLoader: true });
    getLeaveTypeList(1, 20)
      .then((res: any) => {
        console.log("resp", res);
        if (res) {
          this.setState({
            leaveTypes: { ...this.state.leaveTypes, options: res.result },
            showLoader: false,
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    getBasicInfo()
      .then((res: any) => {
        console.log("newresp", res);
        if (res.status) {
          this.setState({
            phone: { ...this.state.phone, value: res.result.mobile },
          });
          if (res.result.address) {
            let address = `${res.result.address}\n${res.result.city},${res.result.state}\n${res.result.country}\n${res.result.pinCode}`;
            this.setState({
              address: { ...this.state.address, value: address },
            });
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}

export default AddLeaveComponent;
