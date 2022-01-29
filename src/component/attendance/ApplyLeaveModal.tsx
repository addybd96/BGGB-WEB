import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NumberFormat from "react-number-format";
import * as moment from "moment";

import { isEmpty, onChange, validateForm, setError } from "./../../utils";
import { getAttendanceTypeList } from "./../../action/SettingsActions";
import { updateAttendance } from "../../action/AttendanceActions";
import { getLeaveTypeList } from "../../action/SettingsActions";

export default class ApplyLeaveModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const detail = this.props.attendance;
    this.state = {
      id: detail ? detail.userId : "",
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
  }

  componentDidMount() {
    const { page, limit } = this.state;
    console.log("item ", this.props.attendance);
    console.log(this.state);
    getAttendanceTypeList(page, limit)
      .then((res: any) => {
        if (res.result) {
          this.setState({
            aType: { ...this.state.aType, options: res.result },
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });

    getLeaveTypeList(1, 20)
      .then((res: any) => {
        console.log("resp", res);
        if (res.result) {
          this.setState({
            leaveTypes: { ...this.state.leaveTypes, options: res.result },
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (props.attendance !== "") {
      let inTime = { ...state.inTime };
      inTime.value = props.attendance.inTime;
      let outTime = { ...state.outTime };
      outTime.value = props.attendance.outTime;
      state.inTime = inTime;
      state.outTime = outTime;
      return state;
    }

    return null;
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
    const { isModalOpen } = this.props;
    return (
      <React.Fragment>
        <Modal isOpen={isModalOpen} className="company-model modal-lg">
          <form onSubmit={this._onSubmit}>
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">
                Leave Application
              </h1>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={this._dismissModal}
              >
                &times;
              </button>
            </div>
            <ModalBody>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <div className="row">
                      <div className="col-lg-4 form-group">
                        <label>Type of Leave</label>
                        {this.renderTypeSelect(leaveTypes)}
                      </div>
                      <div className="col-lg-4 form-group">
                        <label>Status</label>
                        <select
                          disabled={disableStatus}
                          name={dayType.name}
                          value={dayType.value}
                          onChange={this.onChange}
                          className={
                            dayType.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                        >
                          <option>--Select--</option>
                          <option value="FD">Full Pay</option>
                          <option value="HD">Half Fay</option>
                        </select>
                      </div>
                      <div className="col-lg-4 form-group">
                        <label>Will Leave Head Quarter ?</label>
                        <select
                          name={willLeaveHO.name}
                          value={willLeaveHO.value}
                          onChange={this.onChange}
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
                          onChange={this.onChange}
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
                          onChange={this.onChange}
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
                          disabled={disableStatus}
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
                          onChange={this.onChange}
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
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-lg-12 form-group">
                        <label>Contact Address</label>
                        <textarea
                          name={address.name}
                          value={address.value}
                          onChange={this.onChange}
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
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="row">
                <button type="submit" className="col-lg-12 btn btn-primary">
                  Submit
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
      </React.Fragment>
    );
  }

  onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "leaveTypes" && value === "3") {
      this.setState({ disableStatus: false });
    } else if (name === "leaveTypes" && value !== "3") {
      this.setState({ disableStatus: true });
    }
    onChange(this, name, value);
  };

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
          onChange={this.onChange}
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

  private _getJsonToPOST(state: any) {
    const stateData = JSON.parse(JSON.stringify(state));

    let formData = new FormData();
    formData.append("userId", stateData.id);
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

  _onSubmit = (e: any) => {
    e.preventDefault();
    this._clearFormError();
    if (validateForm(this)) {
      let status = true;
      const { fromDate, toDate, leaveTypes, medicalCert } = this.state;
      let fDate = moment(fromDate.value);
      let tDate = moment(toDate.value);

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
        this.props.onSubmitModal(this._getJsonToPOST(this.state));
      }
    }
  };

  _dismissModal = () => {
    this.props.dismissModal();
  };
}
