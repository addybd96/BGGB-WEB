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
  addReportingManagerApprovalConfig,
  getReportingManagerApprovalConfig,
  newReportingManagerAllowance,
} from "../../../action/SettingsActions";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: undefined,
      showLoader: false,
      allowance: {
        name: "allowance",
        value: "",
        error: "",
        isRequired: true,
      },
      empCodeFrom: {
        name: "empCodeFrom",
        value: "",
        error: "",
        isRequired: true,
      },
      empCodeTo: {
        name: "empCodeTo",
        value: "",
        error: "",
        isRequired: true,
      },
     
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
  }


  public render() {
    const {
      showLoader,
     allowance,
     empCodeTo,
     empCodeFrom
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
                    <b>Change Reporting Manager</b>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-6 form-group">
                            <label>Allowance Name</label>
                            <select
                              onChange={this.onChange}
                              className={
                                allowance.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={allowance.name}
                              value={allowance.value}
                            >
                              <option value="">--Select--</option>
                              <option value="briefCaseAllowance">Briefcase Allowance</option>
                              <option value="entertainmentAmount">Entertainment Amount</option>
                              <option value="medicalAllowance">Medical Allowance</option>
                              <option value="mobileAllowance">Mobile Allowance</option>
                              <option value="newsPaperAllowance">News Paper Allowance</option>
                              <option value="tadaAllowance">Tada Allowance</option>
                              <option value="travelAllowance">Travel allowance</option>
                              <option value="uniformAndLiveries">Uniform And Liveries Allowance</option>
                            </select>
                          </div>
                          <div className="col-lg-6 form-group">
                            <label>Employee Id Code From</label>
                            <input
                            type="text"
                            onChange={this.onChange}
                            className={
                                empCodeFrom.error.length > 0
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            name={empCodeFrom.name}
                            value={empCodeFrom.value}
                            />

                            </div>
                            <div className="col-lg-6 form-group">
                            <label>Employee Id Code To</label>
                            <input
                            type="text"
                            onChange={this.onChange}
                            className={
                                empCodeTo.error.length > 0
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            name={empCodeTo.name}
                            value={empCodeTo.value}
                            />
                            </div>
                        

                         
                        </div>
                      </div>
                      <div className="col-lg-12 ">
                        {/* <Link
                          to={CONSTANT.url.settingsOption.leaveApprovalList}
                          className="col-lg-2 btn primary-control pull-left"
                        >
                          Cancel
                        </Link> */}
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
    onChange(this, name, value);
  };

  private onSubmit = (e: any) => {
    e.preventDefault();
    debugger
    let data={
        allowanceName:this.state.allowance.value,
        empCodeFrom:this.state.empCodeFrom.value,
        empCodeTo:this.state.empCodeTo.value
    }
    newReportingManagerAllowance(data).then((res: any) => {
        this.setState({ showLoader: false });
        if (res) {
          alert("record update sucessfully");
        //   this.props.history.push(
        //     CONSTANT.url.settingsOption.leaveApprovalList
        //   );
        }
      });
  }
}

export default ComponentName;
