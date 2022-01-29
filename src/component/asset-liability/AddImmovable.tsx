import * as React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';

import ModalWindow from '../common/ModalWindow';
import AddImmovableComp from './AddImmovable';
import { onChange, setOptions, isEmpty, setError, validateForm } from '../../utils';

class AddODComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail
        this.state = {
            assetId: props.assetId,
            propertyName: { name: 'propertyName', value: detail ? detail.course : '', error: '', isRequired: true },
            village: { name: 'village', value: detail ? detail.course : '', error: '', isRequired: true },
            subDivision: { name: 'subDivision', value: detail ? detail.course : '', error: '', isRequired: true },
            district: { name: 'district', value: detail ? detail.course : '', error: '', isRequired: true },
            state: { name: 'state', value: detail ? detail.course : '', error: '', isRequired: true },
            propertyOwner: { name: 'propertyOwner', value: detail ? detail.course : '', error: '', isRequired: true },
            relationshipEmp: { name: 'relationshipEmp', value: detail ? detail.course : '', error: '', isRequired: true },
            howAcquired: { name: 'howAcquired', value: detail ? detail.course : '', error: '', isRequired: true },
            dateOfAcquisition: { name: 'dateOfAcquisition', value: detail ? detail.course : '', error: '', isRequired: true },
            personAcquired: { name: 'personAcquired', value: detail ? detail.course : '', error: '', isRequired: true },
            sourceOfAcquisition: { name: 'sourceOfAcquisition', value: detail ? detail.course : '', error: '', isRequired: true },
            annualPropIncome: { name: 'annualPropIncome', value: detail ? detail.course : '', error: '', isRequired: true },
            costAcquisition: { name: 'costAcquisition', value: detail ? detail.course : '', error: '', isRequired: true },
            dateDisposal: { name: 'dateDisposal', value: detail ? detail.course : '', error: '', isRequired: true },
            remark: { name: 'remark', value: detail ? detail.course : '', error: '', isRequired: true },
        }
    }

    public render() {
        const {
            propertyName, village, subDivision, district, state, propertyOwner, relationshipEmp, howAcquired, dateOfAcquisition,
            personAcquired, sourceOfAcquisition, annualPropIncome, costAcquisition, dateDisposal, remark
        } = this.state;
        return (
            <React.Fragment>
                <div className="col-lg-12">
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-lg-6 form-group">
                                <label >Name & Details of Property </label>
                                <input
                                    type="text"
                                    className={propertyName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder=""
                                    name={propertyName.name}
                                    value={propertyName.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Village/Town/City</label>
                                <input
                                    type="text"
                                    className={village.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder=""
                                    name={village.name}
                                    value={village.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Sub Devision/Taluka</label>
                                <input
                                    type="text"
                                    className={subDivision.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder=""
                                    name={subDivision.name}
                                    value={subDivision.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>District</label>
                                <input
                                    type="text"
                                    name={district.name}
                                    placeholder=""
                                    value={district.value}
                                    onChange={this.onChange}
                                    className={district.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                />
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>State</label>
                                <input
                                    type="text"
                                    name={state.name}
                                    placeholder=""
                                    value={state.value}
                                    onChange={this.onChange}
                                    className={state.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                />
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Property Owner Name</label>
                                <input
                                    type="text"
                                    name={propertyOwner.name}
                                    placeholder=""
                                    value={propertyOwner.value}
                                    onChange={this.onChange}
                                    className={propertyOwner.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                />
                                <small>In whose name held, if not in the employee's own name</small>
                            </div>

                            <div className="col-lg-6 form-group">
                                <label>Relationship to Employee</label>
                                <input
                                    type="text"
                                    name={relationshipEmp.name}
                                    placeholder=""
                                    value={relationshipEmp.value}
                                    onChange={this.onChange}
                                    className={relationshipEmp.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                />
                                <small>The relationship to the employee of the person in whose name it is held</small>
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>How Acquired</label>
                                <input
                                    type="text"
                                    name={howAcquired.name}
                                    placeholder=""
                                    value={howAcquired.value}
                                    onChange={this.onChange}
                                    className={howAcquired.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                />
                                <small>How Acquired, whether by purchase, lease, mortage, inheritance, gift or otherwise</small>
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Date of Acquisition</label>
                                <input
                                    type="date"
                                    className={dateOfAcquisition.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder=""
                                    name={dateOfAcquisition.name}
                                    maxLength={4}
                                    value={dateOfAcquisition.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Name & Detail of person acquired</label>
                                <input
                                    type="text"
                                    name={personAcquired.name}
                                    placeholder=""
                                    value={personAcquired.value}
                                    onChange={this.onChange}
                                    className={personAcquired.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                />
                                <small>Name and details of the persons from whom accquired</small>
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Source and fund of acquisition</label>
                                <input
                                    type="text"
                                    name={sourceOfAcquisition.name}
                                    placeholder=""
                                    value={sourceOfAcquisition.value}
                                    onChange={this.onChange}
                                    className={sourceOfAcquisition.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                />
                                <small>Source of funds utilized for the accquisition</small>
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Annual Income from Property, If any</label>
                                <NumberFormat
                                    allowLeadingZeros={false}
                                    allowNegative={false}
                                    thousandSeparator={false}
                                    className={annualPropIncome.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder=""
                                    name={annualPropIncome.name}
                                    value={annualPropIncome.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Cost of Accquisition</label>
                                <NumberFormat
                                    allowLeadingZeros={false}
                                    allowNegative={false}
                                    thousandSeparator={false}
                                    className={costAcquisition.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder=""
                                    name={costAcquisition.name}
                                    value={costAcquisition.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Date of Disposal</label>
                                <input
                                    type="date"
                                    className={dateDisposal.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder=""
                                    name={dateDisposal.name}
                                    value={dateDisposal.value}
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

                </div>
            </React.Fragment>
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
            const {
                assetId, propertyName, village, subDivision, district, state, propertyOwner, relationshipEmp, howAcquired, dateOfAcquisition,
                personAcquired, sourceOfAcquisition, annualPropIncome, costAcquisition, dateDisposal, remark
            } = this.state;
            const model = {
                assetId: assetId,
                nameOfProperty: propertyName.value,
                village: village.value,
                subDivision: subDivision.value,
                district: district.value,
                state: state.value,
                propertyOwner: propertyOwner.value,
                relationshipEmployee: relationshipEmp.value,
                howAcquired: howAcquired.value,
                dateOfAcquisition: dateOfAcquisition.value,
                personAcquired: personAcquired.value,
                sourceOfAcquisition: sourceOfAcquisition.value,
                annualIncome: annualPropIncome.value,
                acquisitionCost: costAcquisition.value,
                dateOfDisposal: dateDisposal.value,
                remark: remark.value,
            }
            this.props.onSubmit(model);
        }
    }

}

export default AddODComponent;
