import * as React from 'react';

import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import PermissionModal from '../../component/setting/PermissionModal';

class Permission extends React.Component<any, any> {
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
                                            <h5 className="heading-h1">Permission</h5>
                                        </div>

                                        <div className="col-lg-6 text-right pr-0">
                                            <a className="common-btn" data-toggle="modal" data-target="#exampleModal" onClick={this._onAddPermission}><i
                                                className="fa fa-plus"></i> &nbsp; Add Permission</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="role-head">
                                                <b>Permissions</b>
                                            </div>                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">--</th>
                                                        <th scope="col">Add Employee</th>
                                                        <th scope="col">Update Employee</th>
                                                        <th scope="col">Add Attendace</th>
                                                        <th scope="col">Update Attendance</th>
                                                        <th scope="col">Add Leave</th>
                                                        <th scope="col">Update Leave</th>
                                                        <th scope="col">Add Holiday</th>
                                                        <th scope="col">Update Holiday</th>
                                                        <th scope="col">Update Help Desk</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><b>Administration</b></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                    </tr>

                                                    <tr>
                                                        <td><b>Employee</b></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
                                                        <td><input type="checkbox" /></td>
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

                <PermissionModal isModalOpen={isModalOpen} dismissModal={this._closeModal} onSubmitModal={this._onSubmitModal} />

                {/* <React.Fragment>
                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content company-model">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Permission</h5>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div>
                                                    <form>
                                                        <div className="mb-2">
                                                            <div className="row">
                                                                <div className="col-lg-12 form-group">
                                                                    <label>Role </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="--Select--"
                                                                    />
                                                                </div>
                                                                <div className="col-lg-12 form-group">
                                                                    <label>Permission</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="--Permission--"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <div className="row">
                                                                <div className="col-lg-12 form-group">
                                                                    <label>Comment</label>
                                                                    <textarea
                                                                        className="form-control"
                                                                        id="comment"
                                                                        placeholder="Type Here">

                                                                    </textarea>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6"></div>
                                    <button type="button" className="col-lg-12 btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment> */}
            </React.Fragment>
        )
    }

    _onAddPermission = () => {
        this.setState({ isModalOpen: true });
    }

    _onSubmitModal = () => {
        this.setState({ isModalOpen: true });
    }

    _closeModal = () => {
        this.setState({ isModalOpen: false });
    }

}

export default Permission;
