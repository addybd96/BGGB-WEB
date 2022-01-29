import * as React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

import Loader from "../../component/common/Loader";
import CONSTANT from "./../../constant";

import {
  onChange,
  validateForm,
  getStorage,
  setCookie,
  getCookie,
} from "./../../utils";
import {
  checkAuthenticationFormComplete,
  login,
  postAuthenticationFormComplete,
} from "./../../action/AuthAction";
import SessionLogout from "../../component/common/SessionLogout";
import constant from "./../../constant";

class AuthenticationForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      address: { name: "address", value: "", error: "", isRequired: true },
      branchName: {
        name: "branchName",
        value: "",
        error: "",
        isRequired: true,
      },
      oName: {
        name: "oName",
        value: "",
        error: "",
        isRequired: false,
      },
      showLoader: false,
      locale: getStorage(CONSTANT.storage.locale),
      acknowledgement: false,
    };

    const language = getStorage(CONSTANT.storage.language);
    if (language === undefined || language === null) {
      this.props.history.push(CONSTANT.url.language);
    }
  }

  componentDidMount() {
    document.title = "Authentication Form - HRMS";
    checkAuthenticationFormComplete().then((result: any) => {
      if (result) {
        this.props.history.push(CONSTANT.url.dashboard);
      }
    });
  }

  public render() {
    const name = getCookie(CONSTANT.cookie.userDetail).name;

    const {
      address,
      branchName,
      showLoader,
      locale,
      oName,
      acknowledgement,
    } = this.state;
    return (
      <div className="fluid-container">
        <SessionLogout />
        <div className="row ">
          {(locale === undefined || locale === null) && (
            <div className="col-md-12 text-center">Redirecting...</div>
          )}
          {locale !== undefined && locale !== null && (
            <div style={{ width: "100%" }}>
              <div>
                <div className="card-body">
                  <h2 className="text-left">Authentication Form</h2>
                  {/* <p>Worried about payroll & compliance? Mount Talent Consulting provides the best Payroll Outsourcing solution.</p> */}
                  <form onSubmit={this.submitForm}>
                    <div className="row p-3 border border-dark rounded bg-white">
                      <div className="col-md-12">
                        <h3 className="text-center">ANNEXURE A</h3>
                        <p>
                          DECLARATION LETTER TO BE OBTAINED FROM ALL STAFF
                          MEMBERS/EXMEMBERS/SPOUSE EX-MEMBERS
                        </p>
                        <p>
                          NAME:<span className="card p-2">{name}</span>
                        </p>
                        <div className="form-group">
                          <label> ADDRESS*</label>
                          <input
                            placeholder="Complete Address"
                            type="text"
                            className={
                              address.error.length > 0
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            name={address.name}
                            value={address.value}
                            onChange={this.onChange}
                          />
                        </div>
                        <p>
                          DATE:
                          <span className="card p-2">
                            {Date().split("GMT")[0]}
                          </span>
                        </p>
                        <p className="row">
                          <p className="col-md-4">
                            <b>
                              The Chief /Senior/Branch Manager Baroda Gujrat
                              Gramin bank,
                            </b>

                            <hr />
                            <br />
                            <hr />
                            <br />

                            <hr />
                          </p>
                        </p>
                        <hr />

                        <div className="flex">
                          <p>Dear Sir,</p>
                          <p className="mx-2">
                            <b>
                              <u>
                                Re. My Saving Bank/Recurring Deposit/Fixed
                                Deposit Account with you.
                              </u>
                            </b>
                          </p>
                          <p>I hereby declare that:</p>
                          <ol>
                            <li className="m-2">
                              <ol type="a">
                                <li>
                                  ) I am a staff member of Baroda Gujarat Gramin
                                  Bank <label> *</label>
                                  <input
                                    type="text"
                                    className={
                                      branchName.error.length > 0
                                        ? "mx-2 p-1 is-invalid"
                                        : "mx-2 p-1"
                                    }
                                    placeholder="Branch Name"
                                    name={branchName.name}
                                    value={branchName.value}
                                    onChange={this.onChange}
                                  />{" "}
                                  Branch/Department.
                                </li>
                                <li>
                                  ) I am an ex-staff member and retired from{" "}
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "100px",
                                      borderBottom: "1px solid black",
                                    }}
                                  ></span>
                                  Branch/Office w.e.f.{" "}
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "100px",
                                      borderBottom: "1px solid black",
                                    }}
                                  ></span>{" "}
                                  .
                                </li>
                                <li>
                                  ) My husband/wife Mr/Mrs{" "}
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "100px",
                                      borderBottom: "1px solid black",
                                    }}
                                  ></span>{" "}
                                  who has expired on
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "100px",
                                      borderBottom: "1px solid black",
                                    }}
                                  ></span>
                                  was an employee of the Bank.{" "}
                                </li>
                              </ol>
                            </li>
                            <li className="mx-2 my-4">
                              The money deposited/to be deposited in my/our
                               account/ s is/are my own money and
                              belong to me.
                            </li>
                            <li className="m-2">
                              Mr./Miss
                              <input
                                type="text"
                                className={
                                  oName.error.length > 0
                                    ? "mx-2 p-1 is-invalid"
                                    : "mx-2 p-1"
                                }
                                placeholder="Name"
                                name={oName.name}
                                value={oName.value}
                                onChange={this.onChange}
                              />{" "}
                              with whome I hold joint SB/RD/FD Account / propose
                              to open SB/RD/FD Account is solely dependedt on
                              me/
                            </li>
                          </ol>
                        </div>
                      </div>
                      <p>Yours faithfully,</p>
                      <div className="col-md-12">
                        <small>* Indicates required fields</small>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>
                          <small className="mr-2">
                            Please provide your Acknowledgement.{" "}
                          </small>
                        </label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            this.setState({ acknowledgement: !acknowledgement })
                          }
                        />{" "}
                        {/* <Link to={CONSTANT.url.register}>Register here</Link> */}
                      </div>
                      <div className="col-md-3"></div>

                      <div className="col-md-3">
                        <button
                          className="btn btn-primary btn-sm btn-block"
                          type="submit"
                          disabled={!acknowledgement}
                        >
                          {locale.btn_submit}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        {showLoader && <Loader />}
      </div>
    );
  }

  private onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    onChange(this, name, value);
  };

  private submitForm = (e: any) => {
    e.preventDefault();
    if (validateForm(this)) {
      this.setState({ showLoader: true });
      const st = this.state;
      const model = {
        userId: getCookie(CONSTANT.cookie.userDetail).id,
        address: st.address.value,
        branchName: st.branchName.value,
        oName: st.oName.value,
      };
      postAuthenticationFormComplete(model).then((res: any) => {
        this.setState({ showLoader: false });
        if (res.result) {
          if (!res.result.iob) {
            this.props.history.push(CONSTANT.url.dashboard);
          } else {
            this.props.history.push(CONSTANT.url.dashboard);
          }
        } else {
          // alert(this.state.locale[res.error]);
          alert(res.error);
        }
      });
    }
  };
}

export default AuthenticationForm;
