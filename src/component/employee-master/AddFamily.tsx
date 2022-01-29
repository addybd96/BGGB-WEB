import * as React from 'react';
import * as moment from 'moment'
import { onChange, validateForm, setOptions } from '../../utils';
import NumberFormat from 'react-number-format';
import { getRelationList } from './../../action/ConfigAction';

class AddFamily extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const isOption = [{ id: false, name: 'No' }, { id: true, name: 'Yes' }];
        const detail = props.detail
        this.state = {
            userId: props.userId,
            id: detail ? detail.id : undefined,
            name: { value: detail ? detail.name : '', name: 'name', error: '', isRequired: true },
            relationship: { value: detail ? detail.relationship : '', name: 'relationship', error: '', isRequired: true, options: [] },
            dateOfBirth: { value: detail && detail.dateOfBirth ? moment(detail.dateOfBirth).format("YYYY-MM-DD") : '', name: 'dateOfBirth', error: '', isRequired: false },
            contactNumber: { value: detail ? detail.contactNumber : '', name: 'contactNumber', error: '', isRequired: true },
            address: { value: detail ? detail.address : '', name: 'address', error: '', isRequired: true },
            email: { value: detail && detail.email ? detail.email : '', name: 'email', error: '', isRequired: false },
            emergencyContact: { value: detail ? detail.isEmergencyContact : false, name: 'emergencyContact', error: '', isRequired: false, options: isOption },
            dependent: { value: detail ? detail.isDependant : false, name: 'dependent', error: '', isRequired: false, options: isOption }
        }
    }

    componentDidMount() {
        getRelationList().then((res: any) => {
            if (res.result) {
                setOptions(this, this.state.relationship.name, res.result);
            }
        }).catch((err: any) => {
            console.log(err);
        });
    }

    public render() {
        const { name, relationship, dateOfBirth, contactNumber,
            address, email, emergencyContact, dependent } = this.state;
        return (
            <form onSubmit={this.onSubmit}>

                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label >Relationship </label>
                        {/* <input
                            type="text"
                            className={relationship.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter relationship"
                            name={relationship.name}
                            value={relationship.value}
                            onChange={this.onChange}
                        /> */}
                        <select
                            className={relationship.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={relationship.name}
                            value={relationship.value}
                            onChange={this.onChange}>
                            <option value="">Select relationship</option>
                            {
                                relationship.options.map((item: any, index: number) => {
                                    return (<option value={item.name} key={index}>{item.name}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-6 form-group">
                        <label >Full Name</label>
                        <input
                            type="text"
                            className={name.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter full name"
                            name={name.name}
                            value={name.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Date Of Birth</label>
                        <input
                            type="date"
                            className={dateOfBirth.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter date of birth"
                            name={dateOfBirth.name}
                            value={dateOfBirth.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Contact Number</label>
                        <NumberFormat
                            className={contactNumber.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter contact number"
                            name={contactNumber.name}
                            value={contactNumber.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Emergency Contact </label>
                        <select
                            className={emergencyContact.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={emergencyContact.name}
                            value={emergencyContact.value}
                            onChange={this.onChange}>
                            {
                                emergencyContact.options.map((item: any, index: number) => {
                                    return (<option value={item.id} key={index}>{item.name}</option>)
                                })
                            }
                        </select>

                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Address </label>
                        <input
                            type="text"
                            className={address.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter address"
                            name={address.name}
                            value={address.value}
                            onChange={this.onChange}
                        />

                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Email Id </label>
                        <input
                            type="email"
                            className={email.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter email Id"
                            name={email.name}
                            value={email.value}
                            onChange={this.onChange}
                        />

                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Dependent </label>
                        <select
                            className={dependent.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={dependent.name}
                            value={dependent.value}
                            onChange={this.onChange}>
                            {
                                dependent.options.map((item: any, index: number) => {
                                    return (<option value={item.id} key={index}>{item.name}</option>)
                                })
                            }
                        </select>

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
            </form >
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;
        onChange(this, name, value);
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            userId: parseInt(stateData.userId),
            name: stateData.name.value,
            relationship: stateData.relationship.value,
            contactNumber: stateData.contactNumber.value,
            isEmergencyContact: stateData.emergencyContact.value,
            dateOfBirth: stateData.dateOfBirth.value,
            address: stateData.address.value,
            email: stateData.email.value,
            isDependant: stateData.dependent.value,
        };

        if (this.props.detail)
            return { ...jsonToReturn, id: this.props.detail.id }

        return jsonToReturn;
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const model = this._getJsonToPOST(this.state);
            this.props.onSubmit(model);
        }
    }

}

export default AddFamily;
