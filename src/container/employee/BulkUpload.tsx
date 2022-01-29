import * as React from 'react';
import XLSX from 'xlsx'
import { UncontrolledTooltip } from 'reactstrap'

import Header from '../../component/common/Header'
import Sidebar from '../../component/common/Sidebar';

import { employeeBulkUpload } from './../../action/EmployeeAction';
import { isValidDateFormat } from './../../utils'
import ProgressLoader from '../../component/common/ProgressLoader';
import { setInterval } from 'timers';
import CONSTANT from '../../constant'


const sampleFile = require('./../../assets/excel/employee-bulk-sample.xlsx');

class UploadEmployee extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            employees: [],
            showLoader: false,
            isExcelValid: false,
            totalCount: 0,
            progressCount: 0
        }
    }

    public render() {
        const { showLoader, employees, totalCount, progressCount } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="card">
                                <div className="card-header">
                                    Upload Employees
                                </div>
                                <div className="card-body">
                                    <input className="form-control p-1" type="file" onChange={this.handleFileOpen} />
                                    <small><a download={true} href={sampleFile}>Click here to download a sample file</a></small>
                                </div>
                            </div>
                            {
                                employees.length > 0 &&
                                <div className="card mt-3">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-10 pt-1">
                                                <b>Preview Employee</b>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Employee Code</th>
                                                            <th scope="col">First Name</th>
                                                            <th scope="col">Middle Name</th>
                                                            <th scope="col">Last Name</th>
                                                            <th scope="col">Email ID</th>
                                                            <th scope="col">Mobile No.</th>
                                                            <th scope="col">Gender</th>
                                                            <th scope="col">DOB</th>
                                                            <th scope="col">DOJ</th>
                                                            <th scope="col">DOJ Branch</th>
                                                            <th scope="col">Father Name</th>
                                                            <th scope="col">Mother Name</th>
                                                            <th scope="col">Nationality</th>
                                                            <th scope="col">Marital Status</th>
                                                            <th scope="col">Blood Group</th>
                                                            <th scope="col">Personal Email</th>
                                                            <th scope="col">Account Number</th>
                                                            <th scope="col">Account Type</th>
                                                            <th scope="col">Bank Name</th>
                                                            <th scope="col">Branch Name</th>
                                                            <th scope="col">Branch Code</th>
                                                            <th scope="col">Basic</th>
                                                            <th scope="col">PQP</th>
                                                            <th scope="col">SP Pay</th>
                                                            <th scope="col">Designation</th>
                                                            <th scope="col">Work Role</th>
                                                            <th scope="col">Employement Status</th>
                                                            <th scope="col">Employement Status From Date</th>
                                                            <th scope="col">Specialization</th>
                                                            <th scope="col">Income Tax</th>
                                                            <th scope="col">SOL ID</th>
                                                            <th scope="col">Department</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderEmployeeTable()}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-lg-12 pull-right mt-1 mb-2 pr-0 pl-0">
                                                <div className="col-lg-2 pull-right">
                                                    <button className="col-lg-12 btn primary-control float-right" onClick={this.onUploadEmployee}>Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {
                    showLoader && <ProgressLoader totalCount={totalCount} progressCount={progressCount} />
                }
            </React.Fragment>
        )
    }

    handleFileOpen = (e: any) => {
        var context = this;
        var files = e.target.files, f = files[0];
        var reader = new FileReader();
        reader.onload = function (e: any) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
            // console.log("json  => ", json);
            context.setState({ employees: json, totalCount: json.length }, () => {
                //context.onUpload({});
            })
        };
        reader.readAsArrayBuffer(f);
    }

    renderEmployeeTable = () => {
        return this.state.employees.map((item: any, index: number) => {
            return (<tr key={index}>
                {item['empCode'] == '' || item['empCode'] == undefined ? <td id={`empCode_${index}`} className="table-danger">{item['empCode']} <UncontrolledTooltip target={`empCode_${index}`}>Check employee ID!</UncontrolledTooltip></td> : <td>{item['empCode']}</td>}
                {item['firstName'] == '' || item['firstName'] == undefined ? <td id={`firstName_${index}`} className="table-danger">{item['firstName']} <UncontrolledTooltip target={`firstName_${index}`}>Check employee name!</UncontrolledTooltip></td> : <td>{item['firstName']}</td>}
                {item['middleName'] == '' || item['middleName'] == undefined ? <td id={`middleName_${index}`} className="table-danger">{item['middleName']} <UncontrolledTooltip target={`middleName_${index}`}>Check employee name!</UncontrolledTooltip></td> : <td>{item['middleName']}</td>}
                {item['lastName'] == '' || item['lastName'] == undefined ? <td id={`lastName_${index}`} className="table-danger">{item['lastName']} <UncontrolledTooltip target={`lastName_${index}`}>Check employee name!</UncontrolledTooltip></td> : <td>{item['lastName']}</td>}
                {item['emailId'] == '' || item['emailId'] == undefined ? <td id={`emailId_${index}`} className="table-danger">{item['emailId']} <UncontrolledTooltip target={`emailId_${index}`}>Check employee email!</UncontrolledTooltip></td> : <td>{item['emailId']}</td>}
                {item['mobileNo'] == '' || item['mobileNo'] == undefined ? <td id={`mobileNo_${index}`} className="table-danger">{item['mobileNo']} <UncontrolledTooltip target={`mobileNo_${index}`}>Check employee mobile number!</UncontrolledTooltip></td> : <td>{item['mobileNo']}</td>}
                {item['gender'] == '' || item['gender'] == undefined ? <td id={`gender_${index}`} className="table-danger">{item['gender']} <UncontrolledTooltip target={`gender_${index}`}>Check employee gender!</UncontrolledTooltip></td> : <td>{item['gender']}</td>}
                {item['dob(YYYY-MM-DD)'] == '' || item['dob(YYYY-MM-DD)'] == undefined || !isValidDateFormat(item['dob(YYYY-MM-DD)'].toString()) ? <td id={`dob_${index}`} className="table-danger">{item['dob(YYYY-MM-DD)']} <UncontrolledTooltip target={`dob_${index}`}>Check date of birth!</UncontrolledTooltip></td> : <td>{item['dob(YYYY-MM-DD)']}</td>}
                {item['doj(YYYY-MM-DD)'] == '' || item['doj(YYYY-MM-DD)'] == undefined || !isValidDateFormat(item['doj(YYYY-MM-DD)'].toString()) ? <td id={`doj_${index}`} className="table-danger">{item['doj(YYYY-MM-DD)']} <UncontrolledTooltip target={`doj_${index}`}>Check date of joining!</UncontrolledTooltip></td> : <td>{item['doj(YYYY-MM-DD)']}</td>}
                {item['dojBranch(YYYY-MM-DD)'] == '' || item['dojBranch(YYYY-MM-DD)'] == undefined || !isValidDateFormat(item['dojBranch(YYYY-MM-DD)'].toString()) ? <td id={`dojBranch_${index}`} className="table-danger">{item['dojBranch(YYYY-MM-DD)']} <UncontrolledTooltip target={`dojBranch_${index}`}>Check date of joining branch!</UncontrolledTooltip></td> : <td>{item['dojBranch(YYYY-MM-DD)']}</td>}
                {item['fatherName'] == '' || item['fatherName'] == undefined ? <td id={`fatherName_${index}`} className="table-danger">{item['fatherName']} <UncontrolledTooltip target={`fatherName_${index}`}>Check father name!</UncontrolledTooltip></td> : <td>{item['fatherName']}</td>}
                {item['motherName'] == '' || item['motherName'] == undefined ? <td id={`motherName_${index}`} className="table-danger">{item['motherName']} <UncontrolledTooltip target={`motherName_${index}`}>Check mother name!</UncontrolledTooltip></td> : <td>{item['motherName']}</td>}
                {item['nationality'] == '' || item['nationality'] == undefined ? <td id={`nationality_${index}`} className="table-danger">{item['nationality']} <UncontrolledTooltip target={`nationality_${index}`}>Check nationality!</UncontrolledTooltip></td> : <td>{item['nationality']}</td>}
                {item['maritalStatus'] == '' || item['maritalStatus'] == undefined ? <td id={`maritalStatus_${index}`} className="table-danger">{item['maritalStatus']} <UncontrolledTooltip target={`maritalStatus_${index}`}>Check marital status!</UncontrolledTooltip></td> : <td>{item['maritalStatus']}</td>}
                {item['bloodGroup'] == '' || item['bloodGroup'] == undefined ? <td id={`bloodGroup_${index}`} className="table-danger">{item['bloodGroup']} <UncontrolledTooltip target={`bloodGroup_${index}`}>Check blood group!</UncontrolledTooltip></td> : <td>{item['bloodGroup']}</td>}
                {item['personalEmailId'] == '' || item['personalEmailId'] == undefined ? <td id={`personalEmailId_${index}`} className="table-danger">{item['personalEmailId']} <UncontrolledTooltip target={`personalEmailId_${index}`}>Check Personal Email Id!</UncontrolledTooltip></td> : <td>{item['personalEmailId']}</td>}
                {item['accountNo'] == '' || item['accountNo'] == undefined ? <td id={`accountNo_${index}`} className="table-danger">{item['accountNo']} <UncontrolledTooltip target={`accountNo_${index}`}>Check Account No!</UncontrolledTooltip></td> : <td>{item['accountNo']}</td>}
                {item['accountType'] == '' || item['accountType'] == undefined ? <td id={`accountType_${index}`} className="table-danger">{item['accountType']} <UncontrolledTooltip target={`accountType_${index}`}>Check Account Type!</UncontrolledTooltip></td> : <td>{item['accountType']}</td>}
                {item['bankName'] == '' || item['bankName'] == undefined ? <td id={`bankName_${index}`} className="table-danger">{item['bankName']} <UncontrolledTooltip target={`bankName_${index}`}>Check Bank Name!</UncontrolledTooltip></td> : <td>{item['bankName']}</td>}
                {item['branchCode'] == '' || item['branchCode'] == undefined ? <td id={`branchCode_${index}`} className="table-danger">{item['branchCode']} <UncontrolledTooltip target={`branchCode_${index}`}>Check Branch Code!</UncontrolledTooltip></td> : <td>{item['branchCode']}</td>}
                {item['branchName'] == '' || item['branchName'] == undefined ? <td id={`branchName_${index}`} className="table-danger">{item['branchName']} <UncontrolledTooltip target={`branchName_${index}`}>Check Branch Name!</UncontrolledTooltip></td> : <td>{item['branchName']}</td>}
                {item['basic'] == '' || item['basic'] == undefined ? <td id={`basic_${index}`} className="table-danger">{item['basic']} <UncontrolledTooltip target={`basic_${index}`}>Check Basic!</UncontrolledTooltip></td> : <td>{item['basic']}</td>}
                {item['pqp'] == '' || item['pqp'] == undefined ? <td id={`pqp_${index}`} className="table-danger">{item['pqp']} <UncontrolledTooltip target={`pqp_${index}`}>Check PQ Pay!</UncontrolledTooltip></td> : <td>{item['pqp']}</td>}
                {item['sppay'] == '' || item['sppay'] == undefined ? <td id={`sppay_${index}`} className="table-danger">{item['sppay']} <UncontrolledTooltip target={`sppay_${index}`}>Check SP Pay!</UncontrolledTooltip></td> : <td>{item['sppay']}</td>}
                {item['designationId'] == '' || item['designationId'] == undefined ? <td id={`designationId_${index}`} className="table-danger">{item['designationId']} <UncontrolledTooltip target={`designationId_${index}`}>Check Designation Id!</UncontrolledTooltip></td> : <td>{item['designationId']}</td>}
                {item['workRoleId'] == '' || item['workRoleId'] == undefined ? <td id={`workRoleId_${index}`} className="table-danger">{item['workRoleId']} <UncontrolledTooltip target={`workRoleId_${index}`}>Check Work Role Id!</UncontrolledTooltip></td> : <td>{item['workRoleId']}</td>}
                {item['employementStatusId'] == '' || item['employementStatusId'] == undefined ? <td id={`employementStatusId_${index}`} className="table-danger">{item['employementStatusId']} <UncontrolledTooltip target={`employementStatusId_${index}`}>Check Employement Status Id!</UncontrolledTooltip></td> : <td>{item['employementStatusId']}</td>}
                {item['employmentStatusFromDate(YYYY-MM-DD)'] == '' || item['employmentStatusFromDate(YYYY-MM-DD)'] == undefined || !isValidDateFormat(item['employmentStatusFromDate(YYYY-MM-DD)'].toString()) ? <td id={`employmentStatusFromDate_${index}`} className="table-danger">{item['employmentStatusFromDate(YYYY-MM-DD)']} <UncontrolledTooltip target={`employmentStatusFromDate_${index}`}>Check date of joining!</UncontrolledTooltip></td> : <td>{item['employmentStatusFromDate(YYYY-MM-DD)']}</td>}
                {item['specialization'] == '' || item['specialization'] == undefined ? <td id={`specialization_${index}`} className="table-danger">{item['specialization']} <UncontrolledTooltip target={`specialization_${index}`}>Check Specialization!</UncontrolledTooltip></td> : <td>{item['specialization']}</td>}
                {item['incomeTax'] == '' || item['incomeTax'] == undefined ? <td id={`incomeTax_${index}`} className="table-danger">{item['incomeTax']} <UncontrolledTooltip target={`incomeTax_${index}`}>Check Income Tax!</UncontrolledTooltip></td> : <td>{item['incomeTax']}</td>}
                {item['solId'] == '' || item['solId'] == undefined ? <td id={`solId_${index}`} className="table-danger">{item['solId']} <UncontrolledTooltip target={`solId_${index}`}>Check SOL ID!</UncontrolledTooltip></td> : <td>{item['solId']}</td>}
                {item['departmentId'] == '' || item['departmentId'] == undefined ? <td id={`departmentId_${index}`} className="table-danger">{item['departmentId']} <UncontrolledTooltip target={`departmentId_${index}`}>Check Department Id!</UncontrolledTooltip></td> : <td>{item['departmentId']}</td>}

            </tr>)
        })
    }

    onValidateExcelData = () => {
        let valid = true;

        for (var item of this.state.employees) {

            if (item['empCode'] == '' || item['empCode'] == undefined) {
                valid = false;
                break;
            }

            if (item['firstName'] == '' || item['firstName'] == undefined) {
                valid = false;
                break;
            }
            if (item['lastName'] == '' || item['lastName'] == undefined) {
                valid = false;
                break;
            }

            if (item['mobileNo'] == '' || item['mobileNo'] == undefined) {
                valid = false;
                break;
            }
            
            if (item['dob(YYYY-MM-DD)'] == '' || item['dob(YYYY-MM-DD)'] == undefined) {
                valid = false
                break;

            } else if (!isValidDateFormat(item['dob(YYYY-MM-DD)'])) {
                valid = false
                break;
            }

            if (item['doj(YYYY-MM-DD)'] == '' || item['doj(YYYY-MM-DD)'] == undefined) {
                valid = false
                break;

            } else if (!isValidDateFormat(item['doj(YYYY-MM-DD)'])) {
                valid = false
                break;
            }

            if (item['dojBranch(YYYY-MM-DD)'] == '' || item['dojBranch(YYYY-MM-DD)'] == undefined) {
                valid = false
                break;

            } else if (!isValidDateFormat(item['dojBranch(YYYY-MM-DD)'])) {
                valid = false
                break;
            }

            if (item['employementStatusId'] == '' || item['employementStatusId'] == undefined) {
                valid = false;
                break;
            }

            if (item['employmentStatusFromDate(YYYY-MM-DD)'] == '' || item['employmentStatusFromDate(YYYY-MM-DD)'] == undefined) {
                valid = false
                break;

            } else if (!isValidDateFormat(item['employmentStatusFromDate(YYYY-MM-DD)'])) {
                valid = false;
                break;
            }

            if (item['basic'] == '' || item['basic'] == undefined) {
                valid = false;
                break;
            }
            else if (item['basic'] == '0' || item['basic'] == 0) {
                valid = false;
                break;
            }



            if (item['solId'] == '' || item['solId'] == undefined) {
                valid = false;
                break;
            }

            if (item['designationId'] == '' || item['designationId'] == undefined) {
                valid = false;
                break;
            }

            if (item['workRoleId'] == '' || item['workRoleId'] == undefined) {
                valid = false;
                break;
            }

            if (item['pqp'] === '' || item['pqp'] == undefined) {
                valid = false;
                break;
            }

            if (item['sppay'] === '' || item['sppay'] == undefined) {
                valid = false;
                break;
            }

        }
        // console.log('is valid =', valid);
        return valid;
    }

    onUploadEmployee = async () => {
        const { employees } = this.state;
        const isValid = this.onValidateExcelData();
        // console.log("isValid  => ", isValid);

        if (isValid) {
            this.setState({ showLoader: true });
            const xl = employees.map((item: any) => {
                return {
                    emailId: item['emailId'],
                    employeeCode: item['empCode'],
                    firstName: item['firstName'],
                    middleName: item['middleName'],
                    lastName: item['lastName'],
                    mobileNumber: item['mobileNo'],
                    gender: item['gender'],
                    personalEmail: item['personalEmailId'],
                    fatherName: item['fatherName'],
                    motherName: item['motherName'],
                    bloodGroup: item['bloodGroup'],
                    maritalStatus: item['maritalStatus'],
                    nationality: item['nationality'],
                    dateOfBirth: item['dob(YYYY-MM-DD)'].toString(),
                    accountNumber: item['accountNo'],
                    accountType: item['accountType'],
                    bankName: item['bankName'],
                    branchCode: item['branchCode'],
                    branchName: item['branchName'],
                    doj: item['doj(YYYY-MM-DD)'].toString(),
                    dojBranch: item['dojBranch(YYYY-MM-DD)'].toString(),
                    employementStatusId: item['employementStatusId'],
                    employmentStatusFromDate: item['employmentStatusFromDate(YYYY-MM-DD)'],
                    basic: item['basic'],
                    pqp: item['pqp'],
                    sppay: item['sppay'],
                    specialization: item['specialization'],
                    incomeTax: item['incomeTax'],
                    solId: item['solId'],
                    designationId: item['designationId'],
                    workRoleId: item['workRoleId'],
                    departmentId: item['departmentId'],
                }
            });
            // console.log("xll mod ", xl);
            this.callAPI(xl);
        } else {
            alert('Please fix the issues with excel before uploading.');
        }

    }

    sleep = (ms: any) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    callAPI = async (employees: any) => {
        let self = this;
        let countPro = 0;

        for await (const data of employees) {
            // console.log("DATA  => ", data);
            try {
                countPro += 1;
                self.setState({ progressCount: countPro });

                await self.sleep(1);

                let respo = await employeeBulkUpload({ xl: data })

                console.log('respo status', respo.status)
                if (respo.status === false) {
                    alert(`${respo.result.employeeCode} ${respo.result.message}`)
                    self.setState({ showLoader: false, employees: [] });
                    return;
                }

                if (countPro === employees.length) {
                    self.setState({ showLoader: false, employees: [] });
                    alert(`Employees were added successfully`);
                    this.props.history.push(CONSTANT.url.uploadEmployeeStep2)
                }
            } catch (error) {
                if (countPro === employees.length) {
                    self.setState({ showLoader: false, employees: [] });
                    alert(error);
                }
            }
        }
    }

}

export default UploadEmployee;