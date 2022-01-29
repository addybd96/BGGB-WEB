import * as React from 'react';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { isEmpty } from '../../../utils';
import { updateDesignation } from '../../../action/SettingsActions';
import CONSTANT from '../../../constant';

class EditDepartment extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            designationId: props.location.state.designationId,
            designationName: { value: props.location.state.name, error: '' },
            comment: { value: props.location.state.description, error: '' },
        }
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { designationName, comment } = this.state;

        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            <div className="col-lg-11">
                                <form onSubmit={this._submitForm}>
                                    <div className="col-lg-12 mt-4">
                                        <div className="row">
                                            <div className="col-lg-6 pl-0">
                                                <h5 className="heading-h1">Edit Designations</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mt-2">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <b> Designations</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-12 form-group">
                                                            <label>Role name </label>
                                                            <input
                                                                type="text"
                                                                className={isEmpty(designationName.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                placeholder="Designation Name"
                                                                name="designationName"
                                                                value={designationName.value}
                                                                onChange={this._onChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-12 form-group">
                                                            <label>Comments</label>
                                                            <textarea
                                                                className={isEmpty(comment.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                placeholder="Enter Comments"
                                                                name="comment"
                                                                value={comment.value}
                                                                onChange={this._onChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 ">
                                                    <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    private _onChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: { ...this.state[name], value } }, callback);
    }

    private _setError(name: string, error: string) {
        this.setState({ [name]: { ...this.state[name], error } });
    }

    private _validateForm() {
        const { designationName, comment } = this.state;

        let status = true;
        if (isEmpty(designationName.value)) {
            this._setError('designationName', 'error');
            status = false;
        }
        if (isEmpty(comment.value)) {
            this._setError('comment', 'error');
            status = false;
        }
        return status;
    }

    private _clearFormError() {
        this._setError('isFormValid', '')
        this._setError('designationName', '');
        this._setError('comment', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            designationId: stateData.designationId,
            name: stateData.designationName.value,
            description: stateData.comment.value
        };

        return jsonToReturn;
    }

    _submitForm = (e: any) => {
        e.preventDefault();
        this._clearFormError();
        const isFormValid = this._validateForm();
        if (isFormValid) {
            const jsonToPost = this._getJsonToPOST(this.state);
            console.log("update desig jsonToPost  => ", jsonToPost);
            updateDesignation(jsonToPost).then((response: any) => {
                console.log("update desig response  => ", response);
                if (response.status) {
                    this.props.history.push(CONSTANT.url.settingsOption.designation);
                }
            });
        }
    }

}

export default EditDepartment;
