import React from 'react';

const EmployeeListTable = (props: any) => {
    return (
        <React.Fragment>
            <div className="card-body">
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
                                            data-target="#exampleModal">
                                        </i>
                                    </a>
                                </td>
                                <td><i className="fa fa-check-circle"></i></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EmployeeListTable;
