import * as React from 'react';
import NumberFormat from 'react-number-format';
import { getLeaveTypeList } from './../../action/SettingsActions';
import { onChange, validateForm, setOptions } from '../../utils';

class EmployeeLeaveBalance extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: detail ? detail.id : undefined,
            userId: props.userId,
            leaveTypeId: { value: detail ? detail.leaveTypeId : '', name: 'leaveTypeId', error: '', isRequired: true, options: [] },
            balance: { value: detail && detail.balance ? detail.balance.toString() : '', name: 'balance', error: '', isRequired: true },
            year: { value: detail ? detail.year : '', name: 'year', error: '', isRequired: true },
        }
    }

    componentDidMount() {
        getLeaveTypeList(1, 100).then((res: any) => {
            console.log('res', res)
            this.setState({leaveTypeId: {...this.state.leaveTypeId, options: res.result}})
            //setOptions(this, this.state.leaveTypeId.name, res.result);
        })
    }

    public render() {
        const { id, leaveTypeId, balance, year } = this.state;
        let options = leaveTypeId.options.filter((item:any)=>{
            let index = this.props.usedTypes.indexOf(item.id)
            return !(index > -1)
        });

        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-12 form-group">
                        <label>Leave type *</label>
                        <select
                            name={leaveTypeId.name}
                            onChange={this.onChange}
                            className={leaveTypeId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            value={leaveTypeId.value}
                        >
                            <option value=''>Select leave type</option>
                            {
                                options.map((item: any, index: any) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-12 form-group">
                        <label>Balance *</label>
                        <NumberFormat
                            allowLeadingZeros={false}
                            allowNegative={false}
                            thousandSeparator={true}
                            className={balance.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter leave balance for the below year"
                            name={balance.name}
                            value={balance.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-12 form-group">
                        <label>Year *</label>
                        <NumberFormat
                            maxLength={4}
                            allowLeadingZeros={false}
                            allowNegative={false}
                            className={year.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Deduction is for the year"
                            name={year.name}
                            value={year.value}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <button type="button" onClick={this.props.onCancel} className="btn btn-sm btn-secondary btn-block">Cancel</button>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">{
                        id !== undefined && <button type="button" onClick={this.onDelete} data-id={id} className="btn btn-sm btn-danger btn-block">Delete</button>
                    }
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-sm btn-primary btn-block">Submit</button>
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

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const st = this.state;
            const model: any = {
                userId: parseInt(st.userId, 10),
                leaveTypeId: parseInt(st.leaveTypeId.value, 10),
                balance: parseInt(st.balance.value.replace(/,/g, ''), 10),
                year: parseInt(st.year.value, 10)
            };
            if (st.id) {
                model.id = st.id;
            }
            this.props.onSubmit(model);
        }
    }

    onDelete = (e: any) => {
        const id = parseInt(e.target.dataset.id, 10);
        const confirm = window.confirm('Are you sure, you want to delete this?');
        if (confirm) {
            this.props.onDelete(id);
        }
    }
}

export default EmployeeLeaveBalance;
