import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { onChange, textTransform } from '../../../utils';
import { getNewsPaperAlneByUserId, updateBCAllowanceWithdrawl } from '../../../action/BriefCasePaperActions'
import ModalWindow from '../../../component/common/ModalWindow';
import WithdrawAllowanceModal from '../travel-allowance/WithdrawlAllowanceModal';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            showLoader: false,
            status: { name: 'status', value: '', error: '', isRequired: true },
            isModalOpen: false,
            updateData: null
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.loadData()

    }

    public render() {
        const { list, status, showLoader, isModalOpen } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                        <b className="mt-1">BriefCase Allowance</b>

                            <div className="card mt-3">

                                <div className="card-header">
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.perquisites.briefCasePaperAddAllowance}><i className="fa fa-plus"></i></Link>
                                    </div>
                                    <div className="float-left ">

                                        <select
                                            onChange={this.onChange}
                                            className={status.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            name={status.name}
                                            value={status.value}

                                        >
                                            <option value="">All</option>
                                            <option value="approved">Approved</option>
                                            <option value="pending">Pending</option>
                                            <option value="reject">Reject</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center" scope="col">  S. NO. </th>
                                                    <th className="text-center" scope="col">  Claimed Amount </th>
                                                    <th className="text-center" scope="col">  Approved Amount </th>
                                                    <th className="text-center" scope="col">  From Date </th>
                                                    <th className="text-center" scope="col">  To Date </th>
                                                    <th className="text-center" scope="col">  Status </th>
                                                    <th className="text-center colspan-2 " scope="col "> Pending For Approval - Name </th>
                                                    <th className="text-center" scope="col"> Pending For Approval - Employee Code </th>
                                                    <th className="text-center" scope="col">  View </th>
                                                    <th className="text-center" scope="col">
                            {" "}
                            Withdraw{" "}
                          </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={6}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={6}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length > 0 && list.map((l: any, i: any) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td className="text-center"> {i + 1} </td>
                                                                <td className="text-center"> {l.amount} </td>
                                                                <td className="text-center"> {l.actualAmount == 0 ? 'Pending' : l.actualAmount} </td>
                                                                <td className="text-center"> {moment(l.date).format('MMM Do YYYY')} </td>
                                                                <td className="text-center"> {moment(l.toDate).format('MMM Do YYYY')} </td>
                                                                <td className={`text-center ${l.status == 'pending' && 'text-warning'} ${l.status == 'reject' && 'text-danger'} ${l.status == 'approved' && 'text-success'} `}>
                                                                    {textTransform(l.status)}
                                                                </td>
                                                                <td className="text-center">{l.name}</td>
                                                                <td className="text-center">{l.employeeId}</td>
                                                                <td className="text-center">
                                                                    <Link to={CONSTANT.url.perquisites.briefCasePaperAllowanceDetail.replace(':id', l.id)} >
                                                                        <i className="fas fa-eye"></i>
                                                                    </Link>
                                                                </td>
                                                                <td className="text-center">
                                  {l.status==='pending' || l.status==='forward' ? (
                                    <i
                                      className="fa fa-hand-pointer-o"
                                      aria-hidden="true"
                                      onClick={() => this.toggleModal(l)}
                                    ></i>
                                  ) : (
                                    ""
                                  )}
                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {showLoader && <Loader />}
                {this.state.isModalOpen ? (
          <ModalWindow
            title="Withdraw Allowance"
            backdrop={true}
            toggleModal={this.toggleModal}
          >
            <WithdrawAllowanceModal
              isModalOpen={isModalOpen}
              dismissModal={this.dismissModal}
              onSubmit={(data: any) => this.updateWithdrawl(data)}
            />
          </ModalWindow>
        ) : null}
            </React.Fragment >
        )
    }

    updateWithdrawl = (payload: any) => {
        let model={
            ...this.state.updateData, ...payload
        }
        updateBCAllowanceWithdrawl(model).then((resp: any) => {
            this.dismissModal()
            this.loadData()
            alert(resp.message)
        })
      };
      toggleModal = (item: any) => {
        this.setState({ isModalOpen: !this.state.isModalOpen, updateData: item });
      };
    
      dismissModal = () => {
        this.setState({ isModalOpen: false });
      };
    
    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value, () => {
            this.loadData(value)
        });
    }

    loadData = (status?: any) => {

        this.setState({ showLoader: true })
        getNewsPaperAlneByUserId({ status }).then((res: any) => {
            this.setState({ showLoader: false })
            if (res)
                this.setState({ list: res ? res : [] });
        })
    }
}


export default ComponentName;
