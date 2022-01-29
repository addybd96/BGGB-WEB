import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isEmpty } from '../../utils';

class AddDesignationModal extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            designationName: { value: '', error: '' },
            comment: { value: '', error: '' },
        }
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { designationName, comment } = this.state;
        const { isModalOpen, companyCode } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isModalOpen}>
                    <ModalBody>
                        <div className="company-model">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Designation</h5>
                                <button type="button" className="close" onClick={this._dismissModal}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="row">

                                        <div className="col-lg-12 mb-2">
                                            <div>
                                                <form>
                                                    <div className="mb-2">
                                                        <div className="row">
                                                            <div className="col-lg-12 form-group">
                                                                <label>Designation Name</label>
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
                                                    <div className="mb-2">
                                                        <div className="row">
                                                            <div className="col-lg-12 form-group">
                                                                <label>Comment</label>
                                                                <textarea
                                                                    id="comment"
                                                                    className={isEmpty(comment.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                    placeholder="Type Here"
                                                                    name="comment"
                                                                    value={comment.value}
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
        const { designationName, comment } = this.state;

        let status = true;
        if (isEmpty(designationName.value)) {
            this._setError('designationName', 'error');
            status = false;
        }
        if (isEmpty(comment.value)) {
            this._setError('lastName', 'error');
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
            designationName: stateData.designationName.value,
            comment: stateData.comment.value
        };

        return jsonToReturn;
    }

    _submitFormModal = (e: any) => {
        this._clearFormError();
        const isFormValid = this._validateForm();
        if (isFormValid) {
            const jsonToPost = this._getJsonToPOST(this.state);
            this.props.onSubmitModal(jsonToPost);
        }
    }

    _dismissModal = () => {
        this.props.dismissModal();
    }

}

export default AddDesignationModal;
