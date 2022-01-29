import * as React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { getEmployeeAllDetail } from './../../action/EmployeeAction';
import CONSTANT from './../../constant';
import moment from 'moment';

class EmployeeDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            employeeId: props.match.params.id,
            detail: undefined,
            showLoader: false
        }
    }

    componentDidMount() {
        const { employeeId } = this.state;
        this.setState({ showLoader: true });
        getEmployeeAllDetail(employeeId).then((res: any) => {
            console.log("emp det res  => ", res)
            this.setState({ showLoader: false, detail: res.result });
        })
    }

    public render() {
        const { employeeId, detail } = this.state;
        // console.log("employeeId  => ", employeeId);
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            <div className="col-lg-11">

                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-12 pl-0">
                                            <h5 className="heading-h1">Employee Details</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Master Details</b>
                                        <a>
                                            <Link to={CONSTANT.url.editEmployeeMaster.replace(':id', employeeId)} target="_blank">
                                                <i className="fa fa-pencil add-details float-right"></i>
                                            </Link>
                                        </a>
                                    </div>
                                    {detail && detail.masterDetail &&
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-4 form-group">
                                                            <label>Employee Code</label>
                                                            <p><b>{detail.masterDetail.employeeCode}</b></p>
                                                        </div>
                                                        <div className="col-lg-4 form-group">
                                                            <label>Name</label>
                                                            <p><b>{detail.masterDetail.fullName}</b></p>
                                                        </div>
                                                        <div className="col-lg-4 form-group">
                                                            <label>Mobile No.</label>
                                                            <p><b>{detail.masterDetail.mobileNumber}</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-4 form-group">
                                                            <label>Email Id</label>
                                                            <p><b>{detail.masterDetail.emailId}</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Basic Details</b>
                                        <a>
                                            <Link to={CONSTANT.url.editEmployeeBasic.replace(':id', employeeId)} target="_blank">
                                                <i className="fa fa-pencil add-details float-right"></i>
                                            </Link>
                                        </a>
                                    </div>
                                    {detail && detail.basicDetail &&
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-4 form-group">
                                                            <label>Gender</label>
                                                            <p><b>{detail.basicDetail.gender}</b></p>
                                                        </div>
                                                        <div className="col-lg-4 form-group">
                                                            <label>Father Name</label>
                                                            <p><b>{detail.basicDetail.fatherName}</b></p>
                                                        </div>
                                                        <div className="col-lg-4 form-group">
                                                            <label>Mother Name</label>
                                                            <p><b>{detail.basicDetail.motherName}</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-4 form-group">
                                                            <label>Nationality</label>
                                                            <p><b>{detail.basicDetail.nationality}</b></p>
                                                        </div>
                                                        <div className="col-lg-4 form-group">
                                                            <label>Date of Birth</label>
                                                            <p><b>{moment(detail.basicDetail.dateOfBirth).format("DD-MM-YYYY")}</b></p>
                                                        </div>
                                                        <div className="col-lg-4 form-group">
                                                            <label>Marital Sratus</label>
                                                            <p><b>{detail.basicDetail.maritalStatus}</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-4 form-group">
                                                            <label>Blood Group</label>
                                                            <p><b>{detail.basicDetail.bloodGroup}</b></p>
                                                        </div>
                                                        <div className="col-lg-4 form-group">
                                                            <label>Personal Email Id</label>
                                                            <p><b>{detail.basicDetail.personalEmail}</b></p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    }
                                </div>

                                {/* <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Address Detail</b>
                                        <a>
                                            <Link to={CONSTANT.url.editEmployeeAddress.replace(':id', employeeId)} target="_blank">
                                                <i className="fa fa-pencil add-details float-right"></i>
                                            </Link>
                                        </a>
                                    </div>
                                    {detail && detail.addressDetail &&
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-4 form-group">
                                                            <label>Country/Region </label>
                                                            <p><b>India</b></p>
                                                        </div>
                                                        <div className="col-lg-4 form-group">
                                                            <label>Time Zone</label>
                                                            <p><b>India Standard Time (Asia/Kolkata)</b></p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    }
                                </div> */}

                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}

export default EmployeeDetail;
