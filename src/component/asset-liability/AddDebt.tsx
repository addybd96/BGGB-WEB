import * as React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';

import { onChange, validateForm } from '../../utils';

class AddDebitComp extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        const detail = props.detail
        this.state = {
            assetId: props.assetId,
            creatorName: { name: 'creatorName', value: detail ? detail.course : '', error: '', isRequired: true },
            liabilityDate: { name: 'liabilityDate', value: detail ? detail.course : '', error: '', isRequired: true },
            transactionDate: { name: 'transactionDate', value: detail ? detail.course : '', error: '', isRequired: true },
            sanctionedLimit: { name: 'sanctionedLimit', value: detail ? detail.course : '', error: '', isRequired: true },
            outstanding: { name: 'outstanding', value: detail ? detail.course : '', error: '', isRequired: true },
            liquidationDate: { name: 'liquidationDate', value: detail ? detail.course : '', error: '', isRequired: true },
            remark: { name: 'remark', value: detail ? detail.course : '', error: '', isRequired: true },
            // institute: { value: detail ? detail.institute : '', name: 'institute', error: '', isRequired: true },
            // marks: { value: detail ? detail.marks : '', name: 'marks', error: '', isRequired: true },
            // specialization: { value: detail ? detail.specialization : '', name: 'specialization', error: '', isRequired: false },
            // startYear: { value: detail ? moment(detail.startYear).format('YYYY-MM-DD') : '', name: 'startYear', error: '', isRequired: true },
            // endYear: { value: detail ? moment(detail.endYear).format("YYYY-MM-DD") : '', name: 'endYear', error: '', isRequired: false }
        }
    }

    render() {
        const { creatorName, liabilityDate, transactionDate, sanctionedLimit, outstanding, liquidationDate, remark } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>Name & Address of Creator </label>
                        <input
                            type="text"
                            className={creatorName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={creatorName.name}
                            value={creatorName.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Date of Incurring Liability</label>
                        <input
                            type="date"
                            className={liabilityDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={liabilityDate.name}
                            value={liabilityDate.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Date of Transaction</label>
                        <input
                            type="date"
                            className={transactionDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={transactionDate.name}
                            value={transactionDate.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Sanctioned Limit</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={false}
                            className={sanctionedLimit.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={sanctionedLimit.name}
                            value={sanctionedLimit.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Outstanding</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={false}
                            className={outstanding.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={outstanding.name}
                            value={outstanding.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Date of Liquidation</label>
                        <input
                            type="date"
                            name={liquidationDate.name}
                            placeholder=""
                            value={liquidationDate.value}
                            onChange={this.onChange}
                            className={liquidationDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>

                    <div className="col-lg-12 form-group">
                        <label>Remark</label>
                        <textarea
                            name={remark.name}
                            className={remark.error.length > 0 ? "form-control is-invalid" : "form-control"} rows={5} id="comment"
                            value={remark.value}
                            onChange={this.onChange}
                            placeholder=""
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
            const { assetId, creatorName, liabilityDate, transactionDate, sanctionedLimit, outstanding, liquidationDate, remark } = this.state;

            const model = {
                assetId: assetId,
                creatorName: creatorName.value,
                liabilityDate: liabilityDate.value,
                transactionDate: transactionDate.value,
                sanctionedLimit: sanctionedLimit.value,
                outstanding: outstanding.value,
                liquidationDate: liquidationDate.value,
                remark: remark.value,
            }
            this.props.onSubmit(model);
        }
    }
}

export default AddDebitComp;

