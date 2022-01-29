import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { isEmpty } from "./../../utils";
import { updateAttendance } from "../../action/AttendanceActions";

export default class UpdateAttendanceModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      status: { name: "status", value: "", error: "", options: [] },
      remark: { name: "remark", value: "", error: "" },
      statuschk: [],
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {}

  // static getDerivedStateFromProps(props: any, state: any) {
  //   if (state.status.value === "")
  //     if (props.leaveStatus)
  //       if (props.isValidate) {
  //         return {
  //           ...state,
  //           status: { ...state.status, value: props.leaveStatus[0].id },
  //         };
  //       }
  // }

  public render() {
    const { isModalOpen, leaveStatus, isValidate } = this.props;
    const { status, remark } = this.state;
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="modal-body">
            <div>
              <div className="row">
                <div className="col-lg-12 mb-2">
                  <div>
                    <form>
                      {!this.props.isWithdrawn ? (
                        <div className="mb-2">
                          <div className="row">
                            <div className="col-lg-12 form-group">
                              <label>Status</label>
                              {this.renderDepartmentSelect(status)}
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div className="mb-2">
                        <div className="row">
                          <div className="col-lg-12 form-group">
                            <label>Remark </label>
                            <textarea
                              name={remark.name}
                              value={remark.value}
                              onChange={this._onChange}
                              className={
                                remark.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              rows={5}
                              id="comment"
                              placeholder="Type Here"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
        <React.Fragment>
          <button
            type="button"
            className="col-lg-12 btn btn-primary"
            onClick={this._onSubmit}
          >
            Update
          </button>
        </React.Fragment>
      </React.Fragment>
    );
  }

  renderDepartmentSelect = (type: any) => {
    var status = this.props.leaveStatus;
    if (this.props.isApprovingManager === true) {
      const chekVal1 = this.props.isValidate.filter(
        (item: any) => item.id === this.props.selectedId
      );

      status = this.props.leaveStatus.filter((i: any) =>
        this.props.approvalPower
          ? i.name !== "Pending" && i.name !== "Withdraw Requested"
          : i.name !== "Approved" &&
            i.name !== "Pending" &&
            i.name !== "Withdraw Requested"
      );
      // else if (i.status === 'Forwarded') {
      //     status = this.props.leaveStatus.filter((i: any) => (i.name !== 'Pending' && i.name !== 'Withdraw Requested' && i.name !== 'Forwarded' && i.name !== 'Rejected' && i.name !== 'Approved'))
      // }
    } else {
      let index = status.findIndex((item: any) => item.name === "Approved");
      status.splice(index, 1);
    }
    return (
      <select
        name={type.name}
        value={type.value}
        onChange={this._onChange}
        className={
          type.error.length > 0 ? "form-control is-invalid" : "form-control"
        }
      >
        {" "}
        <option value="" disabled selected>
          Select Option
        </option>
        {status.map((dep: any, dIndex: number) => {
          return (
            <option key={dIndex} value={dep.id}>
              {dep.name}
            </option>
          );
        })}
      </select>
    );
  };

  private _onChange(e: any, callback?: any) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: { ...this.state[name], value } }, callback);
  }

  private _validateForm() {
    const { status, remark } = this.state;
    let status_ = true;
    if (isEmpty(status.value)) {
      this._setError("status", "error");
      status_ = false;
    }
    if (isEmpty(remark.value)) {
      this._setError("remark", "error");
      status_ = false;
    }
    return status;
  }

  _onSubmit = () => {
    this._clearFormError();
    if (this._validateForm()) {
      let payload = {
        statusId: this.state.status.value,
        remark: this.state.remark.value,
        //empId: this.props.attendance.empId
      };
      this.props.onSubmit(payload);
      this.setState({
        status: { name: "status", value: "", error: "" },
        remark: { name: "remark", value: "", error: "" },
      });
      // updateAttendance(payload).then((resp: any) => {
      //     console.log('updateAttendance resp', resp)
      //     this.props.toggleModal(this.props.attendance);
      // })
    }
  };

  private _setError(name: string, error: string) {
    this.setState({ [name]: { ...this.state[name], error } });
  }

  private _clearFormError() {
    this._setError("status", "");
    this._setError("remark", "");
  }

  _dismissModal = () => {
    this.props.dismissModal();
  };
}
