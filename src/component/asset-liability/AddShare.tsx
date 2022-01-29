import * as React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';

import { onChange, validateForm } from '../../utils';

class AddShareComp extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        const detail = props.detail
        this.state = {
            assetId: props.assetId,
            transactionMade: { name: 'transactionMade', value: detail ? detail.course : '', error: '', isRequired: true },
            transactionDetail: { name: 'transactionDetail', value: detail ? detail.course : '', error: '', isRequired: true },
            partyParticulars: { name: 'partyParticulars', value: detail ? detail.course : '', error: '', isRequired: true },
            partyIs: { name: 'partyIs', value: detail ? detail.course : '', error: '', isRequired: true },
            financedAmount: { name: 'financedAmount', value: detail ? detail.course : '', error: '', isRequired: true },
            financedAmountOther: { name: 'financedAmountOther', value: detail ? detail.course : '', error: '', isRequired: true },
            transactionDate: { name: 'transactionDate', value: detail ? detail.course : '', error: '', isRequired: true },
            saleAmount: { name: 'saleAmount', value: detail ? detail.course : '', error: '', isRequired: true },
            otherFactor: { name: 'otherFactor', value: detail ? detail.course : '', error: '', isRequired: true },
            dateOfDisposal: { name: 'dateOfDisposal', value: detail ? detail.course : '', error: '', isRequired: true },

            // institute: { value: detail ? detail.institute : '', name: 'institute', error: '', isRequired: true },
            // marks: { value: detail ? detail.marks : '', name: 'marks', error: '', isRequired: true },
            // specialization: { value: detail ? detail.specialization : '', name: 'specialization', error: '', isRequired: false },
            // startYear: { value: detail ? moment(detail.startYear).format('YYYY-MM-DD') : '', name: 'startYear', error: '', isRequired: true },
            // endYear: { value: detail ? moment(detail.endYear).format("YYYY-MM-DD") : '', name: 'endYear', error: '', isRequired: false }
        }
    }

    render() {
        const { transactionMade, transactionDetail, partyParticulars, partyIs, financedAmount, financedAmountOther,
            transactionDate, saleAmount, otherFactor, dateOfDisposal
        } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>Transaction Made (Purchase/Sale)</label>
                        <input
                            type="text"
                            className={transactionMade.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={transactionMade.name}
                            value={transactionMade.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Detail of each Transaction in Shares</label>
                        <input
                            type="text"
                            className={transactionDetail.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={transactionDetail.name}
                            value={transactionDetail.value}
                            onChange={this.onChange}
                        />
                        <small>Detail of each transaction in shares.Securities, MF, etc. during the financial year</small>
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Particulars of party/firms</label>
                        <input
                            type="text"
                            className={partyParticulars.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={partyParticulars.name}
                            value={partyParticulars.value}
                            onChange={this.onChange}
                        />
                        <small>Particulars of Party/Firm with whom transaction is made</small>
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Whether parti is: </label>
                        <select
                            className={partyIs.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                            name={partyIs.name}
                            value={partyIs.value}
                            onChange={this.onChange}>
                            <option value="">--Select--</option>
                            <option value="Related to applicant">Related to applicant</option>
                            <option value="Having or likely to have in near future, dealing in official capacity">Having or likely to have in near future, dealing in official capacity</option>
                        </select>
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>If Purchased, Amount Financed from Personal Sources</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={false}
                            className={financedAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={financedAmount.name}
                            value={financedAmount.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>If Purchased, Amount Financed from Other Sources</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={false}
                            className={financedAmountOther.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={financedAmountOther.name}
                            value={financedAmountOther.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Date of Transaction</label>
                        <input
                            type="date"
                            name={transactionDate.name}
                            placeholder=""
                            value={transactionDate.value}
                            onChange={this.onChange}
                            className={transactionDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Amount Derived from sale</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={false}
                            className={saleAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={saleAmount.name}
                            value={saleAmount.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Any Other relevant factor</label>
                        <input
                            type="text"
                            className={otherFactor.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={otherFactor.name}
                            maxLength={4}
                            value={otherFactor.value}
                            onChange={this.onChange}
                        />
                        <small>Any Other relevant fact which the officer may like to mention</small>

                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Date of Disposal</label>
                        <input
                            type="date"
                            name={dateOfDisposal.name}
                            placeholder=""
                            value={dateOfDisposal.value}
                            onChange={this.onChange}
                            className={dateOfDisposal.error.length > 0 ? "form-control is-invalid" : "form-control"}
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
            const { assetId, transactionMade, transactionDetail, partyParticulars, partyIs, financedAmount,
                financedAmountOther, transactionDate, saleAmount, otherFactor, dateOfDisposal
            } = this.state;
            const model = {
                assetId: assetId,
                transactionMade: transactionMade.value,
                transactionDetail: transactionDetail.value,
                partyParticulars: partyParticulars.value,
                partyIs: partyIs.value,
                financedAmount: financedAmount.value,
                financedAmountOther: financedAmountOther.value,
                transactionDate: transactionDate.value,
                saleAmount: saleAmount.value,
                otherFactor: otherFactor.value,
                dateOfDisposal: dateOfDisposal.value,
            }
            this.props.onSubmit(model);
        }
    }
}

export default AddShareComp;

