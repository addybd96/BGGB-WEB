import * as React from 'react';

import Header from './../component/common/Header';
import Sidebar from '../component/common/Sidebar';

class SalaryContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
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
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6 pl-0">
                                            <h5 className="heading-h1">Employee Salary List</h5>
                                        </div>

                                        <div className="col-lg-6 text-right pr-0">
                                            <a className="common-btn" href="add-salary.html"><i className="fa fa-list"></i> &nbsp; Generate Salary</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-6 pt-2">
                                                <b>Search</b>
                                            </div>
                                            <div className="col-lg-6 text-right">
                                                <div className="row">

                                                    <div className="col-lg-4">
                                                        <select className="form-control">
                                                            <option >--Select Month--</option>
                                                            <option selected>January 2020</option>
                                                            <option value="1">February 2020</option>
                                                            <option value="2">March 2020</option>
                                                            <option value="3">April 2020</option>
                                                            <option value="3">Others</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <select className="form-control">
                                                            <option >--Select--</option>
                                                            <option selected>IT Detartment</option>
                                                            <option value="1">HR Department</option>
                                                            <option value="2">Sales Department</option>
                                                            <option value="3">Admin Department</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <select className="form-control">
                                                            <option >--Select--</option>

                                                            <option selected value="1">Nitesh Kumar</option>
                                                            <option value="2">Rohit Pahadi</option>
                                                            <option value="3">Satendra singh</option>
                                                            <option >All Members</option>
                                                        </select>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Employee ID</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Department</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Day Worked</th>
                                                        <th scope="col">Bank Name</th>
                                                        <th scope="col">Salary</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Remark</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="done">Download</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="done">Download</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="pending-salary">Pending</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="done">Download</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="done">Download</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>


                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="done">Download</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="done">Download</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>


                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="done">Download</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="done">Download</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td><a href="employee-salary-list.html">0063627</a> </td>
                                                        <td>Nitesh Kumar</td>
                                                        <td>IT Department</td>
                                                        <td>7-Jan-2020</td>
                                                        <td>28 Days</td>
                                                        <td>ICICI</td>
                                                        <td>700000Rs</td>
                                                        <td><span className="done">Download</span>	</td>
                                                        <th><i data-toggle="modal" data-target="#exampleModal" className="fa fa-hand-pointer-o"></i></th>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="pagination-control">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination float-right">
                                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment >
        )
    }

}

export default SalaryContainer;
