import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { onChange, validateForm } from '../../../utils';
import { getTrevelAlneById, approve } from '../../../action/PerqTravelAllowanceAction';
import { getAllowanceNameById } from '../../../action/SettingsActions';
import moment from 'moment';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: undefined,
            userId: undefined,
            userRc: undefined,
            Status: undefined,
            approvalStatus: false,
            allowanceName: "Fuel",
            date: { name: 'date', value: '', error: '', isRequired: true },
            actualAmount: { name: 'actualAmount', value: '', error: '', isRequired: true },
            amount: { name: 'amount', value: '', error: '', isRequired: true },
            status: { name: 'status', value: '', error: '', isRequired: true },
            scheme: { name: 'scheme', value: '', error: '', isRequired: true },
            remarks:{ name: 'remarks', value: '', error: '', isRequired: true },
            showLoader: false,

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.loadData();
    }

    public render() {
        const { showLoader, Status, date, amount,scheme, actualAmount, status, userRc, approvalStatus, remarks } = this.state;

        console.log(date);

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <form onSubmit={this.onSubmit}>
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-12 pl-0">
                                            {/* <h5 className="heading-h1">Add Vehicle Information</h5> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Approve travel </b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div className="row">

                                                    <div className="col-lg-6 form-group">
                                                        <label>Claimed Amount</label>
                                                        <NumberFormat
                                                            disabled
                                                            onChange={this.onChange}
                                                            className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={amount.name}
                                                            value={amount.value}

                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Approved Amount</label>
                                                        <NumberFormat
                                                            disabled
                                                            onChange={this.onChange}
                                                            className={actualAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={actualAmount.name}
                                                            value={Status == 'reject' ? 0:actualAmount.value}

                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Reimbursing Month</label>
                                                        <input
                                                            disabled
                                                            type="text"
                                                            onChange={this.onChange}
                                                            className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={date.name}
                                                            value={moment(date.value).format('MMM YYYY')}

                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Status</label>
                                                        <select
                                                            disabled={Status == "pending" || Status == "forward" ? false : true}
                                                            onChange={this.onChange}
                                                            className={status.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={status.name}
                                                            value={status.value}

                                                        >
                                                            <option >--Select--</option>
                                                            <option value="">Pending</option>
                                                            {approvalStatus === true ? <option value="approved">Approved</option> : ""}
                                                            <option value="reject">Reject</option>
                                                            <option value="forward">Forward</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Scheme</label>
                                                        <input
                                                            disabled
                                                            type="text"
                                                            onChange={this.onChange}
                                                            className={scheme.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={scheme.name}
                                                            value={scheme.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Remarks</label>
                                                        <input
                                                            disabled={Status == "pending" || Status == "forward" ? false : true}
                                                            type="text"
                                                            onChange={this.onChange}
                                                            className={remarks.error.length > 0 && status.value==="reject"  ? "form-control is-invalid" : "form-control"}
                                                            name={remarks.name}
                                                            value={remarks.value}
                                                        />
                                                    </div>

                                                    <div className="col-lg-11 mb-2">
                                                        <img src={`${process.env.REACT_APP_BASE_URL}/userRC/${userRc}`} alt="" />
                                                    </div>

                                                </div>
                                            </div>
                                            {Status && (Status == "pending" || Status == "forward") &&
                                                <div className="col-lg-12 ">
                                                    <Link to={CONSTANT.url.perquisites.vpendingAllowance} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
                                                    <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {showLoader && <Loader />}
            </React.Fragment >
        )
    }



    onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;
        if(name==='status' && (value==='' || value ==='forward' || value==='approved')){
            if(value===''){
                value='pending'
            }
           let remarks=this.state.remarks
            remarks.value=value
            this.setState({
                remarks:remarks
            })
        }
        if(name==='status' && (value==='reject')){
           let remarks=this.state.remarks
            remarks.value=''
            this.setState({
                remarks:remarks
            })
        }
        onChange(this, name, value);
    }

    loadData = () => {
        const { id } = this.props.match.params;
        const { allowanceName } = this.state;
        this.setState({ showLoader: true })
        getTrevelAlneById({ id }).then((res: any) => {
            if (res === undefined || res === "undefined") {
                this.props.history.push(CONSTANT.url.perquisites.vpendingAllowance)
            } else {
                this.setState({
                    id: res.id,
                    showLoader: false,
                    Status: res.status,
                    scheme:{...this.state.scheme, value:res.scheme},
                    userId: res.userId,
                    userRc: res.userRc,
                    amount: { ...this.state.amount, value: res.amount },
                    status: { ...this.state.status, value: res.status == "pending" ? "" : res.status },
                    actualAmount: { ...this.state.actualAmount, value: res.actualAmount },
                    date: { ...this.state.date, value: moment(res.date).format('YYYY-MM-DD') },
                })
                getAllowanceNameById(res.userId, allowanceName).then((res: any) => {
                    if (res)
                        this.setState({
                            showLoader: false,
                            approvalStatus: res.approvalStatus,
                        })
                })
            }
        })
    }

    private onSubmit = (e: any) => {
        e.preventDefault()
        const { amount, date, status, actualAmount, id, userId, remarks} = this.state;
        
        if (validateForm(this) && !(status == 'approved' || status == "reject")) {
            this.setState({ showLoader: true })
            approve({ userId, actualAmount: actualAmount.value, remarks:remarks.value, amount: amount.value, date: date.value, status: status.value, id }).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.push(CONSTANT.url.perquisites.vpendingAllowance)
                }
            })

        }
    }



}

export default ComponentName;
