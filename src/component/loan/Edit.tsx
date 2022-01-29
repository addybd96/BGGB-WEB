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
    const detail = props.detail ? props.detail : null;
    this.state = {
      showLoader: false,
      ptenure: detail ? detail.tenure : undefined,
      amount: {
        name: "amount",
        value: detail ? detail.amount : "",
        error: "",
        isRequired: true,
      },
      installmentAmount: {
        name: "installmentAmount",
        value: detail ? detail.installmentAmount : "",
        error: "",
        isRequired: true,
      },
      outstandingAmount: {
        name: "outstandingAmount",
        value: detail ? detail.outstandingAmount : "",
        error: "",
        isRequired: true,
      },
      loanType: {
        name: "loanType",
        value: detail ? detail.loanType : "",
        error: "",
        isRequired: true,
        options: [],
      },
      userId: {
        name: "userId",
        value: detail ? detail.userName : "",
        error: "",
        isRequired: true,
        options: [],
      },
      description: {
        name: "description",
        value: detail ? detail.description : "",
        error: "",
        isRequired: true,
      },
      freezed: {
        name: "freezed",
        value: detail ? detail.freezed : "",
        error: "",
        isRequired: true,
      },
      tenure: {
        value: detail ? detail.tenure : "",
        name: "tenure",
        error: "",
        isRequired: true,
      },
      accountNumber: {
        name: "accountNumber",
        value: detail ? detail.accountNumber : "",
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
      loanType,
      outstandingAmount,
      installmentAmount,
      description,
      showLoader,
      userId,
      amount,
      freezed,
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
                  <h5 className="heading-h1">Edit Employee Loan</h5>
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

                        <input
                          className="form-control"
                          disabled
                          id="ta-employee-ids"
                          type="text"
                          name={loanType.name}
                          value={loanType.value}
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Employees </label>
                        <input
                          className="form-control"
                          disabled
                          id="ta-employee-ids"
                          type="text"
                          name={userId.name}
                          value={userId.value}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="row">
                      <div className="col-lg-8 form-group">
                        <label>Amount</label>
                        <NumberFormat
                          allowLeadingZeros={false}
                          allowNegative={false}
                          thousandSeparator={false}
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
                      <div className="col-lg-4 form-group">
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
                          placeholder="Enter tenure"
                          name={tenure.name}
                          value={tenure.value}
                          onChange={this._onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 form-group">
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
                  {!this.props.emp && (
                    <div className="col-lg-2 p-1 form-group d-flex justify-content-center align-items-center mt-4">
                      <label>
                        <input
                          type="checkbox"
                          onChange={this.onCheckboxChange}
                          checked={freezed.value}
                        />
                        &nbsp; Freeze ?
                      </label>
                    </div>
                  )}

                  <div className="col-lg-4 form-group">
                    <label>Outstanding Amount </label>
                    <input
                      className="form-control"
                      disabled
                      id="ta-employee-ids"
                      type="text"
                      name={outstandingAmount.name}
                      value={outstandingAmount.value}
                    />
                  </div>
                  <div className="col-lg-4 form-group">
                    <label>Installment Amount </label>
                    <input
                      className="form-control"
                      disabled
                      id="ta-employee-ids"
                      type="text"
                      name={installmentAmount.name}
                      value={installmentAmount.value}
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
    if (name === this.state.tenure.name) {
      onChange(this, name, value);

      onChange(
        this,
        this.state.installmentAmount.name,
        (this.state.amount.value / value).toFixed(2)
      );

      return;
    }
    if (name === this.state.amount.name) {
      onChange(this, name, value);
      onChange(
        this,
        this.state.installmentAmount.name,
        (value / this.state.tenure.value).toFixed(2)
      );

      return;
    }
    onChange(this, name, value);
  };

  private onCheckboxChange = (e: any) => {
    this.setState({
      freezed: { ...this.state.freezed, value: e.target.checked },
    });
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
      let ch = false;
      if (this.state.ptenure && this.state.tenure.value != this.state.ptenure)
        ch = window.confirm(
          `make sureyou have changed the Tenure, the installment amount would be affected`
        );
      else ch = true;
      if (ch) {
        const jsonToPost = {
          amount: parseInt(this.state.amount.value.replace(/,/g, ""), 10),
          description: this.state.description.value,
          freezed: this.state.freezed.value,
          tenure: parseInt(this.state.tenure.value),
          accountNumber: this.state.accountNumber.value,
          id: this.props.detail.id,
        };
        console.log("jsonToPost   ", jsonToPost);
        this.props.onSubmit(jsonToPost);
      }
    }
  };

  loadList = () => {
    this.setState({ showLoader: true });
    getLoanTypeList(1, 20)
      .then((res: any) => {
        if (res) {
          this.setState({
            loanTypes: { ...this.state.loanTypes, options: res.result },
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });

    getAllEmployeeListRM().then((res: any) => {
      this.setState({
        userId: { ...this.state.userId, options: res.result },
        showLoader: false,
      });
    });
  };
}

export default AddLeaveComponent;
