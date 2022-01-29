import moment from 'moment';
import * as React from 'react';
import CONSTANT from '../../constant';
import { Link } from 'react-router-dom';
import Loader from '../../component/common/Loader'
import Header from '../../component/common/Header';
import { getDateParts, onChange } from '../../utils';
import Sidebar from '../../component/common/Sidebar';
import { getPensionList, getPensionListCount, revertPension } from '../../action/PensionSuperAnnAction';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import XLSX from "xlsx";

class PensionDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            date: { name: 'date', value: '', error: '', isRequired: true },
            page: 1,
            limit: 20,
            sort: 1,
            count: 0,
            isu: undefined,
            ttumData: undefined,
            showLoader: false,

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.count();
        this.loadList();
    }

    public render() {
        const { list, page, limit, sort, count, date, showLoader } = this.state;
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
                dataField: 'employeeId',
                text: 'Employee Id',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'name',
                text: 'Name',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'designation',
                text: 'Designation',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'department',
                text: 'Department',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'companyBranch',
                text: 'Branch',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'basic',
                text: 'Basic',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'pqp',
                text: 'PQP',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'sppay',
                text: 'Sp Pay',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'da',
                text: 'D.A',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'totalAllow',
                text: 'Gross Salary',
                style: {
                    fontSize: '14px',
                    backgroundColor: '#0FBF53'
                },

            },
            {
                dataField: 'prov',
                text: 'Prov. Fund',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'nps',
                text: 'NPS',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'inctAmount',
                text: 'Income Tax',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'otherDeduction',
                text: 'Other Deduction',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'totalDeduc',
                text: 'Total',
                style: {
                    fontSize: '14px',
                    backgroundColor: '#ff3030f2'
                },

            },
            {
                dataField: 'net',
                text: 'net',
                style: {
                    fontSize: '14px',
                    backgroundColor: '#26b2ff'
                },


            },
            {
                dataField: 'status',
                text: 'Status',
                formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
                    return row.status ? 'Confirm' : 'Pending'
                }
                ,
                style: {
                    fontSize: '14px',
                },


            },
            {
                text: 'Slip',
                isDummyField: true,
                formatter: this.getSalarySlip,
                style: {
                    fontSize: '14px',
                },


            },

        ]

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">

                    <div className="row">
                        <Sidebar />

                        <div className="col-lg-11">
                            <div className="row mt-4">
                                <div className="col-12 col-lg-4">
                                    <div className="card attendance text-left">
                                        <div className="card-header">
                                            <b>March 2020 | 31 Payable Days</b>
                                        </div>

                                        <div className="col-lg-12 mt-4">
                                            <div className="row">
                                                <div className="col-lg-12 hours-left">
                                                    <p><strong>41,31,721</strong></p>
                                                    <span>PAYROLL COST   </span>
                                                </div>
                                                <div className="col-lg-12 hours-left">
                                                    <p><strong>38,31,721</strong></p>
                                                    <span>EMPLOYEES' NET PAY</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <div className="card attendance text-left">
                                        <div className="card-header"> <b>Days</b></div>
                                        <div className="text-center  mt-4"><h3>23</h3></div>
                                        <p className="text-center">PAY DAY</p>
                                        <p className="text-center"> {date.value ? moment(date.value).startOf('month').format('MMM Do') : moment().startOf('month').format('MMM Do')} - {date.value ? moment(date.value).endOf('month').format('MMM Do') : moment().endOf('month').format('MMM Do YYYY')}</p>
                                        <p className="text-center">{count} Employees</p>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <div className="card emp-leave-details text-left">
                                        <div className="card-header">
                                            <b>Taxes &amp; Deductions</b>
                                        </div>
                                        <div className="col-lg-12 mt-2">
                                            <div className="col-lg-12 pl-0 pr-0">
                                                <div className="row">
                                                    <div className="col-12 col-lg-12 leave-date">
                                                        <p className="mb-0">Taxes</p>
                                                        <span>998,332</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 pl-0 pr-0">
                                                <div className="row">
                                                    <div className="col-12 col-lg-12 leave-date">
                                                        <p className="mb-0">Provident Fund Deductions</p>
                                                        <span>998,332</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 pl-0 pr-0">
                                                <div className="row">
                                                    <div className="col-12 col-lg-12 leave-date">
                                                        <p className="mb-0">ESIC Deductions</p>
                                                        <span>998,332</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 pl-0 pr-0">
                                                <div className="row">
                                                    <div className="col-12 col-lg-12 leave-date">
                                                        {/* <p className="mb-0">PT Deductions</p>
                                                        <span>998,332</span> */}
                                                        {/* <button className="btn btn-secondary" onClick={this.downloadXL}>Download Salary XL</button> */}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left col-lg-2">
                                        <b>Process Pension List</b>
                                    </div>
                                    <div className="float-left col-lg-2">
                                        {list && list.length > 0 && list[0].status == false && < button onClick={() => { this.submit('confirm') }} className="btn btn-secondary">Confirm PayRoll</button>}
                                    </div>
                                    <div className="float-left col-lg-2">
                                        {list && list.length > 0 && list[0].status == false && <button onClick={() => { this.submit('revert') }} className="btn btn-secondary">Revert PayRoll</button>}
                                    </div>
                                    <div className="float-right col-lg-4 ">
                                        <input
                                            type="date"
                                            className={date.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                            name={date.name}
                                            value={date.value}
                                            onChange={this.onChange}
                                        />
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

    getSalarySlip = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        const detailPageURL = `${CONSTANT.url.pensionSlip}?id=${row.id}&date=${row.date}`;
        return (<Link to={detailPageURL} target="_blank">
            <i className="far fa-file-powerpoint"></i>
        </Link>)
    }

    onTableChange = (type: any, { page, sizePerPage }: any) => {
        console.log(type, page)
        if (!isNaN(page))
            getPensionList(page, sizePerPage, 1, this.state.date.value || new Date()).then((response: any) => {
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
        onChange(this, name, value, () => {
            this.count()
            this.loadList()
        });
    }


    submit = (status: any) => {
        this.setState({ showLoader: true })
        revertPension({ status, date: this.state.date.value || new Date() }).then((res: any) => {
            this.setState({ showLoader: false })
            if (res && res.result) {
                alert(`PayRoll ${status} Successfully`)
                this.count()
                this.loadList()
            }

        })
    }

    loadList = () => {
        const { page, limit, sort, date } = this.state;
        const d = date.value || moment().format('YYYY-MM-DD')
        getPensionList(page, limit, sort, d).then((res: any) => {
            if (res && res.result)
                this.setState({ list: res.result });
        })
    }
    count = () => {
        const { date } = this.state;
        const d = date.value || moment().format('YYYY-MM-DD')
        getPensionListCount(d).then((res: any) => {
            if (res && res.result) {
                let len = res.result.length;
                this.setState({ count: len, ttumData: res.result });
            }
        })
    }

    downloadXL = () => {

        // const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        // const fileExtension = '.xlsx';

        // const exportToCSV = (csvData, fileName) => {
        //     const ws = XLSX.utils.json_to_sheet(csvData);
        //     const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        //     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        //     const data = new Blob([excelBuffer], { type: fileType });
        //     FileSaver.saveAs(data, fileName + fileExtension);
        // }

        let date = new Date();
        let filename = `MTTU-${date.getTime()}.xlsx`;
        let ws_name = "Sheet1";
        let dataToExport = this.state.ttumData.map((item: any, index: any) => {
            console.log("")
            return {
                'Emp name': item.name,
                'Emp code': item.employeeId,
                'Designation': item.designation,
                'Region': '',
                'Sol ID': '',
                'Branch': item.companyBranch,

                'Earning Component': '',
                'BASIC': item.basic,
                'PQP': item.pqp,
                "D.A.": item.da,
                "SP. Allowance.": item.spAllow,
                "H.R.A.": item.hra,
                "C.C.A.": item.cca,
                "SP. PAY": item.sppay,
                "Handicap Allowance.": item.officAmount,
                "CONVEYANCE": item.convAmount,
                "WASHING Allowance.": item.washingAmount,
                "CYCLE Allowance.": item.cycleAmount,
                "OTHER Allowance.": '',
                "ARREARS/ D.A. ARR.": item.errAmount,

                "Total Earning": item.totalAllow,

                "Deduction Componenets": '',
                "PROV. FUND": item.prov,
                "L.I.C.": item.lifeInsurance,
                "NPS": item.nps,
                "PROF. TAX": item.profTax,
                "Welfare Association": item.societyAmount,
                "FESTIVAL ADV.": item.festivalAd,
                "GROUP INSU.": item.gpAmount,
                "INCOME TAX": item.inctAmount,
                "WELFARE FUND": item.welfareAmount,
                "UNION FEE": item.unionAmount,
                "HOUSING LOAN": item.hsAmount,
                "VEHICAL LOAN": item.vehAmount,
                "CONSUMER LOAN": item.conAmount,
                "OTHER DEDUCTION 1": item.otherDeduction,
                "OTHER DEDUCTION 2": '',
                "Total Deduction": item.totalDeduc,
                "Net salary": item.net,

            }

        });

        var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(dataToExport);
        // add worksheet to workbook /
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        // write workbook /
        XLSX.writeFile(wb, filename);

    }
}

export default PensionDetail;
