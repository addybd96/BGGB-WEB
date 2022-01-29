import * as React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

import CONSTANT from "../../../constant";
import Loader from "../../../component/common/Loader";
import Header from "../../../component/common/Header";
import Sidebar from "../../../component/common/Sidebar";
import { onChange, validateForm } from "../../../utils";
import {
  getWorkRoles,
  addLeaveApprovalConfig,
  getLeaveApprovalConfigList,
  getLeaveTypeList,
  getWorkLocations,
  getDesignations,
} from "../../../action/SettingsActions";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: undefined,
      showLoader: false,
      leaveType: {
        name: "leaveType",
        value: "",
        options: [],
        error: "",
        isRequired: true,
      },
      reportingManagerWorkRole: {
        name: "reportingManagerWorkRole",
        options: [],
        value: "",
        error: "",
        isRequired: true,
      },
      applyingEmployeeWorkRole: {
        name: "applyingEmployeeWorkRole",
        options: [],
        value: "",
        error: "",
        isRequired: true,
      },
      applyingEmployeeDesignation: {
        name: "applyingEmployeeDesignation",
        options: [],
        value: "",
        error: "",
        isRequired: true,
      },
      reportingManagerDesignation: {
        name: "reportingManagerDesignation",
        options: [],
        value: "",
        error: "",
        isRequired: true,
      },
      reportingManagerOfficeType: {
        name: "reportingManagerOfficeType",
        options: [],
        value: "",
        error: "",
        isRequired: true,
      },
      applyingEmployeeOfficeType: {
        name: "applyingEmployeeOfficeType",
        options: [],
        value: "",
        error: "",
        isRequired: true,
      },
      approvalPower: {
        name: "approvalPower",
        value: false,
        error: "",
        isRequired: true,
      },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
    getWorkLocations(1, 20).then((response: any) => {
      if (response.status) {
        this.setState({
          reportingManagerOfficeType: {
            ...this.state.reportingManagerOfficeType,
            options: response.result,
          },
          applyingEmployeeOfficeType: {
            ...this.state.applyingEmployeeOfficeType,
            options: response.result,
          },
        });
      }
    });
    getDesignations().then((response: any) => {
      if (response.status) {
        this.setState({
          applyingEmployeeDesignation: {
            ...this.state.applyingEmployeeDesignation,
            options: response.result,
          },
          reportingManagerDesignation: {
            ...this.state.reportingManagerDesignation,
            options: response.result,
          },
        });
      }
    });
    getLeaveTypeList(1, 20).then((response: any) => {
      if (response.status) {
        this.setState({
          leaveType: {
            ...this.state.leaveType,
            options: response.result,
          },
        });
      }
    });
    getWorkRoles(0, 0).then((response: any) => {
      if (response.status) {
        this.setState({
          reportingManagerWorkRole: {
            ...this.state.reportingManagerWorkRole,
            options: response.result,
          },
          applyingEmployeeWorkRole: {
            ...this.state.applyingEmployeeWorkRole,
            options: response.result,
          },
        });
      }
    });

    this.props.match.params.id && this.setState({ showLoader: true });
    this.props.match.params.id &&
      getLeaveApprovalConfigList({ id: this.props.match.params.id }).then(
        (res: any) => {
          this.setState({ showLoader: false });
          if (res)
            this.setState({
              id: res.id,
              leaveType: {
                ...this.state.leaveType,
                value: res.leaveTypeId,
              },
              reportingManagerWorkRole: {
                ...this.state.reportingManagerWorkRole,
                value: res.reportingManagerWorkRoleId,
              },
              applyingEmployeeWorkRole: {
                ...this.state.applyingEmployeeWorkRole,
                value: res.applyingEmployeeWorkRoleId,
              },
              applyingEmployeeDesignation: {
                ...this.state.applyingEmployeeDesignation,
                value: res.applyingEmployeeWorkRoleId,
              },
              reportingManagerDesignation: {
                ...this.state.reportingManagerDesignation,
                value: res.reportingManagerDesignationId,
              },
              applyingEmployeeOfficeType: {
                ...this.state.applyingEmployeeOfficeType,
                value: res.applyingEmployeeOfficeTypeId,
              },
              reportingManagerOfficeType: {
                ...this.state.reportingManagerOfficeType,
                value: res.reportingManagerOfficeTypeId,
              },
              approvalPower: {
                ...this.state.approvalPower,
                value: res.approvalPower,
              },
            });
        }
      );
  }

  private onCheckboxChange = (e: any) => {
    this.setState({
      approvalPower: { ...this.state.approvalPower, value: e.target.checked },
    });
  };

  public render() {
    const {
      showLoader,
      leaveType,
      applyingEmployeeWorkRole,
      approvalPower,
      reportingManagerWorkRole,
      applyingEmployeeDesignation,
      reportingManagerDesignation,
      reportingManagerOfficeType,
      applyingEmployeeOfficeType,
    } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11">
              <form onSubmit={this.onSubmit}>
                <div className="col-lg-12 mt-4">
                  <div className="row">
                    <div className="col-lg-12 pl-0">
                      {/* <h5 className="heading-h1">Add Vehicle Information</h5> */}
                    </div>
                  </div>
                </div>

                <div className="card mt-2">
                  <div className="card-header">
                    <b>Add New Leave Approval Config</b>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-6 form-group">
                            <label>Leave Type</label>
                            <select
                              onChange={this.onChange}
                              className={
                                leaveType.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={leaveType.name}
                              value={leaveType.value}
                            >
                              <option value="">--Select--</option>
                              {leaveType.options.length > 0 &&
                                leaveType.options.map((w: any) => {
                                  return <option value={w.id}>{w.name}</option>;
                                })}
                            </select>
                          </div>

                          <div className="col-lg-6 form-group">
                            <label>Applying Employee Work Role</label>
                            <select
                              onChange={this.onChange}
                              className={
                                applyingEmployeeWorkRole.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={applyingEmployeeWorkRole.name}
                              value={applyingEmployeeWorkRole.value}
                            >
                              <option value="">--Select--</option>
                              {applyingEmployeeWorkRole.options.length > 0 &&
                                applyingEmployeeWorkRole.options.map(
                                  (w: any) => {
                                    return (
                                      <option value={w.id}>{w.name}</option>
                                    );
                                  }
                                )}
                            </select>
                          </div>

                          <div className="col-lg-6 form-group">
                            <label>Reporting Manager Work Role </label>
                            <select
                              onChange={this.onChange}
                              className={
                                reportingManagerWorkRole.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={reportingManagerWorkRole.name}
                              value={reportingManagerWorkRole.value}
                            >
                              <option value="">--Select--</option>
                              {reportingManagerWorkRole.options.length > 0 &&
                                reportingManagerWorkRole.options.map(
                                  (w: any) => {
                                    return (
                                      <option value={w.id}>{w.name}</option>
                                    );
                                  }
                                )}
                            </select>
                          </div>
                          <div className="col-lg-6 form-group">
                            <label>Applying Employee Designation </label>
                            <select
                              onChange={this.onChange}
                              className={
                                applyingEmployeeDesignation.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={applyingEmployeeDesignation.name}
                              value={applyingEmployeeDesignation.value}
                            >
                              <option value="">--Select--</option>
                              {applyingEmployeeDesignation.options.length > 0 &&
                                applyingEmployeeDesignation.options.map(
                                  (w: any) => {
                                    return (
                                      <option value={w.designationId}>
                                        {w.name}
                                      </option>
                                    );
                                  }
                                )}
                            </select>
                          </div>

                          <div className="col-lg-6 form-group">
                            <label>Reporting Manager Designation</label>
                            <select
                              onChange={this.onChange}
                              className={
                                reportingManagerDesignation.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={reportingManagerDesignation.name}
                              value={reportingManagerDesignation.value}
                            >
                              <option value="">--Select--</option>
                              {reportingManagerDesignation.options.length > 0 &&
                                reportingManagerDesignation.options.map(
                                  (w: any) => {
                                    return (
                                      <option value={w.designationId}>
                                        {w.name}
                                      </option>
                                    );
                                  }
                                )}
                            </select>
                          </div>
                          <div className="col-lg-6 form-group">
                            <label>Applying Employee Office Type</label>
                            <select
                              onChange={this.onChange}
                              className={
                                applyingEmployeeOfficeType.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={applyingEmployeeOfficeType.name}
                              value={applyingEmployeeOfficeType.value}
                            >
                              <option value="">--Select--</option>
                              {applyingEmployeeOfficeType.options.length > 0 &&
                                applyingEmployeeOfficeType.options.map(
                                  (w: any) => {
                                    return (
                                      <option value={w.id}>{w.name}</option>
                                    );
                                  }
                                )}
                            </select>
                          </div>

                          <div className="col-lg-6 form-group">
                            <label>Reporting Manager Office Type </label>
                            <select
                              onChange={this.onChange}
                              className={
                                reportingManagerOfficeType.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={reportingManagerOfficeType.name}
                              value={reportingManagerOfficeType.value}
                            >
                              <option value="">--Select--</option>
                              {reportingManagerOfficeType.options.length > 0 &&
                                reportingManagerOfficeType.options.map(
                                  (w: any) => {
                                    return (
                                      <option value={w.id}>{w.name}</option>
                                    );
                                  }
                                )}
                            </select>
                          </div>

                          <div className="col-lg-6 form-group">
                            <label>Approval Power</label>
                            <br />
                            <input
                              type="checkbox"
                              onChange={this.onCheckboxChange}
                              checked={approvalPower.value}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 ">
                        <Link
                          to={CONSTANT.url.settingsOption.leaveApprovalList}
                          className="col-lg-2 btn primary-control pull-left"
                        >
                          Cancel
                        </Link>
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
          </div>
        </div>
        {showLoader && <Loader />}
      </React.Fragment>
    );
  }

  onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    onChange(this, name, value, () => {});
  };

  private onSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm(this)) {
      const {
        leaveType: { value: leaveType },
        reportingManagerWorkRole: { value: reportingManagerWorkRole },
        applyingEmployeeWorkRole: { value: applyingEmployeeWorkRole },
        approvalPower: { value: approvalPower },
        applyingEmployeeDesignation: { value: applyingEmployeeDesignation },
        reportingManagerDesignation: { value: reportingManagerDesignation },
        reportingManagerOfficeType: { value: reportingManagerOfficeType },
        applyingEmployeeOfficeType: { value: applyingEmployeeOfficeType },
        id,
      } = this.state;
      this.setState({ showLoader: true });
      addLeaveApprovalConfig({
        applyingEmployeeDesignation,
        leaveType,
        reportingManagerWorkRole,
        reportingManagerDesignation,
        reportingManagerOfficeType,
        applyingEmployeeOfficeType,
        applyingEmployeeWorkRole,
        approvalPower,
        id,
      }).then((res: any) => {
        this.setState({ showLoader: false });
        if (res) {
          alert("record update sucessfully");
          this.props.history.push(
            CONSTANT.url.settingsOption.leaveApprovalList
          );
        }
      });
    }
  };
}

export default ComponentName;
