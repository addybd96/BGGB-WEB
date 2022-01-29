import * as React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

import CONSTANT from "../../../constant";
import Loader from "../../../component/common/Loader";
import Header from "../../../component/common/Header";
import Sidebar from "../../../component/common/Sidebar";
import { onChange, validateForm } from "../../../utils";
import {
  addPaymentConfig,
  getPaymentConfigList,
} from "../../../action/SettingsActions";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: undefined,
      showLoader: false,
      allowanceType: {
        name: "allowanceType",
        value: "",
        options: [],
        error: "",
        isRequired: true,
      },
      glHead: {
        name: "glHead",
        value: "",
        error: "",
        isRequired: true,
      },
      remarks: {
        name: "remarks",
        value: "",

        error: "",
        isRequired: true,
      },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;

    this.props.match.params.id && this.setState({ showLoader: true });
    this.props.match.params.id &&
      getPaymentConfigList({ id: this.props.match.params.id }).then(
        (res: any) => {
          this.setState({ showLoader: false });
          if (res)
            this.setState({
              id: res.id,
              allowanceType: {
                ...this.state.allowanceType,
                value: res.allowanceType,
              },
              glHead: {
                ...this.state.glHead,
                value: res.glHead,
              },
              remarks: {
                ...this.state.remarks,
                value: res.remarks,
              },
            });
        }
      );
  }

  public render() {
    const { showLoader, allowanceType, glHead, remarks } = this.state;
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
                    <b>Add New Account-GL Head Config</b>
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
                                allowanceType.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={allowanceType.name}
                              value={allowanceType.value}
                            >
                              <option value="">--Select--</option>
                              <option value="Fuel">Fuel</option>
                              <option value="TaDa">TaDa</option>
                              <option value="Hotel">Hotel</option>
                              <option value="News Paper">News Paper</option>
                              <option value="Mobile Allowance">
                                Mobile Allowance
                              </option>
                              <option value="Brief Case">Brief Case</option>
                              <option value="Entertainment">
                                Entertainment
                              </option>
                              <option value="Uniform and Liveries">
                                Uniform and Liveries
                              </option>
                              <option value="Medical Allowance">
                                Medical Allowance
                              </option>
                            </select>
                          </div>

                          <div className="col-lg-6 form-group">
                            <label>GL Head</label>
                            <input
                              onChange={this.onChange}
                              className={
                                glHead.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={glHead.name}
                              value={glHead.value}
                            />
                          </div>

                          <div className="col-lg-12 form-group">
                            <label>Remarks</label>
                            <textarea
                              onChange={this.onChange}
                              className={
                                remarks.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={remarks.name}
                              value={remarks.value}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 ">
                        <Link
                          to={CONSTANT.url.settingsOption.paymentApprovalList}
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
    console.log(e.target.name, e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    onChange(this, name, value, () => {});
  };

  private onSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm(this)) {
      const {
        allowanceType: { value: allowanceType },
        glHead: { value: glHead },
        remarks: { value: remarks },
        id,
      } = this.state;
      this.setState({ showLoader: true });
      addPaymentConfig({
        allowanceType,
        glHead,
        remarks,
        id,
      }).then((res: any) => {
        this.setState({ showLoader: false });
        if (res) {
          alert("Record update sucessfully!");
          this.props.history.push(
            CONSTANT.url.settingsOption.paymentApprovalList
          );
        }
      });
    }
  };
}

export default ComponentName;
