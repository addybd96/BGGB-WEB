import * as React from 'react';
import moment from 'moment';
import CONSTANT from './../../constant';
import { validateForm, onChange, setOptions } from './../../utils';
import { getMaritalStatusList, getGenderList } from './../../action/ConfigAction';

class EmployeeBasicDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            userId: props.userId,
            gender: { value: detail && detail.gender ? detail.gender : '', name: 'gender', error: '', isRequired: true, options: [] },
            fatherName: { value: detail && detail.fatherName ? detail.fatherName : '', name: 'fatherName', error: '', isRequired: true },
            motherName: { value: detail && detail.motherName ? detail.motherName : '', name: 'motherName', error: '', isRequired: true },
            specialization: { value: detail ? detail.specialization : '', name: 'specialization', error: '', isRequired: false },
            personalEmail: { value: detail && detail.personalEmail ? detail.personalEmail : '', name: 'personalEmail', error: '', isRequired: true },
            nationality: { value: detail && detail.nationality && detail.nationality ? detail.nationality : '', name: 'nationality', error: '', isRequired: true },
            dateOfBirth: { value: detail && detail.dateOfBirth ? moment(detail.dateOfBirth).format('YYYY-MM-DD') : '', name: 'dateOfBirth', error: '', isRequired: true },
            maritalStatus: { value: detail ? detail.maritalStatus : '', name: 'maritalStatus', error: '', isRequired: true, options: [] },
            bloodGroup: { value: detail ? detail.bloodGroup : '', name: 'bloodGroup', error: '', isRequired: true },
            // specialization: { value: detail ? detail.profilePicture : '', name: 'profilePicture', error: '', isRequired: false },
            photoFile: ''
        }
    }

    componentDidMount() {
        getMaritalStatusList().then((res: any) => {
            if (res.result) {
                setOptions(this, this.state.maritalStatus.name, res.result);
            }
        }).catch((err: any) => {
            console.log(err);
        });

        getGenderList().then((res: any) => {
            if (res.result) {
                setOptions(this, this.state.gender.name, res.result);
            }
        }).catch((err: any) => {
            console.log(err);
        });
    }

    public render() {
        const { userId,
            gender, fatherName, motherName, nationality, personalEmail,
            dateOfBirth, maritalStatus, bloodGroup, specialization } = this.state;
        const { isu, freezed } = this.props
        return (
            <form onSubmit={this.onSubmit}>
                <div className="card mt-3">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-2">
                                Basic detail
                            </div>
                            <div className="col-md-9">

                            </div>
                            <div className="col-md-1">
                                {isu === 'true' ? this.renderFreezeButtons(freezed) : null}
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-4 form-group">
                                <label>Father name *</label>
                                <input
                                    disabled={isu === 'true' ? false : freezed}
                                    type="text"
                                    className={fatherName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter father name"
                                    name={fatherName.name}
                                    value={fatherName.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Mother name *</label>
                                <input
                                    disabled={isu === 'true' ? false : freezed}
                                    type="text"
                                    className={motherName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter mother name"
                                    name={motherName.name}
                                    value={motherName.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Nationality *</label>
                                <input
                                    disabled={isu === 'true' ? false : freezed}
                                    type="text"
                                    className={nationality.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter nationality"
                                    name={nationality.name}
                                    value={nationality.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Date of birth *</label>
                                <input
                                    disabled={isu === 'true' ? false : freezed}
                                    type="date"
                                    className={dateOfBirth.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter date of birth"
                                    name={dateOfBirth.name}
                                    value={dateOfBirth.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Gender *</label>
                                {/* <input
                                    disabled={isu === 'true' ? false : freezed}
                                    type="text"
                                    className={gender.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter gender"
                                    name={gender.name}
                                    value={gender.value}
                                    onChange={this.onChange}
                                /> */}
                                <select
                                    name={gender.name}
                                    value={gender.value}
                                    onChange={this.onChange}
                                    className={gender.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                                    <option>Select gender</option>
                                    {
                                        gender.options.map((e: any, i: number) => {
                                            return (
                                                <option key={i} value={e.name}>{e.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-lg-4 form-group">
                                <label>Martial status *</label>
                                {/* <input
                                    disabled={isu === 'true' ? false : freezed}
                                    type="text"
                                    className={maritalStatus.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter marital status"
                                    name={maritalStatus.name}
                                    value={maritalStatus.value}
                                    onChange={this.onChange}
                                /> */}
                                <select
                                    name={maritalStatus.name}
                                    value={maritalStatus.value}
                                    onChange={this.onChange}
                                    className={maritalStatus.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                                    <option>Select marital status</option>
                                    {
                                        maritalStatus.options.map((e: any, i: number) => {
                                            return (
                                                <option key={i} value={e.name}>{e.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-lg-4 form-group">
                                <label>Blood group *</label>
                                <input
                                    disabled={isu === 'true' ? false : freezed}
                                    type="text"
                                    className={bloodGroup.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter blood group"
                                    name={bloodGroup.name}
                                    value={bloodGroup.value}
                                    onChange={this.onChange}
                                />

                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Specialization</label>
                                <input
                                    disabled
                                    type="text"
                                    className={specialization.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="none"
                                    name={specialization.name}
                                    value={specialization.value}
                                    onChange={this.onChange}
                                />

                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Personal email *</label>
                                <input
                                    disabled={isu === 'true' ? false : freezed}
                                    type="text"
                                    className={personalEmail.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter personal email id"
                                    name={personalEmail.name}
                                    value={personalEmail.value}
                                    onChange={this.onChange}
                                />

                            </div>

                            {/* <div className="col-lg-12 form-group">
                                    <label>Profile picture</label>
                                    <input
                                        name={profilePicture.name}
                                        onChange={this.onChangePhoto}

                                        type="file"
                                        value={profilePicture.value}
                                        className="form-control p-1" />
                                </div> */}
                        </div>

                    </div>
                </div>
                <div className="col-lg-2 pull-right pr-0 pl-0">
                    <div className="row">
                        <div className="col-lg-12 pull-right mt-3 mb-3">
                            <button type="submit" className="btn btn-primary btn-sm">Save & Continue</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    renderFreezeButtons = (freezed: any) => {
        return <button onClick={(e: any) => {
            this.props.toggleFreezed(!freezed);
        }} className="btn btn-primary" >{freezed ? 'Unlock' : 'Lock'}</button>
    }

    private onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            userId: parseInt(stateData.userId, 10),
            gender: stateData.gender.value,
            fatherName: stateData.fatherName.value,
            dateOfBirth: stateData.dateOfBirth.value,
            motherName: stateData.motherName.value,
            specialization: stateData.specialization.value,
            nationality: stateData.nationality.value,
            personalEmail: stateData.personalEmail.value,
            maritalStatus: stateData.maritalStatus.value,
            bloodGroup: stateData.bloodGroup.value,
        };
        return jsonToReturn;
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        console.log('validating', validateForm(this))
        if (validateForm(this)) {
            const model = this._getJsonToPOST(this.state);
            this.props.onSubmit(model);
        }
    }

}

export default EmployeeBasicDetail;