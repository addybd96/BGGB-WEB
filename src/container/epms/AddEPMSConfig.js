import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { addNewRole } from "../../action/EMPSAction";
import { getDepartments, getWorkLocations } from "../../action/SettingsActions";
export const AddEMPSComfig = () => {
  const [role, setRole] = useState("");
  const [description, setdescription] = useState("");
  const [officeTypeId, setofficeTypeId] = useState("");
  const [departmentId, setdepartmentId] = useState("");
  const [remarks, setremarks] = useState("");
  const [departmentdata, setdepartmentdata] = useState(null);
  const [officeTypeIdOption, setofficeTypeOption] = useState(null);

  const [validation, setvalidation] = useState(false);
  useEffect(() => {
    getWorkLocations(1, 20).then((response) => {
      if (response.status) {
        setofficeTypeOption(response.result);
      }
    });
    getDepartments().then((res) => {
      if (res.status) {
        setdepartmentdata(res.result);
      }
    });
  }, []);
  const onSubmit = () => {
    if (
      role == "" ||
      description == "" ||
      officeTypeId == "" ||
      departmentId == "" ||
      remarks == ""
    ) {
      setvalidation(true);
    } else {
      addNewRole({
        role,
        description,
        officeTypeId,
        departmentId,
        remarks,
      }).then((res) => {
        if (res.status) {
          swal("Success!", "Role has been added successfully!", "success");
        } else {
          swal("Error!", JSON.stringify(res.error), "error");
        }
      });
    }
  };
  return (
    <React.Fragment>
      <div className="col-lg-11 my-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <b>Add Role</b>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6 mt-2">
                        <label>Define Role </label>
                        <input
                          type="text"
                          className="form-control p-1"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        />
                        {validation && role == "" ? (
                          <label>Role Can't be Empty</label>
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
                        <label>Office Type</label>
                        <select
                          className="form-control p-1"
                          value={officeTypeId}
                          onChange={(e) => setofficeTypeId(e.target.value)}
                        >
                          <option value={""} hidden>
                            Select Office Type
                          </option>
                          {officeTypeIdOption &&
                            officeTypeIdOption.map((item) => (
                              <option value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        {validation && officeTypeId == "" ? (
                          <label> Office Type Can't be Empty</label>
                        ) : null}

                        {/* Will be Select */}
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label>Department</label>
                        <select
                          className="form-control p-1"
                          value={departmentId}
                          onChange={(e) => setdepartmentId(e.target.value)}
                        >
                          <option value={""} hidden>
                            Select Department
                          </option>
                          {departmentdata &&
                            departmentdata.map((item) => (
                              <option value={item.departmentId}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                        {validation && departmentId == "" ? (
                          <label>Department Can't be Empty</label>
                        ) : null}

                        {/* Will be Select */}
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
