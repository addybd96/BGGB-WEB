import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { onChange, validateForm } from './../../utils';
import { getAllEmp } from './../../action/IncrementAction';

class AddODComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const leaveDetail = props.leaveDetail;
        console.log(leaveDetail ? leaveDetail.description : '');

        this.state = {
            userId: { name: 'userId', value: [], error: '', options: [], isRequired: true },
            basicAmount: { name: 'basicAmount', value: '', error: '', isRequired: true },
            pqpAmount: { name: 'pqpAmount', value: '', error: '', isRequired: true },
            sppayAmount: { name: 'sppayAmount', value: '', error: '', isRequired: true },
            basic: { name: 'basic', value: '', error: '', isRequired: false },
            pqp: { name: 'pqp', value: '', error: '', isRequired: false },
            sppay: { name: 'sppay', value: '', error: '', isRequired: false },
            revisionBasic: { name: 'revisionBasic', value: '', error: '', isRequired: false },
            revisionPqp: { name: 'revisionPqp', value: '', error: '', isRequired: false },
            revisionSppay: { name: 'revisionSppay', value: '', error: '', isRequired: false },
            specialization: { value: '', name: 'specialization', error: '', isRequired: true },
            date: { name: 'date', value: '', error: '', isRequired: true },
            nextIncDate: { name: 'nextIncDate', value: '', error: '', isRequired: true },
            reason: { name: 'reason', value: '', error: '', isRequired: true, },
        }
    }

    componentDidMount() {
        getAllEmp().then((res: any) => {
            console.log("res =>  ", res);
            this.setState({
                userId: { ...this.state.userId, options: res.result }
            })
        }).catch((err: any) => {
            alert(err)
        });
    }

    public render() {
        const { userId, basicAmount, basic, pqp, sppay, pqpAmount, sppayAmount, revisionBasic, revisionPqp, revisionSppay, specialization, date, nextIncDate, reason } = this.state;
        console.log(basic, revisionBasic,"basic, revisionBasic");
        
        return (
            <React.Fragment>
                <div className="col-lg-11">
                    <form onSubmit={this._submitForm}>
                        <div className="col-lg-12 mt-4">
                            <div className="row">
                                <div className="col-lg-12 pl-0">
                                    <h5 className="heading-h1">Add Increment</h5>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-header">
                                <b>Increment Form</b>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-6 form-group">
                                                <label>Empployee Code</label>
                                                <Typeahead
                                                    id="ta-employee-ids"
                                                    allowNew={false}
                                                    labelKey={(option: any) => `${option.employeeId} ${option.name}`}
                                                    name={userId.name}
                                                    selected={userId.value}
                                                    options={userId.options}
                                                    onChange={(e: any) => this.typeaheadOnChange(userId.name, e)}
                                                    placeholder="List of employees"
                                                    isInvalid={userId.error.length > 0}
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Basic</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={basic.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={basic.name}
                                                    value={basic.value}
                                                    disabled
                                                />
                                            </div>
                                            {/* <div className="col-lg-6 form-group">
                                                <label>PQP</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={pqp.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={pqp.name}
                                                    value={pqp.value}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Sppay</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={sppay.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={sppay.name}
                                                    value={sppay.value}
                                                    disabled
                                                />
                                            </div> */}
                                            <div className="col-lg-6 form-group">
                                                <label>Increment Basic Amount</label>
                                                <NumberFormat
                                                    allowLeadingZeros={false}
                                                    allowNegative={true}
                                                    // thousandSeparator={true}
                                                    className={basicAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter amount"
                                                    name={basicAmount.name}
                                                    value={basicAmount.value}
                                                    onChange={this.onChange}
                                                    onBlur={this.onAmountBlur}                                                    
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Revision of Basic</label>
                                                <NumberFormat
                                                    allowLeadingZeros={false}
                                                    allowNegative={false}
                                                    thousandSeparator={true}
                                                    className={revisionBasic.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter amount"
                                                    name={revisionBasic.name}
                                                    value={revisionBasic.value}
                                                    onChange={this.onChange}
                                                    disabled
                                                />
                                            </div>
                                            {/* <div className="col-lg-6 form-group">
                                                <label>Increment PQP Amount</label>
                                                <NumberFormat
                                                    allowLeadingZeros={false}
                                                    allowNegative={true}
                                                    // thousandSeparator={true}
                                                    className={pqpAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter amount"
                                                    name={pqpAmount.name}
                                                    value={pqpAmount.value}
                                                    onChange={this.onChange}
                                                    onBlur={this.onAmountBlur}
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Revision of PQP</label>
                                                <NumberFormat
                                                    allowLeadingZeros={false}
                                                    allowNegative={true}
                                                    thousandSeparator={true}
                                                    className={revisionPqp.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter amount"
                                                    name={revisionPqp.name}
                                                    value={revisionPqp.value}
                                                    onChange={this.onChange}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Increment Sppay Amount</label>
                                                <NumberFormat
                                                    allowLeadingZeros={false}
                                                    allowNegative={true}
                                                    // thousandSeparator={true}
                                                    className={sppayAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter amount"
                                                    name={sppayAmount.name}
                                                    value={sppayAmount.value}
                                                    onChange={this.onChange}
                                                    onBlur={this.onAmountBlur}
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Revision of Sppay</label>
                                                <NumberFormat
                                                    allowLeadingZeros={false}
                                                    allowNegative={false}
                                                    thousandSeparator={true}
                                                    className={revisionSppay.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter amount"
                                                    name={revisionSppay.name}
                                                    value={revisionSppay.value}
                                                    onChange={this.onChange}
                                                    disabled
                                                />
                                            </div> */}
                                            <div className="col-lg-6 form-group">
                                                <label>Increment Type</label>
                                                <select
                                                    name={specialization.name}
                                                    value={specialization.value}
                                                    onChange={this.onChange}
                                                    className={specialization.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                                                    <option value="">--Select--</option>
                                                    <option value="caiib">CAIIB</option>
                                                    <option value="jaiib">JAIIB</option>
                                                    <option value="promotion">Promotion</option>
                                                    <option value="normal">Normal</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Increment Date</label>
                                                <input
                                                    type="date"
                                                    className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={date.name} value={date.value}
                                                    onChange={this.onChange}
                                                    max={moment().format("YYYY-MM-DD")}
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Next Increment Date</label>
                                                <input
                                                    type="date"
                                                    className={nextIncDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={nextIncDate.name} value={nextIncDate.value}
                                                    onChange={this.onChange}
                                                    min={moment().format("YYYY-MM-DD")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-12 form-group">
                                                <label>Reason
                                              </label>
                                                <textarea
                                                    name={reason.name}
                                                    className={reason.error.length > 0 ? "form-control is-invalid" : "form-control"} rows={5} id="comment"
                                                    value={reason.value}
                                                    onChange={this.onChange}
                                                    placeholder="Enter Description"
                                                />
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

    private onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    private typeaheadOnChange = (name: string, e: any) => {
        let value = e;
        if (e.length > 0 && e[0].customOption) {
            value = [{ name: e[0].name }];
        }
        if (e.length > 0) {
            onChange(this, 'basic', e[0].basic);
            // onChange(this, 'sppay', e[0].sppay);
            // onChange(this, 'pqp', e[0].pqp);
           onChange(this, 'revisionBasic', parseFloat(e[0].basic)+parseFloat(this.state.basicAmount.value));
            // onChange(this, 'revisionSppay', parseFloat(e[0].sppay)+parseFloat(this.state.sppayAmount.value));
            // onChange(this, 'revisionPqp', parseFloat(e[0].pqp)+parseFloat(this.state.pqpAmount.value));
           
        }
        onChange(this, name, value);
    }

    private onAmountBlur = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        let incrBVal = parseInt(value) + parseInt(this.state.basic.value);
        // let incrPVal = parseInt(value) + parseInt(this.state.pqp.value);
        // let incrSVal = parseInt(value) + parseInt(this.state.sppay.value);
        if (this.state.basicAmount.name === name)
            onChange(this, this.state.revisionBasic.name, incrBVal);
        // if (this.state.pqpAmount.name === name)
        //     onChange(this, this.state.revisionPqp.name, incrPVal);
        // if (this.state.sppayAmount.name === name)
        //     onChange(this, this.state.revisionSppay.name, incrSVal);
    }

    _submitForm = (e: any) => {
        e.preventDefault();

        if (validateForm(this)) {
            const { userId, basicAmount, basic, pqp, sppay, pqpAmount, sppayAmount, revisionPqp, revisionSppay,
                revisionBasic, specialization, date, nextIncDate, reason } = this.state;
            const model = {
                userId: userId.value[0].id,
                // incrementPqpAmount: pqpAmount.value,
                incrementBasicAmount: basicAmount.value,
                // incrementSppayAmount: sppayAmount.value,
                // pqp: pqp.value,
                basic: basic.value,
                // sppay: sppay.value,
                // revisionPqp: revisionPqp.value,
                revisionBasic: revisionBasic.value,
                // revisionSppay: revisionSppay.value,
                specialization: specialization.value,

                incrementDate: specialization.value === 'normal' ? moment(date.value).startOf('month').format("YYYY-MM-DD") : date.value,
                nextIncrementDate: nextIncDate.value,
                reason: reason.value,
            }
            this.props.onSubmit(model);
        }
    }

}

export default AddODComponent;
