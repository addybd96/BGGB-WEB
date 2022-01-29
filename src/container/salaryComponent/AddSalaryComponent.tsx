import * as React from "react";

import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import Loader from "../../component/common/Loader";
import AddAllowance from "../../component/salary-allowance/Add";
import CONSTANT from "../../constant";
import {
  addCycleAllow,
  addWashingAllow,
  conveyanceAllow,
  errearsAllow,
  addOfficiatingAllow,
  daAllow,
  addPensionDaAllow,
} from "../../action/salaryAllowanceAction";
import NumberFormat from "react-number-format";
import {
  getAllEmployeeListRM,
  getSalaryComponentListRM,
} from "../../action/EmployeeAction";
import { onChange, setOptions } from "../../utils";
import { salaryComponentAdd } from "../../action/PayrollCycleAction";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showLoader: false,
      name: {
        name: "name",
        value: "",
        options: [],
        error: "",
        isRequired: true,
      },
      component: {
        name: "component",
        value: "",
        options: [],
        error: "",
        isRequired: true,
      },
      amount: { name: "amount", value: "", error: "", isRequired: true },
    };
  }

  componentDidMount = () => {
    this.loadList();
  };
  public render() {
    const { showLoader, name, amount, component } = this.state;
    return (
      <React.Fragment>
        <Header />
        {showLoader && <Loader />}
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11">
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="card mt-2">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-lg-12">
                          <b> Salary component</b>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name </label>
                            <select
                              className={
                                name.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={name.name}
                              value={name.value}
                              onChange={this.onChange}
                            >
                              <option>Select Employee</option>
                              {name.options.map(function(
                                item: any,
                                index: number
                              ) {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Component </label>
                            <select
                              className={
                                name.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={component.name}
                              value={component.value}
                              onChange={this.onChange}
                            >
                              <option>Select Component</option>
                              {component.options.map(function(
                                item: any,
                                index: number
                              ) {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.componentName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Amount</label>
                          <NumberFormat
                            className={
                              amount.error.length > 0
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            name={amount.name}
                            value={amount.value}
                            onChange={this.onChange}
                            placeholder="Enter amount"
                          />
                        </div>
                      </div>
                     
                    </div>
                    <div className="row">
                    <div className="col-md-10"></div>
                      <div className="col-md-2">
                        <button
                          type="submit"
                          className="btn btn-sm btn-block btn-primary pull-right"
                          onClick={this.submit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  submit = () => {
      let {name, component, amount}=this.state
      let model={
          userId:+name.value,
          componentId:+component.value,
          amount:+amount.value
      }
      salaryComponentAdd(model).then((res: any) => {
        if (res){
            alert(res.message)
        }
      });
      
  };

  onChange = (e: any) => {
    const name = e.target.name;
    let value = e.target.value;
    console.log(name, value);

    onChange(this, name, value);
  };

  onCancel = () => {
    this.props.history.push(CONSTANT.url.settingsOption.salaryAllowanceList);
  };

  loadList = () => {
    getAllEmployeeListRM().then((res: any) => {
      if (res && res.result) setOptions(this, this.state.name.name, res.result);
    });

    getSalaryComponentListRM().then((res: any) => {
      if (res && res.result)
        setOptions(this, this.state.component.name, res.result);
    });
  };
}

export default ComponentName;
