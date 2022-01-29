import * as React from 'react';
import moment from 'moment';

import ModalWindow from '../common/ModalWindow';
import AddImmovableComp from './AddImmovable';
import { onChange, setOptions, isEmpty, setError, validateForm } from '../../utils';

class AddODComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = this.props.detail;
        console.log("detail  ", this.props.detail);
        this.state = {
            assetId: props.assetId,
            empName: { name: 'empName', value: detail && detail.employeeName ? detail.employeeName : '', error: '', isRequired: true, },
            empId: { name: 'empId', value: detail && detail.employeeCode ? detail.employeeCode : '', error: '', isRequired: true },
            empBasic: { name: 'empBasic', value: detail && detail.basic ? detail.basic : '', error: '', isRequired: true },
            grade: { name: 'grade', value: detail && detail.grade ? detail.grade : '', error: '', isRequired: true },
            designation: { name: 'designation', value: detail && detail.designation ? detail.designation : '', error: '', isRequired: true },
            placeOfPosition: { name: 'placeOfPosition', value: detail && detail.placeOfPosition ? detail.placeOfPosition : '', error: '', isRequired: true },
            state: { name: 'state', value: detail && detail.state ? detail.state : '', error: '', isRequired: true },
            lengthOfService: { name: 'lengthOfService', value: detail && detail.lengthOfService ? detail.lengthOfService : '', error: '', isRequired: true },
            year: { name: 'year', value: detail && detail.year ? detail.year : '', error: '', isRequired: true },

        }
    }

    public render() {
        const { empName, empId, empBasic, grade, designation, placeOfPosition, state, lengthOfService, year } = this.state;
        const currentYear = moment().year();
        return (
            <React.Fragment>
                <div className="col-lg-12">
                    <form onSubmit={this._submitForm}>
                        {/* <div className="col-lg-12 mt-4">
                            <div className="row">
                                <div className="col-lg-12 pl-0">
                                    <h5 className="heading-h1">Assets and Liability</h5>
                                </div>
                            </div>
                        </div> */}

                        <div className="card mt-2">
                            <div className="card-header">
                                {/* <b>Detail Form</b> */}
                                <div className="row">
                                    <div className="col-lg-10">
                                        <b>Detail Form</b>
                                    </div>
                                    <div className="col-lg-2 text-right pr-2">
                                        <div className="form-group">
                                            <select
                                                name={year.name}
                                                value={year.value}
                                                onChange={this.onChange}
                                                className={year.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                                                <option>--Select--</option>
                                                <option value={currentYear}>{currentYear}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-6 form-group">
                                                <label>Employee Name</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={empName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={empName.name}
                                                    value={empName.value}
                                                    placeholder="Enter Employee Name"
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Employee Code</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={empId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={empId.name}
                                                    value={empId.value}
                                                    placeholder="Enter Employee ID"
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Present Basic Salary</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={empBasic.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={empBasic.name}
                                                    value={empBasic.value}
                                                    placeholder="Enter Basic Salary"
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Grade Scale</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={grade.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={grade.name}
                                                    value={grade.value}
                                                    placeholder="Enter Grade Scale"
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Designation</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={designation.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={designation.name}
                                                    value={designation.value}
                                                    placeholder="Enter Designation"
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Place of Position</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={placeOfPosition.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={placeOfPosition.name}
                                                    value={placeOfPosition.value}
                                                    placeholder="Enter Place of Position"
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>State</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={state.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={state.name}
                                                    value={state.value}
                                                    placeholder="Enter State"
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Total Length of Service</label>
                                                <input
                                                    type="text"
                                                    onChange={this.onChange} className={lengthOfService.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={lengthOfService.name}
                                                    value={lengthOfService.value}
                                                    placeholder="Enter Total Service Year"
                                                />
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-lg-12 ">
                                        <button type="submit" className="col-lg-2 btn primary-control pull-right">Save and Continue</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </form>

                </div>
            </React.Fragment>
        )
    }

    private onChange = (e: any, callback?: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    _submitForm = (e: any) => {
        e.preventDefault();

        if (validateForm(this)) {
            const { assetId, empName, empId, empBasic, grade, designation, placeOfPosition, state, lengthOfService, year } = this.state;

            const model = {
                id: assetId,
                employeeName: empName.value,
                employeeCode: empId.value,
                basic: empBasic.value,
                grade: grade.value,
                designation: designation.value,
                placeOfPosition: placeOfPosition.value,
                state: state.value,
                lengthOfService: lengthOfService.value,
                year: year.value
            }
            this.props.onSubmit(model);
        }
    }

}

export default AddODComponent;
