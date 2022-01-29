import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../constant';
import Loader from '../../component/common/Loader';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';

import { getLoanList } from '../../action/LoanActions'
import { getDateParts, getCookie } from '../../utils';


class ListGeofencing extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            leaveList: [],
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
        const { loans, showLoader, userType } = this.state;
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
                                            Loans
                                        </div>
                                        <div className="col-lg-2 text-right pr-0">
                                            {userType === 'radmin' &&
                                                <Link to={CONSTANT.url.addLoan}>
                                                    <a className="common-btn">
                                                        <i className="fa fa-plus"></i> &nbsp;Create Loan
                                                </a>
                                                </Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Employee Name</th>
                                                    <th>Employee Code</th>
                                                    <th>Loan A/c No.</th>
                                                    <th>Loan Type</th>
                                                    <th>Amount</th>
                                                    <th>Tenure</th>
                                                    <th>Intallment</th>
                                                    <th>Out. Amount</th>
                                                    <th>Created By</th>
                                                    <th>Created On</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loans && loans.length == 0 && <tr>
                                                    <td className="text-center" colSpan={12}>No record found</td>
                                                </tr>
                                                }
                                                {loans.map((item: any, index: number) => {
                                                    console.log(item)
                                                    const modOn = getDateParts(item.createdOn);
                                                    return (<tr>
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.employeeId}</td>
                                                        <td>{item.accountNumber}</td>
                                                        <td>{item.loanType}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.tenure}</td>
                                                        <td>{(item.installmentAmount)}</td>
                                                        <td>{(item.outstandingAmount)}</td>
                                                        <td>{item.createdByName}</td>
                                                        <td>{modOn.relativeTime}</td>
                                                        <th scope="col">
                                                            <Link to={CONSTANT.url.editLoan.replace(':code', item.id)}>
                                                                <a>
                                                                    <i className="fa fa-edit"></i>
                                                                </a>
                                                            </Link>
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

                {showLoader && <Loader />}
            </React.Fragment >
        )
    }

    loadList = () => {
        this.setState({ showLoader: true })
        getLoanList(1, 100)
            .then((res: any) => {
                console.log(res);
                this.setState({ showLoader: false });
                if (res.result) {
                    this.setState({
                        loans: res.result.list,
                        count: res.result.count
                    })
                }
            }).catch((err: any) => {
                console.log(err);
            })
    }

}

export default ListGeofencing;
