import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';

const leave1 = require('../../assets/images/leave-action1.png')
const leave2 = require('../../assets/images/leave-action2.png')
const leave3 = require('../../assets/images/leave-action3.png')
const leave4 = require('../../assets/images/leave-action4.png')
const leave5 = require('../../assets/images/leave-action5.png')
const leave6 = require('../../assets/images/leave-action6.png')

export default class LeaveManagement extends React.Component<any, any>
{
    public render() {
        return (
            <React.Fragment>
                <Header />
                <section>
                    <div className="col-lg-12 main-container">
                        <div className="fluid-container px-0">
                            <div className="row">
                                <Sidebar />

                                <div className="col-lg-11  mt-3">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="monthly-cycle completed-payroll">
                                                <div className="month">Jan</div>
                                                <div className="year">2020</div>
                                                <div className="status">COMPLETED</div>
                                            </div>
                                            <div className="monthly-cycle completed-payroll">
                                                <div className="month">Feb</div>
                                                <div className="year">2020</div>
                                                <div className="status">COMPLETED</div>
                                            </div>
                                            <div className="monthly-cycle completed-payroll">
                                                <div className="month">Mar</div>
                                                <div className="year">2020</div>
                                                <div className="status">COMPLETED</div>
                                            </div>
                                            <div className="monthly-cycle pending-payroll">
                                                <div className="month">Apr</div>
                                                <div className="year">2020</div>
                                                <div className="status">PENDING</div>
                                            </div>
                                            <div className="monthly-cycle current-payroll">
                                                <div className="month">May</div>
                                                <div className="year">2020</div>
                                                <div className="status">CURRENT</div>
                                            </div>
                                            <div className="monthly-cycle upcoming-payroll">
                                                <div className="month">Jun</div>
                                                <div className="year">2020</div>
                                                <div className="status">UP COMING</div>
                                            </div>
                                            <div className="monthly-cycle upcoming-payroll">
                                                <div className="month">Jul</div>
                                                <div className="year">2020</div>
                                                <div className="status">UP COMING</div>
                                            </div>
                                            <div className="monthly-cycle upcoming-payroll">
                                                <div className="month">Aug</div>
                                                <div className="year">2020</div>
                                                <div className="status">UP COMING</div>
                                            </div>
                                            <div className="monthly-cycle upcoming-payroll">
                                                <div className="month">Sep</div>
                                                <div className="year">2020</div>
                                                <div className="status">UP COMING</div>
                                            </div>
                                            <div className="monthly-cycle upcoming-payroll">
                                                <div className="month">Oct</div>
                                                <div className="year">2020</div>
                                                <div className="status">UP COMING</div>
                                            </div>
                                            <div className="monthly-cycle upcoming-payroll">
                                                <div className="month">Nov</div>
                                                <div className="year">2020</div>
                                                <div className="status">UP COMING</div>
                                            </div>
                                            <div className="monthly-cycle upcoming-payroll">
                                                <div className="month">Dec</div>
                                                <div className="year">2020</div>
                                                <div className="status">UP COMING</div>
                                            </div>
                                            <div className="current-state"></div>

                                            <div className="col-lg-12 card  payroll-container mt-3">
                                                <div className="row">
                                                    <div className="col-lg-3 payroll-details">
                                                        <b>JULY Payroll</b>
                                                        <span>Feb 27 - Mar 26 2015<br />
                                                            29 CALENDER DAYS</span>
                                                    </div>
                                                    <div className="col-lg-3 payroll-details">
                                                        <div className="label">TOTAL EMPLOYEES</div>
                                                        <div className="counts">126 <small><span className="green">+2</span> <span className="red">-1</span></small>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 payroll-details">
                                                        <div className="label">WORKING DAYS</div>
                                                        <div className="counts">23</div>
                                                    </div>
                                                    <div className="col-lg-3 payroll-details">
                                                        <div className="label">PAYROLL PROCESSED</div>
                                                        <div className="counts">121 / <small>126</small></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-12 card  payroll-container mt-3">
                                                <div className="row">
                                                    <div className="col-lg-3 payroll-details">
                                                        <b className="font-weight-normal">Financials</b>
                                                        <span>Feb 27 - Mar 26 2015<br />
                                                            29 CALENDER DAYS</span>
                                                    </div>
                                                    <div className="col-lg-3 payroll-details">
                                                        <div className="label">TOTAL PAYROLL COST</div>
                                                        <div className="counts">4,35,23,738 </div>
                                                        <div className="sub-counts">July <span>+2346932</span></div>
                                                    </div>
                                                    <div className="col-lg-2 payroll-details">
                                                        <div className="label">EMPLOYEE DEPOSIT</div>
                                                        <div className="counts">4,35,23,738</div>
                                                        <div className="sub-counts">July <span> +2346932</span></div>
                                                    </div>
                                                    <div className="col-lg-2 payroll-details">
                                                        <div className="label">TDS PAYMENT</div>
                                                        <div className="counts">4,11,315</div>
                                                        <div className="sub-counts">July <span> +78.234</span></div>
                                                    </div>
                                                    <div className="col-lg-2 payroll-details">
                                                        <div className="label">PF & ESI</div>
                                                        <div className="counts">2,02,123</div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-12 card  payroll-container mt-3 mb-3">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <h6 className="mb-3">Payroll Action</h6>
                                                    </div>

                                                    <div className="col-lg-4 mb-3">

                                                        <div className="col-lg-12 card  payroll-action">
                                                            <div className="row">
                                                                <div className="col-lg-2 icon">
                                                                    <img src={leave1} />
                                                                </div>
                                                                <div className="col-lg-10 details">
                                                                    <b> <a href="#">Leave & Attendance</a></b>
                                                                    <p>RECONCILED ON JUL 26 04:32 PM BY VIJAY KUMAR</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 mb-3">
                                                        <div className="col-lg-12 card  payroll-action">
                                                            <div className="row">
                                                                <div className="col-lg-2 icon">
                                                                    <img src={leave2} />
                                                                </div>
                                                                <div className="col-lg-10 details">
                                                                    <b> <a href="#">New Joinees & Exits</a></b>
                                                                    <p>RECONCILED ON JUL 26 04:32 PM BY VIJAY KUMAR</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 mb-3">
                                                        <div className="col-lg-12 card  payroll-action">
                                                            <div className="row">
                                                                <div className="col-lg-2 icon">
                                                                    <img src={leave3} />
                                                                </div>
                                                                <div className="col-lg-10 details">
                                                                    <b><a href="#" >Salary Revisions Bonus</a></b>
                                                                    <p>RECONCILED ON JUL 26 04:32 PM BY VIJAY KUMAR</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4   mb-3">
                                                        <div className="col-lg-12 card  payroll-action">
                                                            <div className="row">
                                                                <div className="col-lg-2 icon">
                                                                    <img src={leave4} />
                                                                </div>
                                                                <div className="col-lg-10 details">
                                                                    <b><a href="#">Reimbursements & Leaves</a></b>
                                                                    <p>RECONCILED ON JUL 26 04:32 PM BY VIJAY KUMAR</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4  mb-3">
                                                        <div className="col-lg-12 card  payroll-action">
                                                            <div className="row">
                                                                <div className="col-lg-2 icon">
                                                                    <img src={leave5} />
                                                                </div>
                                                                <div className="col-lg-10 details">
                                                                    <b><a href="#">Arrears & Onhold</a></b>
                                                                    <p>RECONCILED ON JUL 26 04:32 PM BY VIJAY KUMAR</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 mb-3">
                                                        <div className="col-lg-12 card  payroll-action">
                                                            <div className="row">
                                                                <div className="col-lg-2 icon">
                                                                    <img src={leave6} />
                                                                </div>
                                                                <div className="col-lg-10 details">
                                                                    <b><a href="#">Final Review</a></b>
                                                                    <p>RECONCILED ON JUL 26 04:32 PM BY VIJAY KUMAR</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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