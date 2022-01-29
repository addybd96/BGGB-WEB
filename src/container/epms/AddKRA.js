import React, { useState } from "react";
import swal from "sweetalert";
import { addNewKRA } from "../../action/EMPSAction";
export const AddKRA = () => {
  const [kra, setkra] = useState("");
  const [description, setdescription] = useState("");
  const [measurable, setmeasurable] = useState("");
  const [defaultMarks, setdefaultMarks] = useState(0);
  const [remarks, setremarks] = useState("");
  const [validation, setvalidation] = useState(false);
  const onSubmit = () => {
    if (
      kra == "" ||
      description == "" ||
      measurable == "" ||
      defaultMarks == "" ||
      remarks == ""
    ) {
      setvalidation(true);
    } else {
      addNewKRA({ kra, description, measurable, defaultMarks, remarks }).then(
        (res) => {
          if (res.status) {
            swal("Success!", "Role has been added successfully!", "success");
          } else {
            swal("Error!", JSON.stringify(res.error), "error");
          }
        }
      );
      console.log(kra, description, measurable, defaultMarks, remarks);
    }
  };
  return (
    <React.Fragment>
      <div className="col-lg-11 my-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <b>Add KRA</b>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6 mt-2">
                        <label>Define KRA </label>
                        <input
                          type="text"
                          className="form-control p-1"
                          value={kra}
                          onChange={(e) => setkra(e.target.value)}
                        />
                        {validation && kra == "" ? (
                          <label>KRA Can't be Empty</label>
                        ) : null}
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label>Descrption</label>
                        <input
                          type="text"
                          className="form-control p-1"
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                        />
                        {validation && description == "" ? (
                          <label>Description Can't be Empty</label>
                        ) : null}
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label>Measurable</label>
                        <select
                          className="form-control p-1"
                          value={measurable}
                          onChange={(e) => setmeasurable(e.target.value)}
                        >
                          <option value={null} hidden>
                            Select Measurable Type{" "}
                          </option>

                          <option value={true}>Measurable</option>
                          <option value={false}>Non-Measurable</option>
                        </select>
                        {validation && measurable == "" ? (
                          <label>Measurable Marks Can't be Empty</label>
                        ) : null}
                      </div>{" "}
                      <div className="col-lg-6 mt-2">
                        <label>Default Marks</label>
                        <input
                          type="number"
                          className="form-control p-1"
                          value={defaultMarks}
                          onChange={(e) => setdefaultMarks(e.target.value)}
                        />
                        {validation && defaultMarks == "" ? (
                          <label>Default Marks Can't be Empty</label>
                        ) : null}
                      </div>
                      <div className="col-lg-12 mt-2">
                        <label>Remarks</label>
                        <textarea
                          rows="4"
                          className="form-control p-1"
                          value={remarks}
                          onChange={(e) => setremarks(e.target.value)}
                        />
                        {validation && remarks == "" ? (
                          <label>Remarks Can't be Empty</label>
                        ) : null}
                      </div>
                      <div className="col-lg-12 pt-2 pr-0 pl-0">
                        <a href="#" className="col-lg-2 pull-right">
                          <button
                            className="btn primary-control common-btn"
                            onClick={onSubmit}
                          >
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
