import * as React from 'react'
import * as XLSX from 'xlsx'
import { UncontrolledTooltip } from 'reactstrap'
import CONSTANT from '../../constant'

import Header from '../../component/common/Header'
import Sidebar from '../../component/common/Sidebar';
import Loader from '../../component/common/Loader'

import { isValid24HourTime, isValidDate } from '../../utils'
import { addAttendanceExcel } from '../../action/AttendanceActions'
const sample_ = require('../../assets/excel/attendance_sample.xlsx')

export default class UploadAttendance extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            attendance: [],
            showLoader: false,
        }

        this.onUpload = this.onUpload.bind(this)
    }

    public render() {
        const { showLoader } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <b>Upload Attendance</b>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label >Upload Attendance Sheet </label>
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <input type="file" className="form-control p-1" onChange={this.handleFileOpen} />
                                                            <a className="mt-2" href={sample_}>Click here to download a sample file</a>
                                                        </div>

                                                        <div className="col-lg-12 pr-0 pl-0">
                                                            <a href="#" onClick={this.onUpload} className="col-lg-2 pull-right">
                                                                <button className="btn primary-control common-btn">Submit</button>

                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {this.state.attendance.length > 0 ? <div className="table-responsive">
                                                <table className="table table-striped mb-0 mt-5">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Employee Id</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Attendance Type</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderAttendanceTable()}
                                                    </tbody>
                                                </table>
                                            </div> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showLoader && <Loader />}
            </React.Fragment >
        )
    }

    renderAttendanceTable = () => {
        return this.state.attendance.map((item: any, index: number) => {
            return (<tr key={index}>
                {item['Employee ID'] === '' || item['Employee ID'] === undefined ? <td id={`emp_id_${index}`} className="table-danger">{item['Employee ID']} <UncontrolledTooltip target={`emp_id_${index}`}>Check employee ID!</UncontrolledTooltip></td> : <td>{item['Employee ID']}</td>}
                {item['Date'] === '' || item['Date'] === undefined || !isValidDate(item['Date']) ? (item['Date'] === '0:0' && item['Date'] === '0:0') ? <td className="table-warning">{item['Date']}</td> : <td id={`in_date_${index}`} className="table-danger">{item['Date']}<UncontrolledTooltip target={`in_date_${index}`}>Date invalid!</UncontrolledTooltip></td> : <td>{item['Date']}</td>}
                {item['Attendance Type'] === '' || item['Attendance Type'] === undefined ? <td id={`emp_id_${index}`} className="table-danger">{item['Attendance Type']} <UncontrolledTooltip target={`emp_id_${index}`}>Check Attendance Type!</UncontrolledTooltip></td> : <td>{item['Attendance Type']}</td>}
                {item['Leave Type'] === '' || item['Leave Type'] === undefined ? <td id={`emp_id_${index}`} className="table-danger">{item['Leave Type']} <UncontrolledTooltip target={`emp_id_${index}`}>Check Leave Type!</UncontrolledTooltip></td> : <td>{item['Leave Type']}</td>}
            </tr>)
        })
    }

    onUpload = (e: any) => {
        e.preventDefault()
        let valid = true;
        for (var item of this.state.attendance) {
            if (item['Employee ID'] === '' || item['Employee ID'] === undefined) {
                valid = false;
                break;
            }
            if (item['Date'] === '' || item['Date'] === undefined) {
                valid = false;
                break;
            }
            if (item['Attendance Type'] === '' || item['Attendance Type'] === undefined) {
                valid = false;
                break;
            }
            if (item['Leave Type'] === '' || item['Leave Type'] === undefined) {
                valid = false;
                break;
            }

        }

        if (valid) {
            const payload = this.state.attendance.map((item: any) => ({
                date: item['Date'],
                employeeId: item['Employee ID'],
                type: item['Attendance Type'],
                leaveTypeId: item['Leave Type'],
            }))
            this.setState({ showLoader: true })
            addAttendanceExcel({ attendance: payload }).then((resp: any) => {
                if (resp && resp.status) {
                    this.setState({ showLoader: false })
                    this.props.history.push(CONSTANT.url.attendanceReport)
                    alert(resp.result)
                }
                else {
                    this.setState({ showLoader: false })
                    alert(resp.error)
                }
            })
        }
    }

    handleFileOpen = (e: any) => {
        var context = this;
        var files = e.target.files, f = files[0];
        var reader = new FileReader();
        reader.onload = function (e: any) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
            context.setState({ attendance: json }, () => {
                //context.onUpload({});
            })
        };
        reader.readAsArrayBuffer(f);
    }
}