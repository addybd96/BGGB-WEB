import * as React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CONSTANT from '../../constant';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';

import { getDateParts, getCookie } from '../../utils';
import { getIncrementList, getIncrementListPqp } from '../../action/IncrementAction';

class IncrementListPqp extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            incrementList: [],
            showLoader: false,
            loans: [],
            userType: undefined
        }
    }

    componentDidMount() {
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        this.setState({ userType: userDetail.userType });
        this.loadList()
    }

    public render() {
        const { incrementList, showLoader, userType } = this.state;
        if (showLoader) {
            return (
                <React.Fragment>
                    <Header />
                    <div className="fluid-container px-0">
                        <div className="row">
                            <Sidebar />
                        </div>
                    </div>
                </React.Fragment >)
        }
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
                                            IncrementList
                                        </div>
                                        <div className="col-lg-2 text-right pr-0">
                                            {/* {userType === 'radmin' && */}
                                            <Link to={CONSTANT.url.increment.pqpAdd}>
                                                <a className="common-btn">
                                                    <i className="fa fa-plus"></i> &nbsp;Add Increment
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
                                                    <th>Employee Code</th>
                                                    <th>Employee Name</th>
                                                    <th>Specialization</th>
                                                    <th>Pqp </th>
                                                    <th>Increment Of Pqp </th>
                                                    <th>Revision Of Pqp</th>
                                                    <th>Effective Date From</th>
                                                    <th>Effective Date To</th>
                                                    <th>Created By</th>
                                                    <th>Created On</th>
                                                    {/* <th>Action</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {incrementList && incrementList.length == 0 && <tr>
                                                    <td className="text-center" colSpan={6}>No record found</td>
                                                </tr>
                                                }
                                                {incrementList.map((item: any, index: number) => {
                                                    console.log(item)
                                                    const modOn = getDateParts(item.createdOn);
                                                    return (<tr>
                                                        <td>{item.employeeId}</td>
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.specialization}</td>

                                                        <td>{item.pqp}</td>
                                                        <td>{item.incrementPqpAmount}</td>
                                                        <td>{item.revisionPqp}</td>
                                                        <td>{moment(item.incrementFromDate).format('DD-MMM-YYYY')}</td>
                                                        <td>{item.incrementToDate ? moment(item.incrementToDate).format('DD-MMM-YYYY') : 'Present'}</td>
                                                        <td>{item.createdByName}</td>
                                                        <td>{modOn.relativeTime}</td>
                                                        {/* <th scope="col">
                                                            <Link to={CONSTANT.url.editLoan.replace(':code', item.id)}>
                                                                <a>
                                                                    <i className="fa fa-edit"></i>
                                                                </a>
                                                            </Link>
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

    loadList = () => {
        this.setState({ showLoader: true })
        getIncrementListPqp(1, 100)
            .then((res: any) => {
                console.log(res);
                this.setState({ showLoader: false });
                if (res.result) {
                    this.setState({
                        incrementList: res.result.list,
                        count: res.result.count
                    })
                }
            })
            .catch((err: any) => {
                console.log(err);

            })
    }


}

export default IncrementListPqp;
