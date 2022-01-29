import * as React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { onChange, setOptions, validateForm, setError } from '../../utils';
import { getEpmList } from '../../action/salaryAllowanceAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: props.detail ? props.detail.id : 0,
            dateOfRetirementFrom: { name: 'dateOfRetirementFrom', value: detail && detail.dateOfRetirementFrom ? moment(detail.dateOfRetirementFrom).format("YYYY-MM-DD") : '', error: '', isRequired: true },
            dateOfRetirementTo: { name: 'dateOfRetirementTo', value: detail && detail.dateOfRetirementTo ? moment(detail.dateOfRetirementTo).format("YYYY-MM-DD") : '', error: '', isRequired: true },
            basicFrom: { name: 'basicFrom', value: detail && detail.basicFrom ? detail.basicFrom : '', error: '', isRequired: true },
            basicTo: { name: 'basicTo', value: detail && detail.basicTo ? detail.basicTo : '', error: '', isRequired: true },
            percentage: { name: 'percentage', value: detail && detail.percentage ? detail.percentage : '', error: '', isRequired: true },
            minAmount: { name: 'minAmount', value: detail && detail.minAmount ? detail.minAmount : '', error: '', isRequired: true },
            maxAmount: { name: 'maxAmount', value: detail && detail.maxAmount ? detail.maxAmount : '', error: '', isRequired: true },
        }
    }

    componentDidMount() {
        // this.loadList();
    }

    public render() {
        const { dateOfRetirementFrom, dateOfRetirementTo, basicFrom, basicTo, percentage, minAmount, maxAmount } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="card mt-2">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <b>Pension Rule</b>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Date of Retirement From </label>
                                            <input
                                                type="date"
                                                className={dateOfRetirementFrom.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={dateOfRetirementFrom.name}
                                                value={dateOfRetirementFrom.value}
                                                onChange={this.onChange}
                                                placeholder="Enter Deduction Amount"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Date of Retirement To </label>
                                            <input
                                                type="date"
                                                className={dateOfRetirementTo.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={dateOfRetirementTo.name}
                                                value={dateOfRetirementTo.value}
                                                onChange={this.onChange}
                                                placeholder="Enter Deduction Amount"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Basic From</label>
                                            <NumberFormat
                                                className={basicFrom.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={basicFrom.name}
                                                value={basicFrom.value}
                                                onChange={this.onChange}
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Basic To </label>
                                            <NumberFormat
                                                className={basicTo.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={basicTo.name}
                                                value={basicTo.value}
                                                onChange={this.onChange}
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Percentage</label>
                                            <NumberFormat
                                                className={percentage.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={percentage.name}
                                                value={percentage.value}
                                                onChange={this.onChange}
                                                placeholder="Enter %"
                                                maxLength={2}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Minimum</label>
                                            <NumberFormat
                                                className={minAmount.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={minAmount.name}
                                                value={minAmount.value}
                                                onChange={this.onChange}
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Maximum</label>
                                            <NumberFormat
                                                className={maxAmount.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={maxAmount.name}
                                                value={maxAmount.value}
                                                onChange={this.onChange}
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <button type="button" onClick={this.props.onCancel} className="btn btn-sm btn-block btn-info">Cancel</button>
                    </div>
                    <div className="col-md-6" />
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-sm btn-block btn-primary">Save changes</button>
                    </div>
                </div>
            </form>
        )
    }

    onChange = (e: any) => {

        const name = e.target.name;
        let value = e.target.value;
        onChange(this, name, value);
    }

    loadList = () => {
        getEpmList().then((res: any) => {
            if (res && res.result)
                setOptions(this, this.state.name.name, res.result)
        })
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, dateOfRetirementFrom, dateOfRetirementTo, minAmount, maxAmount, percentage, basicFrom, basicTo } = this.state;
            const model: any = {
                dateOfRetirementFrom: dateOfRetirementFrom.value,
                dateOfRetirementTo: dateOfRetirementTo.value,
                minAmount: minAmount.value,
                maxAmount: maxAmount.value,
                percentage: parseFloat(percentage.value),
                basicFrom: basicFrom.value,
                basicTo: basicTo.value
            };
            if (id !== 0) {
                model.id = id;
            }
            this.props.onSubmit(model);
        }
    }


}

export default ComponentName;