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
            investmentNature: { name: 'investmentNature', value: detail ? detail.course : '', error: '', isRequired: true },
            companyName: { name: 'companyName', value: detail ? detail.course : '', error: '', isRequired: true },
            units: { name: 'units', value: detail ? detail.course : '', error: '', isRequired: true },
            faceValue: { name: 'faceValue', value: detail ? detail.course : '', error: '', isRequired: true },
            acquisitionCost: { name: 'acquisitionCost', value: detail ? detail.course : '', error: '', isRequired: true },
            howAcquired: { name: 'howAcquired', value: detail ? detail.course : '', error: '', isRequired: true },
            acquisitionDate: { name: 'acquisitionDate', value: detail ? detail.course : '', error: '', isRequired: true },
            quota: { name: 'quota', value: detail ? detail.course : '', error: '', isRequired: true },
            employeePosition: { name: 'employeePosition', value: detail ? detail.course : '', error: '', isRequired: true },
            companyFacility: { name: 'companyFacility', value: detail ? detail.course : '', error: '', isRequired: true },
            disposalDate: { name: 'disposalDate', value: detail ? detail.course : '', error: '', isRequired: true },
            remark: { name: 'remark', value: detail ? detail.course : '', error: '', isRequired: true },

            // institute: { value: detail ? detail.institute : '', name: 'institute', error: '', isRequired: true },
            // marks: { value: detail ? detail.marks : '', name: 'marks', error: '', isRequired: true },
            // specialization: { value: detail ? detail.specialization : '', name: 'specialization', error: '', isRequired: false },
            // startYear: { value: detail ? moment(detail.startYear).format('YYYY-MM-DD') : '', name: 'startYear', error: '', isRequired: true },
            // endYear: { value: detail ? moment(detail.endYear).format("YYYY-MM-DD") : '', name: 'endYear', error: '', isRequired: false }
        }
    }

    render() {
        const { investmentNature, companyName, units, faceValue, acquisitionCost, howAcquired, acquisitionDate,
            quota, employeePosition, companyFacility, disposalDate, remark
        } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>Nature of Investment</label>
                        <input
                            type="text"
                            className={investmentNature.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={investmentNature.name}
                            value={investmentNature.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Name of Company / Individual</label>
                        <input
                            type="text"
                            className={companyName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={companyName.name}
                            value={companyName.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>No of Units</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={false}
                            className={units.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={units.name}
                            value={units.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Face Value (Rs)</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={false}
                            className={faceValue.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={faceValue.name}
                            value={faceValue.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Cost of Accquisition</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={false}
                            className={acquisitionCost.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={acquisitionCost.name}
                            value={acquisitionCost.value}
                            onChange={this.onChange}
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
                        <label>Date of Accquisition</label>
                        <input
                            type="date"
                            name={acquisitionDate.name}
                            placeholder=""
                            value={acquisitionDate.value}
                            onChange={this.onChange}
                            className={acquisitionDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>

                    <div className="col-lg-6 form-group">
                        <label>Whether Promotors' / Employee'Quota'</label>
                        <input
                            type="text"
                            name={quota.name}
                            placeholder=""
                            value={quota.value}
                            onChange={this.onChange}
                            className={quota.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Employee Position at the Time of Accquisition</label>
                        <input
                            type="text"
                            name={employeePosition.name}
                            placeholder=""
                            value={employeePosition.value}
                            onChange={this.onChange}
                            className={employeePosition.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>If Company Had Any Borrowing or Other Facility at That Time</label>
                        <input
                            type="text"
                            name={companyFacility.name}
                            placeholder=""
                            value={companyFacility.value}
                            onChange={this.onChange}
                            className={companyFacility.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Date of Disposal / Closure</label>
                        <input
                            type="date"
                            className={disposalDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={disposalDate.name}
                            value={disposalDate.value}
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
            const {
                assetId, investmentNature, companyName, units, faceValue, acquisitionCost, howAcquired,
                acquisitionDate, quota, employeePosition, companyFacility, disposalDate, remark
            } = this.state;
            const model = {
                assetId: assetId,
                investmentNature: investmentNature.value,
                companyName: companyName.value,
                units: units.value,
                faceValue: faceValue.value,
                acquisitionCost: acquisitionCost.value,
                howAcquired: howAcquired.value,
                acquisitionDate: acquisitionDate.value,
                quota: quota.value,
                employeePosition: employeePosition.value,
                companyFacility: companyFacility.value,
                disposalDate: disposalDate.value,
                remark: remark.value,
            }
            this.props.onSubmit(model);
        }
    }
}

export default AddMovable;

