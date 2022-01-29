import * as React from "react";
import * as moment from "moment";
import { Link } from "react-router-dom";
import CONSTANT from "../../constant";
import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import AttendanceList from "../../component/attendance/list";

import {
  getAttendance,
  getAttendanceCount,
} from "../../action/AttendanceActions";
import { getDepartments } from "../../action/SettingsActions";
import { isEmpty, getCookie } from "../../utils";

class Attendance extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      attendance: [],
      page: 1,
      limit: 20,
      search: { value: "", error: "" },
      date: { value: moment().format("YYYY-MM-DD"), error: "" },
      isu: undefined,
      userType: undefined,
      departments: [
        { name: "Admin Department", code: "1" },
        { name: "HR Department", code: "2" },
        { name: "Sales Department", code: "3" },
        { name: "IT Department", code: "4" },
      ],
      count: 0,
    };
    this._onChange = this._onChange.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
  }

  public componentDidMount() {
    const isu = getCookie("isu");
    const userDetail = getCookie(CONSTANT.cookie.userDetail);
    this.setState({ isu, userType: userDetail.userType });
    const { page, limit } = this.state;
    getAttendance(
      moment().format("YYYY-MM-DD"),
      "",
      page,
      limit,
      userDetail.userType
    ).then((resp: any) => {
      if (Array.isArray(resp.result.attendance))
        this.setState({
          attendance: resp.result.attendance,
          count: resp.result.count,
        });
    });
  }

  public render() {
    // const { isModalOpen } = this.state;
    const { attendance, date, search, page, limit, count } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11 my-3">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-6">
                      {/* <h5 className="heading-h1">Attendance List</h5> */}
                    </div>

                    {/* <div className="col-lg-6 text-right">
                                            <Link className="common-btn" to={CONSTANT.url.uploadAttendance}><i className="fa fa-upload"></i>&nbsp; Upload Attendance</Link>
                                        </div> */}
                  </div>
                  <div className="card mt-2">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-lg-4 pt-2">
                          Daily Attendance Report
                        </div>
                        <div className="col-lg-8 text-right">
                          <div className="row">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-3">
                              <input
                                value={date.value}
                                name="date"
                                type="date"
                                className={
                                  isEmpty(date.error)
                                    ? "form-control"
                                    : "form-control is-invalid"
                                }
                                placeholder="Today Attendance"
                                onChange={this._onChange}
                              />
                              {/* {this.renderDepartmentSelect()} */}
                            </div>
                            <div className="col-lg-4">
                              <input
                                value={search.value}
                                name="search"
                                onChange={this._onChange}
                                type="text"
                                className="form-control"
                                placeholder="Search By Emp Code / Email / Mobile No"
                              />
                            </div>
                            <div className="col-lg-2">
                              <a
                                onClick={this.getFilteredAttendance}
                                className="btn btn-primary btn-sm btn-sm btn-block"
                              >
                                Refresh
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      {count && (
                        <AttendanceList
                          date={date}
                          attendance={attendance}
                          page={page}
                          limit={limit}
                          count={count}
                          onTableChange={this.onTableChange}
                        />
                      )}
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

  getFilteredAttendance = (e: any) => {
    e.preventDefault();
    const { date, search, page, limit, userType } = this.state;
    if (this._validateForm()) {
      getAttendance(date.value, search.value, page, limit, userType).then(
        (resp: any) => {
          if (Array.isArray(resp.result.attendance))
            this.setState({
              attendance: resp.result.attendance,
              count: resp.result.count,
            });
        }
      );
    }
  };

  onTableChange = (type: any, { page, sizePerPage }: any) => {
    const { date, search, userType } = this.state;
    getAttendance(date.value, search.value, page, sizePerPage, userType).then(
      (resp: any) => {
        if (Array.isArray(resp.result.attendance))
          this.setState({
            attendance: resp.result.attendance,
            count: resp.result.count,
            page,
          });
      }
    );
  };

  handleDateChange = (e: any) => {
    this.setState({ currentDate: e.target.value });
  };

  handleDepartmentSelectChange = (e: any) => {
    this.setState({ department: e.target.value });
  };

  private _onChange(e: any, callback?: any) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: { ...this.state[name], value } }, callback);
  }
  private _setError(name: string, error: string) {
    this.setState({ [name]: { ...this.state[name], error } });
  }

  private _validateForm() {
    const { date } = this.state;

    let status = true;
    if (isEmpty(date.value)) {
      this._setError("date", "error");
      status = false;
    }
    return status;
  }
  private _clearFormError() {
    this._setError("date", "");
  }

  renderDepartmentSelect = () => {
    return (
      <select
        className="form-control"
        onChange={this.handleDepartmentSelectChange}
      >
        <React.Fragment>
          <option>--Select--</option>
          {this.state.departments.map((dep: any, dIndex: number) => {
            return (
              <option key={dIndex} value={dep.code}>
                {dep.name}
              </option>
            );
          })}
        </React.Fragment>
      </select>
    );
  };
}

export default Attendance;
