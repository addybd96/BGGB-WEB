import React, { useEffect, useState } from "react";
import { getEmpID, getRole } from "../../action/EMPSAction";
export const AddUserRoll = () => {
  const [role, setRole] = useState("");
  const [employeeId, setemployeeId] = useState("");
  const [reportingManagerId, setreportingManagerId] = useState("");
  const [reviewingManagerId, setreviewingManagerId] = useState("");
  const [appellateManagerId, setappellateManagerId] = useState("");
  const [financialYear, setfinancialYear] = useState("");
  const [remarks, setremarks] = useState("");

  const [empList, setEmpList] = useState([]);
  const [roleOption, setRoleOption] = useState("");
  const [financialYearOption, setfinancialYearOption] = useState("");

  useEffect(() => {
    getEmpID().then((res) => setEmpList(res.result));
    getRole().then((res) => setRoleOption(res.result));
  }, []);
  return (
    <React.Fragment>
      <div className="col-lg-11 my-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <b>Map KRA</b>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6 mt-2">
                        <label>EMPLOYEE ID</label>

                        <select
                          className="form-control p-1"
                          onChange={(e) => setemployeeId(e.target.value)}
                          value={employeeId}
                        >
                          <option value={""} hidden>
                            Select EMPLOYEE ID
                          </option>
                          {empList &&
                            empList.map((item) => (
                              <option value={item.id}>
                                {item.employeeId}){item.name}
                              </option>
                            ))}
                        </select>

                        {/* Will be a Select */}
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label>Choose Role</label>
                        <select
                          className="form-control p-1"
                          onChange={(e) => setRole(e.target.value)}
                          value={role}
                        >
                          <option value={""} hidden>
                            Select Role
                          </option>
                          {roleOption &&
                            roleOption.map((item) => (
                              <option value={item.id}>{item.role}</option>
                            ))}
                        </select>
                        {/* Will be a Select */}
                      </div>{" "}
                      <div className="col-lg-6 mt-2">
                        <label>Choose Reporting Manager</label>

                        <select
                          className="form-control p-1"
                          onChange={(e) =>
                            setreportingManagerId(e.target.value)
                          }
                          value={reportingManagerId}
                        >
                          <option value={""} hidden>
                            Select EMPLOYEE ID
                          </option>
                          {empList &&
                            empList.map((item) => (
                              <option value={item.id}>
                                {item.employeeId}){item.name}
                              </option>
                            ))}
                        </select>
                        {/* Will be a Select */}
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label>Reviewing Manager</label>
                        <select
                          className="form-control p-1"
                          onChange={(e) =>
                            setreviewingManagerId(e.target.value)
                          }
                          value={reviewingManagerId}
                        >
                          <option value={""} hidden>
                            Select EMPLOYEE ID
                          </option>
                          {empList &&
                            empList.map((item) => (
                              <option value={item.id}>
                                {item.employeeId}){item.name}
                              </option>
                            ))}
                        </select>
                      </div>{" "}
                      <div className="col-lg-6 mt-2">
                        <label>Appellate Manager</label>
                        <select
                          className="form-control p-1"
                          onChange={(e) =>
                            setappellateManagerId(e.target.value)
                          }
                          value={appellateManagerId}
                        >
                          <option value={""} hidden>
                            Select EMPLOYEE ID
                          </option>
                          {empList &&
                            empList.map((item) => (
                              <option value={item.id}>
                                {item.employeeId}){item.name}
                              </option>
                            ))}
                        </select>

                        {/* Will be a Select */}
                      </div>{" "}
                      <div className="col-lg-6 mt-2">
                        <label>Financial Year</label>
                        <input
                          type="number"
                          className="form-control p-1"
                          onChange={(e) => setfinancialYear(e.target.value)}
                        />{" "}
                      </div>
                      <div className="col-lg-12 mt-2">
                        <label>Remarks</label>
                        <textarea
                          rows="4"
                          className="form-control p-1"
                          onChange={(e) => setremarks(e.target.value)}
                        />
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
