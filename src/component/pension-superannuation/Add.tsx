import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import NumberFormat from 'react-number-format';

import { onChange, validateForm } from './../../utils';

class AddODComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const leaveDetail = props.leaveDetail;
        console.log(leaveDetail ? leaveDetail.description : '');

        this.state = {
            userId: { name: 'userId', value: [], error: '', options: [], isRequired: true },
            amount: { name: 'amount', value: '', error: '', isRequired: true },
            basic: { name: 'basic', value: '', error: '', isRequired: true },
            revisionBasic: { name: 'revisionBasic', value: '', error: '', isRequired: true },
            specialization: { value: '', name: 'specialization', error: '', isRequired: true },
            date: { name: 'date', value: '', error: '', isRequired: true },
            empId: { name: 'empId', value: '', error: '', isRequired: true, },
            reason: { name: 'reason', value: '', error: '', isRequired: true, },
        }
    }

    public render() {
        const { userId, amount, basic, revisionBasic, specialization, empId, date, reason } = this.state;
        return (
            <React.Fragment>
                <div className="col-lg-11">
                    <form onSubmit={this._submitForm}>
                        <div className="col-lg-12 mt-4">
                            <div className="row">
                                <div className="col-lg-12 pl-0">
                                    <h5 className="heading-h1">Add Pension & Superannuation</h5>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-header">
                                <b>Pension Form</b>
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
                                                    labelKey={(option: any) => `${option.name}`}
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
                                            <div className="col-lg-6 form-group">
                                                <label>Increment Amount</label>
                                                <NumberFormat
                                                    allowLeadingZeros={false}
                                                    allowNegative={false}
                                                    thousandSeparator={true}
                                                    className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter amount"
                                                    name={amount.name}
                                                    value={amount.value}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Revision of Basic</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={revisionBasic.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={revisionBasic.name}
                                                    value={revisionBasic.value}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Specialization</label>
                                                <select
                                                    name={specialization.name}
                                                    value={specialization.value}
                                                    onChange={this.onChange}
                                                    className={specialization.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                                                    <option>--Select--</option>
                                                    <option value="ncci">CAIIB</option>
                                                    <option value="bcci">JAIIB</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Increment Date</label>
                                                <input
                                                    type="date"
                                                    className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={date.name} value={date.value}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Increment Date</label>
                                                <input
                                                    type="date"
                                                    className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={date.name} value={date.value}
                                                    onChange={this.onChange}
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
        onChange(this, name, value);
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            date: stateData.date.value,
            reason: stateData.reason.value,

        };
        return jsonToReturn;
    }

    _submitForm = (e: any) => {
        e.preventDefault();

        if (validateForm(this)) {
            const model = this._getJsonToPOST(this.state);
            this.props.onSubmit(model);
        }
    }

}

export default AddODComponent;
