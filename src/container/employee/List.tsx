import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from './../../constant';

import { getEmployeeList, getEmployeeCount } from '../../action/EmployeeAction';
import { sendOnboardingEmail } from './../../action/MailerAction';
import { getCookie } from './../../utils';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

class EmployeeList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            page: 1,
            limit: 20,
            sort: 1,
            count: 0,
            showLoader: false,
            isu: undefined,
            userType: undefined,
            search: '',

            // employeeCode: { value: '', name: 'employeeCode', error: '', isRequired: true, },
            // fullName: { value: '', name: 'fullName', error: '', isRequired: true, },
            // mobileNumber: { value: '', name: 'mobileNumber', error: '', isRequired: true, },
            // emailId: { value: '', name: 'emailId', error: '', isRequired: true, },
            // isDummy: { value: false, name: 'isDummy', error: '', isRequired: false, options: isOption }
        }
    }

    componentDidMount() {
        const isu = getCookie('isu');
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        this.setState({ isu, userType: userDetail.userType }, () => {
            this.loadList(null);
        });
    }

    onBoardingFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        if (row.isOnboard) {
            return 'Yes'
        } else {
            return <a href="#" data-user-id={row.id} onClick={this.sendOnboardingEmail} title="Send an onboarding email">Send Email</a>
        }
    }

    editCellFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        const detailPageURL = CONSTANT.url.editEmployeeBasic.replace(':id', row.id);
        return (<Link to={detailPageURL} target="_blank">
            <i className="fas fa-edit"></i>
        </Link>)
    }

    public render() {
        const { list, page, limit, sort, showLoader, count, userType, search } = this.state;
        const rowStyle = (row: any, rowIndex: any) => {
            if (rowIndex % 2 === 0) {
                return {
                    backgroundColor: '#efefef'
                };
            }
            return {
                backgroundColor: '#ffffff'
            };
        }
        const columns = [
            {
                dataField: 'name',
                text: 'Name',
                style: {
                    fontSize: '14px'
                }
            },
            {
                dataField: 'employeeId',
                text: 'EC Number',
                style: {
                    fontSize: '14px'
                }
            },
            {
                dataField: 'designame',
                text: 'Designation',
                style: {
                    fontSize: '14px'
                }
            },
            {
                dataField: 'mobile',
                text: 'Mobile',
                style: {
                    fontSize: '14px'
                }
            },
        
            {
                isDummyField: true,
                text: 'Edit',
                formatter: this.editCellFormatter,
                style: {
                    fontSize: '14px'
                },
                headerStyle: {
                    width: '60px',
                }
            }
        ]
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            {/* <h5 className="heading-h1">Employee Master</h5> */}
                            <div className="card mt-2 d-none">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-6 ">
                                            Search
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-row">
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Employee Code" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="First Name" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Last Name" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Reporting Manager" />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Date of Joining" />
                                            </div>
                                            <div className="col">
                                                <select className="form-control">
                                                    <option selected>Select Status</option>
                                                    <option value="1">FnF</option>

                                                </select>
                                            </div>
                                            <div className="col">
                                                <select className="form-control">
                                                    <option selected>Select Letter Status</option>
                                                    <option value="1">Approved</option>
                                                    <option value="2">Pending</option>

                                                </select>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="col-lg-1 pull-right mt-4 pr-0">
                                        <a href="#">
                                            <button className="btn primary-control float-right">
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            List of Employee
                                        </div>
                                        <div className="col-lg-6 text-right">
                                            <div className="d-flex justify-content-end align-items-center">
                                                <form onSubmit={this.loadList} className="mr-1">
                                                    <input type="text" className="form-control mr-1" placeholder="Search" onChange={(e: any) => {
                                                        this.setState({ search: e.target.value })
                                                    }} />
                                                </form>
                                                {userType === 'sadmin' && <Link
                                                    className="btn btn-primary btn-sm btn-sm search-btn"
                                                    to={CONSTANT.url.addEmployeeMaster}>
                                                    <i className="fa fa-plus mr-1"></i>Add Employee
                                            </Link>}
                                                {userType === 'sadmin' && <Link
                                                    className="btn btn-primary btn-sm btn-sm search-btn ml-1"
                                                    to={CONSTANT.url.employeeBulkUpload}>
                                                    <i className="fa fa-upload mr-1"></i>Bulk Upload
                                            </Link>}
                                            </div>

                                            {/* <a className="btn btn-primary btn-sm search-btn btn-sm ml-1"><i className="fa fa-download mr-1"></i>Download</a> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {list ? <PaginationProvider
                                        pagination={
                                            paginationFactory({
                                                custom: true,
                                                page,
                                                sizePerPage: limit,
                                                totalSize: count,
                                                showTotal: true,
                                                pageStartIndex: 1,
                                                firstPageText: 'First',
                                                prePageText: 'Back',
                                                nextPageText: 'Next',
                                                lastPageText: 'Last',
                                                nextPageTitle: 'First page',
                                                prePageTitle: 'Pre page',
                                                firstPageTitle: 'Next page',
                                                lastPageTitle: 'Last page',
                                                withFirstAndLast: true,
                                                alwaysShowAllBtns: true
                                            })
                                        }
                                    >
                                        {
                                            ({
                                                paginationProps,
                                                paginationTableProps
                                            }: any) => (
                                                    <div>
                                                        <BootstrapTable
                                                            remote
                                                            keyField="id"
                                                            data={list}
                                                            columns={columns}
                                                            rowStyle={rowStyle}
                                                            onTableChange={this.onTableChange}
                                                            {...paginationTableProps}
                                                        />
                                                        <div>
                                                            <PaginationListStandalone
                                                                {...paginationProps}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </PaginationProvider> : <div className="text-center">Loading...</div>}
                                    {list && list.length === 0 &&
                                        <div className="text-center"> Record Not Found</div>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    loadList = (e: any) => {
        if (e)
            e.preventDefault()
        const userType = this.state.userType;
        this.setState({ showLoader: true });
        const { page, limit, sort, search } = this.state;
        getEmployeeList(page, limit, sort, userType, search).then((response: any) => {
            if (response.result) {
                this.setState({
                    list: response.result.list,
                    count: response.result.count,
                    showLoader: false
                });
            }
        }, (error: any) => {
            alert(error.message);
        });

        // getEmployeeCount().then((response: any) => {

        //     this.setState({
        //         count: response.result[0].count,
        //         showLoader: false
        //     });
        // }, (error: any) => {
        //     alert(error.message);
        // });
    }

    onTableChange = (type: any, { page, sizePerPage }: any) => {
        console.log(type, page)
        if (!isNaN(page))
            getEmployeeList(page, sizePerPage, 1, this.state.userType, this.state.search).then((response: any) => {
                window.scrollTo(0, 0)
                this.setState({
                    list: response.result.list,
                    page: page,
                    limit: sizePerPage
                });
            }, (error: any) => {
                alert(error.message);
            });

    }

    sendOnboardingEmail = (e: any) => {
        const userId = e.target.dataset.userId;
        this.setState({ showLoader: true });
        sendOnboardingEmail({ userId }).then((response: any) => {
            this.setState({
                showLoader: false
            });
        }, (error: any) => {
            alert(error.message);
        });
    }
}



export default EmployeeList;
