import * as React from 'react';
import XLSX from 'xlsx'
import { UncontrolledTooltip } from 'reactstrap'

import Header from '../../component/common/Header'
import Sidebar from '../../component/common/Sidebar';

import { employeeBulkUpload } from './../../action/EmployeeAction';
import { isValidDateFormat } from './../../utils'

import {addHolidayXL} from '../../action/CompanyBranchCalendar';
import ProgressLoader from '../../component/common/ProgressLoader';
import { setInterval } from 'timers';
import { getLeaveTypeList } from './../../action/SettingsActions'
import CONSTANT from '../../constant'


const sampleFile = require('./../../assets/excel/calendar-sample.xlsx');

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

    componentDidMount(){
        getLeaveTypeList(1, 30).then((res: any)=> {
            this.setState({typeList: res.result})
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
                                    Upload Calendar
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
                                                            <th className="text-center" scope="col">Date</th>
                                                            <th className="text-center" scope="col">Type</th>
                                                            <th className="text-center" scope="col">Name</th>
                                                            <th className="text-center" scope="col">Description</th>
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
            
            context.setState({ employees: json, totalCount: json.length }, () => {
                //context.onUpload({});
            })
        };
        reader.readAsArrayBuffer(f);
    }

    renderEmployeeTable = () => {
        return this.state.employees.map((item: any, index: number) => {
            return (<tr key={index}>
                {item['date'] == '' || item['date'] == undefined ? <td id={`date_${index}`} className="table-danger text-center">{item['date']} <UncontrolledTooltip target={`date_${index}`}>Check date!</UncontrolledTooltip></td> : <td className="text-center" >{item['date']}</td>}
                {item['type'] == '' || item['type'] == undefined ? <td id={`type_${index}`} className="table-danger text-center">{item['type']} <UncontrolledTooltip target={`type_${index}`}>Check Type!</UncontrolledTooltip></td> : <td className="text-center" >{item['type']}</td>}
                {item['name'] == '' || item['name'] == undefined ? <td id={`name_${index}`} className="table-danger text-center">{item['name']} <UncontrolledTooltip target={`name_${index}`}>Check name!</UncontrolledTooltip></td> : <td className="text-center" >{item['name']}</td>}
                {item['description'] == '' || item['description'] == undefined ? <td id={`description_${index}`} className="table-danger text-center">{item['description']} <UncontrolledTooltip target={`description_${index}`}>Check description!</UncontrolledTooltip></td> : <td className="text-center" >{item['description']}</td>}
            </tr>)
        })
    }

    onValidateExcelData = () => {
        let valid = true;

        for (var item of this.state.employees) {

            if (item['date'] == '' || item['date'] == undefined) {
                valid = false;
                break;
            }

            if (item['type'] == '' || item['type'] == undefined) {
                valid = false;
                break;
            }

            if(item['type'] === 'HD')
            {
                if (item['name'] == '' || item['name'] == undefined) {
                    valid = false;
                    break;
                }
    
                if (item['description'] == '' || item['description'] == undefined) {
                    valid = false;
                    break;
                }
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
                    date: item['date'],
                    type: item['type'],
                    name: item['name'],
                    description: item['description'],
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

                addHolidayXL(data).then((response: any) => {
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