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
            particularItem: { name: 'particularItem', value: detail ? detail.course : '', error: '', isRequired: true },
            acquisitionDate: { name: 'acquisitionDate', value: detail ? detail.course : '', error: '', isRequired: true },
            acquisitionCost: { name: 'acquisitionCost', value: detail ? detail.course : '', error: '', isRequired: true },
            acquisitionSource: { name: 'acquisitionSource', value: detail ? detail.course : '', error: '', isRequired: true },
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
        const { particularItem, acquisitionDate, acquisitionCost, acquisitionSource, disposalDate, remark } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>Particulars of Items</label>
                        <input
                            type="text"
                            className={particularItem.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={particularItem.name}
                            value={particularItem.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Date of Acquisition</label>
                        <input
                            type="date"
                            className={acquisitionDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder=""
                            name={acquisitionDate.name}
                            value={acquisitionDate.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Cost of Acquisition</label>
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
                        <label>Source of Acquisition</label>
                        <input
                            type="text"
                            name={acquisitionSource.name}
                            placeholder=""
                            value={acquisitionSource.value}
                            onChange={this.onChange}
                            className={acquisitionSource.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Date of Disposal</label>
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
            const { assetId, particularItem, acquisitionDate, acquisitionCost, acquisitionSource, disposalDate, remark } = this.state;

            const model = {
                assetId: assetId,
                particularItem: particularItem.value,
                acquisitionDate: acquisitionDate.value,
                acquisitionCost: acquisitionCost.value,
                acquisitionSource: acquisitionSource.value,
                disposalDate: disposalDate.value,
                remark: remark.value
            }
            this.props.onSubmit(model);
        }
    }
}

export default AddMovable;
