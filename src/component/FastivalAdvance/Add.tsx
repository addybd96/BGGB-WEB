import * as React from 'react';
import * as moment from 'moment'
import { getLeaveTypeList } from '../../action/SettingsActions'
import { onChange, setOptions, isEmpty, setError, validateForm } from './../../utils';
import Loader from '../../component/common/Loader';
import NumberFormat from 'react-number-format';

class AddLeaveComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            amount: { name: 'amount', value: '', error: '', isRequired: true, },
            reason: { name: 'reason', value: '', error: '', isRequired: true, },
            // isTenureManual: { value: false, name: 'optHundredFiftyHRA', error: '', isRequired: false },
            tenure: { name: 'tenure', value: 10, error: '', options: [] },
            showLoader: false,
            tenureMonths:[1,2,3,4,5,6,7,8,9,10]
        }
        this._onChange = this._onChange.bind(this)
    }

    componentDidMount() {
        this.loadList()
    }

    public render() {
        const { amount, reason, tenure, showLoader } = this.state;
        const {
            totalAllowance,
            da,
            hra,
            specialAllowance,
            cca,
            basic,
            pqp,
            sppay
        }=this.props.salaryData ? this.props.salaryData:''
        //console.table([empId, fromDate, toDate, dayType, type, reason, showLoader])

        if (showLoader)
            return (<Loader />)

        return (
            <React.Fragment>
                <div className="col-lg-11">
                    <form onSubmit={this._submitForm}>
                        <div className="col-lg-12 mt-4">
                            <div className="row">
                                <div className="col-lg-12 pl-0">
                                    <h5 className="heading-h1">Apply for Fastival Adv.</h5>
                                </div>

                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-header">
                                <b>Advance
                              </b>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-6 form-group">
                                                <label>Basic</label>
                                                <NumberFormat
                                                    className="form-control"
                                                    placeholder="Enter amount"
                                                    value={basic}
                                                    onChange={this._onChange}
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Pqp</label>
                                                <NumberFormat
                                                    className="form-control"
                                                    placeholder="Enter amount"
                                                    name={amount.name}
                                                    value={pqp}
                                                    onChange={this._onChange}
                                                    disabled={true}
                                                />
                                            </div>
                                            
                                            </div>
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-6 form-group">
                                                <label>Sppay</label>
                                                <NumberFormat
                                                    className="form-control"
                                                    placeholder="Enter amount"
                                                    name={amount.name}
                                                    value={sppay}
                                                    onChange={this._onChange}
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>DA</label>
                                                <NumberFormat
                                                className="form-control"
                                                    placeholder="Enter amount"
                                                    name={amount.name}
                                                    value={da}
                                                    onChange={this._onChange}
                                                    disabled={true}
                                                />
                                            </div>
                                            
                                            </div>
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-6 form-group">
                                                <label>HRA</label>
                                                <NumberFormat
                                                className= "form-control"
                                                    placeholder="Enter amount"
                                                    name={amount.name}
                                                    value={hra}
                                                    onChange={this._onChange}
                                                    disabled={true}

                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Speacial allowance</label>
                                                <NumberFormat
                                                    className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter amount"
                                                    name={amount.name}
                                                    value={specialAllowance}
                                                    onChange={this._onChange}
                                                    disabled={true}
                                                />
                                            </div>
                                            
                                            </div>
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                        <div className="row">
                                         
                                            <div className="col-lg-6 form-group">
                                                <label>CCA</label>
                                                <NumberFormat
                                                    className="form-control"
                                                    placeholder="Enter amount"
                                                    name={amount.name}
                                                    value={cca}
                                                    onChange={this._onChange}
                                                    disabled={true}

                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Total Salary</label>
                                                <NumberFormat
                                                    className="form-control"
                                                    placeholder="Enter amount"
                                                    name={amount.name}
                                                    value={totalAllowance}
                                                    onChange={this._onChange}
                                                    disabled={true}
                                                />
                                            </div>
                                            
                                            </div>
                                            </div>
                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-6 form-group">
                                                <label>Claim Amount</label>
                                                <NumberFormat
                                                    allowLeadingZeros={false}
                                                    allowNegative={false}
                                                    thousandSeparator={false}
                                                    className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter amount"
                                                    name={amount.name}
                                                    value={amount.value}
                                                    onChange={this._onChange}
                                                />
                                            </div>
                                            {/* <div className="col-lg-3 form-group d-flex justify-content-center align-items-center mt-4">
                                                <label className="mt-1">Opt for select tenure ?&nbsp;&nbsp;&nbsp; </label>
                                                <input type="checkbox" onChange={this.onCheckboxChange} checked={isTenureManual.value} />
                                            </div> */}
                                            <div className="col-lg-6 form-group">
                                                <label>Select Tenure</label>
                                                <select
                                                    name={tenure.name}
                                                    value={tenure.value}
                                                    onChange={this._onChange} className={tenure.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                                                    <option value={10}>10</option>
                                                    {
                                                        this.state.tenureMonths.map((month:any)=>{
                                                            return <option value={month}>{month}</option>
                                                        })}
                                                    
                                                </select>
                                            </div>
                                            <div className="col-lg-12 form-group">
                                                <label>Reason and Festival for Advance
                                              </label>
                                                <textarea name={reason.name} value={reason.value}
                                                    onChange={this._onChange}
                                                    className={reason.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    rows={5} id="comment"
                                                    placeholder="Enter Reason for Fastival Advance">

                                                </textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 ">
                                        <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }

    renderTypeSelect = (type: any) => {
        if (this.state.leaveTypes.options)
            return (<select name={type.name} value={type.value}
                onChange={this._onChange} className={type.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                <React.Fragment>
                    <option>--Select--</option>
                    {this.state.leaveTypes.options.map((dep: any, dIndex: number) => {
                        return (<option key={dIndex} value={dep.id}>{dep.name}</option>)
                    })}
                </React.Fragment>
            </select>)
        else
            return null;
    }

    private _onChange = (e: any, callback?: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    private _setError = (name: string, error: string) => {
        setError(this, name, error);
    }


    private _clearFormError() {
        this._setError('reason', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            amount: stateData.amount.value,
            reason: stateData.reason.value,
        };
        return jsonToReturn;
    }

    // private onCheckboxChange = (e: any) => {
    //     this.setState({ isTenureManual: { ...this.state.isTenureManual, value: e.target.checked } })
    // }

    _submitForm = (e: any) => {
        e.preventDefault();
        this._clearFormError();
        if (validateForm(this)) {
            const jsonToReturn = {
                claimed_amount: this.state.amount.value,
                reason: this.state.reason.value,
                tenure: parseInt(this.state.tenure.value)

            };
            this.props.onSubmit(jsonToReturn);
        }
    }

    loadList = () => {
        this.setState({ showLoader: true });
        getLeaveTypeList(1, 20)
            .then((res: any) => {
                console.log('resp', res)
                if (res) {
                    this.setState({
                        leaveTypes: { ...this.state.leaveTypes, options: res.result },
                        showLoader: false
                    })
                }
            })
            .catch((err: any) => {
                console.log(err);

            })
    }

}

export default AddLeaveComponent;
