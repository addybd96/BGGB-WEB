import * as React from 'react';
import moment from 'moment';
import Shimmer from '../../component/common/Shimmer';
import { getTodaysAttendance, checkinAttendance, checkOutAttendance } from './../../action/EmployeeAttendanceActions';
import { getDateParts } from '../../utils';

class ComponentName extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            attendanceDetail: undefined,
            expOutTime: '-'
        }
    }

    componentDidMount() {
        getTodaysAttendance().then((res: any) => {
            console.log(res)
            this.setState({ attendanceDetail: res.result });
            if (res.result !== null && res.result.outTime === null) {
                let counter = setInterval(this.attendanceTimer, 1000);
            }
        });
    }

    render() {
        const { attendanceDetail, settings, expOutTime } = this.state;
        const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
        const dt = getDateParts(date);

        return (
            <div className="card attendance text-left" >
                <div className="card-header">
                    Today's Attendance
                    </div>
                <div className="card-body">
                    {
                        attendanceDetail === undefined && <Shimmer />
                    }
                    {
                        attendanceDetail !== undefined && <React.Fragment>
                            <div className="row">
                                <div className="col-md-12">
                                    Date: <strong>{dt.date} {dt.monthName} {dt.year}</strong><br />
                                    Check in time: {attendanceDetail !== null ? attendanceDetail.inTime : '-'}<br />
                                    Check out time: {attendanceDetail !== null ? attendanceDetail.outTime : '-'}<br />
                                    Time remaining: <strong>{expOutTime}</strong>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    {
                                        attendanceDetail === null && <button onClick={this.onCheckIn} className="btn btn-success btn-sm btn-block">Check in</button>
                                    }
                                    {
                                        attendanceDetail !== null && attendanceDetail.outTime === null && <button onClick={this.onCheckOut} className="btn btn-danger btn-sm btn-block">Check out</button>
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    }

                </div>
            </div>
        );
    }

    onCheckIn = () => {
        const areYouSure = window.confirm('Are you sure, you want to mark your attendance?');
        if (areYouSure) {
            const model = {
                source: 'web',
                category: 'office'
            };
            checkinAttendance(model).then((res: any) => {
                this.setState({ attendanceDetail: res.result });
                let counter = setInterval(this.attendanceTimer, 1000);
            })
        }
    }

    onCheckOut = () => {
        const areYouSure = window.confirm('Are you sure, you want to mark your attendance?');
        if (areYouSure) {
            const model = {
                source: 'web',
                category: 'office'
            };
            checkOutAttendance(model).then((res: any) => {
                console.log('checkout resp', res)
                this.setState({ attendanceDetail: res.result });
                let counter = setInterval(this.attendanceTimer, 1000);
            })
        }
    }

    attendanceTimer = () => {
        const { attendanceDetail } = this.state;
        const inTime = attendanceDetail.inTime;

        const mInTime = moment(inTime, 'HH:mm:ss');
        const mOutTime = moment(inTime, 'HH:mm:ss');
        mOutTime.add(9, 'hours');
        mOutTime.add(30, 'minutes');
        mOutTime.add(0, 'seconds');
        const mCurrTime = moment();

        const diff = moment.duration(mOutTime.diff(mCurrTime));
        // const expOutTime = `${diff.hours()}:${diff.minutes()}:${diff.seconds()}`;
        const expOutTime = moment.utc(diff._milliseconds).format('HH:mm:ss');
        this.setState({
            expOutTime
        });
    }
}

export default ComponentName;