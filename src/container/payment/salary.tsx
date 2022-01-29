import moment from 'moment';
import * as React from 'react';
import CONSTANT from '../../constant';
import { Link } from 'react-router-dom';
import Loader from '../../component/common/Loader'
import Header from '../../component/common/Header';
import { getDateParts, onChange } from '../../utils';
import Sidebar from '../../component/common/Sidebar';
import { getPayRollList, getPayRollListCount } from '../../action/payment';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import XLSX from "xlsx";

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list:[],
            date: { name: 'date', value: '', error: '', isRequired: true },
            page: 1,
            limit: 20,
            sort: 1,
            count: 0,
            status:false,
            showLoader: false,
            // selectedUsers:[],
            isAllSelected:false
        }
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.count();
        this.loadList();

      
    }

    public render() {
        const { list,selectedUsers, page, limit, status, count, date, showLoader} = this.state;
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
            
            {   isDummyField: true,
                text : (
                    <input
                      type="checkbox"
                      name ='all Select'
                      onChange = { this.handleChange }     
                      checked={this.state.isAllSelected }
                    />
                  ),

                formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any, user:any,) => {
                    return (
                        <label className="checkbox-checked">
                            <input type="checkbox" name={row.name} checked={row.isChecked}  onChange = {(e)=>this.handleChange(e,rowIndex)}/> <span className="label-text" ></span>
                        </label>)
                },            
                style: {
                    fontSize: '14px',
                },
            },

            {
                dataField: 'userId',
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
                dataField: 'trnId',
                text: 'Transaction Id',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'trndate',
                text: 'Transaction Date',
                style: {
                    fontSize: '14px'
                }

            },
            {
                dataField: 'net',
                text: 'Amount',
                style: {
                    fontSize: '14px',
                    backgroundColor: '#26b2ff'
                },


            },
            {
                dataField: 'trnStatus',
                text: 'Status',
                formatter: (cell: any, row: any) => {
                    return <span className={row.trnStatus ? 'approved-leave' : 'pending-leave'} style={{ width: '80px' }} >{row.trnStatus ? 'Completed' : 'Pending'}</span>
                },
                style: {
                    fontSize: '14px',
                },


            },
            {
                text: 'Action',
                isDummyField: true,
                formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
                    return (
                        <Link to={`${CONSTANT.url.payment.updateTrans}?id=${row.id}&name=${row.name}(${row.employeeId})&sch=payroll&tb=payrollMaster`} >
                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                        </Link>)
                },
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
                            
                                  
                                <div className="action float-left col-lg-2">
                                    <Link to={`${CONSTANT.url.payment.updateTrans}?id=${this.state.list?.filter((item:any)=>item.isChecked).map((user:any)=>user.id).join()}&name=${this.state.list?.filter((item:any)=>item.isChecked).map((user:any)=>user.name).join()}(${this.state.list?.filter((item:any)=>item.isChecked).map((user:any)=>user.id).join()})&sch=payroll&tb=payrollMaster`} >
                                    <button className=" btn btn-primary " >Process Selected</button>
                                    </Link>
                                </div>
  

                                <div className="action float-left col-lg-2">
                                    <button onClick={this.downloadExcel} className=" btn btn-primary ">Download Excel</button>
                                </div>
                                    <div className="float-right col-lg-2 ">
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

    onTableChange = (type: any, { page, sizePerPage }: any) => {
        console.log(type, page)
        if (!isNaN(page))
            getPayRollList(page, sizePerPage, this.state.status, this.state.date.value || moment().format('YYYY-MM-DD'))
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

     handleChange = (e:any,rowIndex?:any) => {
         
       const { list } = this.state;
       if(e.target.name === 'all Select'){

       let tempUser = list.map((user:any)=> { return {...user ,isChecked :e.target.checked }} )
       this.setState({list:tempUser, isAllSelected:e.target.checked})
      } else {
           list[rowIndex]  = {...list[rowIndex],isChecked :e.target.checked}
           this.setState({list:[...list]})

      }
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
        onChange(this, name, value, () => {
            this.count()
            this.loadList()
        });
    }

    loadList = () => {
        const { page, limit, status, date } = this.state;
        this.setState({ list: undefined })
        const d = date.value || moment().format('YYYY-MM-DD')
        getPayRollList(page, limit, status, d)
            .then((res: any) => {
                if (res && res.result)
                    this.setState({ list: res.result }); 
            })
    }

    count = () => {
        const { date,status } = this.state;
        const d = date.value || moment().format('YYYY-MM-DD')
        getPayRollListCount(d,status)
            .then((res: any) => {
                if (res) {
                    this.setState({ count: res.result? res.result.count:'' });
                }
            })
    }

    downloadExcel = (e: any) => {
        const { list, date } = this.state;
        if (list.length === 0) {
            alert('No records found.');
            return;
        }
        let filename = `leave-balance.xlsx`;
        let dataToExport: any = [];
        var ws_name = "Sheet1";
        list.map(function (item: any) {
            delete item.code;
            dataToExport.push({
                Dated:item.date,
                name:item.name,
                'Account Number' : item.accountNumber,
                Abasic:item.abasic,
                apqp:item.apqp,
                asppay:item.asppay,
                basic:item.basic,
                branchLocation:item.branchLocation,
                cca:item.cca,
                ccaPercentage:item.ccaPercentage,
                companyBranch:item.companyBranch,
                conAmount:item.conAmount,
                covidAmount:item.covidAmount,
                cycleAmount:item.cycleAmount,
                da:item.da,
                department:item.department,
                designation:item.designation,
                employeeId:item.employeeId,
                officAmount:item.officAmount,
                spAllow:item.spAllow,
                totalAllow:item.totalAllow,
                totalDeduc:item.totalDeduc,
                trnId:item.trnId,
                workingDay:item.workingDay
                
            });
        });
        var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, filename);
    }


}

export default ComponentName;
