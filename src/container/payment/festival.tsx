import moment from 'moment';
import * as React from 'react';
import CONSTANT from '../../constant';
import { Link } from 'react-router-dom';
import Loader from '../../component/common/Loader'
import Header from '../../component/common/Header';
import { getDateParts, onChange } from '../../utils';
import Sidebar from '../../component/common/Sidebar';
import { getFestivalAdvance, } from '../../action/payment';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import XLSX from "xlsx";

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            date: { name: 'date', value: '', error: '', isRequired: true },
            status: false,
            page: 1,
            limit: 20,
            sort: 1,
            count: 0,
            isu: undefined,
            showLoader: false,

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.loadList();
    }
    empCodeCellFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return <span>{cell}</span>
    }


    public render() {
        const { list, page, limit, status, count, showLoader } = this.state;
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
                dataField: 'userId',
                text: 'Employee Code',
                align: 'center',
                // formatter: this.empCodeCellFormatter
            },
            {
                dataField: 'name',
                text: 'Name',
                align: 'center'
            },
            {
                dataField: 'amount',
                text: 'Amount',
                align: 'center'
            },
            {
                text: 'Download Excel',
                isDummyField: true,
                formatter: (cell: any, row: any,) => {
                    return (
               <button className=" btn btn-secondary" name = {row.userId} onClick={(e)=>this.downloadExcel(e)}>Download Excel</button> )
                },
                align: 'center'
            },
            {
                dataField: 'trndate',
                text: 'Transaction Date',
                align: 'center'
            },
            {
                dataField: 'trnId',
                text: 'Transaction Id',
                align: 'center'
            },
            {
                dataField: 'trnStatus',
                text: 'Status',
                formatter: (cell: any, row: any) => {
                    return <span className={row.trnStatus ? 'approved-leave' : 'pending-leave'} style={{ width: '80px' }} >{row.trnStatus ? 'Completed' : 'Pending'}</span>
                },
                align: 'center',
                style: { width: '150px' }
            },
            {
                dataField: 'action',
                text: 'Edit',
                isDummyField: true,
                formatter: (cell: any, row: any,) => {
                    return (
                        <Link to={`${CONSTANT.url.payment.updateTrans}?id=${row.id}&name=${row.name}(${row.employeeId})&sch=employee&tb=fastivalAdvance`} >
                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                        </Link>)
                },
                align: 'center'
            },
        ]

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">

                    <div className="row">
                        <Sidebar />

                        <div className="col-lg-11">

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left col-lg-2">
                                        <select
                                            // style={{ width: "50%" }}
                                            value={status}
                                            name="status"
                                            className="form-control"
                                            onChange={this.onChange}
                                        >
                                            <option value="false">Pending</option>
                                            <option value="true">Completed</option>
                                        </select>
                                    </div>
                                    <div className="float-right col-lg-2" >
                                        <select
                                            style={{ width: "50%" }}
                                            value={limit}
                                            name="limit"
                                            className="form-control"
                                            onChange={this.onChange}
                                        >
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        {list === undefined && <div className="text-center">Loading...</div>}
                                        {list != undefined && list.length == 0 && <div className="text-center">No Record Found</div>}
                                        {(list != undefined && list.length > 0) && <PaginationProvider
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
                                                ({ paginationProps, paginationTableProps }: any) => (
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
                                        </PaginationProvider>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {showLoader && <Loader />}
            </React.Fragment >
        )
    }

    onTableChange = (type: any, { page, sizePerPage }: any) => {
        console.log(type, page)
        if (!isNaN(page))
            getFestivalAdvance(page, sizePerPage, this.state.status)
                .then((response: any) => {
                    window.scrollTo(0, 0)
                    this.setState({
                        list: response.result,
                        page: page,
                        limit: sizePerPage
                    });
                }, (error: any) => {
                    alert(error.message);
                });

    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "limit") {
            this.setState({ limit: value }, () => {
                this.loadList()
            })
            return
        }
        if (name === "status") {
            this.setState({ status: value }, () => {
                this.loadList()
            })
            return
        }
    }

    loadList = () => {
        const { page, limit, status, } = this.state;
        this.setState({ list: undefined })
        getFestivalAdvance(page, limit, status).then((res: any) => {
            if (res && res.result)
                this.setState({ list: res.result.list, count: res.result.count });
        })
    }
    
    downloadExcel = (l:any) => {
        const { list } = this.state;
        if (list.length === 0) {
            alert('No records found.');
            return;
        }
        let filename = `${l.currentTarget.name}.xlsx`;
        let dataToExport: any = [];
        var ws_name = "Sheet1";
        const data = list.filter((item: any) => l.currentTarget.name ? item.userId == l.currentTarget.name : true).map((item: any, index: number) => {
            delete item.code;
               dataToExport.push({
               'Ec Number':item.employeeId,
                Name:item.name,
                Amount:item.amount,
              'Account Number':item.accountNumber,
  
            });
        });
        var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, filename);
    }


}

export default ComponentName;
