import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isEmpty } from './../../utils';

class RegisterModal extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            companyLocation: { value: '', error: '' },
            companyPortal: { value: '', error: '' },
            companyIndustry: { value: '', error: '' },
        }
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { companyLocation, companyPortal, companyIndustry } = this.state;
        const { isModalOpen } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isModalOpen} className="company-model" >
                    <div className="modal-content">
                        <div className="company-icon">
                            <span><i className="fa fa-building"></i></span>
                        </div>
                        <h1 className="modal-title" id="exampleModalLabel">Company Information</h1>
                        <div>
                            <p>Help us setup your accounts</p>
                        </div>
                    </div>
                    <ModalBody>
                        <div>
                            <div className="row">
                                <div className="col-lg-12 mb-2 px-4">
                                    <div className="row">
                                        <div className="col-lg-12 form-group">
                                            <input
                                                type="text"
                                                className={isEmpty(companyLocation.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                placeholder="Company Location"
                                                name="companyLocation"
                                                value={companyLocation.value}
                                                onChange={this._onChange}
                                            />
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <input
                                                type="text"
                                                className={isEmpty(companyPortal.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                placeholder="Portal Name"
                                                name="companyPortal"
                                                value={companyPortal.value}
                                                onChange={this._onChange}
                                            />
                                        </div>

                                        <div className="col-lg-12 form-group">
                                            <input
                                                type="text"
                                                className={isEmpty(companyIndustry.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                placeholder="Industry"
                                                name="companyIndustry"
                                                value={companyIndustry.value}
                                                onChange={this._onChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="col-lg-16 btn btn-primary" onClick={this._updateModal}>Update</button>
                        <button type="button" className="col-lg-16 btn btn-primary" onClick={this._cancelModal}>Cancel</button>
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
        const { companyLocation, companyPortal, companyIndustry } = this.state;
        let status = true;
        if (isEmpty(companyLocation.value)) {
            this._setError('companyLocation', 'error');
            status = false;
        }
        if (isEmpty(companyPortal.value)) {
            this._setError('companyPortal', 'error');
            status = false;
        }
        if (isEmpty(companyIndustry.value)) {
            this._setError('companyIndustry', 'error');
            status = false;
        }
        return status;
    }

    private _clearFormError() {
        this._setError('isFormValid', '')
        this._setError('companyLocation', '');
        this._setError('companyPortal', '');
        this._setError('companyIndustry', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            location: stateData.companyLocation.value,
            website: stateData.companyPortal.value,
            industry: stateData.companyIndustry.value,
            clientId: this.props.clientId
        };

        return jsonToReturn;
    }

    _updateModal = (e: any) => {
        this._clearFormError();
        const isFormValid = this._validateForm();
        if (isFormValid) {
            const jsonToPost = this._getJsonToPOST(this.state);
            this.props.updateRegistration(jsonToPost);
        }
    }

    _cancelModal = () => {
        this.props.closeModal();
    }

}

export default RegisterModal;
