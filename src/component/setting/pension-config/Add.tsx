import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { onChange, setOptions, validateForm } from './../../../utils';
import { getUserPermissions } from './../../../action/SettingsActions';

class AddRole extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: detail ? detail.id : 0,
            fromDate: { name: 'fromDate', value: detail ? `${moment(detail.fromDate).format("YYYY-MM-DD")}` : '', error: '', isRequired: true },
            toDate: { name: 'toDate', value: detail ? `${moment(detail.toDate).format("YYYY-MM-DD")}` : '', error: '', isRequired: true },
            minAmount: { name: 'minAmount', value: detail ? detail.minAmount : '', error: '', isRequired: true },
            maxAmount: { name: 'maxAmount', value: detail ? detail.maxAmount : '', error: '', isRequired: true },
            percentage: { name: 'percentage', value: detail ? detail.percentage : '', error: '', isRequired: false },
            minPercentAmount: { name: 'minPercentAmount', value: detail ? detail.minPercentageAmount : '', error: '', isRequired: true },
            maxPercentAmount: { name: 'maxPercentAmount', value: detail ? detail.maxPercentageAmount : '', error: '', isRequired: true },
        }
    }

    componentDidMount() {
        // getUserPermissions().then((res: any) => {
        //     setOptions(this, this.state.permission.name, res.result);
        // });
    }

    public render() {
        const { fromDate, toDate, minAmount, maxAmount, percentage, minPercentAmount, maxPercentAmount } = this.state;
        return (
            <form onSubmit={this.onSubmit}>

                <div className="card mt-2">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-lg-12">
                                <b>Add Rule</b>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">

                            <div className="col-lg-12 mb-2">
                                <div className="row">
                                    <div className="col-lg-6 form-group">
                                        <label>From Date</label>
                                        <input
                                            type="date"
                                            className={fromDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder=""
                                            name={fromDate.name}
                                            value={fromDate.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-lg-6 form-group">
                                        <label>To Date</label>
                                        <input
                                            type="date"
                                            className={toDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder=""
                                            name={toDate.name}
                                            value={toDate.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 form-group">
                                        <label>Min Amount</label>
                                        <NumberFormat
                                            allowLeadingZeros={false}
                                            allowNegative={false}
                                            thousandSeparator={false}
                                            className={minAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder=""
                                            name={minAmount.name}
                                            value={minAmount.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-lg-6 form-group">
                                        <label>Max Amount</label>
                                        <NumberFormat
                                            allowLeadingZeros={false}
                                            allowNegative={false}
                                            thousandSeparator={false}
                                            className={maxAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder=""
                                            name={maxAmount.name}
                                            value={maxAmount.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 form-group">
                                        <label>Percentage</label>
                                        <NumberFormat
                                            allowLeadingZeros={false}
                                            allowNegative={false}
                                            thousandSeparator={false}
                                            className={percentage.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder=""
                                            name={percentage.name}
                                            value={percentage.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-lg-4 form-group">
                                        <label>Min Percent Amount</label>
                                        <NumberFormat
                                            allowLeadingZeros={false}
                                            allowNegative={false}
                                            thousandSeparator={false}
                                            className={minPercentAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder=""
                                            name={minPercentAmount.name}
                                            value={minPercentAmount.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-lg-4 form-group">
                                        <label>Max Percent Amount</label>
                                        <NumberFormat
                                            allowLeadingZeros={false}
                                            allowNegative={false}
                                            thousandSeparator={false}
                                            className={maxPercentAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder=""
                                            name={maxPercentAmount.name}
                                            value={maxPercentAmount.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-12 form-group">
                                <label>Permission</label>
                                <Typeahead
                                    id="ta-permission-ids"
                                    allowNew={false}
                                    labelKey={(option: any) => `${option.name}`}
                                    name={permission.name}
                                    selected={permission.value}
                                    multiple={true}
                                    options={permission.options}
                                    onChange={(e: any) => this.typeaheadOnChange(permission.name, e)}
                                    placeholder="List of permissions"
                                    isInvalid={permission.error.length > 0}
                                />
                            </div> */}
                            {/* <div className="col-lg-12 mb-2">
                                <div className="row">
                                    <div className="col-lg-12 form-group">
                                        <label>Description</label>
                                        <textarea
                                            id="Description"
                                            className={roleDescription.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder="Enter Description"
                                            name="roleDescription"
                                            value={roleDescription.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-lg-12 ">
                                <div className="row mt-3">
                                    <div className="col-md-3">
                                        <button type="button" onClick={this.props.onCancel} className="btn btn-sm btn-block btn-info">Cancel</button>
                                    </div>
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-3">
                                        <button type="submit" className="btn btn-sm btn-block btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </form>
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    // typeaheadOnChange = (name: string, e: any) => {
    //     let value = e;
    //     if (e.length > 0 && e[0].customOption) {
    //         value = [{ name: e[0].name }];
    //     }
    //     onChange(this, name, value);
    // }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, fromDate, toDate, minAmount, maxAmount, percentage, minPercentAmount, maxPercentAmount } = this.state;
            const model: any = {
                fromDate: fromDate.value,
                toDate: toDate.value,
                minAmount: parseInt(minAmount.value),
                maxAmount: parseInt(maxAmount.value),
                percentage: parseFloat(percentage.value),
                minPercentageAmount: parseInt(minPercentAmount.value),
                maxPercentageAmount: parseInt(maxPercentAmount.value),
            };
            if (id !== 0) {
                model.id = id;
            }
            console.log("model  =>  ", model);
            this.props.onSubmit(model);
        }
    }
}

export default AddRole;
