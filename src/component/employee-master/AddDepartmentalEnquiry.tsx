import moment from 'moment';
import * as React from 'react';
import { onChange, validateForm } from './../../utils';

class AddDepartmentalEnquiry extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        const detail = props.detail
        this.state = {
            userId: props.userId,
            Name: { value: detail ? detail.Name : '', name: 'Name', error: '', isRequired: true, show: true },
            ChargesheetDate: { value: detail ? detail.ChargesheetDate : '', name: 'ChargesheetDate', error: '', isRequired: true, show: true },
            Chargesheet_number: { value: detail ? detail.Chargesheet_number : '', name: 'Chargesheet_number', error: '', isRequired: true, show: true },
            Order_Number: { value: detail ? detail.Order_Number : '', name: 'Order_Number', error: '', isRequired: true, show: true },
            Punishment: { value: detail ? detail.Punishment : '', name: 'Punishment', error: '', isRequired: true, show: true },
            typeList: { value: detail ? detail.typeList : 'VIGILANCE', name: 'typeList', error: '', options: [{ code: "VIGILANCE", name: 'VIGILANCE' }, { code: "NON VIGILANCE", name: 'NON VIGILANCE' },], isRequired: true },
            suspendedList: { value: detail ? detail.suspendedList : 'suspended', name: 'suspendedList', error: '', options: [{ code: "suspended", name: 'YES' }, { code: "Not Suspended", name: 'NO' },], isRequired: true },
            ApNumber: { value: detail ? detail.ApNumber : '', name: 'ApNumber', error: '', isRequired: false, show: true },
            from: { value: detail ? detail.from : '', name: 'from', error: '', isRequired: true, show: true },
            to: { value: detail ? detail.to : '', name: 'to', error: '', isRequired: true, show: true },
        }
    }

    render() {
        const { Name, ChargesheetDate, Chargesheet_number, Order_Number, ApNumber, Punishment, suspendedList, typeList, from, to } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>File Name </label>
                        <input
                            type="text"
                            className={Name.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter Training Name"
                            name={Name.name}
                            value={Name.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>ChargesheetDate</label>
                        <input
                            type="date"
                            className={ChargesheetDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter start year"
                            name={ChargesheetDate.name}
                            value={ChargesheetDate.value}
                            max={moment().format("YYYY-MM-DD")}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Chargesheet_number </label>
                        <input
                            type="text"
                            placeholder="Enter Chargesheet_number"
                            className={Chargesheet_number.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={Chargesheet_number.name}
                            value={Chargesheet_number.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Order Number </label>
                        <input
                            type="text"
                            placeholder="Enter Order_Number"
                            className={Order_Number.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={Order_Number.name}
                            value={Order_Number.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>ApNumber </label>
                        <input
                            type="text"
                            placeholder="Enter ApNumber"
                            className={ApNumber.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={ApNumber.name}
                            value={ApNumber.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Final Punishment </label>
                        <input
                            type="text"
                            placeholder="Enter Punishment Details"
                            className={Punishment.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={Punishment.name}
                            value={Punishment.value}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="col-lg-6 form-group">
                        <label> Weather Suspended </label>
                        {this.renderSelect(suspendedList, true)}
                    </div>

                    <div className="col-lg-6 form-group">
                        <label> Type </label>
                        {this.renderSelect(typeList, true)}
                    </div>

                    <div className="col-lg-6 form-group">
                        <label htmlFor="from">From </label>
                        <input
                            type="date"
                            className={from.error  != undefined ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter start year"
                            name={from.name}
                            value={from.value}
                            onChange={e => this.setState({ from: e.target.value })}
                            />
                    </div>

                    {from && (
                        <div className="col-lg-6 form-group">
                            <label htmlFor="from">To </label>
                            <input
                                type="date"
                                placeholder="Enter end year"
                                className={to.error != undefined ? "form-control is-invalid" : "form-control"}
                                name={to.name}
                                value={to.value}
                                min={moment(from).format("YYYY-MM-DD")}
                                onChange={e => this.setState({ to: e.target.value })}
                                />
                        </div>
                    )}

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

    private onChange = (e: any, callback?: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    renderSelect = (select: any, f: boolean) => {
        return (<select name={select.name} value={select.value}
            onChange={this.onChange} className={select.error.length > 0 ? "form-control is-invalid" : "form-control"}>
            <React.Fragment>
                {/* <option>--Select--</option> */}
                {select.options.length && select.options.map((e: any, dIndex: number) => {
                    return e && (<option key={dIndex} value={e.code}>{f ? e.name : e.yearCycle}</option>)
                })}
            </React.Fragment>
        </select>)
    }

    getJsonToPOST = () => {
        const stateData = JSON.parse(JSON.stringify(this.state));
        const jsonToReturn = {
            userId: stateData.userId,
            Name: stateData.Name.value,
            ChargesheetDate: stateData.ChargesheetDate.value,
            Chargesheet_number: stateData.Chargesheet_number.value,
            Order_Number: stateData.Order_Number.value,
            Punishment: stateData.Punishment.value,
            typeList: stateData.typeList.value,
            suspendedList: stateData.suspendedList.value,
            ApNumber: stateData.ApNumber.value,
            from: stateData.from.value,
            to: stateData.to.value,

        };

        if (this.props.detail)
            return { ...jsonToReturn, id: this.props.detail.id }
        return jsonToReturn;
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const model = this.getJsonToPOST();
            this.props.onSubmit(model);
            // this.setState({ showLoader: true }, () => {
            //     addEmployeeExperience(model).then((response: any) => {
            //         this.props.history.push(CONSTANT.url.addEmployeeExp)
            //     }, (error: any) => {
            //         alert(error.message);
            //     });
            // });
        }
    }
}

export default AddDepartmentalEnquiry;

