import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { addKRARoleMap, getKRA, getRole } from "../../action/EMPSAction";

export const MapKRA = () => {
  const [role, setRole] = useState("");
  const [arr, setArr] = useState([]);
  const [kra, setKra] = useState("");
  const [marks, setMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [roleOption, setRoleOption] = useState("");
  const [kraOption, setKRAOption] = useState("");
  const onSubmit = () => {
    console.log(arr);
    addKRARoleMap({ data: arr }).then((res) => {
      if (res.status) {
        swal("Success!", "Role has been added successfully!", "success");
      } else {
        swal("Error!", JSON.stringify(res.error), "error");
      }
    });
  };
  const deleteArr = (value) => {
    setTotalMarks(totalMarks - arr[value].marks);
    setArr([...arr.filter((_, index) => index !== value)]);
  };
  const addInArr = () => {
    if (totalMarks + Number(marks) > 100) {
      swal("Error!", "Total Marks Exceed 100!", "error");
    } else {
      let data = arr;
      data.push({
        role,
        marks,
        kra,
        remarks,
      });
      setArr([...data]);
      setKra("");
      setMarks("");
      setRemarks("");
      setTotalMarks(totalMarks + Number(marks));
    }
  };
  useEffect(() => {
    getRole().then((res) => setRoleOption(res.result));
    getKRA().then((res) => setKRAOption(res.result));
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
                      <div className="col-lg-12 mt-2">
                        <label>Choose Role</label>
                        <select
                          className="form-control p-1"
                          onChange={(e) => setRole(e.target.value)}
                          value={role}
                          disabled={arr.length > 0}
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
                        <label>Choose KRA </label>
                        <select
                          disabled={role ? false : true}
                          className="form-control p-1"
                          onChange={(e) => {
                            setKra(kraOption[e.target.value].id);
                            setMarks(kraOption[e.target.value].defaultMarks);
                          }}
                          value={kra}
                        >
                          <option value={""} hidden>
                            Select Role
                          </option>
                          {kraOption &&
                            kraOption.map((item, index) => (
                              <option value={index}>{item.kra}</option>
                            ))}
                        </select>
                        {/* Will be a Select */}
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label>Marks</label>
                        <input
                          type="number"
                          className="form-control p-1"
                          disabled={role ? false : true}
                          onChange={(e) => setMarks(e.target.value)}
                          value={marks}
                        />{" "}
                      </div>
                      <div className="col-lg-12 mt-2">
                        <label>Remarks</label>

                        <textarea
                          rows="4"
                          disabled={role ? false : true}
                          className="form-control p-1"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-12 pt-2 pr-0 pl-0">
                        <a href="#" className="col-lg-2 pull-right">
                          <button
                            className="btn primary-control common-btn"
                            disabled={
                              role && kra && marks && remarks ? false : true
                            }
                            onClick={addInArr}
                          >
                            Add
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
        <div className="row mt-2">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <b>List</b>
              </div>
              <div className="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">ROLE</th>
                      <th scope="col">KRA</th>
                      <th scope="col">MARKS</th>
                      <th scope="col">REMARKS</th>
                      <th scope="col">DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arr.map((data, index) => (
                      <tr>
                        <th scope="row">{data.role}</th>
                        <td>{data.kra}</td>
                        <td>{data.marks}</td>
                        <td>{data.remarks}</td>
                        <td>
                          <button
                            onClick={() => {
                              deleteArr(index);
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="row">
                  <div className="col-lg-2 pt-2 pr-0 pl-0">
                    <div className="card">
                      <div className="card-header">
                        <b>Total Marks={totalMarks}</b>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-10 pt-2 pr-0 pl-0">
                    <a href="#" className="col-lg-2 pull-right">
                      <button
                        className="btn primary-control common-btn"
                        disabled={totalMarks == 100 ? false : true}
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
    </React.Fragment>
  );
};
