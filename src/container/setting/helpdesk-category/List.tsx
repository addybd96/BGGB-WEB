import * as React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import CONSTANT from '../../../constant';
import { getCategoryList } from '../../../action/HelpdeskActions';

class CategoryList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    public componentDidMount() {
        getCategoryList().then((response: any) => {
            if (response.status) {
                this.setState({ data: response.result });
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
                                        <div className="col-lg-8 pl-0">
                                            <h5 className="heading-h1">Category / Sub-Category</h5>
                                        </div>
                                        <div className="col-lg-2 text-right pr-0">
                                            <Link to={CONSTANT.url.settingsOption.helpdeskAddCategory}>
                                                <a className="common-btn"><i className="fa fa-plus"></i> &nbsp; Add Category</a>
                                            </Link>
                                        </div>
                                        <div className="col-lg-2 text-right pr-0">
                                            <Link to={CONSTANT.url.settingsOption.helpdeskAddSubCategory}>
                                                <a className="common-btn"><i className="fa fa-plus"></i> &nbsp; Add Sub Category</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-2 role-head1">
                                                <b>Category</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Id</th>
                                                        <th scope="col">Category Name</th>
                                                        <th scope="col">Sub Category Name</th>
                                                        <th scope="col">Owner</th>
                                                        {/* <th scope="col">Edit</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data && data.length > 0 && data.map((item: any, index: any) =>
                                                        <tr>
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.subCategory}</td>
                                                            <td>{item.ownerId}</td>
                                                            {/* <th scope="col">
                                                                <Link
                                                                    to={{ pathname: CONSTANT.url.settingsOption.editRole, state: { detail: { id: item.roleId, name: item.name, description: item.description, permission: item.permission } } }}>
                                                                    <a>
                                                                        <i className="fa fa-pencil"></i>
                                                                    </a>
                                                                </Link>
                                                            </th> */}
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

export default CategoryList;
