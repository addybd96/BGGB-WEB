import * as React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { onChange, setOptions, validateForm, setError } from '../../utils';
import { getAllEmployeeListRM } from './../../action/EmployeeAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.detail ? props.detail.id : 0,
            name: { name: 'name', value: props.detail ? (props.detail.name !== null ? props.detail.name : '') : '', options: [], error: '', isRequired: (props.type === "da" || props.type === "pension-da") ? false : true },
            amount: { name: 'amount', value: props.detail ? (props.detail.amount !== null ? ((props.type === "da" || props.type === "pension-da") ? props.detail.daPercentage : props.detail.amount) : '') : '', error: '', isRequired: true },
            startDate: { name: 'startDate', value: props.detail ? (props.detail.startDate !== null ? moment(props.detail.startDate).format("YYYY-MM-DD") : '') : '', error: '', isRequired: (props.type === "da" || props.type === "pension-da") ? true : false },
            endDate: { name: 'endDate', value: props.detail ? (props.detail.endDate !== null ? moment(props.detail.endDate).format("YYYY-MM-DD") : '') : '', error: '', isRequired: (props.type === "da" || props.type === "pension-da") ? true : false },
            disableStatus: false
        }
    }

    componentDidMount() {
        if(this.state.id > 0){
            this.setState({ disableStatus: true });
        }
        this.loadList()
    }

    public render() {
        const { disableStatus,id, amount, name, startDate, endDate } = this.state;
        console.log("prop type  ", this.props.type);

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
                                    {this.props.type !== "da" && this.props.type !== "pension-da" ?
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Name </label>
                                                <select
                                                    className={name.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                    name={name.name}
                                                    value={name.value}
                                                    onChange={this.onChange}                                                   
                                                     disabled={disableStatus}
                                                >
                                                    <option>Select Employee</option>
                                                    {
                                                        name.options.map(function (item: any, index: number) {
                                                            return (
                                                                <option key={index} value={item.id}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        : null}

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label> {(this.props.type === "da" || this.props.type === "pension-da") ? "D.A Percentage" : "Amount"} </label>
                                            <NumberFormat
                                                className={amount.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={amount.name}
                                                value={amount.value}
                                                onChange={this.onChange}
                                                placeholder={(this.props.type === "da" || this.props.type === "pension-da") ? "Enter D.A Percentage." : "1,200"}
                                            />
                                        </div>
                                    </div>

                                    {(this.props.type === "da" || this.props.type === "pension-da") && <div className="col-md-6">
                                        <div className="form-group">
                                            <label>From Date </label>
                                            <input
                                                type="date"
                                                className={startDate.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={startDate.name}
                                                value={startDate.value}
                                                onChange={this.onChange}
                                                placeholder="Enter Deduction Amount"
                                            />
                                        </div>
                                    </div>}

                                    {(this.props.type === "da" || this.props.type === "pension-da") && <div className="col-md-6">
                                        <div className="form-group">
                                            <label>To Date </label>
                                            <input
                                                type="date"
                                                className={endDate.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={endDate.name}
                                                value={endDate.value}
                                                onChange={this.onChange}
                                                placeholder="Enter Deduction Amount"
                                            />
                                        </div>
                                    </div>}

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
        onChange(this, name, value);
    }

    loadList = () => {
        getAllEmployeeListRM().then((res: any) => {
            if (res && res.result)
                setOptions(this, this.state.name.name, res.result)
        })
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, amount, name, startDate, endDate } = this.state;
            const model: any = {
                amount: parseFloat(amount.value),
                name: name.value,
                startDate: startDate.value,
                endDate: endDate.value,
            };
            if (id !== 0) {
                model.id = id;
            }
            this.props.onSubmit(model);
        }
    }


}

export default ComponentName;
