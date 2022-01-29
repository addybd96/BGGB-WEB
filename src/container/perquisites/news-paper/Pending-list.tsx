import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { onChange, textTransform } from '../../../utils';
import { getNewsPaperAlne } from '../../../action/NewsPaperActions'

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            showLoader: false,
            status: { name: 'status', value: '', error: '', isRequired: true }

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.loadData()

    }

    public render() {
        const { list, status, showLoader } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-right">
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
                                    <div className="float-left ">
                                       <b>News Paper Allowance Pending</b>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center" scope="col">  S. NO. </th>
                                                    <th className="text-center" scope="col">  Employee Name </th>
                                                    <th className="text-center" scope="col">  Claimed Amount </th>
                                                    <th className="text-center" scope="col">  Approved Amount </th>
                                                    <th className="text-center" scope="col">  Year </th>
                                                    <th className="text-center" scope="col">  Status </th>
                                                    <th className="text-center" scope="col">  Payment Status </th>
                                                    <th className="text-center" scope="col">  Action </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={8}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={8}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length > 0 && list.map((l: any, i: any) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td className="text-center"> {i + 1} </td>
                                                                <td className="text-center"> {l.name} </td>
                                                                <td className="text-center"> {l.amount} </td>
                                                                <td className="text-center"> {l.status == 'reject' ? 0:l.actualAmount} </td>
                                                                <td className="text-center"> {moment(l.date).format('YYYY')} </td>
                                                                <td className={`text-center ${l.status == 'pending' && 'text-warning'} ${l.status == 'reject' && 'text-danger'} ${l.status == 'approved' && 'text-success'} `}>
                                                                    {textTransform(l.status)}
                                                                </td>
                                                                {
                                                                    l.showAction &&   <td className="text-center">
                                                                    <Link to={CONSTANT.url.perquisites.newsPaperApproveAllowance.replace(':id', l.id)} >
                                                                        <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                                                                    </Link>

                                                                </td>
                                                                }
                                                             
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
            </React.Fragment >
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value, () => {
            this.loadData(value)
        });
    }



    loadData = (status?: any) => {

        this.setState({ showLoader: true })
        getNewsPaperAlne({ status }).then((res: any) => {
            this.setState({ showLoader: false })
            if (res)
                this.setState({ list: res ? res : [] });
        })
    }
}


export default ComponentName;
