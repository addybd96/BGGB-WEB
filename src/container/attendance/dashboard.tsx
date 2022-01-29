import * as React from 'react';
import * as moment from 'moment'
import { Link } from 'react-router-dom';

import Header from '../../component/common/Header'
import Sidebar from '../../component/common/Sidebar';
import AttendanceList from '../../component/attendance/list'
import Doughnut from '../../component/common/Doughnut'

import {
    getAttendance, getAttendanceCount, getAttendanceDashboardEmpReport,
    getAttendanceReport, getArrivalPieData, getArrivalTrendsData,
} from '../../action/AttendanceActions'
import { getDepartments } from '../../action/SettingsActions'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { getEmployeeCount } from '../../action/EmployeeAction'
import { isEmpty } from '../../utils';

const attendance1 = require('../../assets/images/attendance1.png')
const attendance2 = require('../../assets/images/attendance2.png')
const attendance3 = require('../../assets/images/attendance3.png')
const attendance4 = require('../../assets/images/attendance4.png')
const tab1 = require('../../assets/images/tab1.png')
const tab2 = require('../../assets/images/tab2.png')
const tab3 = require('../../assets/images/tab4.png')

class Attendance extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeView: 'graph',
            empCount: 0,
            empPresent: 0,
            attendance: [
            ],
            empAtt: [],
            page: 1,
            limit: 20,
            search: { value: '', error: '' },
            date: { value: moment().format("YYYY-MM-DD"), error: '' },
            departments: [
                { name: 'Admin Department', code: '1' },
                { name: 'HR Department', code: '2' },
                { name: 'Sales Department', code: '3' },
                { name: 'IT Department', code: '4' },
            ]
        }
        this.onTableChange = this.onTableChange.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    public componentDidMount() {
        const { date, page, limit } = this.state
        this.loadData(date.value, page, limit)
    }

    public render() {
        // const { isModalOpen } = this.state;
        let columns = [
            {
                dataField: 'employeeId',
                text: 'Employee Code',
                style: {
                    fontSize: '14px',
                    textAlign: 'center'
                },
                headerStyle: {
                    width: '200px',
                    textAlign: 'center'
                }
            },
            {
                dataField: 'name',
                text: 'Name',
                style: {
                    fontSize: '14px'
                }
            },
            {
                dataField: 'checkIns',
                text: 'Total Check-In(s)',
                style: {
                    fontSize: '14px',
                    textAlign: 'center'
                },
                headerStyle: {
                    width: '200px',
                    textAlign: 'center'
                }
            },
            {
                dataField: 'checkOuts',
                text: 'Total Check-Out(s)',
                style: {
                    fontSize: '14px',
                    textAlign: 'center'
                },
                headerStyle: {
                    width: '200px',
                    textAlign: 'center'
                }
            },
            {
                dataField: 'totalDuration',
                text: 'Total Duration',
                style: (cell: any, row: any, rowIndex: any, colIndex: any) => {

                    if (cell !== 'NA')
                        return {
                            fontSize: '14px',
                            color: 'green',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }
                    else
                        return {
                            fontSize: '14px',
                            color: 'red',
                            textAlign: 'center'
                        }
                },
                headerStyle: {
                    width: '160px',
                    textAlign: 'center'
                }
            },
            {
                dataField: 'status',
                text: 'Status',
                style: (cell: any, row: any, rowIndex: any, colIndex: any) => {

                    if (cell == 'Present')
                        return {
                            fontSize: '14px',
                            color: 'green',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }
                    else
                        return {
                            fontSize: '14px',
                            color: 'red',
                            textAlign: 'center'
                        }
                },
                headerStyle: {
                    width: '100px',
                    textAlign: 'center'
                }
            },

        ]
        const rowStyle = (row: any, rowIndex: any) => {
            if (rowIndex % 2 === 0) {
                return {
                    backgroundColor: '#efefef'
                };
            }
            return {
                backgroundColor: '#ffffff'
            };
        }
        const { date, empCount, empPresent, empAtt, page, limit, activeView } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <div className="row">
                                <div className="col-lg-12 mt-1 pl-0 pr-0 card">
                                    <div className="col-lg-12 common-tab">
                                        <div className="col-lg-6 tab-label" data-name="graph" onClick={this.changeView.bind(this, 'graph')}><a href="#"><img src={tab1} />Graph View</a></div>
                                        <div className="col-lg-6  tab-label" onClick={this.changeView.bind(this, 'list')}><a href="#"><img src={tab2} />List View</a></div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="card p-1">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-lg-4 pt-1">
                                                    <b>Daily Attendance Dashboard</b>
                                                </div>
                                                <div className="col-lg-8 text-right">
                                                    <div className="row">

                                                        <div className="col-lg-7">
                                                        </div>
                                                        <div className="col-lg-1 text-right">
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <input value={date.value} name="date" type="date" className={isEmpty(date.error) ? "form-control" : "form-control is-invalid"} placeholder="Today Attendance" onChange={this.handleDateChange} />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {activeView === 'graph'?<div className="row">
                                            <div className="col-lg-3  mt-4">
                                                <div className="card attendance-count total-emp">
                                                    <div className="row">
                                                        <div className="col-lg-8">
                                                            <div className="count">{empCount}</div>
                                                            <div className="label">Total Employee</div>
                                                        </div>
                                                        <div className="col-lg-4 icon">
                                                            <img src={attendance1} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-3  mt-4">
                                                <div className="card attendance-count total-present" style={{ backgroundColor: '#cddc39' }}>
                                                    <div className="row">
                                                        <div className="col-lg-8">
                                                            <div className="count">{empPresent}</div>
                                                            <div className="label">Present</div>
                                                        </div>
                                                        <div className="col-lg-4 icon">
                                                            <img src={attendance2} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-3  mt-4">
                                                <div className="card attendance-count total-absent">
                                                    <div className="row">
                                                        <div className="col-lg-8">
                                                            <div className="count">{empCount - empPresent}</div>
                                                            <div className="label">Absent</div>
                                                        </div>
                                                        <div className="col-lg-4 icon">
                                                            <img src={attendance3} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-3  mt-4">
                                                <div className="card attendance-count total-leaves">
                                                    <div className="row">
                                                        <div className="col-lg-8">
                                                            <div className="count">13</div>
                                                            <div className="label">Leaves</div>
                                                        </div>
                                                        <div className="col-lg-4 icon">
                                                            <img src={attendance4} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mt-4">
                                                <div className="card attendance-statistics">
                                                    <div className="card-header">
                                                        <b>In Time Statistics</b>
                                                    </div>
                                                    <div className="col-lg-12 text-center pb-4">
                                                        {this.state.pie ? <Doughnut data={this.state.pie} type="pie" /> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mt-4">
                                                <div className="card attendance-statistics" >
                                                    <div className="card-header">
                                                        <b>Today's Trend</b>
                                                    </div>
                                                    <div className="col-lg-12 pb-5 text-center">
                                                        {this.state.line ? <Doughnut data={this.state.line} type="line" /> : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>:empAtt.length > 0 !== undefined && <PaginationProvider
                                        pagination={
                                            paginationFactory({
                                                custom: true,
                                                page,
                                                sizePerPage: limit,
                                                totalSize: empCount,
                                                showTotal: true,
                                                pageStartIndex: 1,
                                                firstPageText: 'First',
                                                prePageText: 'Back',
                                                nextPageText: 'Next',
                                                lastPageText: 'Last',
                                                nextPageTitle: 'First page',
                                                prePageTitle: 'Pre page',
                                                firstPageTitle: 'Next page',
                                                lastPageTitle: 'Last page',
                                                withFirstAndLast: true,
                                                alwaysShowAllBtns: true
                                            })
                                        }>
                                        {
                                            ({
                                                paginationProps,
                                                paginationTableProps
                                            }: any) => (
                                                    <div>
                                                        <BootstrapTable
                                                            remote
                                                            keyField="id"
                                                            data={empAtt}
                                                            columns={columns}
                                                            rowStyle={rowStyle}
                                                            onTableChange={this.onTableChange}
                                                            {...paginationTableProps}
                                                        />
                                                        <div>
                                                            <PaginationListStandalone
                                                                {...paginationProps}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </PaginationProvider>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    changeView = (name:any) => {
        this.setState({activeView: name})
    }

    loadData = (date: any, page: any, limit: any) => {
        getAttendanceReport(moment(date).format("YYYY-MM-DD")).then((resp: any) => {
            if (Array.isArray(resp.result)) {
                let groups = [];
                let eSet = new Set();
                for (let row of resp.result) {
                    eSet.add(row.userId)
                }
                for (let row of Array.from(eSet)) {
                    let filtered = resp.result.filter((item: any) => item.userId === row)
                    groups.push(filtered)
                }
                var hours = []
                for (let g of groups) {
                    hours.push(g[0].inTime)
                }

                hours.sort((a: any, b: any) => moment(a, "HH:mm:ss") - moment(b, "HH:mm:ss"))
                this.setState({ attendance: resp.result, empPresent: groups.length })
            }
        })

        getEmployeeCount().then((resp: any) => {
            if (Array.isArray(resp.result))
                this.setState({ empCount: resp.result[0].count })
        })

        getArrivalPieData(moment(date).format("YYYY-MM-DD")).then((resp: any) => {
            let pieData = {
                labels: ["Before 09:00 AM", "09:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "After 11:00 AM"],
                datasets: [
                    {
                        label: ["Arrival Stats"],
                        data: resp.result,
                        backgroundColor: ['#69f0ae', '#40c4ff', '#ffc400', '#ff4081']
                    }
                ]
            }
            if (Array.isArray(resp.result))
                this.setState({ pie: pieData })
        })

        getAttendanceDashboardEmpReport(moment(date).format("YYYY-MM-DD"), page, limit).then((resp: any) => {
            if (resp.result) {
                let employees = resp.result.employees
                let attendance = resp.result.attendance
                let att = employees.map((emp: any, index: number) => {
                    let at = attendance.filter((a: any) => a.userId === emp.userId)
                    let ci = 0;
                    let co = 0;
                    at.forEach((a: any) => {
                        ci++;
                        if (a.outTime)
                            co++;
                    })

                    at = at.sort((a: any, b: any) => moment(a.inTime, "HH:mm:ss") - moment(b.inTime, "HH:mm:ss"))

                    let totalDuration
                    let status

                    if (at[0]) {
                        status = 'Present'
                        if (ci === co) {
                            let inTime = moment(at[0].inTime, "HH:mm:ss")
                            let outTime = moment(at[at.length - 1].outTime, "HH:mm:ss")

                            let duration = moment.duration(outTime.diff(inTime));
                            totalDuration = `${parseInt(duration.asHours())}:${parseInt(duration.asMinutes()) % 60}`
                        }
                        else {
                            totalDuration = "NA"
                        }
                    }
                    else {
                        status = 'Absent'
                        totalDuration = "NA"
                    }

                    return { ...emp, checkIns: ci, checkOuts: co, totalDuration, status }
                })
                this.setState({ empAtt: att, page, limit })
            }
        })

        getArrivalTrendsData(moment(date).format("YYYY-MM-DD")).then((resp: any) => {
            let today = moment(date);
            today.set({
                hour: 8,
                minute: 0,
            })
            let labels = [];

            for (var i = 0; i < 12; i++) {
                labels.push(today.format("HH:mm"))
                today.add(15, 'minutes')

            }

            let pieData = {
                labels,
                backgroundColor: '#cddc39',
                datasets: [
                    {
                        label: ["Arrival Trends"],
                        data: resp.result,
                        backgroundColor: '#cddc39',
                        fill: true
                    }
                ]
            }
            if (Array.isArray(resp.result))
                this.setState({ line: pieData })
        })
    }

    onTableChange = (type: any, { page, sizePerPage }: any) => {
        const { date, search } = this.state;
        this.loadData(date.value, page, sizePerPage)
    }

    handleDateChange = (e: any) => {
        const { date, page, limit } = this.state
        this.setState({ date: { ...this.state.date, value: e.target.value } }, () => this.loadData(this.state.date.value, 1, 20))
    }

    handleDepartmentSelectChange = (e: any) => {
        this.setState({ department: e.target.value })
    }


    // renderDepartmentSelect = () => {
    //     return (<select className="form-control" onChange={this.handleDepartmentSelectChange}>
    //         <React.Fragment>
    //             <option>--Select--</option>
    //             {this.state.departments.map((dep: any, dIndex: number) => {
    //                 return (<option key={dIndex} value={dep.code}>{dep.name}</option>)
    //             })}
    //         </React.Fragment>
    //     </select>)
    // }

}

export default Attendance;