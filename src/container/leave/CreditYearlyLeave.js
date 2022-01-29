import moment from "moment";
import React from "react";
import { creditUserCL, creditUserLeave } from "../../action/LeaveActions";
import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";

export const CreditYearlyLeave = () => {
  const date = moment();
  const date2 = "01-01-" + date.format("YYYY");
  const creditLeave = () => {
    creditUserLeave().then((res) => {
      console.log(res);
    });
  };
  const creditCL = () => {
    creditUserCL().then((res) => {
      console.log(res);
    });
  };
  return (
    <React.Fragment>
      <Header />
      <div className="fluid-container px-0">
        <div className="row">
          <Sidebar />
          <div className="col-lg-11 my-3">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 pl-0">
                  <h5>Credit Yearly Leave to all Old Employees</h5>
                </div>
                <div className="col-lg-6 text-right pr-0"></div>
              </div>
            </div>

            <div className="card-header">
              <div className="row">
                <div className="col-lg-10">
                  <b>Credit Leaves </b>
                </div>
                <div className="col-lg-2">
                  <button onClick={creditLeave}>Credit Yearly Leave</button>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 pl-0">
                  <h5>
                    Credit CL to all Employees whose 11 month are not completed
                    and joined after {date2}
                  </h5>
                </div>
                <div className="col-lg-6 text-right pr-0"></div>
              </div>
            </div>
            <div className="card-header">
              <div className="row">
                <div className="col-lg-10">
                  <b>Credit CL </b>
                </div>
                <div className="col-lg-2">
                  <button onClick={creditCL}>Credit CL</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
