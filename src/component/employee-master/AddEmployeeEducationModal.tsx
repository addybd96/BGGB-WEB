import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { addEducationalDetail } from './../../action/EmployeeAction';
import { isEmpty } from './../../utils';

export default class AddEmployeeEducationModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            schoolName: { value: '', error: '' },
            degreeDiploma: { value: '', error: '' },
            fieldsOfStudy: { value: '', error: '' },
            dateOfCompletion: { value: '', error: '' },
            isModalOpen: false,
        }
        this._onChange = this._onChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }

    public render() {
        const { schoolName, degreeDiploma, fieldsOfStudy, dateOfCompletion } = this.state;
        const { isModalOpen } = this.props
        return (<React.Fragment>
            <Modal isOpen={isModalOpen} className="company-model" >
                <div className="modal-header">
                    <h1 className="modal-title" id="exampleModalLabel">Add Experience</h1>
                </div>
                <ModalBody>
                    <div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-12 form-group">
                                        <label>School Name</label>
                                        <input type="text" className={isEmpty(schoolName.error) ? "form-control" : "form-control is-invalid"} value={schoolName.value} onChange={this._onChange} name="schoolName" />
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label>Degree/Diploma</label>
                                        <input type="text" className={isEmpty(degreeDiploma.error) ? "form-control" : "form-control is-invalid"} value={degreeDiploma.value} onChange={this._onChange} name="degreeDiploma" />
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label>Field(s) of Study</label>
                                        <input type="text" className={isEmpty(fieldsOfStudy.error) ? "form-control" : "form-control is-invalid"} value={fieldsOfStudy.value} onChange={this._onChange} name="fieldsOfStudy" />
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label>Date of Completion</label>
                                        <input type="date" className={isEmpty(dateOfCompletion.error) ? "form-control" : "form-control is-invalid"} value={dateOfCompletion.value} onChange={this._onChange} name="dateOfCompletion" />
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="col-lg-12 btn btn-primary" onClick={this._onSubmit}>Submit</button>
                </ModalFooter>
            </Modal>
        </React.Fragment>)
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
        const { schoolName, degreeDiploma, fieldsOfStudy, dateOfCompletion } = this.state;
        let status = true;
        if (isEmpty(schoolName.value)) {
            this._setError('schoolName', 'error');
            status = false;
        }
        if (isEmpty(degreeDiploma.value)) {
            this._setError('degreeDiploma', 'error');
            status = false;
        }
        if (isEmpty(fieldsOfStudy.value)) {
            this._setError('fieldsOfStudy', 'error');
            status = false;
        }
        if (isEmpty(dateOfCompletion.value)) {
            this._setError('dateOfCompletion', 'error');
            status = false;
        }
        return status;
    }

    private _clearFormError() {
        this._setError('schoolName', '')
        this._setError('degreeDiploma', '');
        this._setError('fieldsOfStudy', '');
        this._setError('durationEnd', '');
        this._setError('dateOfCompletion', '');
    }

    private _onSubmit = (e: any) => {
        const { schoolName, degreeDiploma, fieldsOfStudy, dateOfCompletion } = this.state; e.preventDefault();
        this._clearFormError();
        const isFormValid = this._validateForm();

        if (isFormValid) {
            const jsonToPost = {
                schoolName: schoolName.value,
                degreeDiploma: degreeDiploma.value,
                fieldsOfStudy: fieldsOfStudy.value,
                dateOfCompletion: dateOfCompletion.value,
            }
            console.log("add basic request  => ", jsonToPost);
            addEducationalDetail(jsonToPost).then((response: any) => {
                this.props.toggleModal();
                this.props.onSuccess();
            });
        }
    }

}