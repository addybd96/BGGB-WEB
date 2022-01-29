import * as React from 'react'
import * as moment from 'moment';
import Doughnut from '../../component/common/Doughnut'

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { isEmpty } from '../../utils';
import { getAttendance } from '../../action/AttendanceActions'

const img1 = require('../../assets/images/attendance-dashboard.JPG')
const img2 = require('../../assets/images/attendance-dashboard1.JPG')

export default class PaydayContainer extends React.Component<any, any>{

    constructor(props: any) {
        super(props)
        this.state = {
            date: { value: moment().format("YYYY-MM-DD"), error: '' },
            attendance: [],
            chart1:
            {
                //Bring in data
                labels: ["Calendar Days"],
                datasets: [
                    {
                        label: "Days",
                        data: [31],
                        backgroundColor: '#23aae4'
                    }
                ]
            },
            chart2:
            {
                //Bring in data
                labels: ["Working Days"],
                datasets: [
                    {
                        label: "Days",
                        data: [36],
                        backgroundColor: '#59C9A5'
                    }
                ]
            },
            chart3:
            {
                //Bring in data
                labels: ["Week Offs", "Holiday"],
                datasets: [
                    {
                        label: ["Holidays"],
                        data: [4, 1],
                        backgroundColor: ['#F18805', '#D95D39']
                    }
                ]
            },
        }
    }

    componentDidMount() {
        getAttendance(moment().format("YYYY-MM-DD"), '', 1, 100).then((resp: any) => {

            if (Array.isArray(resp.result)) {

                let groups = [];
                let eSet = new Set();
                for (let row of resp.result) {
                    eSet.add(row.employeeId)
                }
                for (let row of Array.from(eSet)) {
                    let filtered = resp.result.filter((item: any) => item.employeeId === row)
                    groups.push(filtered)
                }
                this.setState({ attendance: groups })

            }
        })
    }

    public render() {
        const { attendance, date } = this.state
        return (
            <React.Fragment>
                <Header />
                <section>
                    <div className="col-lg-12 main-container">
                        <div className="fluid-container px-0">
                            <div className="row">
                                <Sidebar />
                                <div className="col-lg-11">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* <div className="card">
                                                <div className="card-header">
                                                    <div className="row">
                                                        <div className="col-lg-4 pt-2">
                                                            <b>Paid days</b>
                                                        </div>
                                                        <div className="col-lg-8 text-right">
                                                            <div className="row">
                                                                <div className="col-lg-3">
                                                                </div>
                                                                <div className="col-lg-3">
                                                                   
                                                                </div>
                                                                <div className="col-lg-2">
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <input value={date.value} name="date" type="date" className={isEmpty(date.error) ? "form-control" : "form-control is-invalid"} placeholder="Today Attendance" />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12  mt-3">
                                                        <div className="row">

                                                            <div className="col-lg-4">
                                                                <div className="card attendance-days">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <div className="count">31</div>
                                                                            <span className="label mb-3">Total Days</span>
                                                                            <div className="count">Jan</div>
                                                                            <span className="label">2020</span>
                                                                        </div>
                                                                        <div className="col-md-9">
                                                                            <Doughnut data={this.state.chart1} />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="col-lg-4">
                                                                <div className="card attendance-days">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <div className="count" style={{ color: '#59C9A5' }}>26</div>
                                                                            <span className="label mb-3">Working Days</span>
                                                                            <div className="count" style={{ color: '#59C9A5' }}>Jan</div>
                                                                            <span className="label">2020</span>
                                                                        </div>
                                                                        <div className="col-md-9">
                                                                            <Doughnut data={this.state.chart2} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-4">
                                                                <div className="card attendance-days">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <div className="count" style={{ color: '#F0A202' }}>5</div>
                                                                            <span className="label mb-3">Off Days</span>
                                                                            <div className="count" style={{ color: '#F0A202' }}>Jan</div>
                                                                            <span className="label">2020</span>
                                                                        </div>
                                                                        <div className="col-md-9">
                                                                            <Doughnut data={this.state.chart3} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>


                                        <div className="col-lg-12">
                                            <div className="card attendance-history mt-3 mb-3">
                                                <div className="card-header">
                                                    <b>Attendance List </b>
                                                </div>
                                                <div className="card-body">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <th>Emp Id</th>
                                                            <th>Name</th>
                                                            <th>Calendar Days</th>
                                                            <th>Week Off</th>
                                                            <th>Check-In(s)</th>
                                                            <th>Present</th>
                                                            <th>Absent</th>
                                                            <th>Leave(s)</th>
                                                            <th>Paid Days</th>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                attendance && attendance.map((item: any, index: number) => {
                                                                    return (<tr key={index}>
                                                                        <td><p>{item[0].employeeId}</p></td>
                                                                        <td><b>{item[0].name}</b></td>
                                                                        <td><b>31</b></td>
                                                                        <td><b>4</b></td>
                                                                        <td><b>{item.length}</b></td>
                                                                        <td><b className="present">22</b></td>
                                                                        <td><b className="leave">2</b></td>
                                                                        <td><b className="absent">3</b></td>
                                                                        <td><b className="paid-day">24</b></td>

                                                                    </tr>)
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment >
        )
    }
}