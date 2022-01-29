import * as React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { onChange, setOptions, validateForm, setError } from './../../utils';
import { getAllEmployeeListRM } from './../../action/EmployeeAction';
import { getDesignations } from '../../action/SettingsActions';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log(props)
        this.state = {
            id: props.detail ? props.detail.id : 0,
            dname: { name: 'dname', value: props.detail ? (props.detail.dname !== null ? props.detail.dname : '') : '', error: '', options: [], isRequired: props.type === "otherDeduction" ? true : false },
            name: { name: 'name', value: props.detail ? (props.type === "lwf" ? props.detail.designationId !== null ? props.detail.designationId : '' : (props.detail.name !== null ? props.detail.name : '')) : '', error: '', options: [], isRequired: true },
            amount: { name: 'amount', value: props.detail ? (props.detail.amount !== null ? props.detail.amount : '') : '', error: '', isRequired: true },
            date: { name: 'date', value: props.detail ? (props.detail.date !== null ? (props.type === "otherDeduction" || props.type === "lwf" ? moment(props.detail.date).format("YYYY-MM-DD") : '') : '') : '', error: '', isRequired: props.type === "otherDeduction" || props.type === "lwf" ? true : false },
        }
    }

    componentDidMount() {
        this.loadList()
    }
    public render() {
        const { id, amount, date, name, dname } = this.state;
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
                                    {this.props.type === "otherDeduction" &&
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Deduction Name </label>
                                                <input
                                                    type="text"
                                                    className={dname.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                    name={dname.name}
                                                    value={dname.value}
                                                    onChange={this.onChange}
                                                    placeholder="Enter Deduction Name"
                                                />
                                            </div>
                                        </div>}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>{this.props.type === "lwf" ? "Designation" : "Name"} </label>
                                            <select
                                                className={name.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={name.name}
                                                value={name.value}
                                                onChange={this.onChange}
                                            >
                                                <option>{this.props.type === "lwf" ? "Select Designatin" : "Select Employee"}</option>
                                                {
                                                    this.props.type === "lwf"
                                                        ? name.options.map(function (item: any, index: number) {
                                                            return (
                                                                <option key={index} value={item.designationId} >{item.name}</option>
                                                            )
                                                        })
                                                        : name.options.map(function (item: any, index: number) {
                                                            return (
                                                                <option key={index} value={item.id} >{item.name}</option>
                                                            )
                                                        })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    {(this.props.type === "otherDeduction" || this.props.type === "lwf") && <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Date </label>
                                            <input
                                                type="date"
                                                className={date.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={date.name}
                                                value={date.value}
                                                onChange={this.onChange}
                                                placeholder="Enter Deduction Amount"
                                            />
                                        </div>
                                    </div>}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Amount </label>
                                            <NumberFormat
                                                className={amount.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={amount.name}
                                                value={amount.value}
                                                onChange={this.onChange}
                                                placeholder="12,000"
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

    loadList = () => {
        if (this.props.type === "lwf") {
            getDesignations().then((res: any) => {
                if (res && res.result)
                    setOptions(this, this.state.name.name, res.result)
            })
        }
        else
            getAllEmployeeListRM().then((res: any) => {
                if (res && res.result)
                    setOptions(this, this.state.name.name, res.result)
            })

    }

    onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;
        onChange(this, name, value);
    }


    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, amount, name, dname, date } = this.state;
            const model: any = {
                amount: parseFloat(amount.value),
                name: name.value,
                dname: dname.value,
                date: date.value,
            };
            if (id !== 0) {
                model.id = id;
            }
            this.props.onSubmit(model);
        }
    }


}

export default ComponentName;
