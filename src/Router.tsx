import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import CONSTANT from "./constant";
import { getSession } from "./utils";
import Login from "./container/auth/Login";
import Logout from "./container/auth/Logout";
import Register from "./container/auth/Register";
import ChangePassword from "./container/auth/ChangePassword";
import ForgotPassword from "./container/auth/ForgotPassword";
import ResetPassword from "./container/auth/ResetPassword";
import ChatBOT from "./container/ChatBOT";
import Language from "./container/Language";

import Dashboard from "./container/dashboard/Index";
import AcknowledgeConfig from "./container/AcknowledgeConfig";

import EmployeeList from "./container/employee/List";
import EmployeeDetail from "./container/employee/EmployeeDetail";

import EmployeeAddMaster from "./container/employee/AddMaster";
import EmployeeEditMaster from "./container/employee/EditMaster";
import EmployeeEditBasic from "./container/employee/EditBasic";
import EmployeeEditAddress from "./container/employee/EditAddress";
import EmployeeEducation from "./container/employee/EducationList";
import EmployeeExperience from "./container/employee/ExperienceList";
import EmployeeTraining from "./container/employee/TrainingMaster";
import DepartmentEnquiry from "./container/employee/DepartmentalEnquiry";
import EmployeeDocument from "./container/employee/DocumentList";
import EmployeeFamily from "./container/employee/FamilyList";
import EmployeeEditBank from "./container/employee/EditBank";
import EditEmployeeWork from "./container/employee/EditWork";
import EditEmployeeSalary from "./container/employee/EditSalary";
import EmployeeLeaveBalance from "./container/employee/LeaveBalance";
import EmployeeProfilePicture from "./container/employee/EditProfilePic";
import EmployeeSalarySlip from "./container/emp-salary-slip/SalarySlip";

import JobHistory from "./container/employee/JobHistory";
import EmployeeLifeInsurance from "./container/employee/EditDeclaration";

import EditNomination from "./container/employee/EditNomination";

import OBEmployeeEditBasic from "./container/onboard/EditBasic";
import OBEmployeeEditAddress from "./container/onboard/EditAddress";
import OBEmployeeEducation from "./container/onboard/EducationList";
import OBEmployeeExperience from "./container/onboard/ExperienceList";
import OBEmployeeFamily from "./container/onboard/FamilyList";
import OBEmployeeEditBank from "./container/onboard/EditBank";
import OBEditEmployeeWork from "./container/onboard/EditWork";
import OBEditEmployeeSalary from "./container/onboard/EditSalary";

import OnboardEditBasic from "./container/onboard/EditBasic";

import EmployeeMaster from "./container/EmployeeMaster";
// import EmployeeProfile from './container/employee/EmployeeMaster';
// import AddEmployeeBasic from './container/employee/EmployeeBasic';
// import EmployeeAddress from './container/employee/EmployeeAddress';
// import EmployeeEducation from './container/employee/EmployeeEducation';
// import EmployeeExperience from './container/employee/EmployeeExperience';
// import EmployeeSalaryDetail from './container/employee/EmployeeSalaryDetail';
// import EmployeeCompensation from './container/employee/EmployeeCompensation';
import AttendanceReport from "./container/attendance/dashboard";
import AttendanceHistory from "./container/attendance/history";
import AttendanceContainer from "./container/attendance";
import EmployeeAttendanceContainer from "./container/attendance/EmployeeAttendance";
import UploadAttendance from "./component/attendance/UploadAttendance";

import HolidayList from "./container/holiday/List";

import LeaveDashboard from "./container/leave/dashboard";
import LeaveList from "./container/leave/List";
import EmpLeaveContainer from "./container/leave/EmpList";
import ApplyLeaveContainer from "./container/leave/Add";
import LeaveHistory from "./container/leave/History";
import LeaveBulkUpload from "./container/leave/BulkUpload";

import FastivalAdDashboard from "./container/fastival-advance/dashboard";
import FastivalAdList from "./container/fastival-advance/List";
import EmpFastivalAdContainer from "./container/fastival-advance/EmpList";
import ApplyFastivalAdContainer from "./container/fastival-advance/Add";
import FastivalAdHistory from "./container/fastival-advance/History";
import FastivalAdEarlyHistory from "./container/fastival-advance/PendingEarlyPay";
import FestivalAdvanceListForRM from "./container/fastival-advance/FestivalAdvanceListForRM";
import FestivalAdvanceListForRMApprove from "./container/fastival-advance/FestivalAdvanceListForRMApprove";

import SettingContainer from "./container/SettingsContainer";
import SalaryContainer from "./container/SalaryContainer";

import User from "./container/setting/User";
import Department from "./container/setting/department/List";
import AddDepartment from "./container/setting/department/Add";
import EditDepartment from "./container/setting/department/Edit";

import RoleList from "./container/setting/role/List";
import AddRole from "./container/setting/role/AddRole";
import EditRole from "./container/setting/role/EditRole";

import Permission from "./container/setting/Permission";
import Designation from "./container/setting/designation/List";
import AddDesignation from "./container/setting/designation/Add";
import EditDesignation from "./container/setting/designation/Edit";
import Shifts from "./container/setting/Shifts";

import LeaveTypeList from "./container/setting/leave-type/List";
import AddLeaveType from "./container/setting/leave-type/Add";
import EditLeaveType from "./container/setting/leave-type/Edit";

import AttendanceTypeList from "./container/setting/attendance-type/List";
import AddAttendanceType from "./container/setting/attendance-type/Add";
import EditAttendanceType from "./container/setting/attendance-type/Edit";

import SalaryComponentList from "./container/salary-component/List";
import AddSalaryComponent from "./container/salary-component/Add";
import EditSalaryComponent from "./container/salary-component/Edit";

import SalaryDeductionList from "./container/salary-deductoin/List";
import AddSalaryDeduction from "./container/salary-deductoin/Add";
import EditSalaryDeduction from "./container/salary-deductoin/Edit";

import SalaryAllowanceList from "./container/salary-allowance/List";
import AddSalaryAllowance from "./container/salary-allowance/Add";
import EditSalaryAllowance from "./container/salary-allowance/Edit";

import SalaryProfileList from "./container/salary-profile/List";
import AddSalaryProfile from "./container/salary-profile/Add";
import EditSalaryProfile from "./container/salary-profile/Edit";

import SalaryProfileMemberList from "./container/salary-profile-member/List";
import AddSalaryProfileMember from "./container/salary-profile-member/Add";
import EditSalaryProfileMember from "./container/salary-profile-member/Edit";

import PayrollCycleList from "./container/payroll/RunnPayRoll";
import PayrollCycleEmployeeList from "./container/payroll/PayRollDetail";
import salarySlip from "./container/payroll/SalarySlip";

import AddCompanyBranch from "./component/setting/CompanyBranch/AddCompanyBranch";
import EditCompanyBranch from "./container/setting/CompanyBranch/Edit";
import CompanyBranchCalender from "./component/holiday/CompanyBranchHoliday";
import CompanyBranchList from "./container/setting/CompanyBranch/List";
import BranchBulkUpload from "./container/setting/CompanyBranch/BulkUpload";

import DocumentList from "./container/setting/document/List";
import AddDocument from "./container/setting/document/Add";
import EditDocument from "./container/setting/document/Edit";

import LocationList from "./container/location/List";
import AddLocation from "./container/location/Add";
import EditLocation from "./container/location/Edit";

// import AddExperience from './component/employee-master/AddExperience';
// import AddFamily from './component/employee-master/AddFamily';
// import AddEducation from './component/employee-master/AddEducation';
// import AddEmployeeBankDetail from './container/employee/EmployeeBankDetail';
// import AddEmployeeDocument from './container/employee/EmployeeDocument';
// import AddEmployeeFamily from './container/employee/EmployeeFamily';
// import AddEmployeeWorkProfile from './container/employee/EmployeeWorkProfile';
import BulkUploadEmployee from "./container/employee/BulkUpload";
import UploadEmployeeStep2 from "./container/employee/UploadReportingMangers";
// import AddEmployeeSalaryProfile from './container/employee/EmployeeSalaryProfile';

import AddCompOffContainer from "./container/compoff/Add";
import CompOffListContainer from "./container/compoff/List";
import EmpCompOffListContainer from "./container/compoff/EmpList";

import AddOD from "./container/onduty/Add";
import ODList from "./container/onduty/List";
import EmpODList from "./container/onduty/EmpList";

import AddWFH from "./container/wfh/Add";
import WFHList from "./container/wfh/List";
import EmpWFHList from "./container/wfh/EmpList";
import WFHHistory from "./container/wfh/History";

import CompanyDetail from "./container/setting/company-detail/CompanyDetail";
import SettingsEmployeeProfile from "./container/setting/EmployeeProfile";

import UserList from "./container/setting/user/List";
import AddUser from "./container/setting/user/AddUser";
import EditUser from "./container/setting/user/EditUser";

import AddLoan from "./container/loan/Add";
import EditLoan from "./container/loan/Edit";
import LoanList from "./container/loan/List";
import LoanListEmp from "./container/loan/History";

import ODHistory from "./container/onduty/History";
import CompOffHistory from "./container/compoff/History";

import HolidayTypeList from "./container/setting/holiday-type/List";
import AddHolidayType from "./container/setting/holiday-type/Add";
import EditHolidayType from "./container/setting/holiday-type/Edit";

import LoanTypeList from "./container/setting/loan-type/List";
import AddLoanType from "./container/setting/loan-type/Add";
import EditLoanType from "./container/setting/loan-type/Edit";

import AddGeofencing from "./container/setting/Geofencing/Add";
import ListGeofencing from "./container/setting/Geofencing/List";
import EditGeoFencing from "./container/setting/Geofencing/Edit";

// Perquisite configratioin
import AddFule from "./container/config/fuel/Add";
import FuleLit from "./container/config/fuel/List";
import AddTaDa from "./container/config/tada/Add";

import EditTaDa from "./container/config/tada/Add";
import TaDaLit from "./container/config/tada/List";

import EditHotel from "./container/config/hotel/Add";
import AddHotel from "./container/config/hotel/Add";
import HotelLit from "./container/config/hotel/List";

// News paper Module
import AddNewsPaper from "./container/config/newsPaper/Add";
import EditNewsPaper from "./container/config/newsPaper/Add";
import NewsPaperList from "./container/config/newsPaper/List";

import AddBriefCase from "./container/config/briefCase/Add";
import EditBriefCase from "./container/config/briefCase/Add";
import BriefCaseList from "./container/config/briefCase/List";

import AddEntertainment from "./container/config/entertainment/Add";
import EditEntertainment from "./container/config/entertainment/Add";
import EntertainmentList from "./container/config/entertainment/List";

import AddUniformAndLiveries from "./container/config/uniformAndLiveries/Add";
import EditUniformAndLiveries from "./container/config/uniformAndLiveries/Add";
import UniformAndLiveriesList from "./container/config/uniformAndLiveries/List";

import AddPerquisiteApproval from "./container/config/perquisiteApproval/Add";
import EditPerquisiteApproval from "./container/config/perquisiteApproval/Add";
import PerquisiteApprovalList from "./container/config/perquisiteApproval/List";

import AddLeaveApproval from "./container/config/leaveApproval/Add";
import EditLeaveApproval from "./container/config/leaveApproval/Add";
import LeaveApprovalList from "./container/config/leaveApproval/List";
import ReportingMApprovalList from "./container/config/reprotingManagerApproval/ReportingMApprovalList";
import AddReportingMApprovalConfig from "./container/config/reprotingManagerApproval/Add";
import EditReportingMApprovalConfig from "./container/config/reprotingManagerApproval/Add";
import NewReportingManager from "./container/config/reprotingManagerApproval/NewReportingManager";

//Payment Config Module

import AddPaymentApproval from "./container/config/paymentApproval/Add";
import EditPaymentApproval from "./container/config/paymentApproval/Add";
import PaymentApprovalList from "./container/config/paymentApproval/List";

// Medical Module

import MedicalList from "./container/config/medical/List";
import AddMedical from "./container/config/medical/Add";
import EditMedical from "./container/config/medical/Add";

// Mobile Module
import MobileList from "./container/config/mobile/List";
import AddMobile from "./container/config/mobile/Add";
import EditMobile from "./container/config/mobile/Add";

import PaydayContainer from "./container/Paiddays";

import PayrollDashboard from "./container/dashboard/Payroll";

import HelpdeskCategory from "./container/setting/helpdesk-category/List";
import HelpdeskAddCategory from "./container/setting/helpdesk-category/AddCategory";
import HelpdeskEditCategory from "./container/setting/helpdesk-category/EditCategory";
import HelpdeskAddSubCategory from "./container/setting/helpdesk-category/AddSubCategory";

import HelpdeskList from "./container/helpdesk/List";
import HelpdeskTimeline from "./container/helpdesk/Timeline";

import BranchCategoryList from "./container/setting/branch-category/List";
import EditBranchCategory from "./container/setting/branch-category/Edit";
import AddBranchCategory from "./container/setting/branch-category/Add";
import BulkUpload from "./container/holiday/BulkUpload";

import AddAsset from "./container/asset-liability/AddDetail";
import EditAsset from "./container/asset-liability/EditDetail";
import ListAsset from "./container/asset-liability/List";
import ListAssetAdmin from "./container/asset-liability/List-Admin";
import AddImmovable from "./container/asset-liability/AddImmovable";
import AddMmovable from "./container/asset-liability/AddMovable";
import AddDebit from "./container/asset-liability/AddDebt";
import AddShare from "./container/asset-liability/AddShare";
import AddAssetDeclaration from "./container/asset-liability/AddAssetDeclaration";

import AddIncrement from "./container/increment/Add";
import ListIncrement from "./container/increment/List";
import AddIncrementPqp from "./container/increment/AddPqp";
import ListIncrementPqp from "./container/increment/ListPqp";
import AddIncrementSppay from "./container/increment/AddSppay";
import ListIncrementSppay from "./container/increment/ListSppay";

import RunPension from "./container/pension-superannuation/RunPension";
import PensionDetail from "./container/pension-superannuation/PensionDetail";
import PensionEmpList from "./container/pension-superannuation/EmployeeList";
import PensionConfiguration from "./container/pension-superannuation/ConfigurationList";
import AddPensionAllowance from "./container/pension-superannuation/AddDaAllow";
import EditPensionAllowance from "./container/pension-superannuation/EditDaAllow";
import AddPensionRule from "./container/pension-superannuation/AddPensionRule";
import EditPensionRule from "./container/pension-superannuation/EditPensionRule";
import AddPensionFactorRule from "./container/pension-superannuation/AddCommFactor";
import EditPensionFactorRule from "./container/pension-superannuation/EditCommFactor";

import PerquisiteUserInfo from "./container/perquisites/VehicleInfo";
import PerquisiteTAllowance from "./container/perquisites/travel-allowance/List";
import AddPerquisiteTAllowance from "./container/perquisites/travel-allowance/Apply";
import ApprovePerquisiteTAllowance from "./container/perquisites/travel-allowance/Approve";
import PendingPerquisiteTAllowance from "./container/perquisites/travel-allowance/Pending-list";

import PerquisiteDAllowance from "./container/perquisites/tada/List";
import AddPerquisiteDAllowance from "./container/perquisites/tada/Apply";
import ApprovePerquisiteDAllowance from "./container/perquisites/tada/Approve";
import PendingPerquisiteDAllowance from "./container/perquisites/tada/Pending-list";
import RecommendPerquisiteDAllowance from "./container/perquisites/tada/RecommendPerquisiteDAllowance";
import ApproveRecommendDAllowance from "./container/perquisites/tada/ApproveRecommendPerquisiteDAllowance";

import PerquisiteNAllowance from "./container/perquisites/news-paper/List";
import AddPerquisiteNAllowance from "./container/perquisites/news-paper/Apply";
import ApprovePerquisiteNAllowance from "./container/perquisites/news-paper/Approve";
import PendingPerquisiteNAllowance from "./container/perquisites/news-paper/Pending-list";

import PerquisiteBriefCaseAllowance from "./container/perquisites/brief-case/List";
import AddPerquisiteBriefCaseAllowance from "./container/perquisites/brief-case/Apply";
import ApprovePerquisiteBriefCaseAllowance from "./container/perquisites/brief-case/Approve";
import PendingPerquisiteBriefCaseAllowance from "./container/perquisites/brief-case/Pending-list";

import PerquisiteMAllowance from "./container/perquisites/mobile/List";
import AddPerquisiteMAllowance from "./container/perquisites/mobile/Apply";
import PendingPerquisiteMAllowance from "./container/perquisites/mobile/Pending-list";
import ApprovePerquisiteMAllowance from "./container/perquisites/mobile/Approve";

import PerquisiteEntertainmentAllowance from "./container/perquisites/entertainment-amount/List";
import AddPerquisiteEntertainmentAllowance from "./container/perquisites/entertainment-amount/Apply";
import ApprovePerquisiteEntertainmentAllowance from "./container/perquisites/entertainment-amount/Approve";
import PendingPerquisiteEntertainmentAllowance from "./container/perquisites/entertainment-amount/Pending-list";

import PerquisiteUniformAndLiverieseAllowance from "./container/perquisites/uniform-liveries/List";
import AddPerquisiteUniformAndLiveriesAllowance from "./container/perquisites/uniform-liveries/Apply";
import ApprovePerquisiteUniformAndLiveriesAllowance from "./container/perquisites/uniform-liveries/Approve";
import PendingPerquisiteUniformAndLiveriesAllowance from "./container/perquisites/uniform-liveries/Pending-list";

import PerquisiteMedicalAllowance from "./container/perquisites/medical/List";
import AddPerquisiteMedicalAllowance from "./container/perquisites/medical/Apply";
import ApprovePerquisiteMedicalllowance from "./container/perquisites/medical/Approve";
import PendingPerquisiteMedicalllowance from "./container/perquisites/medical/Pending-list";

import PaymentTrns from "./container/payment/trns";
import PaymentSalary from "./container/payment/salary";
import PaymentFestival from "./container/payment/festival";
import PaymentTadaAllowance from "./container/payment/tada";
import PaymentMobileAllowance from "./container/payment/mobile";
import PaymentTravelAllowance from "./container/payment/travel";
import PaymentNewsAllowance from "./container/payment/news-paper";
import PaymentBriefCaseAllowance from "./container/payment/brief-case";
import PaymentEntertainmentAllowance from "./container/payment/entertenment";
import PaymentUniformAndLiverieseAllowance from "./container/payment/uniform";
import PaymentMedicalAllowance from "./container/payment/medical";
import EmployeeReports from "./container/reports/employee-reports";
import EmployeeLeaveReports from "./container/reports/employeeLeave-reports";
import EmployeeLeaveReportsAdmin from "./container/reports/employeeLeaveReportsAdmin";
import ReportingManagerDetails from "./container/reports/reporting-manager-details";
import { getAuthenticationFormComplete } from "./action/AuthAction";
import AuthenticationForm from "./container/auth/AuthenticationFornPage";
import { CreditLeave } from "./container/leave/CreditLeave";
import { CreditYearlyLeave } from "./container/leave/CreditYearlyLeave";
import { EPMSDashboard } from "./container/epms/EPMSDashboard";
import { AddEMPSComfig } from "./container/epms/AddEPMSConfig";
const PrivateRoute = (props: any) => {
  let result: any;
  if (getSession()) {
    if (getAuthenticationFormComplete()) return <Route {...props} />;
    else
      return (
        <Redirect
          exact={true}
          to={{
            pathname: CONSTANT.url.getAuthenticationFormComplete,
            state: { from: props.path },
          }}
        />
      );
  } else {
    return (
      <Redirect
        exact={true}
        to={{ pathname: CONSTANT.url.login, state: { from: props.path } }}
      />
    );
  }
};

const Router = (props: any) => {
  return (
    <Switch>
      <Route exact={true} path={CONSTANT.url.login} component={Login} />
      <Route exact={true} path={CONSTANT.url.logout} component={Logout} />
      <Route exact={true} path={CONSTANT.url.register} component={Register} />
      <Route exact={true} path={CONSTANT.url.language} component={Language} />
      <Route
        exact={true}
        path={CONSTANT.url.getAuthenticationFormComplete}
        component={AuthenticationForm}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.changePassword}
        component={ChangePassword}
      />
      <PrivateRoute path={CONSTANT.url.epms} component={EPMSDashboard} />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.creditLeave}
        component={CreditLeave}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.creditPeriodicLeave}
        component={CreditYearlyLeave}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.resetPassword}
        component={ResetPassword}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.forgotPassword}
        component={ForgotPassword}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.chatBot}
        component={ChatBOT}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.dashboard}
        component={Dashboard}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.acknowledgeConfig}
        component={AcknowledgeConfig}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.onboardEditBasic}
        component={OnboardEditBasic}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.employeeList}
        component={EmployeeList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.employeeDetail}
        component={EmployeeDetail}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.empSalarySlip}
        component={EmployeeSalarySlip}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.addEmployeeMaster}
        component={EmployeeAddMaster}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeMaster}
        component={EmployeeEditMaster}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeBasic}
        component={EmployeeEditBasic}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeAddress}
        component={EmployeeEditAddress}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeBank}
        component={EmployeeEditBank}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeEducation}
        component={EmployeeEducation}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeExperience}
        component={EmployeeExperience}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editTrainingExperience}
        component={EmployeeTraining}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.departmentalEnquiry}
        component={DepartmentEnquiry}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeDocument}
        component={EmployeeDocument}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeFamily}
        component={EmployeeFamily}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeWork}
        component={EditEmployeeWork}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeSalary}
        component={EditEmployeeSalary}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeLeaveBalance}
        component={EmployeeLeaveBalance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeProfilePicture}
        component={EmployeeProfilePicture}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeLifeInsurance}
        component={EmployeeLifeInsurance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.jobHistory}
        component={JobHistory}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editEmployeeNomination}
        component={EditNomination}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.employeeBulkUpload}
        component={BulkUploadEmployee}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.obEmployeeBasic}
        component={OBEmployeeEditBasic}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.obEmployeeAddress}
        component={OBEmployeeEditAddress}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.obEmployeeBank}
        component={OBEmployeeEditBank}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.obEmployeeEducation}
        component={OBEmployeeEducation}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.obEmployeeExperience}
        component={OBEmployeeExperience}
      />
      {/* <PrivateRoute exact={true} path={CONSTANT.url.editEmployeeDocument} component={EmployeeDocumentList} /> */}
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.obEmployeeFamily}
        component={OBEmployeeFamily}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.obEmployeeWork}
        component={OBEditEmployeeWork}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.obEmployeeSalary}
        component={OBEditEmployeeSalary}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.attendanceReport}
        component={AttendanceReport}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.attendance}
        component={AttendanceContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.employeeAttendance}
        component={EmployeeAttendanceContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.salaryList}
        component={SalaryContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.uploadAttendance}
        component={UploadAttendance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.holidayList}
        component={HolidayList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.bulkUploadHolidays}
        component={BulkUpload}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.attendanceHistory}
        component={AttendanceHistory}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.companyBranchList}
        component={CompanyBranchList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.companyBranchCalender}
        component={CompanyBranchCalender}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addCompanyBranch}
        component={AddCompanyBranch}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editCompanyBranch}
        component={EditCompanyBranch}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.bulkUploadCompanyBranch}
        component={BranchBulkUpload}
      />

      {/* // Perquisite configratioin */}
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addFuel}
        component={AddFule}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.fuelList}
        component={FuleLit}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addtada}
        component={AddTaDa}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.tadaList}
        component={TaDaLit}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editTada}
        component={EditTaDa}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addHotel}
        component={AddHotel}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.hotelList}
        component={HotelLit}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editHotel}
        component={EditHotel}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.newPaperList}
        component={NewsPaperList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addNewsPaper}
        component={AddNewsPaper}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editNewsPaper}
        component={EditNewsPaper}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addBriefCase}
        component={AddBriefCase}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editBriefCase}
        component={EditBriefCase}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.briefCaseList}
        component={BriefCaseList}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addUniformAndLiveries}
        component={AddUniformAndLiveries}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editUniformAndLiveries}
        component={EditUniformAndLiveries}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.uniformAndLiveriesList}
        component={UniformAndLiveriesList}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addPerquisiteApproval}
        component={AddPerquisiteApproval}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editPerquisiteApproval}
        component={EditPerquisiteApproval}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.perquisiteApprovalList}
        component={PerquisiteApprovalList}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addLeaveApproval}
        component={AddLeaveApproval}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editLeaveApproval}
        component={EditLeaveApproval}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.leaveApprovalList}
        component={LeaveApprovalList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editReportingManagerApproval}
        component={EditReportingMApprovalConfig}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addReportingManagerApproval}
        component={AddReportingMApprovalConfig}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.updateReportingManager}
        component={NewReportingManager}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.reportingManagerConfig}
        component={ReportingMApprovalList}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addPaymentApproval}
        component={AddPaymentApproval}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editPaymentApproval}
        component={EditPaymentApproval}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.paymentApprovalList}
        component={PaymentApprovalList}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addEntertainment}
        component={AddEntertainment}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editEntertainment}
        component={EditEntertainment}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.entertainmentList}
        component={EntertainmentList}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.medicalList}
        component={MedicalList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addMedical}
        component={AddMedical}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editMedical}
        component={EditMedical}
      />
      {/* // END Perquisite configratioin */}
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.MobileList}
        component={MobileList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addMobile}
        component={AddMobile}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editMobile}
        component={EditMobile}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.leaveList}
        component={LeaveHistory}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.leaveDashboard}
        component={LeaveDashboard}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.pendingApprovalsList}
        component={LeaveList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.applyLeave}
        component={ApplyLeaveContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.leavesListEmp}
        component={EmpLeaveContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.leaveBulkUpload}
        component={LeaveBulkUpload}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.fasitvalAddListEmp}
        component={EmpFastivalAdContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.fasitvalAddPendigList}
        component={FastivalAdHistory}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.fasitvalAddEarlyPendigList}
        component={FastivalAdEarlyHistory}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.applyFasitvalAdd}
        component={ApplyFastivalAdContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.fasitvalAddList}
        component={FastivalAdList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.festivalAdvanceEmpForRM}
        component={FestivalAdvanceListForRM}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.festivalAdvanceEmpForRMApprove}
        component={FestivalAdvanceListForRMApprove}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.applyod}
        component={AddOD}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.odList}
        component={ODList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.odListEmp}
        component={EmpODList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.odHistory}
        component={ODHistory}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.applyWFH}
        component={AddWFH}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.wfhList}
        component={WFHList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.wfhListEmp}
        component={EmpWFHList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.wfhHistory}
        component={WFHHistory}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.applyCompOff}
        component={AddCompOffContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.compOffList}
        component={CompOffListContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.compOffListEmp}
        component={EmpCompOffListContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.compOffHistory}
        component={CompOffHistory}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settings}
        component={SettingContainer}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.user}
        component={User}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.role}
        component={RoleList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addRole}
        component={AddRole}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editRole}
        component={EditRole}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.permission}
        component={Permission}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.department}
        component={Department}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addDepartment}
        component={AddDepartment}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editDepartment}
        component={EditDepartment}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.locationList}
        component={LocationList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addLocation}
        component={AddLocation}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editLocation}
        component={EditLocation}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.salaryComponentList}
        component={SalaryComponentList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addSalaryComponent}
        component={AddSalaryComponent}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editSalaryComponent}
        component={EditSalaryComponent}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.salaryDeductionList}
        component={SalaryDeductionList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addSalaryDeduction}
        component={AddSalaryDeduction}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editSalaryDeduction}
        component={EditSalaryDeduction}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.salaryAllowanceList}
        component={SalaryAllowanceList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addSalaryAllowance}
        component={AddSalaryAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editSalaryAllowance}
        component={EditSalaryAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payrollCycleList}
        component={PayrollCycleList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.salarySlip}
        component={salarySlip}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payrollCycleEmployeeList}
        component={PayrollCycleEmployeeList}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.salaryProfileMemberList}
        component={SalaryProfileMemberList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addSalaryProfileMember}
        component={AddSalaryProfileMember}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editSalaryProfileMember}
        component={EditSalaryProfileMember}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.salaryProfileList}
        component={SalaryProfileList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addSalaryProfile}
        component={AddSalaryProfile}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editSalaryProfile}
        component={EditSalaryProfile}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.designation}
        component={Designation}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addDesignation}
        component={AddDesignation}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editDesignation}
        component={EditDesignation}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.leaveTypeList}
        component={LeaveTypeList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.addLeaveType}
        component={AddLeaveType}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editLeaveType}
        component={EditLeaveType}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.attendanceTypeList}
        component={AttendanceTypeList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.addattendanceType}
        component={AddAttendanceType}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editattendanceType}
        component={EditAttendanceType}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.holidayTypeList}
        component={HolidayTypeList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.addHolidayType}
        component={AddHolidayType}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editHolidayType}
        component={EditHolidayType}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.loanTypeList}
        component={LoanTypeList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.addLoanType}
        component={AddLoanType}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editLoanType}
        component={EditLoanType}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.addLoan}
        component={AddLoan}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.loanList}
        component={LoanList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.loanHistory}
        component={LoanListEmp}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editLoan}
        component={EditLoan}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editLoanEmp}
        component={EditLoan}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.document}
        component={DocumentList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addDocument}
        component={AddDocument}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editDocument}
        component={EditDocument}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.shifts}
        component={Shifts}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.companyDetail}
        component={CompanyDetail}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.employeeProfile}
        component={SettingsEmployeeProfile}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.userList}
        component={UserList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addUser}
        component={AddUser}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.edituser}
        component={EditUser}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.uploadEmployeeStep2}
        component={UploadEmployeeStep2}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addGeofencing}
        component={AddGeofencing}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.geofencing}
        component={ListGeofencing}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editGeofencing}
        component={EditGeoFencing}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.paydayList}
        component={PaydayContainer}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payrollDashboard}
        component={PayrollDashboard}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.helpdeskListCategory}
        component={HelpdeskCategory}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.helpdeskAddCategory}
        component={HelpdeskAddCategory}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.helpdeskEditCategory}
        component={HelpdeskEditCategory}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.helpdeskAddSubCategory}
        component={HelpdeskAddSubCategory}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.helpdesk}
        component={HelpdeskList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.helpdeskTimeline}
        component={HelpdeskTimeline}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.addBranchCategory}
        component={AddBranchCategory}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.branchCategoryList}
        component={BranchCategoryList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.settingsOption.editBranchCategory}
        component={EditBranchCategory}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.assetLiabilityAdd}
        component={AddAsset}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editAssetDetailForm}
        component={EditAsset}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.assetLiabilityList}
        component={ListAsset}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.assetLiabilityListAdmin}
        component={ListAssetAdmin}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editAssetImmovable}
        component={AddImmovable}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editAssetMovable}
        component={AddMmovable}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editAssetDebt}
        component={AddDebit}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editAssetShare}
        component={AddShare}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editAssetDeclaration}
        component={AddAssetDeclaration}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.increment.basicAdd}
        component={AddIncrement}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.increment.basic}
        component={ListIncrement}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.increment.pqpAdd}
        component={AddIncrementPqp}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.increment.pqp}
        component={ListIncrementPqp}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.increment.sppayAdd}
        component={AddIncrementSppay}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.increment.sppay}
        component={ListIncrementSppay}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.pensionRun}
        component={RunPension}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.pensionDetail}
        component={PensionDetail}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.pensioneEmpList}
        component={PensionEmpList}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.pensionConfig}
        component={PensionConfiguration}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.addPensionAllowance}
        component={AddPensionAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editPensionAllowance}
        component={EditPensionAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.addPensionRule}
        component={AddPensionRule}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editPensionRule}
        component={EditPensionRule}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.addCommutataionFactor}
        component={AddPensionFactorRule}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.editCommutataionFactor}
        component={EditPensionFactorRule}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.vuserInfo}
        component={PerquisiteUserInfo}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.vallowance}
        component={PerquisiteTAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.vaddAllowance}
        component={AddPerquisiteTAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.vpendingAllowance}
        component={PendingPerquisiteTAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.vapproveAllowance}
        component={ApprovePerquisiteTAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.tadaAllowance}
        component={PerquisiteDAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.tadaAddAllowance}
        component={AddPerquisiteDAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.tadaDetilAllowance}
        component={AddPerquisiteDAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.tadaPendingAllowance}
        component={PendingPerquisiteDAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.tadaApproveAllowance}
        component={ApprovePerquisiteDAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.tadaAllowanceRecommendation}
        component={RecommendPerquisiteDAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.tadaAllowanceRecommendationApprove}
        component={ApproveRecommendDAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.newsPaperAllowance}
        component={PerquisiteNAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.newsPaperAddAllowance}
        component={AddPerquisiteNAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.newsPaperPendingAllowance}
        component={PendingPerquisiteNAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.newsPaperApproveAllowance}
        component={ApprovePerquisiteNAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.briefCasePaperAllowance}
        component={PerquisiteBriefCaseAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.briefCasePaperAddAllowance}
        component={AddPerquisiteBriefCaseAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.briefCasePaperAllowanceDetail}
        component={AddPerquisiteBriefCaseAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.briefCasePaperApproveAllowance}
        component={ApprovePerquisiteBriefCaseAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.briefCasePaperPendingAllowance}
        component={PendingPerquisiteBriefCaseAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.mobileAllowance}
        component={PerquisiteMAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.mobileAddAllowance}
        component={AddPerquisiteMAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.mobilePendingAllowance}
        component={PendingPerquisiteMAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.mobileApproveAllowance}
        component={ApprovePerquisiteMAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.entertainmentAllowance}
        component={PerquisiteEntertainmentAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.entertainmentAddAllowance}
        component={AddPerquisiteEntertainmentAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.entertainmentApproveAllowance}
        component={ApprovePerquisiteEntertainmentAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.entertainmentPendingAllowance}
        component={PendingPerquisiteEntertainmentAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.uniformAndLiveriesAllowance}
        component={PerquisiteUniformAndLiverieseAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.uniformAndLiveriesAddAllowance}
        component={AddPerquisiteUniformAndLiveriesAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.uniformAndLiveriesApproveAllowance}
        component={ApprovePerquisiteUniformAndLiveriesAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.uniformAndLiveriesPendingAllowance}
        component={PendingPerquisiteUniformAndLiveriesAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.medicalAllowance}
        component={PerquisiteMedicalAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.medicalAddAllowance}
        component={AddPerquisiteMedicalAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.medicalDetilAllowance}
        component={AddPerquisiteMedicalAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.medicalPendingAllowance}
        component={PendingPerquisiteMedicalllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.perquisites.medicalApproveAllowance}
        component={ApprovePerquisiteMedicalllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.salary}
        component={PaymentSalary}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.updateTrans}
        component={PaymentTrns}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.festival}
        component={PaymentFestival}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.vallowance}
        component={PaymentTravelAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.tadaAllowance}
        component={PaymentTadaAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.newsPaperAllowance}
        component={PaymentNewsAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.briefCasePaperAllowance}
        component={PaymentBriefCaseAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.mobileAllowance}
        component={PaymentMobileAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.entertainmentAllowance}
        component={PaymentEntertainmentAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.uniformAndLiveriesAllowance}
        component={PaymentUniformAndLiverieseAllowance}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.payment.medicalAllowance}
        component={PaymentMedicalAllowance}
      />

      <PrivateRoute
        exact={true}
        path={CONSTANT.url.reports.employeeReports}
        component={EmployeeReports}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.reports.reportingManagerDetails}
        component={ReportingManagerDetails}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.reports.employeeLeaveReports}
        component={EmployeeLeaveReports}
      />
      <PrivateRoute
        exact={true}
        path={CONSTANT.url.reports.employeeLeaveReportsAdmin}
        component={EmployeeLeaveReportsAdmin}
      />
    </Switch>
  );
};

export default Router;
