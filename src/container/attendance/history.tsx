import * as React from 'react';

import { Link } from 'react-router-dom';

import Header from '../../component/common/Header'
import Sidebar from '../../component/common/Sidebar';
import AttendanceList from '../../component/attendance/list'

import { getAttendanceHistory, getAttendanceHistoryCount } from '../../action/AttendanceActions'
import { getDepartments } from '../../action/SettingsActions'
import { isEmpty } from '../../utils';
import CONSTANT from '../../constant';
import * as moment from 'moment';

class EmployeeAttendance extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            attendance: [
            ],
            page: 1,
            limit: 20,
            count: 0,
            fromDate: { value: '', error: '' },
            toDate: { value: '', error: '' },
            departments: [
                { name: 'Admin Department', code: '1' },
                { name: 'HR Department', code: '2' },
                { name: 'Sales Department', code: '3' },
                { name: 'IT Department', code: '4' },
            ]
        }
        this._onChange = this._onChange.bind(this)
        this.onTableChange = this.onTableChange.bind(this)
    }

    public componentDidMount() {

        // getDepartments().then((resp: any) => {
        //     if (Array.isArray(resp.result))
        //         this.setState({ departments: resp.result })
        // })
        let fromDate = moment().subtract(7, 'days').format("YYYY-MM-DD")
        let toDate = moment().format("YYYY-MM-DD")
        const { page, limit } = this.state;
        getAttendanceHistory(fromDate, toDate, page, limit).then((resp: any) => {
            if (Array.isArray(resp.result))
                this.setState({ attendance: resp.result })
        })
        getAttendanceHistoryCount(fromDate, toDate).then((resp: any) => {
            if (Array.isArray(resp.result))
                this.setState({ count: resp.result[0].count })
        })
    }

    public render() {
        // const { isModalOpen } = this.state;
        const { attendance, fromDate, toDate, page, limit, count } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="row">
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h5 className="heading-h1">Attendance History</h5>
                                        </div>

                                        {/* <div className="col-lg-6 text-right">
                                            <Link className="common-btn" to={CONSTANT.url.uploadAttendance}><i className="fa fa-upload"></i>&nbsp; Upload Attendance</Link>
                                        </div> */}
                                    </div>
                                    <div className="card mt-2">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-lg-4 pt-2">
                                                    <b>Search</b>
                                                </div>
                                                <div className="col-lg-8 text-right">
                                                    <div className="row">
                                                        <div className="col-lg-4"> &nbsp; </div>
                                                        <div className="col-lg-3">
                                                            <input value={fromDate.value} name="fromDate" type="date" className={isEmpty(fromDate.error) ? "form-control" : "form-control is-invalid"} onChange={this._onChange} />
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <input value={toDate.value} name="toDate" type="date" className={isEmpty(toDate.error) ? "form-control" : "form-control is-invalid"} onChange={this._onChange} />
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <a onClick={this.getFilteredAttendance} className="common-btn">Refresh</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <AttendanceList attendance={attendance} page={page} limit={limit} count={count} onTableChange={this.onTableChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    getFilteredAttendance = (e: any) => {
        e.preventDefault()
        const { fromDate, toDate } = this.state;
        if (this._validateForm()) {
            this._clearFormError();
            getAttendanceHistory(fromDate.value, toDate.value, 1, 20).then((resp: any) => {
                if (Array.isArray(resp.result))
                    this.setState({ attendance: resp.result })
            })

            getAttendanceHistoryCount(fromDate.value, toDate.value).then((resp: any) => {
                if (Array.isArray(resp.result))
                    this.setState({ count: resp.result[0].count })
            })
        }
    }

    onTableChange = (type: any, { page, sizePerPage }: any) => {
        const { fromDate, toDate } = this.state;
        getAttendanceHistory(fromDate.value, toDate.value, page, sizePerPage).then((resp: any) => {
            if (Array.isArray(resp.result))
                this.setState({ attendance: resp.result })
        })
    }

    handleDateChange = (e: any) => {
        this.setState({ currentDate: e.target.value })
    }

    handleDepartmentSelectChange = (e: any) => {
        this.setState({ department: e.target.value })
    }

    private _onChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: { ...this.state[name], value } }, callback);
    }
    private _setError(name: string, error: string) {
        this.setState({ [name]: { ...this.state[name], error } });
    }

    private _validateForm() {
        const { fromDate, toDate } = this.state;

        let status = true;
        if (isEmpty(fromDate.value)) {
            this._setError('fromDate', 'error');
            status = false;
        }

        if (isEmpty(toDate.value)) {
            this._setError('toDate', 'error');
            status = false;
        }
        return status;
    }
    private _clearFormError() {
        this._setError('toDate', '')
        this._setError('fromDate', '')
    }

    renderDepartmentSelect = () => {
        return (<select className="form-control" onChange={this.handleDepartmentSelectChange}>
            <React.Fragment>
                <option>--Select--</option>
                {this.state.departments.map((dep: any, dIndex: number) => {
                    return (<option key={dIndex} value={dep.code}>{dep.name}</option>)
                })}
            </React.Fragment>
        </select>)
    }

}

export default EmployeeAttendance;