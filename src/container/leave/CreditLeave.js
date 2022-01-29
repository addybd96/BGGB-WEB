import React, { useState } from "react";
import { creditNewEmpUserLeave } from "../../action/LeaveActions";
import Header from "../../component/common/Header";
import Loader from "../../component/common/Loader";
import Sidebar from "../../component/common/Sidebar";
import { CreditLeaveComponent } from "./CreditLeaveComponent";

export const CreditLeave = () => {
  const [showLoader, setShowLoader] = useState(false);
  const creditLeave = () => {
    setShowLoader(true);
    creditNewEmpUserLeave().then((res) => {
      console.log(res);
      setShowLoader(false);
    });
  };
  return showLoader ? (
    <Loader />
  ) : (
    <React.Fragment>
      <Header />
      <div className="fluid-container px-0">
        <div className="row">
          <Sidebar />
          <div className="col-lg-11 my-3">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 pl-0"></div>
                <div className="col-lg-6 text-right pr-0"></div>
              </div>
            </div>
            <div className="card mt-2">
              <div className="card-header">
                <div className="row">
                  <div className="col-lg-10">
                    <b>Credit Leaves </b>
                  </div>
                  <div className="col-lg-2">
                    <button onClick={creditLeave}>Credit Leaves to All </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <CreditLeaveComponent />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
