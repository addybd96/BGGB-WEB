import * as React from 'react';
import XLSX from 'xlsx'
import { UncontrolledTooltip } from 'reactstrap'

import Header from '../../component/common/Header'
import Sidebar from '../../component/common/Sidebar';

import { employeeBulkUpload } from './../../action/EmployeeAction';
import { isValidDateFormat } from './../../utils'

import { addLeaveBalanceXL } from './../../action/LeaveActions'
import ProgressLoader from '../../component/common/ProgressLoader';
import { setInterval } from 'timers';
import { getLeaveTypeList } from './../../action/SettingsActions'
import CONSTANT from '../../constant'


const sampleFile = require('./../../assets/excel/employee-leave-balance-sample.xlsx');

class BulkUpload extends React.Component<any, any> {
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

    componentDidMount() {
        getLeaveTypeList(1, 30).then((res: any) => {
            console.log(res.result)
            this.setState({ typeList: res.result })
        })
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
                                    Upload leave balance
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
                                                            <th className="text-center" scope="col">Employee Code</th>
                                                            <th className="text-center" scope="col">Year</th>
                                                            <th className="text-center" scope="col">CL</th>
                                                            <th className="text-center" scope="col">PL</th>
                                                            <th className="text-center" scope="col">SL</th>
                                                            <th className="text-center" scope="col">UCL</th>
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
        const self = this
        reader.onload = function (e: any) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
            console.log("json  => ", json);
            // var t_buff = json.map((item: any)=> {
            //     var fi = self.state.typeList.filter((lt:any)=> item.leaveType === lt.id)
            //     return {...item, leaveTypeName: fi[0].name}
            // })
            context.setState({ employees: json, totalCount: json.length }, () => {
                //context.onUpload({});
            })
        };
        reader.readAsArrayBuffer(f);
    }

    renderEmployeeTable = () => {
        return this.state.employees.map((item: any, index: number) => {
            return (<tr key={index}>
                {item['empCode'] === '' || item['empCode'] === undefined ? <td id={`empCode_${index}`} className="table-danger text-center">{item['empCode']} <UncontrolledTooltip target={`empCode_${index}`}>Check employee code!</UncontrolledTooltip></td> : <td className="text-center" >{item['empCode']}</td>}
                {item['year'] === '' || item['year'] === undefined ? <td id={`year_${index}`} className="table-danger text-center">{item['year']} <UncontrolledTooltip target={`year_${index}`}>Check year!</UncontrolledTooltip></td> : <td className="text-center" >{item['year']}</td>}
            {item['cl'] === '' || item['cl'] === undefined ? <td id={`cl_${index}`} className="table-danger text-center">{item['cl']} <UncontrolledTooltip target={`cl_${index}`}>Check Leave Type! {item['cl']}</UncontrolledTooltip></td> : <td className="text-center" >{Math.round(item['cl'])}</td>}
            {item['pl'] === '' || item['pl'] === undefined ? <td id={`pl_${index}`} className="table-danger text-center">{item['pl']} <UncontrolledTooltip target={`pl_${index}`}>Check Leave Type! {item['ps']}</UncontrolledTooltip></td> : <td className="text-center" >{Math.round(item['pl'])}</td>}
            {item['sl'] === '' || item['sl'] === undefined ? <td id={`sl_${index}`} className="table-danger text-center">{item['sl']} <UncontrolledTooltip target={`sl_${index}`}>Check Leave Type! {item['sl']}</UncontrolledTooltip></td> : <td className="text-center" >{Math.round(item['sl'])}</td>}
            {item['ucl'] === '' || item['ucl'] === undefined ? <td id={`ucl_${index}`} className="table-danger text-center">{item['ucl']} <UncontrolledTooltip target={`ucl_${index}`}>Check Leave Type! {item['ucl']}</UncontrolledTooltip></td> : <td className="text-center" >{Math.round(item['ucl'])}</td>}
            </tr>)
        })
    }

    onValidateExcelData = () => {
        let valid = true;

        for (var item of this.state.employees) {

            if (item['empCode'] === '' || item['empCode'] === undefined) {
                valid = false;
                break;
            }

            if (item['year'] === '' || item['year'] === undefined) {
                valid = false;
                break;
            }

            if (item['cl'] === '' || item['cl'] === undefined) {
                valid = false;
                break;
            }

            if (item['pl'] === '' || item['pl'] === undefined) {
                valid = false;
                break;
            }

            if (item['sl'] === '' || item['sl'] === undefined) {
                valid = false;
                break;
            }

            if (item['ucl'] === '' || item['ucl'] === undefined) {
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
                    cl: Math.round(item['cl']),
                    pl: Math.round(item['pl']),
                    sl: Math.round(item['sl']),
                    ucl: Math.round(item['ucl']),
                    year: item['year'],
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

                addLeaveBalanceXL(data).then((response: any) => {
                    //console.log("count  => ", count);
                    // console.log("employeeslen  => ", employees.length);
                    // console.log('bulk upload response', response);
                });

                if (countPro === employees.length) {
                    self.setState({ showLoader: false, employees: [] });
                    //alert(`Employees were added successfully`);
                    // this.props.history.push(CONSTANT.url.uploadEmployeeStep2)
                }
            } catch (error) {
                console.log(error);
                countPro += 1;
                if (countPro === employees.length) {
                    self.setState({ showLoader: false, employees: [] });
                    alert(`Employees were added successfully`);
                }
            }
        }
    }

}

export default BulkUpload;