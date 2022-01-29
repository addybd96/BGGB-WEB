import * as React from 'react';
import NumberFormat from 'react-number-format';
import { onChange, setOptions, validateForm, setError } from './../../utils';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        const activeOptions = [{ id: true, name: 'Yes' }, { id: false, name: 'No' }];
        
        this.state = {
            id: detail ? detail.id : 0,
            name: { name: 'name', value: detail ? detail.name : '', error: '', isRequired: true },
            amount: { name: 'amount', value: detail ? (detail.amount !== null ? detail.amount : '') : '', error: '', isRequired: false },
            percentage: { name: 'percentage', value: detail ? (detail.percentage !== null ? detail.percentage : '') : '', error: '', isRequired: false },
            isActive: { name: 'isActive', value: detail ? detail.isActive : true, error: '', isRequired: true, options: activeOptions },
            description: { name: 'description', value: detail ? detail.description : '', error: '', isRequired: true },
        }
    }

    public render() {
        const { id, name, amount, percentage, description, isActive } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="card mt-2">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <b> Salary component</b>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Name *</label>
                                            <input
                                                className={name.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={name.name}
                                                value={name.value}
                                                onChange={this.onChange}
                                                placeholder="Name of the component"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Amount {percentage.value.length > 0 ? <sup>optional</sup> : '*'}</label>
                                            <NumberFormat
                                                allowLeadingZeros={false}
                                                allowNegative={false}
                                                thousandSeparator={true}
                                                className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Enter Amount"
                                                name={amount.name}
                                                value={amount.value}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Percentage {amount.value.length > 0 ? <sup>optional</sup> : '*'}</label>
                                            <NumberFormat
                                                allowLeadingZeros={false}
                                                allowNegative={false}
                                                className={percentage.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Enter Percentage"
                                                name={percentage.name}
                                                value={percentage.value}
                                                onChange={this.onChange}
                                                maxLength={3}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Is active? *</label>
                                            <select
                                                className={isActive.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={isActive.name}
                                                value={isActive.value}
                                                onChange={this.onChange}
                                            >
                                                <option>Is active?</option>
                                                {
                                                    isActive.options.map(function (item: any, index: number) {
                                                        return (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Description <sup>Optional</sup></label>
                                            <textarea
                                                rows={5}
                                                className={description.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={description.name}
                                                value={description.value}
                                                onChange={this.onChange}
                                                placeholder="Salary component description"
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
                    <div className="col-md-6">

                    </div>
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
        if (name === this.state.isActive.name) {
            value = value === 'true'
        }
        onChange(this, name, value);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this) && this.validateAmount()) {
            const { id, name, percentage, amount, description, isActive } = this.state;
            const model: any = {
                name: name.value,
                percentage: parseInt(percentage.value, 10),
                amount: parseInt(amount.value, 10),
                isActive: isActive.value,
                description: description.value
            };
            if (id !== 0) {
                model.id = id;
            }
            this.props.onSubmit(model);
        }
    }

    validateAmount = () => {
        const { percentage, amount } = this.state;
        if (percentage.value.length === 0 && amount.value.length == 0) {
            setError(this, percentage.name, 't');
            setError(this, amount.name, 't');
            return false;
        } else {
            setError(this, percentage.name, '');
            setError(this, amount.name, '');
            return true;
        }
    }
}

export default ComponentName;
