import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../constant';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';

import { getEmployeeAssetListByAdmin } from '../../action/AssetLiabilityAction'
import { getDateParts, getCookie, onChange } from '../../utils';

class ListAsset extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            leaveList: [],
            showLoader: false,
            list: [],
            userType: undefined,
            year: { name: 'year', value: '', error: '', isRequired: false },
            yearList: []
        }
    }

    componentDidMount() {
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        this.setState({ userType: userDetail.userType });

        let currentYear = (new Date()).getFullYear();
        let allYears = [];
        for (let x = 0; x <= 5; x++) {
            allYears.push(currentYear - x)
        }
        this.setState({ yearList: allYears })
        console.log(allYears)
    }

    public render() {
        const { list, showLoader, year, yearList } = this.state;
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
                                        <div className="col-lg-8">
                                            List Assets and Liability
                                        </div>
                                        <div className="col-lg-4 text-right pr-2">
                                            <div className="row">
                                                <div className="col-lg-7">
                                                    <select
                                                        name={year.name}
                                                        value={year.value}
                                                        onChange={this.onChange}
                                                        className={year.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                                                        <option>--Select--</option>
                                                        {yearList.map((i: any) => {
                                                            return (
                                                                <option value={i}>{i}</option>

                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="col-lg-5 mt-1">
                                                    <Link to={CONSTANT.url.assetLiabilityAdd}>
                                                        <a className="common-btn">
                                                            <i className="fa fa-plus"></i> &nbsp;Add Assets
                                                        </a>
                                                    </Link>
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
                                                    <th>S.No</th>
                                                    <th>Employee Name</th>
                                                    <th>Employee Code</th>
                                                    <th>Designation</th>
                                                    <th>Status</th>
                                                    {/* <th>Action</th> */}
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
                                                        <td>{index + 1}</td>
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.employeeCode}</td>
                                                        <td>{item.designation}</td>
                                                        <td>{`${item.isCompleted ? 'Completed' : 'Incomplete'}`}</td>
                                                        {/* <th scope="col">
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
                                                        </th> */}
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

    private onChange = (e: any, callback?: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
        this.loadList(value);
    }

    loadList = (value: any) => {
        this.setState({ showLoader: true })
        getEmployeeAssetListByAdmin(value).then((res: any) => {
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
