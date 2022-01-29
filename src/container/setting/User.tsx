import * as React from 'react';

import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import UserModal from '../../component/setting/UserModal';
import { addUser } from './../../action/SettingsActions';
import CONSTANT from './../../constant';

class SubAdminUser extends React.Component<any, any> {
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
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">

                            <div className="row mt-4">
                                <div className="col-lg-6 pl-0">
                                    <h5 className="heading-h1">Users</h5>
                                </div>
                                <div className="col-lg-6 text-right pr-0">
                                    <a className="common-btn" onClick={this._onAddUser}><i className="fa fa-plus"></i> &nbsp; Add User</a>
                                </div>
                            </div>
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <b>Total Users #</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Basic Information</th>
                                                    <th scope="col">Date of Joining</th>
                                                    <th scope="col">Role(s)</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>nitesh.kumar@mounttalent.com</td>
                                                    <td></td>
                                                    <td>Admin</td>
                                                    <td>Active</td>
                                                </tr>
                                                <tr>
                                                    <td>nitesh.kumar@mounttalent.com</td>
                                                    <td></td>
                                                    <td>Admin</td>
                                                    <td>Active</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserModal isModalOpen={isModalOpen} dismissModal={this._closeModal} addUser={this._addUser} />

            </React.Fragment >
        )
    }

    _onAddUser = () => {
        this.setState({ isModalOpen: true });
    }

    _closeModal = () => {
        this.setState({ isModalOpen: false });
    }

    _addUser = (reqObj: any) => {
        console.log("add user reqObj  => ", reqObj);
        addUser(reqObj).then((response: any) => {
            console.log("addUser response  => ", response);
            if (response.status) {
                this.setState({ isModalOpen: false });
                this.props.history.push(CONSTANT.url.dashboard);
            }
        });
    }

}

export default SubAdminUser;
