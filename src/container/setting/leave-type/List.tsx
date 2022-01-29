import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../../constant';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';

import { getLeaveTypeList, getLeaveTypeCount } from '../../../action/SettingsActions'
import { getDateParts } from '../../../utils';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
class ListLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            page: 1,
            limit: 20,
            count: 0
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadList()
    }

    quotaTypeFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        if(cell)
            return 'Accrued'
        else
            return 'Preassigned'
    }
    
    accrualCycleDaysFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        if(cell)
            return cell + ' Days'
        else
            return 'NA'
    }

    accrualRateFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        if(cell)
            return cell + ' Day(s)/cycle'
        else
            return 'NA'
    }

    modifiedOnFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        if(cell)
            return getDateParts(cell).relativeTime;
    }

    preassignedQuotaFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return cell + ' Days'
    }
    public render() {
        const { list, page, limit, count } = this.state;

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
                dataField: 'accrual',
                text: 'Quota Type',
                style: {
                    fontSize: '14px'
                },
                formatter: this.quotaTypeFormatter
            },
            {
                dataField: 'accrualRate',
                text: 'Accrual Rate',
                style: {
                    fontSize: '14px'
                },
                formatter: this.accrualRateFormatter
            },
            {
                dataField: 'accrualCycleDays',
                text: 'Accrual Cycle',
                style: {
                    fontSize: '14px'
                },
                formatter: this.accrualCycleDaysFormatter
            },
            {
                dataField: 'preassignedQuota',
                text: 'Preassigned Quota',
                style: {
                    fontSize: '14px'
                },
                formatter: this.preassignedQuotaFormatter
            },
            {
                dataField: 'createdByName',
                text: 'Modified By',
                style: {
                    fontSize: '14px'
                }
            },
            {
                dataField: 'modifiedOn',
                text: 'Modified On',
                style: {
                    fontSize: '14px'
                },
                formatter: this.modifiedOnFormatter
            },
        ]

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="card">
                                <div className="card-header">
                                    <div className="pull-left">
                                        Leave type
                                    </div>
                                    <div className="pull-right">
                                        <Link to={CONSTANT.url.addLeaveType} className="common-btn">
                                            <i className="fa fa-plus" />&nbsp;Add leave type
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                {list !== undefined && <PaginationProvider
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
                                    </PaginationProvider>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }

    loadList = () => {
        const { page, limit } = this.state;
        getLeaveTypeList(page, limit).then((res: any) => {
            this.setState({
                list: res.result
            })
        }).catch((err: any) => {
            console.log(err);
        })

        getLeaveTypeCount().then((res: any) => {
            this.setState({
                count: res.result[0].count
            })
        }).catch((err: any) => {
            console.log(err);
        })
    }

    onTableChange = (type: any, { page, sizePerPage }: any) => {
        if (!isNaN(page))
        getLeaveTypeList(page, sizePerPage).then((response: any) => {
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
}

export default ListLeave;
