import * as React from 'react';

import { Link } from 'react-router-dom';

import Header from './../component/common/Header'
import Sidebar from '../component/common/Sidebar';
import CONSTANT from './../constant';
import EmployeeListTable from './../component/employee-master/EmployeeListTable';
import Pagination from './../component/common/Pagination';

class EmployeeMaster extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    public componentDidMount() {

    }

    public render() {

        return (
            <React.Fragment>
                <Header />
                <Sidebar />
                <section>
                    <div className="col-lg-12 main-container">
                        <div className="fluid-container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <h5 className="heading-h1 mt-4">Employee Master</h5>
                                        <div className="card mt-2">
                                            <div className="card-header">

                                                <div className="row">
                                                    <div className="col-lg-6 ">
                                                        Search
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Employee Code"
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="First Name"
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Last Name"
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Reporting Manager"
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Date of Joining"
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <select className="form-control">
                                                                <option selected>Select Status</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                                            </select>
                                                        </div>
                                                        <div className="col">
                                                            <select className="form-control">
                                                                <option selected>Select Letter Status</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </form>


                                                <div className="col-lg-1 pull-right mt-4 pr-0">
                                                    <a href="employee-profile.html">
                                                        <button className="btn primary-control float-right">
                                                            <i className="fa fa-search"
                                                                aria-hidden="true">
                                                            </i>
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card mt-3">
                                            <div className="card-header">
                                                <div className="row">
                                                    <div className="col-lg-6 ">
                                                        List of Employee
                                                    </div>

                                                    <div className="col-lg-6 text-right">
                                                        {/* <Link to={CONSTANT.url.addEmployeeBasic}>
                                                            <a className="btn btn-primary btn-sm  search-btn">
                                                                <i className="fa fa-plus"></i> Add Employee
                                                            </a>
                                                        </Link> */}
                                                        <a className="btn btn-primary btn-sm search-btn ml-1">
                                                            <i className="fa fa-download"></i> Download
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>
                                            <EmployeeListTable />
                                            {/* <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Emp Code</th>
                                                                <th scope="col">First Name</th>
                                                                <th scope="col">Last Name</th>
                                                                <th scope="col">Gender</th>
                                                                <th scope="col">DOJ</th>
                                                                <th scope="col">Reporting Manager</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Edit</th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>145432</td>
                                                                <td>Ravi </td>
                                                                <td>Verma</td>
                                                                <td>Male</td>
                                                                <td>03/12/2019</td>
                                                                <td>Kavita Sharma</td>
                                                                <td>FnF Locked</td>
                                                                <td>
                                                                    <a href="employee-profile.html">
                                                                        <i className="fa fa-pencil" data-toggle="modal"
                                                                            data-target="#exampleModal">
                                                                        </i>
                                                                    </a>
                                                                </td>
                                                                <td><i className="fa fa-check-circle"></i></td>
                                                            </tr>
                                                            <tr>
                                                                <td>145432</td>
                                                                <td>Ravi </td>
                                                                <td>Verma</td>
                                                                <td>Male</td>
                                                                <td>03/12/2019</td>
                                                                <td>Kavita Sharma</td>
                                                                <td>FnF Locked</td>
                                                                <td>
                                                                    <a href="employee-profile.html">
                                                                        <i className="fa fa-pencil" data-toggle="modal"
                                                                            data-target="#exampleModal"></i></a></td>
                                                                <td><i className="fa fa-check-circle"></i></td>
                                                            </tr>

                                                            <tr>
                                                                <td>145432</td>
                                                                <td>Ravi </td>
                                                                <td>Verma</td>
                                                                <td>Male</td>
                                                                <td>03/12/2019</td>
                                                                <td>Kavita Sharma</td>
                                                                <td>FnF Locked</td>
                                                                <td>
                                                                    <a href="employee-profile.html">
                                                                        <i className="fa fa-pencil" data-toggle="modal"
                                                                            data-target="#exampleModal"></i></a></td>
                                                                <td><i className="fa fa-check-circle"></i></td>
                                                            </tr>

                                                            <tr>
                                                                <td>145432</td>
                                                                <td>Ravi </td>
                                                                <td>Verma</td>
                                                                <td>Male</td>
                                                                <td>03/12/2019</td>
                                                                <td>Kavita Sharma</td>
                                                                <td>FnF Locked</td>
                                                                <td>
                                                                    <a href="employee-profile.html">
                                                                        <i className="fa fa-pencil" data-toggle="modal"
                                                                            data-target="#exampleModal"></i></a></td>
                                                                <td><i className="fa fa-check-circle"></i></td>
                                                            </tr>

                                                            <tr>
                                                                <td>145432</td>
                                                                <td>Ravi </td>
                                                                <td>Verma</td>
                                                                <td>Male</td>
                                                                <td>03/12/2019</td>
                                                                <td>Kavita Sharma</td>
                                                                <td>FnF Locked</td>
                                                                <td>
                                                                    <a href="employee-profile.html">
                                                                        <i className="fa fa-pencil" data-toggle="modal"
                                                                            data-target="#exampleModal"></i></a></td>
                                                                <td><i className="fa fa-check-circle"></i></td>
                                                            </tr>

                                                            <tr>
                                                                <td>145432</td>
                                                                <td>Ravi </td>
                                                                <td>Verma</td>
                                                                <td>Male</td>
                                                                <td>03/12/2019</td>
                                                                <td>Kavita Sharma</td>
                                                                <td>FnF Locked</td>
                                                                <td>
                                                                    <a href="employee-profile.html">
                                                                        <i className="fa fa-pencil" data-toggle="modal"
                                                                            data-target="#exampleModal"></i></a></td>
                                                                <td><i className="fa fa-check-circle"></i></td>
                                                            </tr>

                                                            <tr>
                                                                <td>145432</td>
                                                                <td>Ravi </td>
                                                                <td>Verma</td>
                                                                <td>Male</td>
                                                                <td>03/12/2019</td>
                                                                <td>Kavita Sharma</td>
                                                                <td>FnF Locked</td>
                                                                <td>
                                                                    <a href="employee-profile.html">
                                                                        <i className="fa fa-pencil" data-toggle="modal"
                                                                            data-target="#exampleModal"></i></a></td>
                                                                <td><i className="fa fa-check-circle"></i></td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div> */}

                                        </div>

                                        {/* <div className="pagination-control">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination float-right">
                                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                </ul>
                                            </nav>
                                        </div> */}
                                        <Pagination />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }

}

export default EmployeeMaster;