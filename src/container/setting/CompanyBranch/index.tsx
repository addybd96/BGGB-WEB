import * as React from 'react';
import {Link} from 'react-router-dom'

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';

class CompanyBranch extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    public render() {
        const { isModalOpen } = this.state;
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
                                            <h5 className="heading-h1">Department Details</h5>
                                        </div>
                                        <div className="col-lg-6 text-right pr-0">
                                            <Link className="common-btn" to="/setting/add-company-branch"><i className="fa fa-plus"></i> &nbsp; Add Company Branch</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <b>Department</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Department Name</th>
                                                        <th scope="col">Department Lead</th>
                                                        <th scope="col">Parent Department</th>
                                                        <th scope="col">Comments</th>
                                                        <th scope="col">Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>IT Department</td>
                                                        <td>Nitesh Kumar </td>
                                                        <td>MTC</td>
                                                        <td>Created Department Now</td>
                                                        <th scope="col"><i className="fa fa-pencil" data-toggle="modal" data-target="#exampleModal"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td>IT Department</td>
                                                        <td>Nitesh Kumar </td>
                                                        <td>MTC</td>
                                                        <td>Created Department Now</td>
                                                        <th scope="col"><i className="fa fa-pencil" data-toggle="modal" data-target="#exampleModal"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td>IT Department</td>
                                                        <td>Nitesh Kumar </td>
                                                        <td>MTC</td>
                                                        <td>Created Department Now</td>
                                                        <th scope="col"><i className="fa fa-pencil" data-toggle="modal" data-target="#exampleModal"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td>IT Department</td>
                                                        <td>Nitesh Kumar </td>
                                                        <td>MTC</td>
                                                        <td>Created Department Now</td>
                                                        <th scope="col"><i className="fa fa-pencil" data-toggle="modal" data-target="#exampleModal"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td>IT Department</td>
                                                        <td>Nitesh Kumar </td>
                                                        <td>MTC</td>
                                                        <td>Created Department Now</td>
                                                        <th scope="col"><i className="fa fa-pencil" data-toggle="modal" data-target="#exampleModal"></i></th>
                                                    </tr>

                                                    <tr>
                                                        <td>IT Department</td>
                                                        <td>Nitesh Kumar </td>
                                                        <td>MTC</td>
                                                        <td>Created Department Now</td>
                                                        <th scope="col"><i className="fa fa-pencil" data-toggle="modal" data-target="#exampleModal"></i></th>
                                                    </tr>
                                                </tbody>
                                            </table>
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

    _onAddDepartment = () => {
        this.setState({ isModalOpen: true });
    }

    _onSubmitModal = () => {
        this.setState({ isModalOpen: true });
    }

    _closeModal = () => {
        this.setState({ isModalOpen: false });
    }

}

export default CompanyBranch;
