import React from "react";
export const AddFixedQues = () => {
  return (
    <React.Fragment>
      <div className="col-lg-11 my-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <b>Add Fixed Question </b>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6 mt-2">
                        <label>Question Name </label>
                        <input type="text" className="form-control p-1" />
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label>Descrption</label>
                        <input type="text" className="form-control p-1" />
                      </div>

                      <div className="col-lg-6 mt-2">
                        <label>Financial Year</label>
                        <input
                          type="number"
                          className="form-control p-1"
                        />{" "}
                      </div>
                      <div className="col-lg-12 mt-2">
                        <label>Remarks</label>
                        <textarea rows="4" className="form-control p-1" />
                      </div>
                      <div className="col-lg-12 pt-2 pr-0 pl-0">
                        <a href="#" className="col-lg-2 pull-right">
                          <button className="btn primary-control common-btn">
                            Submit
                          </button>
                        </a>
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
};
