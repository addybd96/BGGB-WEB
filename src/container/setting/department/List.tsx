import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../../constant';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { getDepartments } from '../../../action/SettingsActions';

class Department extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    public componentDidMount() {
        getDepartments().then((response: any) => {
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
                                            <h5 className="heading-h1">Department List</h5>
                                        </div>
                                        <div className="col-lg-6 text-right pr-0">
                                            <Link to={CONSTANT.url.settingsOption.addDepartment}>
                                                <a className="common-btn" href="add-department.html">
                                                    <i className="fa fa-plus"></i> &nbsp;Add Department
                                                </a>
                                            </Link>
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
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data && data.length > 0 && data.map((item: any, index: any) =>
                                                        <tr>
                                                            <td>{item.name}</td>
                                                            <td>{item.description}</td>
                                                            <th scope="col">
                                                                <Link 
                                                                to={{ pathname: CONSTANT.url.settingsOption.editDepartment, state: { departmentId: item.departmentId, name: item.name, description: item.description } }}>
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
                </div>

            </React.Fragment >
        )
    }

}

export default Department;
