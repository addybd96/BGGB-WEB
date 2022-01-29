import * as React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import CONSTANT from './../../../constant';
import { getUserRole } from './../../../action/SettingsActions';

class RoleList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    public componentDidMount() {
        getUserRole().then((response: any) => {
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
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            <div className="col-lg-11">
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6 pl-0">
                                            <h5 className="heading-h1">Role and Permission</h5>
                                        </div>
                                        <div className="col-lg-6 text-right pr-0">
                                            <Link to={CONSTANT.url.settingsOption.addRole}>
                                                <a className="common-btn"><i className="fa fa-plus"></i> &nbsp; Add Role</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-2 role-head1">
                                                <b>Roles</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Role Name</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data && data.length > 0 && data.map((item: any, index: any) =>
                                                        <tr>
                                                            <td>{item.name}</td>
                                                            <td>{item.description ? item.description: '-'}</td>
                                                            <th scope="col">
                                                                <Link
                                                                    to={{ pathname: CONSTANT.url.settingsOption.editRole, state: { detail: { id: item.roleId, name: item.name, description: item.description, permission: item.permission } } }}>
                                                                    <a>
                                                                        <i className="fas fa-edit"></i>
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
                </div>

            </React.Fragment>
        )
    }

}

export default RoleList;
