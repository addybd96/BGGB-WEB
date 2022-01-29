import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';

const leave1 = require('../../assets/images/leave1.JPG')
const leave2 = require('../../assets/images/leave2.JPG')
const leave3 = require('../../assets/images/leave3.JPG')
const leave4 = require('../../assets/images/leave4.JPG')
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
                                <div className="col-lg-11">
                                    <div className="row">
                                        <div className="col">
                                            <div className="col-lg-12 leave-details card mt-3">
                                                <b>PAID LEAVES</b>
                                                <div className="leave-graph"><img src={leave1} /></div>
                                                <div className="leave-counts">
                                                    <ul>
                                                        <li><span className="squre leave-color1"></span>Available <span className="float-right">10 Days</span>
                                                        </li>
                                                        <li><span className="squre leave-color1"></span>Consumed <span className="float-right">2 Days</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="col-lg-12 leave-details card mt-3">
                                                <b>CAUSAL LEAVES</b>
                                                <div className="leave-graph"><img src={leave2} /></div>
                                                <div className="leave-counts">
                                                    <ul>
                                                        <li><span className="squre  leave-color2"></span>Available <span className="float-right">3 Days</span>
                                                        </li>
                                                        <li><span className="squre leave-color2"></span>Consumed <span className="float-right">2 Days</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="col-lg-12 leave-details card mt-3">
                                                <b>SICK LEAVES</b>
                                                <div className="leave-graph"><img src={leave3} /></div>
                                                <div className="leave-counts">
                                                    <ul>
                                                        <li><span className="squre leave-color3"></span>Available <span className="float-right">3 Days</span>
                                                        </li>
                                                        <li><span className="squre leave-color3"></span>Consumed <span className="float-right">2 Days</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="col-lg-12 leave-details card mt-3">
                                                <b>OTHERS LEAVES</b>
                                                <div className="leave-graph"><img src={leave4} /></div>
                                                <div className="leave-counts">
                                                    <ul>
                                                        <li><span className="squre leave-color4"></span>Available <span className="float-right">1 Days</span>
                                                        </li>
                                                        <li><span className="squre leave-color4"></span>Consumed <span className="float-right">2 Days</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col">
                                            <div className="col-lg-12 leave-action card mt-3">
                                                <b>LEAVES ACTIONS</b>

                                                <button className="col-lg-12 btn leave-btn float-right">Apply For Leave
                  </button>

                                                <div className="leave-request"><a href="#">Request Compensatory Off</a></div>
                                                <div className="leave-request"><a href="#">Do Something</a></div>
                                                <div className="usefull-links">
                                                    <b>USEFULL LINKS</b>
                                                    <ul>

                                                        <li><a href="#"><i className="fa fa-file-text-o"></i>Leave Policy </a></li>
                                                        <li><a href="#"><i className="fa fa-file-text-o"></i>Leave History</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-lg-12">
                                            <div className="past-leaves card mt-3 mb-3">
                                                <div className="card-header">
                                                    <b>PAST LEAVES
                    </b>
                                                </div>
                                                <div className="col-lg-12 mt-4 pb-3 border-bottom">
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <b>05 FEB, WED</b>
                                                            <p>Today</p>

                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Leave Type</p>
                                                            <b>Paid Leave</b>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Status</p>
                                                            <p className="approved">Approved</p>
                                                        </div>
                                                        <div className="col-lg-3">

                                                            <p className="mb-0">Reason </p>
                                                            <p>I'm going for home</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Approved by</p>
                                                            <b>Vijay Verma</b>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mt-4 pb-3 border-bottom">
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <b>14 JAN, TUE</b>
                                                            <p>Today</p>

                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Leave Type</p>
                                                            <b>Paid Leave</b>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Status</p>
                                                            <p className="approved">Approved</p>
                                                        </div>
                                                        <div className="col-lg-3">

                                                            <p className="mb-0">Reason </p>
                                                            <p>I'm going for home</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Approved by</p>
                                                            <b>Vijay Verma</b>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mt-4 pb-3 border-bottom">
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <b>24 OCT, WED</b>
                                                            <p>Today</p>

                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Leave Type</p>
                                                            <b>Paid Leave</b>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Status</p>
                                                            <p className="approved">Approved</p>
                                                        </div>
                                                        <div className="col-lg-3">

                                                            <p className="mb-0">Reason </p>
                                                            <p>I'm going for home</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Approved by</p>
                                                            <b>Vijay Verma</b>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mt-4 pb-3">
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <b>24 OCT, WED</b>
                                                            <p>Tomorrow</p>

                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Leave Type</p>
                                                            <b>Paid Leave</b>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Status</p>
                                                            <p className="approved">Approved</p>
                                                        </div>
                                                        <div className="col-lg-3">

                                                            <p className="mb-0">Reason </p>
                                                            <p>I'm going for home</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <p className="mb-0">Approved by</p>
                                                            <b>Vijay Verma</b>
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