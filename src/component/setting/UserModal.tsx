import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isEmpty } from '../../utils';

class AddUserModal extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            companyId: { value: '', error: '' },
            email: { value: '', error: '' },
            firstName: { value: '', error: '' },
            lastName: { value: '', error: '' },
        }
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { companyId, email, firstName, lastName } = this.state;
        const { isModalOpen, companyCode } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isModalOpen}>
                    <ModalBody>
                        <div className="company-model">
                            <div className="modal-header">
                                <h5 className="modal-title">Add User</h5>
                                <button type="button" className="close" data-dismiss="modal" onClick={this._dismissModal}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="row">

                                        <div className="col-lg-12 mb-2">
                                            <div>
                                                <form onSubmit={this._submitFormModal}>
                                                    <div className="mb-2">
                                                        <div className="row">
                                                            <div className="col-lg-12 form-group">
                                                                <label>Employee ID</label>
                                                                <input
                                                                    type="text"
                                                                    className={isEmpty(companyId.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                    placeholder="Employee ID"
                                                                    name="companyId"
                                                                    value={companyId.value}
                                                                    onChange={this._onChange}

                                                                />
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <label>Employee Email</label>
                                                                <input
                                                                    type="text"
                                                                    className={isEmpty(email.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                    placeholder="Employee Email"
                                                                    name="email"
                                                                    value={email.value}
                                                                    onChange={this._onChange}
                                                                />
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <label>First Name</label>
                                                                <input
                                                                    type="text"
                                                                    className={isEmpty(firstName.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                    placeholder="First Name"
                                                                    name="firstName"
                                                                    value={firstName.value}
                                                                    onChange={this._onChange}
                                                                />
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <label>Last Name</label>
                                                                <input
                                                                    type="text"
                                                                    className={isEmpty(lastName.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                    placeholder="Last Name"
                                                                    name="lastName"
                                                                    value={lastName.value}
                                                                    onChange={this._onChange}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="col-lg-12 btn btn-primary">Save</button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
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
        const { companyId, email, firstName, lastName } = this.state;

        let status = true;
        if (isEmpty(companyId.value)) {
            this._setError('companyId', 'error');
            status = false;
        }
        if (isEmpty(email.value)) {
            this._setError('email', 'error');
            status = false;
        }
        if (isEmpty(firstName.value)) {
            this._setError('firstName', 'error');
            status = false;
        }
        if (isEmpty(lastName.value)) {
            this._setError('lastName', 'error');
            status = false;
        }
        return status;
    }

    private _clearFormError() {
        this._setError('isFormValid', '')
        this._setError('companyId', '');
        this._setError('email', '');
        this._setError('firstName', '');
        this._setError('lastName', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            companyId: stateData.companyId.value,
            email: stateData.email.value,
            firstName: stateData.firstName.value,
            lastName: stateData.lastName.value
        };

        return jsonToReturn;
    }

    _submitFormModal = (e: any) => {
        this._clearFormError();
        const isFormValid = this._validateForm();
        if (isFormValid) {
            const jsonToPost = this._getJsonToPOST(this.state);
            // console.log("reg step 2 jsonToPost  => ", jsonToPost);
            this.props.addUser(jsonToPost);
        }
    }

    _dismissModal = () => {
        this.props.dismissModal();
    }

}

export default AddUserModal;
