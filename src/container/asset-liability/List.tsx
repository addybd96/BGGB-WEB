import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../constant';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';

import { getEmployeeAssetList } from '../../action/AssetLiabilityAction'
import { getDateParts, getCookie } from '../../utils';


class ListAsset extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            leaveList: [],
            showLoader: false,
            list: undefined,
            userType: undefined
        }
    }

    componentDidMount() {
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        this.setState({ userType: userDetail.userType });
        this.loadList();
    }

    public render() {
        const { list, showLoader, userType } = this.state;
        if (showLoader)
            return null;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-10">
                                            List Assets and Liability
                                        </div>
                                        <div className="col-lg-2 text-right pr-0">
                                            {/* {userType === 'radmin' && */}
                                            <Link to={CONSTANT.url.assetLiabilityAdd}>
                                                <a className="common-btn">
                                                    <i className="fa fa-plus"></i> &nbsp;Add Assets
                                                </a>
                                            </Link>
                                            {/* } */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Year</th>
                                                    <th>Created On</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.length == 0 && <tr>
                                                    <td className="text-center" colSpan={6}>No record found</td>
                                                </tr>
                                                }
                                                {list && list.map((item: any, index: number) => {
                                                    console.log(item)
                                                    const modOn = getDateParts(item.createdOn);
                                                    return (<tr>
                                                        <td>{item.id}</td>
                                                        <td>{item.year}</td>
                                                        <td>{modOn.relativeTime}</td>
                                                        <td>{`${item.isCompleted ? 'Completed' : 'Incomplete'}`}</td>
                                                        <th scope="col">
                                                            {item.isCompleted &&
                                                                <span>-</span>
                                                            }
                                                            {!item.isCompleted &&
                                                                <Link to={CONSTANT.url.editAssetDetailForm.replace(':id', item.id)}>
                                                                    <a>
                                                                        <i className="fa fa-edit"></i>
                                                                    </a>
                                                                </Link>
                                                            }
                                                        </th>
                                                    </tr>)
                                                })}
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

    loadList = () => {
        this.setState({ showLoader: true })
        getEmployeeAssetList().then((res: any) => {
            console.log(res);
            this.setState({ showLoader: false });
            if (res.result) {
                this.setState({
                    list: res.result,
                })
            }
        }).catch((err: any) => {
            console.log(err);

        })
    }


}

export default ListAsset;
