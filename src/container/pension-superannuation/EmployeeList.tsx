import moment from 'moment';
import * as React from 'react';
import CONSTANT from '../../constant';
import { Link } from 'react-router-dom';
import Loader from '../../component/common/Loader'
import Header from '../../component/common/Header';
import { getDateParts, onChange } from '../../utils';
import Sidebar from '../../component/common/Sidebar';
import { getPensionEmpList } from '../../action/PensionSuperAnnAction';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import XLSX from "xlsx";

class PensionEmployeeList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            page: 1,
            limit: 20,
            sort: 1,
            count: 0,
            showLoader: false,

        }
    }

    public componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.loadList(null);
    }

    editCellFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        const detailPageURL = CONSTANT.url.editEmployeeBasic.replace(':id', row.id);
        return (<Link to={detailPageURL} target="_blank">
            <i className="fas fa-edit"></i>
        </Link>)
    }

    statusCellFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        const detailPageURL = CONSTANT.url.editEmployeeBasic.replace(':id', row.id);
        return (
            <React.Fragment>
                {row.employmentStatusId == 4 ?
                    (row.superannuatedStatusId == 1 ? <span>Normal</span> : <span>Demise</span>)
                    :
                    <span>Terminated</span>}
            </React.Fragment>
        )
    }

    public render() {
        const { list, page, limit, sort, showLoader, count, search } = this.state;
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
                dataField: 'email',
                text: 'Email',
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
                dataField: 'employmentStatusId',
                text: 'Employement Status',
                formatter: this.statusCellFormatter,
                style: {
                    fontSize: '14px'
                }
            }

            // {
            //     isDummyField: true,
            //     text: 'Edit',
            //     formatter: this.editCellFormatter,
            //     style: {
            //         fontSize: '14px'
            //     },
            //     headerStyle: {
            //         width: '60px',
            //     }
            // }
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
                                            Pension Employee List
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
                                    </PaginationProvider> : <div>No records found</div>}
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
        this.setState({ showLoader: true });
        const { page, limit, sort, search } = this.state;
        getPensionEmpList(page, limit, sort).then((response: any) => {
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
            getPensionEmpList(page, sizePerPage, 1).then((response: any) => {
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

}

export default PensionEmployeeList;
