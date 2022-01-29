import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import CONSTANT from "./../../constant";
import { getCookie } from "../../utils";
import {
  hideByUserId,
  hidePaymentByUserId,
} from "../../action/UniformAndLiveriesAction";

const homeIcon = require("./../../assets/images/menu-icon/home.png");
const empIcon = require("./../../assets/images/menu-icon/employee.png");
const attendenceIcon = require("./../../assets/images/menu-icon/attendance.png");
const salaryIcon = require("./../../assets/images/menu-icon/salary.png");
const leaveIcon = require("./../../assets/images/menu-icon/leaves.png");
const holidayIcon = require("./../../assets/images/menu-icon/calendar.png");
const settingIcon = require("./../../assets/images/menu-icon/settings.png");

class Sidebar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isu: undefined,
      userId: undefined,
      userType: undefined,
      isReportingManager: undefined,
      isVigilance: false,
      list: "",
      accountDepartment: "",
      regionName: undefined,
    };
  }

  componentDidMount() {
    const body = document.body,
      html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    $(".left-section").height(height);
    const isu = getCookie("isu");
    const userDetail = getCookie(CONSTANT.cookie.userDetail);
    console.log(userDetail);
    console.log("isu", typeof isu);

    this.setState({
      isu,
      userId: userDetail.id,
      regionName: userDetail.name,
      userType: userDetail.userType,
      isReportingManager: userDetail.isReportingManager,
      isVigilance: userDetail.isVigilance ? userDetail.isVigilance : false,
    });
    this.loadData();
    this.validatePayement(userDetail.id);
  }

  loadData = (status?: any) => {
    this.setState({ showLoader: true });
    hideByUserId({ status }).then((res: any) => {
      this.setState({ showLoader: false });
      if (res) {
        this.setState({ list: res });
      }
    });
  };

  validatePayement = (userId: any) => {
    hidePaymentByUserId(userId).then((res: any) => {
      this.setState({ showLoader: false });
      if (res) {
        this.setState({ accountDepartment: res.departmentId });
      }
    });
  };

  openNav = () => {
    // const mySidebar: any = document.getElementById("mySidebar");
    // mySidebar.style.width = "250px";
    // const main: any = document.getElementById("mySidebar");
    // main.style.marginLeft = "250px";
  };

  closeNav = () => {
    const mySidebar: any = document.getElementById("mySidebar");
    mySidebar.style.width = "0";
    // const main: any = document.getElementById("mySidebar");
    // main.style.marginLeft = "0";
  };

  openCity(evt: any, tabName: any) {
    $(".tabcontent").css("display", "none");
    if (tabName !== "tab1") {
      $(`#${tabName}`).css("display", "block");
    }
    $(".tablinks").removeClass("active");
    $(evt.currentTarget).addClass("a");
  }

  public render() {
    const {
      isu,
      userId,
      userType,
      regionName,
      isReportingManager,
      isVigilance,
      list,
      accountDepartment,
    } = this.state;
    return (
      <div className="col-md-1 left-section">
        <button className="openbtn d-none" onClick={this.openNav}>
          ☰
        </button>
        <div className="tab">
          <button
            className="tablinks active"
            onClick={(event: any) => this.openCity(event, "tab1")}
          >
            <Link to={CONSTANT.url.dashboard} className="">
              <img src={homeIcon} />
              <p>Home</p>
            </Link>
          </button>

          <button
            className="tablinks"
            onClick={(event: any) => this.openCity(event, "tab1")}
          >
            <Link to={CONSTANT.url.epms} className="">
              <img src={homeIcon} />
              <p>EPMS</p>
            </Link>
          </button>
          {userType === "sadmin" || userType === "radmin" ? (
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab2")}
            >
              <img src={empIcon} />
              <p>Employee Master</p>
            </button>
          ) : (
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab2")}
            >
              <Link
                to={CONSTANT.url.editEmployeeBasic.replace(":id", userId)}
                className=""
              >
                <img src={empIcon} />
                <p>My Profile</p>
              </Link>
            </button>
          )}
          {!(userType === "sadmin" || userType === "radmin") && (
            <button className="tablinks">
              <Link to={CONSTANT.url.empSalarySlip} className="">
                <img src={empIcon} />
                <p>Salary Slip</p>
              </Link>
            </button>
          )}
          <button
            className="tablinks"
            onClick={(event: any) => this.openCity(event, "tab3")}
          >
            <img src={attendenceIcon} />
            <p>Attendance</p>
          </button>

          <button
            className="tablinks"
            onClick={(event: any) => this.openCity(event, "tab5")}
          >
            <img src={leaveIcon} />
            <p>Leave Application</p>
          </button>

          <button
            className="tablinks"
            onClick={(event: any) => this.openCity(event, "tab9")}
          >
            <img src={leaveIcon} />
            <p>Loan Application</p>
          </button>

          {userType === "sadmin" || userType === "radmin" ? (
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab4")}
            >
              <img src={salaryIcon} />
              <p>Payroll</p>
            </button>
          ) : null}

          {userType === "sadmin" || userType === "radmin" ? (
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab6")}
            >
              <img src={holidayIcon} />
              <p>Holiday Calender</p>
            </button>
          ) : null}
          {/* {(userType === 'sadmin' || isVigilance) &&
                        <button className="tablinks" onClick={(event: any) => this.openCity(event, 'tab8')}>
                            <img src={attendenceIcon} />
                            <p>Asset Liability</p>
                        </button>} */}

          {userType === "sadmin" || userType === "radmin" ? (
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab16")}
            >
              {/* <Link to={CONSTANT.url.incrementList} className=""> */}
              <img src={attendenceIcon} />
              <p>Increment</p>
              {/* </Link> */}
            </button>
          ) : null}

          {/* {userType === 'sadmin' || userType === 'radmin' ?
                        <button className="tablinks" onClick={(event: any) => this.openCity(event, 'tab10')}>
                            <img src={attendenceIcon} />
                            <p>Pension <br />&<br />Superannuation</p>
                        </button>
                        : null} */}

          {userType === "sadmin" || userType === "radmin" ? (
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab7")}
            >
              <img src={settingIcon} />
              <p>Settings</p>
            </button>
          ) : null}

          {/* <button className="tablinks" onClick={(event: any) => this.openCity(event, 'tab11')}>
                        <img src={salaryIcon} />
                        <p>Perquisites</p>
                    </button> */}
          {/* ((userType === 'sadmin' || userType === 'radmin') && Plist == 19) ? */}
          {accountDepartment == 19 ? (
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab12")}
            >
              <img src={salaryIcon} />
              <p>Payment</p>
            </button>
          ) : null}
          {userType === "sadmin" ? (
            <button className="tablinks">
              <Link to={CONSTANT.url.resetPassword} className="">
                <img src={settingIcon} />
                <p>Reset Password</p>
              </Link>
            </button>
          ) : null}

          {userType === "sadmin" || userType === "radmin" ? null : (
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab11")}
            >
              <img src={salaryIcon} />
              <p>Perquisites</p>
            </button>
          )}

          {userType === "radmin" ? (
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab15")}
            >
              <img src={salaryIcon} />
              <p>Perquisites</p>
            </button>
          ) : null}
          {
            <button
              className="tablinks"
              onClick={(event: any) => this.openCity(event, "tab13")}
            >
              <img src={attendenceIcon} />
              <p>Report</p>
            </button>
          }
        </div>
        <div
          id="tab1"
          style={{ display: "none" }}
          className="tabcontent right-tabcontent"
        >
          {/* <ul>
                        <li><Link to={CONSTANT.url.dashboard}>Dashboard</Link></li>
                    </ul> */}
        </div>
        {userType === "sadmin" || userType === "radmin" ? (
          <div
            id="tab2"
            style={{ display: "none" }}
            className="tabcontent right-tabcontent"
          >
            <ul>
              <li>
                <Link to={CONSTANT.url.employeeList}>Employee List</Link>
              </li>
              {userType === "sadmin" && (
                <>
                  <li>
                    <Link to={CONSTANT.url.addEmployeeMaster}>
                      Add Employee
                    </Link>
                  </li>
                  <li>
                    <Link to={CONSTANT.url.employeeBulkUpload}>
                      Bulk Upload
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        ) : null}

        {userType === "sadmin" || userType === "radmin" ? (
          <div
            id="tab3"
            style={{ display: "none" }}
            className="tabcontent right-tabcontent"
          >
            <ul>
              <li>
                <Link to={CONSTANT.url.attendance}>
                  Daily Attendance Report
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.attendanceReport}>
                  Daily Attendance Dashboard
                </Link>
              </li>
              {/* <li><Link to={CONSTANT.url.paydayList}>Paid days</Link></li> */}
              {/* <li><Link to={CONSTANT.url.wfhList}>Work From Home Report</Link></li> */}
              {/* <li><Link to={CONSTANT.url.odList}>On Duty Report</Link></li> */}
              {userType === "sadmin" && (
                <li>
                  <Link to={CONSTANT.url.uploadAttendance}>
                    Upload Attendance
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div
            id="tab3"
            style={{ display: "none" }}
            className="tabcontent right-tabcontent"
          >
            <ul>
              <li>
                <Link to={CONSTANT.url.attendanceHistory}>
                  Attendance History
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div
          id="tab4"
          style={{ display: "none" }}
          className="tabcontent right-tabcontent"
        >
          <ul>
            {/* <li><Link to={CONSTANT.url.payrollDashboard}>Payroll Dashboard</Link></li> */}
            <li>
              <Link to={CONSTANT.url.payrollCycleList}>Process Payroll</Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payrollCycleEmployeeList}>
                Payroll Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {userType === "sadmin" || userType === "radmin" ? (
          <div
            id="tab5"
            style={{ display: "none" }}
            className="tabcontent right-tabcontent"
          >
            <ul>
              <li>
                <Link to={CONSTANT.url.pendingApprovalsList}>
                  Pending Approvals
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.leaveList}>Leave List</Link>
              </li>
              {userType === "sadmin" && (
                <>
                  <li>
                    <Link to={CONSTANT.url.leaveBulkUpload}>
                      Leave Bulk upload
                    </Link>
                  </li>
                  <li>
                    <Link to={CONSTANT.url.creditLeave}>
                      Credit Leave to New Employee
                    </Link>
                  </li>
                  <li>
                    <Link to={CONSTANT.url.creditPeriodicLeave}>
                      Credit Leaves
                    </Link>
                  </li>
                </>
              )}{" "}
            </ul>
          </div>
        ) : (
          <div
            id="tab5"
            style={{ display: "none" }}
            className="tabcontent right-tabcontent"
          >
            <ul>
              <li>
                <Link to={CONSTANT.url.leaveList}>Leave List / Apply</Link>
              </li>
              {isReportingManager && (
                <li>
                  <Link to={CONSTANT.url.pendingApprovalsList}>
                    Pending Approvals
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}

        <div
          id="tab6"
          style={{ display: "none" }}
          className="tabcontent right-tabcontent"
        >
          <ul>
            <li>
              <Link to={CONSTANT.url.holidayList}>Holiday List</Link>
            </li>
            {userType === "sadmin" && (
              <li>
                <Link to={CONSTANT.url.bulkUploadHolidays}>
                  Bulk Upload Holidays
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div id="tab7" style={{ display: "none" }} className="tabcontent">
          {/* <ul>
                        <li><b>General</b></li>
                        <li><Link to={CONSTANT.url.settingsOption.companyDetail}>Organization detail</Link></li>
                    </ul> */}
          {userType === "sadmin" && (
            <ul>
              <li>
                <b>Organization</b>
              </li>
              <li>
                <Link to={CONSTANT.url.settingsOption.userList}>Users</Link>
              </li>
              {/* <li><Link to={CONSTANT.url.settingsOption.geofencing}>Geofencing</Link></li> */}
              {/* <li><Link to={CONSTANT.url.settingsOption.employeeProfile}>Employee profile</Link></li> */}
              <li>
                <Link to={CONSTANT.url.settingsOption.department}>
                  Departments
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.settingsOption.designation}>
                  Designations
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.settingsOption.branchCategoryList}>
                  Branch Categories
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.settingsOption.companyBranchList}>
                  Bank Branches
                </Link>
              </li>
              {/* <li><Link to={CONSTANT.url.settingsOption.companyBranchCalender}>Company Calendar</Link></li> */}
              <li>
                <Link to={CONSTANT.url.leaveTypeList}>Leave type</Link>
              </li>
              <li>
                <Link to={CONSTANT.url.attendanceTypeList}>
                  Attendance type
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.settingsOption.locationList}>
                  Regions
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.settingsOption.document}>
                  Dcument types
                </Link>
              </li>
              {/* <li><Link to={CONSTANT.url.holidayTypeList}>Holiday type</Link></li> */}
              {/* <li><Link to={CONSTANT.url.settingsOption.helpdeskListCategory}>Helpdesk Category</Link></li> */}
              <li>
                <Link to={CONSTANT.url.loanTypeList}>Loan type</Link>
              </li>
              <li>
                <Link to={CONSTANT.url.settingsOption.pensionRuleList}>
                  Pension Config
                </Link>
              </li>
            </ul>
          )}
          <ul>
            <li>
              <b>Payroll</b>
            </li>
            <li>
              <Link to={CONSTANT.url.settingsOption.salaryDeductionList}>
                Salary Deduction
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.settingsOption.salaryAllowanceList}>
                Salary Allowance
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.settingsOption.componentSalaryLists}>
                Add Salary Component Manually
              </Link>
            </li>
          </ul>

          {userType === "sadmin" && (
            <ul>
              <li>
                <b>User Access Control</b>
              </li>
              <li>
                <Link to={CONSTANT.url.settingsOption.role}>
                  Roles & Permissions
                </Link>
              </li>
            </ul>
          )}
          {userType === "sadmin" && (
            <ul>
              <li>
                <b>Change Reporting Manager</b>
              </li>
              <li>
                <Link to={CONSTANT.url.settingsOption.updateReportingManager}>
                  change reporting manager
                </Link>
              </li>
            </ul>
          )}
          {(userType === "sadmin" || regionName === "9999999909") && (
            <>
              <ul>
                <li>
                  <b>Leaves</b>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.leaveApprovalList}>
                    Approval Config
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <b>Reporting Manager</b>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.reportingManagerConfig}>
                    Reporting Manager Config
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <b>Payment</b>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.paymentApprovalList}>
                    Account-GL Head Config
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <b>Perquisites</b>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.fuelList}>Fuel</Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.tadaList}>TaDa</Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.hotelList}>Hotel</Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.newPaperList}>
                    News Paper
                  </Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.MobileList}>
                    Mobile Allowance
                  </Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.briefCaseList}>
                    {" "}
                    Brief Case
                  </Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.entertainmentList}>
                    Entertainment{" "}
                  </Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.uniformAndLiveriesList}>
                    Uniform and Liveries
                  </Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.medicalList}>
                    Medical Allowance
                  </Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.settingsOption.perquisiteApprovalList}>
                    Approval Config
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>

        <div
          id="tab8"
          style={{ display: "none" }}
          className="tabcontent right-tabcontent"
        >
          <ul>
            {isu && isu === "false" && (
              <React.Fragment>
                <li>
                  <Link to={CONSTANT.url.assetLiabilityAdd}>
                    Add My Asssets
                  </Link>
                </li>
                <li>
                  <Link to={CONSTANT.url.assetLiabilityList}>
                    My Asssets List
                  </Link>
                </li>
              </React.Fragment>
            )}
            {(userType === "sadmin" || isVigilance) && (
              <li>
                <Link to={CONSTANT.url.assetLiabilityListAdmin}>
                  Vigilance Asssets
                </Link>
              </li>
            )}
          </ul>
          {/* <ul>
                        <li><Link to={CONSTANT.url.assetLiabilityListAdmin}>List</Link></li>
                        <li><Link to={CONSTANT.url.assetLiabilityAdd}>Add Asssets/Liability</Link></li>
                        <li><Link to={CONSTANT.url.assetLiabilityList}>List Asssets/Liability</Link></li>
                    </ul> */}
        </div>

        {userType === "sadmin" || userType === "radmin" ? (
          <div
            id="tab9"
            style={{ display: "none" }}
            className="tabcontent right-tabcontent"
          >
            <ul>
              <li>
                <Link to={CONSTANT.url.loanList}>Loans</Link>
              </li>
              <li>
                <Link to={CONSTANT.url.loanHistory}>Inactive List</Link>
              </li>
              <li>
                <Link to={CONSTANT.url.fasitvalAddList}>
                  Fastival Advance List
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.fasitvalAddEarlyPendigList}>
                  Early Festival Approval
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.fasitvalAddPendigList}>
                  Pending Festival Approval
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div
            id="tab9"
            style={{ display: "none" }}
            className="tabcontent right-tabcontent"
          >
            <ul>
              {/* {isReportingManager &&
                                <li><Link to={CONSTANT.url.loanList}>Loans</Link></li>
                            } */}
              <li>
                <b>Festival Advance Pending</b>
              </li>
              <li>
                <Link to={CONSTANT.url.festivalAdvanceEmpForRM}>
                  View Pending List
                </Link>
              </li>
              <li>
                <b>Apply</b>
              </li>
              <li>
                <Link to={CONSTANT.url.fasitvalAddListEmp}>
                  Festival Advance List
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div
          id="tab10"
          style={{ display: "none" }}
          className="tabcontent right-tabcontent"
        >
          <ul>
            <li>
              <Link to={CONSTANT.url.pensioneEmpList}>Employee List</Link>
            </li>
            <li>
              <Link to={CONSTANT.url.pensionRun}>Process Pension</Link>
            </li>
            <li>
              <Link to={CONSTANT.url.pensionDetail}>Pension Detail</Link>
            </li>
            <li>
              <Link to={CONSTANT.url.pensionConfig}>Pension Configuration</Link>
            </li>
          </ul>
        </div>

        <div
          id="tab15"
          style={{ display: "none" }}
          className="tabcontent right-tabcontent"
        >
          <ul>
            <li>
              <b> Perquisites</b>
            </li>
            <li>
              <b>Pending</b>
            </li>
            {/* <li><Link to={CONSTANT.url.perquisites}>Vehicle Info</Link></li> */}
            <li>
              <Link to={CONSTANT.url.perquisites.tadaAllowanceRecommendation}>
                Recommendations
              </Link>
            </li>
          </ul>
        </div>
        <div
          id="tab11"
          style={{ display: "none" }}
          className="tabcontent right-tabcontent"
        >
          {isReportingManager ? (
            <ul>
              <li>
                <b> Perquisites</b>
              </li>
              <li>
                <b>Pending</b>
              </li>
              {/* <li><Link to={CONSTANT.url.perquisites}>Vehicle Info</Link></li> */}
              <li>
                <Link to={CONSTANT.url.perquisites.vpendingAllowance}>
                  Vehicle Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.tadaPendingAllowance}>
                  Tada Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.newsPaperPendingAllowance}>
                  {" "}
                  News Allowance
                </Link>
              </li>
              <li>
                <Link
                  to={CONSTANT.url.perquisites.briefCasePaperPendingAllowance}
                >
                  Brief Case Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.mobilePendingAllowance}>
                  {" "}
                  Mobile Allowance
                </Link>
              </li>
              <li>
                <Link
                  to={CONSTANT.url.perquisites.entertainmentPendingAllowance}
                >
                  Entertainment Amount
                </Link>
              </li>
              <li>
                <Link
                  to={
                    CONSTANT.url.perquisites.uniformAndLiveriesPendingAllowance
                  }
                >
                  {" "}
                  Uniform-Liveries
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.medicalPendingAllowance}>
                  Medical Allowance
                </Link>
              </li>
              <li>
                <b>Apply</b>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.vuserInfo}>
                  Vehicle Info
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.vallowance}>
                  Vehicle Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.tadaAllowance}>
                  Tada Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.mobileAllowance}>
                  Mobile Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.briefCasePaperAllowance}>
                  Brief Case Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.entertainmentAllowance}>
                  Entertainment Amount
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.uniformAndLiveriesAllowance}>
                  Uniform-Liveries
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.newsPaperAllowance}>
                  {" "}
                  News Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.medicalAllowance}>
                  Medical Allowance
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <b>Perquisites</b>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.vuserInfo}>
                  Vehicle Info
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.vallowance}>
                  Vehicle Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.tadaAllowance}>
                  Tada Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.mobileAllowance}>
                  Mobile Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.briefCasePaperAllowance}>
                  Brief Case Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.entertainmentAllowance}>
                  Entertainment Amount
                </Link>
              </li>
              {list != undefined && (
                <li>
                  <Link
                    to={CONSTANT.url.perquisites.uniformAndLiveriesAllowance}
                  >
                    Uniform-Liveries
                  </Link>
                </li>
              )}
              <li>
                <Link to={CONSTANT.url.perquisites.newsPaperAllowance}>
                  {" "}
                  News Allowance
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.perquisites.medicalAllowance}>
                  Medical Allowance
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div
          id="tab16"
          style={{ display: "none" }}
          className="tabcontent right-tabcontent"
        >
          <ul>
            <li>
              <b>Salary Increment</b>
            </li>
            <li>
              <Link to={CONSTANT.url.increment.basic}>BASIC</Link>
            </li>
            <li>
              <Link to={CONSTANT.url.increment.pqp}>PQP</Link>
            </li>
            <li>
              <Link to={CONSTANT.url.increment.sppay}>SPPAY</Link>
            </li>
          </ul>
        </div>

        <div
          id="tab12"
          style={{ display: "none" }}
          className="tabcontent right-tabcontent"
        >
          <ul>
            <li>
              <b> Payment Report</b>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.vallowance}>
                Vehicle Allowance
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.tadaAllowance}>
                Tada Allowance
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.mobileAllowance}>
                Mobile Allowance
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.briefCasePaperAllowance}>
                Brief Case Allowance
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.entertainmentAllowance}>
                Entertainment Amount
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.uniformAndLiveriesAllowance}>
                Uniform-Liveries
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.newsPaperAllowance}>
                {" "}
                News Allowance
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.festival}>Festival Advance</Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.medicalAllowance}>
                Medical Allowance
              </Link>
            </li>
            <li>
              <Link to={CONSTANT.url.payment.salary}>Salary</Link>
            </li>
          </ul>
        </div>

        {userType === "sadmin" || userType === "radmin" ? (
          <div
            id="tab13"
            style={{ display: "none" }}
            className="tabcontent right-tabcontent"
          >
            <ul>
              <li>
                <b>Reports</b>
              </li>
              <li>
                <Link to={CONSTANT.url.reports.reportingManagerDetails}>
                  Reporting Manager Details
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.reports.employeeLeaveReportsAdmin}>
                  Employee Leave Reports
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div
            id="tab13"
            style={{ display: "none" }}
            className="tabcontent right-tabcontent"
          >
            <ul>
              <li>
                <b>Reports</b>
              </li>
              <li>
                <Link to={CONSTANT.url.reports.employeeReports}>
                  Employees Reporting To Me
                </Link>
              </li>
              <li>
                <Link to={CONSTANT.url.reports.employeeLeaveReports}>
                  Leave Reports
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Sidebar;
