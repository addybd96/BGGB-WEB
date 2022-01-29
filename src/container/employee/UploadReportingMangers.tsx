import * as React from 'react';
import XLSX from 'xlsx'
import { UncontrolledTooltip } from 'reactstrap'

import Header from '../../component/common/Header'
import Sidebar from '../../component/common/Sidebar';

import { employeeReportingMangerUpload } from './../../action/EmployeeAction';
import { isValidDateFormat } from './../../utils'
import ProgressLoader from '../../component/common/ProgressLoader';
import { setInterval } from 'timers';
import CONSTANT from '../../constant'

const sampleFile = require('./../../assets/excel/employee-mgr.xlsx');

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
                            <div className="card mt-3">
                                <div className="card-header">
                                    <b>Upload Employee Step 2</b>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input className="form-control p-1" type="file" onChange={this.handleFileOpen} />
                                            <small><a download={true} href={sampleFile}>Click here to download a sample file</a></small>
                                        </div>
                                    </div>
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
                                                            <th scope="col">Reporting Manager Code</th>
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
                {item['reportingManager'] == '' || item['reportingManager'] == undefined ? <td id={`reportingManager${index}`} className="table-danger">{item['reportingManager']} <UncontrolledTooltip target={`reportingManager${index}`}>Check employee ID!</UncontrolledTooltip></td> : <td>{item['reportingManager']}</td>}
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

            if (item['reportingManger'] == '' || item['reportingManager'] == undefined) {
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
                    employeeCode: item['empCode'],
                    reportingManager: item['reportingManager'],
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

                employeeReportingMangerUpload({ xl: data }).then((response: any) => {
                    //console.log("count  => ", count);
                    // console.log("employeeslen  => ", employees.length);
                    // console.log('bulk upload response', response);
                });

                if (countPro === employees.length) {
                    self.setState({ showLoader: false, employees: [] });
                    alert(`Reporting managers were updated on employees successfully`);
                    this.props.history.push(CONSTANT.url.employeeList)
                }
            } catch (error) {
                console.log(error);
                countPro += 1;
                if (countPro === employees.length) {
                    self.setState({ showLoader: false, employees: [] });
                    alert(error);
                }
            }
        }
    }

}

export default UploadEmployee;