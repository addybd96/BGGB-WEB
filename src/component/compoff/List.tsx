import * as React from 'react';
import * as moment from 'moment'
import ApprovalModal from './ApprovalModal'
import {approveCompOff} from '../../action/CompOffActions'
import {Link} from 'react-router-dom'
import ModalWindow from '../common/ModalWindow'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
export default class CompOffList extends React.Component<any, any>
{

    constructor(props:any)
    {
        super(props)
        this.state = {
            isModalOpen: false
        }
    }

    public render() {
        const {isModalOpen} = this.state
        const rowStyle = (row:any, rowIndex:any) => {
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
                text: 'Employee Code',
                align: 'center',
                formatter: this.empCodeCellFormatter
            },
            {
                dataField: 'name',
                text: 'Name',
                align: 'center'
            },
            {
                dataField: 'date',
                text: 'Date',
                formatter: this.dateCellFormatter,
                align: 'center'
            },
            {
                dataField: 'description',
                text: 'Reason',
                align: 'center'
            },
            {
                dataField: 'status',
                text: 'Status',
                formatter: this.statusCellFormatter,
                align: 'center'
            },
            {
                dataField: 'action',
                text: 'Action',
                isDummyField: true,
                formatter: this.actionCellFormatter,
                align: 'center'
            },
        ]
        return (<React.Fragment>
            <PaginationProvider
                    pagination={
                        paginationFactory({
                            custom: true,
                            page: this.props.page,
                            sizePerPage: this.props.limit,
                            totalSize: this.props.count,
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
                                <React.Fragment>
                                    <BootstrapTable
                                        remote
                                        keyField='id'
                                        rowStyle={rowStyle}
                                        columns={columns}
                                        data={this.props.compoffs}
                                        onTableChange={this.props.onTableChange}
                                        {...paginationTableProps} />

                                    <div>
                                        <PaginationListStandalone
                                            {...paginationProps}
                                        />
                                    </div>
                                </React.Fragment>
                            )
                    }
                </PaginationProvider>
            {
                this.state.isModalOpen ? <ModalWindow
                    title="Update Comp-Off Status"
                    backdrop="static"
                    toggleModal={this.toggleModal}>
            <ApprovalModal isModalOpen={isModalOpen} dismissModal={this.dismissModal} onSubmit={this.onSubmit.bind(this)} />
                </ModalWindow> : null
            }
        </React.Fragment>)
    }

    renderLeavesTable = () => {
        return this.props.compoffs.map((leave: any, lIndex: number) => {
            return (<tr key={lIndex}>
                <td className="text-center"><Link to={`/comp-offs/${leave.employeeId}`}>{leave.employeeId}</Link></td>
                <td className="text-center">{leave.name}</td>
                <td className="text-center">{moment(leave.date).format('YYYY-MM-DD')}</td>
                <td className="text-center">{leave.description}</td>
                <td className="text-center"><span className={(leave.status === 'pending' ? 'pending-leave' : leave.status === 'rejected' ? 'rejected-leave' : 'approved-leave ') + ' text-capitalize'}>{leave.status}</span></td>
                <th className="text-center"><a href="#" onClick={(e:any)=>{e.preventDefault(); this.toggleModal(leave.id)}}><i className="fa fa-hand-pointer-o"></i></a></th>
            </tr>)
        })
    }

    empCodeCellFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return <Link to={`/comp-offs/${cell}`}>{cell}</Link>
    }

    dateCellFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return moment(cell.date).format('YYYY-MM-DD')
    }

    statusCellFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return <span className={(row.status === 'pending' ? 'pending-leave' : row.status === 'rejected' ? 'rejected-leave' : 'approved-leave ') + ' text-capitalize'}>{row.status}</span>
    }

    actionCellFormatter = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return <a href="#" onClick={(e: any) => { e.preventDefault(); this.toggleModal(row.id) }}><i className="fa fa-hand-pointer-o"></i></a>
    }

    toggleModal = (e:any) => {
        this.setState({isModalOpen: !this.state.isModalOpen, selectedId: e})
    }

    dismissModal = () => {
        this.setState({isModalOpen: false})
    }

    onSubmit = (payload:any) => {
        payload.id=this.state.selectedId
        approveCompOff(payload).then((resp:any)=>{
            this.setState({isModalOpen: false})
            this.props.loadList(this.props.page, this.props.limit);
            console.log(payload)
        }).catch((err:any)=>{
            console.log(err)
        })
    }
}