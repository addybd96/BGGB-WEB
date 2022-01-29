import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../constant';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';

class SettingsEmployeeProfile extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    public componentDidMount() {

    }

    public render() {
        const { data } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            <div className="col-lg-3">
                                <div className="employee-profile card mt-3">
                                    <div className="profile-head">
                                        <img src="./images/user-img.jpg" />
                                    </div>

                                    <div className="col-lg-12 employee-details">
                                        <b>Pooja Gupta</b>
                                        <div className="email">Pooja_sharma@gmail.com</div>
                                        <div className="emp-id"><strong>Emp ID:-</strong> 0012291991</div>
                                    </div>
                                </div>

                                <div className="col-lg-12 card employee-tab mt-2 mb-4">
                                    <div className="tab">
                                        <a>
                                            <img src="images/tab1.png" />Basic Details<i className="fa fa-check-circle completed-process"></i>
                                        </a>
                                    </div>
                                    <div className="tab"><a><img src="images/tab2.png" />Address Details</a></div>
                                    <div className="tab"><a href="employee-education-details.html">
                                        <img src="images/tab4.png" />Education Details</a></div>
                                    <div className="tab">
                                        <a><img src="images/menu-icon4.png" />Experience Details</a>
                                    </div>

                                    <div className="tab">
                                        <a>
                                            <img src="images/tab5.png" />Compensation & Benifit
                                        </a>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-6">
                                <div className="card mt-3">
                                    <div className="card-header">
                                        <b>Basic Details</b>
                                        <a data-toggle="modal" data-target="#exampleModal">
                                            <i className="fa fa-pencil add-details float-right"></i>
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-12 form-group">
                                                        <label>Employee Code </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Employee Code "
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 form-group">
                                                        <label>Email ID</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Email ID "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <label>First name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter First name"
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Last Name"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <label>Mobile</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Mobile"
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Official Email </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Father Name"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-12 form-group">
                                                        <label>Photo</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </form>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }



}

export default SettingsEmployeeProfile;
