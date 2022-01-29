import * as React from "react";
import NumberFormat from "react-number-format";
import * as moment from "moment";
import { getLoanTypeList } from "../../action/SettingsActions";
import { getAllEmployeeListRM } from "./../../action/EmployeeAction";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
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
      amount: { name: "amount", value: "", error: "", isRequired: true },
      tenure: { value: "", name: "tenure", error: "", isRequired: true },
      loanTypes: {
        name: "loanTypes",
        value: "",
        error: "",
        isRequired: true,
        options: [],
      },
      dayType: { name: "dayType", value: "", error: "", isRequired: false },
      userId: {
        name: "userId",
        value: [],
        error: "",
        isRequired: true,
        options: [],
      },
      accountNumber: {
        name: "accountNumber",
        value: "",
        error: "",
        isRequired: true,
      },
      description: {
        name: "description",
        value: "",
        error: "",
        isRequired: true,
      },
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.loadList();
  }

  public render() {
    const {
      description,
      showLoader,
      userId,
      amount,
      tenure,
      accountNumber,
    } = this.state;
    return (
      <React.Fragment>
        <div className="col-lg-11">
          <form onSubmit={this._submitForm}>
            <div className="col-lg-12 mt-4">
              <div className="row">
                <div className="col-lg-12 pl-0">
                  <h5 className="heading-h1">Create Employee Loan</h5>
                </div>
              </div>
            </div>

            <div className="card mt-2">
              <div className="card-header">
                <b>Loan</b>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <div className="row">
                      <div className="col-lg-6 form-group">
                        <label>Type of Loan</label>

                        {this.renderTypeSelect()}
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Employees </label>
                        <Typeahead
                          id="ta-employee-ids"
                          allowNew={false}
                          labelKey={(option: any) =>
                            `${option.name} (${option.employeeId})`
                          }
                          name={userId.name}
                          selected={userId.value}
                          options={userId.options}
                          onChange={(e: any) =>
                            this.typeaheadOnChange(userId.name, e)
                          }
                          placeholder="List of employees"
                          isInvalid={userId.error.length > 0}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-2">
                    <div className="row">
                      <div className="col-lg-6 form-group">
                        <label>Amount</label>
                        <NumberFormat
                          allowLeadingZeros={false}
                          allowNegative={false}
                          thousandSeparator={true}
                          className={
                            amount.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          placeholder="Enter amount"
                          name={amount.name}
                          value={amount.value}
                          onChange={this._onChange}
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Tenure</label>
                        <NumberFormat
                          allowLeadingZeros={false}
                          allowNegative={false}
                          thousandSeparator={false}
                          className={
                            tenure.error.length > 0
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          placeholder="Enter Tenure"
                          name={tenure.name}
                          value={tenure.value}
                          onChange={this._onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 form-group">
                    <label>Account Number </label>
                    <input
                      type="text"
                      className={
                        accountNumber.error.length > 0
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Enter Loan Account"
                      name={accountNumber.name}
                      value={accountNumber.value}
                      onChange={this._onChange}
                    />
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>Installment Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value={
                        this.state.amount.value &&
                        this.state.tenure.value &&
                        this.state.tenure.value != 0
                          ? Number(
                              parseInt(
                                this.state.amount.value.replace(/,/g, ""),
                                10
                              )
                            ) / Number(this.state.tenure.value)
                          : ""
                      }
                    />
                  </div>

                  <div className="col-lg-12 mb-2">
                    <div className="row">
                      <div className="col-lg-12 form-group">
                        <label>Loan Description</label>
                        <textarea
                          name={description.name}
                          value={description.value}
                          onChange={this._onChange}
                          className={
                            description.error.length > 0
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
        {showLoader && <Loader />}
      </React.Fragment>
    );
  }

  renderTypeSelect = () => {
    const { loanTypes } = this.state;
    if (loanTypes.options)
      return (
        <select
          name={loanTypes.name}
          value={loanTypes.value}
          onChange={this._onChange}
          className={
            loanTypes.error.length > 0
              ? "form-control is-invalid"
              : "form-control"
          }
        >
          <React.Fragment>
            <option>--Select--</option>
            {loanTypes.options.map((dep: any, dIndex: number) => {
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
    onChange(this, name, value);
  };

  typeaheadOnChange = (name: string, e: any) => {
    let value = e;
    if (e.length > 0 && e[0].customOption) {
      value = [{ name: e[0].name }];
    }
    onChange(this, name, value);
  };

  _submitForm = (e: any) => {
    e.preventDefault();
    if (validateForm(this)) {
      const jsonToPost = {
        amount: parseInt(this.state.amount.value.replace(/,/g, ""), 10),
        outstandingAmount: parseInt(
          this.state.amount.value.replace(/,/g, ""),
          10
        ),
        userId: this.state.userId.value[0].id,
        loanTypeId: this.state.loanTypes.value,
        description: this.state.description.value,
        installmentAmount:
          Number(parseInt(this.state.amount.value.replace(/,/g, ""), 10)) /
          Number(this.state.tenure.value),
        freezed: true,
        tenure: Number(this.state.tenure.value),
        accountNumber: this.state.accountNumber.value,
      };
      console.log("jsonToPost  ", jsonToPost);
      this.props.onSubmit(jsonToPost);
    }
  };

  loadList = () => {
    this.setState({ showLoader: true });
    getLoanTypeList(1, 20)
      .then((res: any) => {
        if (res.result) {
          this.setState({
            loanTypes: { ...this.state.loanTypes, options: res.result },
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });

    getAllEmployeeListRM().then((res: any) => {
      this.setState({ showLoader: false });
      console.log("res   ", res);
      if (res.result) {
        this.setState({
          userId: { ...this.state.userId, options: res.result },
        });
      }
    });
  };
}

export default AddLeaveComponent;
