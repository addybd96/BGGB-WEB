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
            daFrom: { name: 'daFrom', value: detail && detail.daFrom ? moment(detail.daFrom).format("YYYY-MM-DD") : '', error: '', isRequired: true },
            daTo: { name: 'daTo', value: detail && detail.daTo ? moment(detail.daTo).format("YYYY-MM-DD") : '', error: '', isRequired: true },
            daPercentage: { name: 'daPercentage', value: detail && detail.daPercentage ? detail.daPercentage : '', error: '', isRequired: true },

            // name: { name: 'name', value: props.detail ? (props.detail.name !== null ? props.detail.name : '') : '', options: [], error: '', isRequired: (props.type === "da" || props.type === "pension-da") ? false : true },
            // amount: { name: 'amount', value: props.detail ? (props.detail.amount !== null ? ((props.type === "da" || props.type === "pension-da") ? props.detail.daPercentage : props.detail.amount) : '') : '', error: '', isRequired: true },
            // startDate: { name: 'startDate', value: props.detail ? (props.detail.startDate !== null ? moment(props.detail.startDate).format("YYYY-MM-DD") : '') : '', error: '', isRequired: (props.type === "da" || props.type === "pension-da") ? true : false },
            // endDate: { name: 'endDate', value: props.detail ? (props.detail.endDate !== null ? moment(props.detail.endDate).format("YYYY-MM-DD") : '') : '', error: '', isRequired: (props.type === "da" || props.type === "pension-da") ? true : false },
        }
    }

    componentDidMount() {
        // this.loadList();
    }

    public render() {
        const { dateOfRetirementFrom, dateOfRetirementTo, daFrom, daTo, daPercentage } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="card mt-2">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <b>Pension D.A</b>
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
                                            <label>D.A From</label>
                                            <input
                                                type="date"
                                                className={daFrom.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={daFrom.name}
                                                value={daFrom.value}
                                                onChange={this.onChange}
                                                placeholder="Enter Deduction Amount"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>D.A To </label>
                                            <input
                                                type="date"
                                                className={daTo.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={daTo.name}
                                                value={daTo.value}
                                                onChange={this.onChange}
                                                placeholder="Enter Deduction Amount"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>D.A Percentage</label>
                                            <NumberFormat
                                                className={daPercentage.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={daPercentage.name}
                                                value={daPercentage.value}
                                                onChange={this.onChange}
                                                placeholder="Enter D.A %"
                                                maxLength={2}
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
            const { id, dateOfRetirementFrom, dateOfRetirementTo, daFrom, daTo, daPercentage } = this.state;
            const model: any = {
                dateOfRetirementFrom: dateOfRetirementFrom.value,
                dateOfRetirementTo: dateOfRetirementTo.value,
                daFrom: daFrom.value,
                daTo: daTo.value,
                daPercentage: parseFloat(daPercentage.value)
            };
            if (id !== 0) {
                model.id = id;
            }
            this.props.onSubmit(model);
        }
    }


}

export default ComponentName;