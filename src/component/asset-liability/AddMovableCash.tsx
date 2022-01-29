import * as React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';

import { onChange, validateForm } from '../../utils';

class AddMovable extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        const detail = props.detail
        this.state = {
            assetId: props.assetId,
            depositeNature: { name: 'depositeNature', value: detail ? detail.course : '', error: '', isRequired: true },
            bankName: { name: 'bankName', value: detail ? detail.course : '', error: '', isRequired: true },
            accountNumber: { name: 'accountNumber', value: detail ? detail.course : '', error: '', isRequired: true },
            depositeAmount: { name: 'depositeAmount', value: detail ? detail.course : '', error: '', isRequired: true },
            incomeDerived: { name: 'incomeDerived', value: detail ? detail.course : '', error: '', isRequired: true },
            acquiredDate: { name: 'acquiredDate', value: detail ? detail.course : '', error: '', isRequired: true },
            howAcquired: { name: 'howAcquired', value: detail ? detail.course : '', error: '', isRequired: true },
            remark: { name: 'remark', value: detail ? detail.course : '', error: '', isRequired: true },
            closureDate: { name: 'closureDate', value: detail ? detail.course : '', error: '', isRequired: true },

            // institute: { value: detail ? detail.institute : '', name: 'institute', error: '', isRequired: true },
            // marks: { value: detail ? detail.marks : '', name: 'marks', error: '', isRequired: true },
            // specialization: { value: detail ? detail.specialization : '', name: 'specialization', error: '', isRequired: false },
            // startYear: { value: detail ? moment(detail.startYear).format('YYYY-MM-DD') : '', name: 'startYear', error: '', isRequired: true },
            // endYear: { value: detail ? moment(detail.endYear).format("YYYY-MM-DD") : '', name: 'endYear', error: '', isRequired: false }
        }
    }

    render() {
        const { depositeNature, bankName, accountNumber, depositeAmount, incomeDerived, acquiredDate, howAcquired, closureDate, remark } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>Nature of Deposit</label>
                        <input
                            type="text"
                            className={depositeNature.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={depositeNature.name}
                            value={depositeNature.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Name of Bank/Company/PostOffice/Others</label>
                        <input
                            type="text"
                            className={bankName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={bankName.name}
                            value={bankName.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Account Number</label>
                        <input
                            type="text"
                            className={accountNumber.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={accountNumber.name}
                            value={accountNumber.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Amount Deposited (Rs)</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={false}
                            className={depositeAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={depositeAmount.name}
                            value={depositeAmount.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Income Derived</label>
                        <input
                            type="text"
                            name={incomeDerived.name}
                            placeholder=""
                            value={incomeDerived.value}
                            onChange={this.onChange}
                            className={incomeDerived.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>When Acquired</label>
                        <input
                            type="date"
                            name={acquiredDate.name}
                            placeholder=""
                            value={acquiredDate.value}
                            onChange={this.onChange}
                            className={acquiredDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>

                    <div className="col-lg-6 form-group">
                        <label>How Acquired</label>
                        <input
                            type="text"
                            name={howAcquired.name}
                            placeholder=""
                            value={howAcquired.value}
                            onChange={this.onChange}
                            className={howAcquired.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>


                    <div className="col-lg-6 form-group">
                        <label>Date of Closure</label>
                        <input
                            type="date"
                            className={closureDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={closureDate.name}
                            value={closureDate.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-12 form-group">
                        <label>Remark</label>
                        <textarea
                            name={remark.name}
                            className={remark.error.length > 0 ? "form-control is-invalid" : "form-control"} rows={5} id="comment"
                            value={remark.value}
                            onChange={this.onChange}
                            placeholder="Enter Remark"
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <button onClick={this.props.onCancel} type="button" className="btn btn-secondary btn-sm btn-block">Cancel</button>
                    </div>
                    <div className="col-md-6" />
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary btn-sm btn-sm btn-block">Submit</button>
                    </div>
                </div>
            </form>
        )
    }

    private onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { assetId, depositeNature, bankName, accountNumber, depositeAmount, incomeDerived, acquiredDate, howAcquired, closureDate, remark } = this.state;

            const model = {
                assetId: assetId,
                depositeNature: depositeNature.value,
                bankName: bankName.value,
                accountNumber: accountNumber.value,
                depositeAmount: depositeAmount.value,
                incomeDerived: incomeDerived.value,
                acquiredDate: acquiredDate.value,
                howAcquired: howAcquired.value,
                closureDate: closureDate.value,
                remark: remark.value,
            }
            this.props.onSubmit(model);
        }
    }
}

export default AddMovable;

