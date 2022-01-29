import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../../constant';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { getUser } from '../../../action/SettingsActions';

class Users extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    public componentDidMount() {
        getUser().then((response: any) => {
            if (response.status) {
                this.setState({ data: response.result })
            }
        });
    }

    public render() {
        const { data } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12 mt-4">
                                <div className="row">
                                    <div className="col-lg-6 pl-0">
                                        <h5 className="heading-h1">User List</h5>
                                    </div>
                                    <div className="col-lg-6 text-right pr-0">
                                        <Link to={CONSTANT.url.settingsOption.addUser}>
                                            <a className="common-btn" href="add-department.html">
                                                <i className="fa fa-plus"></i> &nbsp;Add User
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <b>Users</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Mobile</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data && data.length > 0 && data.map((item: any, index: any) =>
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.mobile}</td>
                                                        <td>{item.roleName ? item.roleName : '-'}</td>
                                                        <th scope="col">
                                                            <Link
                                                                to={{ pathname: CONSTANT.url.settingsOption.edituser, state: { employeeId: item.id, fullName: item.name, emailId: item.email, mobileNumber: item.mobile, roleId: item.roleId } }}>
                                                                <a>
                                                                    <i className="fa fa-pencil"></i>
                                                                </a>
                                                            </Link>
                                                        </th>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

export default Users;
