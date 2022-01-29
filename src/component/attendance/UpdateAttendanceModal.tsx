import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { isEmpty, onChange, validateForm } from "./../../utils";
import {
  getAttendanceTypeList,
  getLeaveTypeList,
} from "./../../action/SettingsActions";
import { updateAttendance } from "../../action/AttendanceActions";

export default class UpdateAttendanceModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const detail = this.props.attendance;
    this.state = {
      id: detail ? detail.id : "",
      aType: {
        value: detail ? detail.type : "",
        name: "aType",
        error: "",
        isRequired: true,
        options: [],
      },
      lType: {
        value: 1,
        name: "lType",
        error: "",
        isRequired: true,
        options: [],
      },
      dType: {
        value: 1,
        name: "dType",
        error: "",
        isRequired: true,
        options: [
          {
            id: 1,
            name: "Half Day",
          },
          {
            id: 2,
            name: "Full Day",
          },
        ],
      },
      // inTime: { value: detail ? detail.inTime : '', name: 'inTime', error: '', isRequired: false, },
      // outTime: { value: detail ? detail.outTime : '', name: 'outTime', error: '', isRequired: false, },
      remark: {
        value: detail && detail.remark ? detail.remark : "",
        name: "remark",
        error: "",
        isRequired: false,
      },
      page: 1,
      limit: 20,
    };
  }

  componentDidMount() {
    const { page, limit } = this.state;
    console.log("item ", this.props.attendance);
    console.log(this.state);
    getAttendanceTypeList(page, limit)
      .then((res: any) => {
        if (res.result) {
          const filterAType = res.result;
          this.setState({
            aType: { ...this.state.aType, options: filterAType },
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    getLeaveTypeList(page, limit)
      .then((res: any) => {
        if (res.result) {
          const filterlType = res.result;
          console.log("check", res.result);
          this.setState({
            lType: { ...this.state.lType, options: filterlType },
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
    const { isModalOpen } = this.props;
    const { aType, remark, lType, dType } = this.state;
    // console.log(this.state);
    return (
      <React.Fragment>
        <Modal isOpen={isModalOpen} className="company-model">
          <form onSubmit={this._onSubmit}>
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">
                Update Attendance
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
                <div>
                  <div className="row">
                    <div className="col-lg-12 mb-2">
                      <div>
                        <div className="mb-2">
                          <div className="row">
                            {/* <div className="col-lg-6 form-group">
                                                        <label>In Time (H:M:S) </label>
                                                        <input name="inTime" type="text" className={isEmpty(inTime.error) ? "form-control" : "form-control is-invalid"} placeholder="Enter In Time (H:M:S)" value={inTime.value} onChange={this._onChange} />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label >Out Time (H:M:S) </label>
                                                        <input name="outTime" type="text" className={isEmpty(outTime.error) ? "form-control" : "form-control is-invalid"} placeholder="Enter Out Time (H:M:S)" value={outTime.value} onChange={this._onChange} />
                                                    </div> */}
                            <div className="col-lg-12 form-group">
                              <label>Attendance Status</label>
                              <select
                                className={
                                  aType.error.length > 0
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                name={aType.name}
                                value={aType.value}
                                onChange={this.onChange}
                              >
                                <option value="">Select Type</option>
                                {aType.options.map(
                                  (item: any, index: number) => {
                                    return (
                                      <option value={item.id} key={index}>
                                        {item.name}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                        {aType.value == 3 && (
                          <div className="mb-2">
                            <div className="row">
                              <div className="col-lg-12 form-group">
                                <label>Leave type</label>
                                <select
                                  className={
                                    lType.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={lType.name}
                                  value={lType.value}
                                  onChange={this.onChange}
                                >
                                  <option value="">Select Type</option>
                                  {lType.options.map(
                                    (item: any, index: number) => {
                                      return (
                                        <option value={item.id} key={index}>
                                          {item.name}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        {lType.value == 3 && (
                          <div className="mb-2">
                            <div className="row">
                              <div className="col-lg-12 form-group">
                                <label>Day type</label>
                                <select
                                  className={
                                    dType.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={dType.name}
                                  value={dType.value}
                                  onChange={this.onChange}
                                >
                                  <option value="">Select Type</option>
                                  {dType.options.map(
                                    (item: any, index: number) => {
                                      return (
                                        <option value={item.id} key={index}>
                                          {item.name}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="mb-2">
                          <div className="row">
                            <div className="col-lg-12 form-group">
                              <label>Remark </label>
                              <textarea
                                name={remark.name}
                                value={remark.value}
                                onChange={this.onChange}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="col-lg-12 btn btn-primary">
                Update
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </React.Fragment>
    );
  }

  onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    onChange(this, name, value);
  };

  _onSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm(this)) {
      let payload = {
        type: parseInt(this.state.aType.value),
        leaveType: parseInt(this.state.lType.value),
        dayType: parseInt(this.state.dType.value),
        remark: this.state.remark.value,
        id: this.state.id,
        date: this.props.date.value,
      };

      this.props.onSubmitModal(payload);

      // updateAttendance(payload).then((resp: any) => {
      //     console.log('updateAttendance resp', resp)
      //     this.props.toggleModal(this.props.attendance);
      // })
    }
  };

  _dismissModal = () => {
    this.props.dismissModal();
  };
}
