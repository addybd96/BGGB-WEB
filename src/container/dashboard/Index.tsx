import * as React from 'react';
import queryString from 'query-string';
import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import RegisterModal from './../../component/common/RegisterModal';
import AttendanceCard from './Attendance';
import LeavesCard from './Leaves'
import HolidayCard from './Holidays'
import BirthdayCard from './Birthdays'
import { getDateParts } from '../../utils';
import { registerStepTwo } from './../../action/AuthAction';


class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const parsed: any = queryString.parse(props.location.search);
        this.state = {
            date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            isModalOpen: false // parsed.nu && parsed.nu.length > 0
        }
    }

    componentDidMount() {

    }

    public render() {
        const { isModalOpen, clientId } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="row">
                                {/* <div className="col-12 col-lg-4">
                                    <AttendanceCard />
                                </div> */}
                                {
                                    this.renderTimelog()
                                }
                                {
                                    this.renderLeaveReport()
                                }
                                {
                                    this.renderAnnouncement()
                                }
                                {
                                    this.renderBirthday()
                                }
                                {
                                    this.renderHolidays()
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <RegisterModal
                    isModalOpen={isModalOpen}
                    updateRegistration={this._registerStepTwo}
                    clientId={clientId}
                    closeModal={this._onCloseModal}
                />
            </React.Fragment>
        )
    }

    renderTimelog = () => {
        return (
            <div className="col-12 col-lg-4">
                <div className="card attendance text-left">
                    <div className="card-header">
                        My Timelogs
                        </div>
                    <div className="card-body">
                        <div className="text-center mt-5">
                            <i className="fa fa-3x fa-clock-o"></i><br />
                            <small>No records found</small>
                        </div>
                        <div className="col-lg-12 mt-4 d-none">
                            <ul className="col-lg-12 weekly-attendance pr-0">
                                <li>
                                    <p>1</p><span>Sun</span>
                                </li>
                                <li>
                                    <p>2</p><span>Mon</span>
                                </li>
                                <li className="active">
                                    <p>3</p><span>Tue</span>
                                </li>
                                <li>
                                    <p>4</p><span>Wed</span>
                                </li>
                                <li>
                                    <p>5</p><span>Thu</span>
                                </li>
                                <li>
                                    <p>6</p><span>Fri</span>
                                </li>
                                <li>
                                    <p>7</p><span>Sat</span>
                                </li>
                            </ul>
                            <div className="row">
                                <div className="col-lg-6 attendance-time"><b>Check-In</b> &nbsp; &nbsp;9:30 AM</div>
                                <div className="col-lg-6 attendance-time text-right"><b>Check-Out</b> &nbsp; &nbsp;7:30PM</div>
                                <div className="col-lg-12 hours-left">
                                    <p>Total Hours:- <strong className="hrs">09:30 Hrs</strong></p>
                                    <span>13 Jan 2020</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    renderLeaveReport = () => {
        return (
            <div className="col-12 col-lg-4">
                <LeavesCard />
            </div>
        )
    }

    renderBirthday = () => {

        return (
            <div className="col-12 col-lg-4">
                <BirthdayCard />
            </div>
        )

        const { date } = this.state;
        const dt = getDateParts(date);
        return (
            <div className="col-12 col-lg-4 mt-3">
                <div className="card emp-leave-details text-left">
                    <div className="card-header">
                        Birthday's in {dt.monthName} {dt.year}
                    </div>
                    <div className="card-body">
                        <div className="text-center mt-5">
                            <i className="fa fa-3x fa-birthday-cake"></i><br />
                            <small>No records found</small>
                        </div>
                        <div className="col-lg-12 mt-2 d-none">
                            <div className="col-lg-12 pl-0 pr-0 mb-3">
                                <div className="row">
                                    <div className="col-6 col-lg-6 leave-date">
                                        <p className="mb-0">Nitesh Kumar</p>
                                        <span>IT Department</span>
                                    </div>
                                    <div className="col-6 col-lg-6 leave-status text-right"><span
                                        className="pending">1-Fab</span></div>
                                </div>
                            </div>

                            <div className="col-lg-12 pl-0 pr-0 mb-3">
                                <div className="row">
                                    <div className="col-6 col-lg-6 leave-date">
                                        <p className="mb-0">Ranjan Sharma</p>
                                        <span>IT Department</span>
                                    </div>
                                    <div className="col-6 col-lg-6 leave-status text-right">
                                        <span className="pending">5-Feb</span>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-12 pl-0 pr-0">
                                <div className="row">
                                    <div className="col-6 col-lg-6 leave-date">
                                        <p className="mb-0">Pankaj Kumar</p>
                                        <span>HR Department</span>
                                    </div>
                                    <div className="col-6 col-lg-6 leave-status text-right">
                                        <span className="pending">15-Fab</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderAnnouncement = () => {
        return (
            <div className="col-12 col-lg-4 mt-3">
                <div className="card emp-leave-details text-left">
                    <div className="card-header">
                        Latest Announcement
                    </div>
                    <div className="card-body">
                        <div className="text-center mt-5">
                            <i className="fa fa-3x fa-bullhorn"></i><br />
                            <small>No records found</small>
                        </div>
                        <div className="col-lg-12 mt-2 d-none">
                            <div className="col-lg-12 pl-0 pr-0 mb-3">
                                <div className="row">
                                    <div className="col-6 col-lg-6 leave-date">
                                        <p className="mb-0">Republic Day Celebration</p>
                                        <span>5:00 PM</span>
                                    </div>
                                    <div className="col-6 col-lg-6 leave-status text-right"><span
                                        className="pending">26-Jan</span></div>
                                </div>
                            </div>

                            <div className="col-lg-12 pl-0 pr-0 mb-3">
                                <div className="row">
                                    <div className="col-6 col-lg-6 leave-date">
                                        <p className="mb-0">Lohri Celebration</p>
                                        <span>5:00 PM</span>
                                    </div>
                                    <div className="col-6 col-lg-6 leave-status text-right"><span
                                        className="pending">13-Feb</span></div>
                                </div>
                            </div>

                            <div className="col-lg-12 pl-0 pr-0 mb-3">
                                <div className="row">
                                    <div className="col-6 col-lg-6 leave-date">
                                        <p className="mb-0">Holi Celebration</p>
                                        <span>6:00 PM</span>
                                    </div>
                                    <div className="col-6 col-lg-6 leave-status text-right"><span
                                        className="pending">20-Feb</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderHolidays = () => {
        const { date } = this.state;
        const dt = getDateParts(date);
        return (
            <div className="col-12 col-lg-4 mt-3">
                <HolidayCard />
            </div>
        )
    }

    _registerStepTwo = (reqObj: any) => {
        console.log("_registerStepTwo reqObj  => ", reqObj);
        registerStepTwo(reqObj).then((response: any) => {
            console.log("registerStepTwo response  => ", response);
            if (response.status) {
                this.setState({ isModalOpen: false });
            }
        });
    }

    _onCloseModal = () => {
        this.setState({ isModalOpen: false });
    }


}

export default Dashboard;
