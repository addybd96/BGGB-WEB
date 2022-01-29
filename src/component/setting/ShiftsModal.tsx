import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isEmpty } from '../../utils';

class ShiftsModal extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            locationName: { value: '', error: '' },
            country: { value: '', error: '', options: [{ label: '1', value: 1 }, { label: '1', value: 1 }] },
            state: { value: '', error: '', options: [{ label: '1', value: 1 }, { label: '1', value: 1 }] },
            city: { value: '', error: '', options: [{ label: '1', value: 1 }, { label: '1', value: 1 }] },
            timezone: { value: '', error: '', options: [{ label: '1', value: 1 }, { label: '1', value: 1 }] },
            comment: { value: '', error: '' },
        }
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { locationName, country, state, city, timezone, comment } = this.state;
        const { isModalOpen, companyCode } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isModalOpen}>
                    <ModalBody>
                        <div className="company-model">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Shift</h5>
                                <button type="button" className="close" data-dismiss="modal" onClick={this._dismissModal}>&times;</button>
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
                                                                <label>Shift Name</label>
                                                                <input type="text" className="form-control" placeholder="Shift name" />
                                                            </div>
                                                            <div className="col-lg-6 form-group">
                                                                <label>Start Time</label>
                                                                <input type="text" className="form-control" placeholder="00:00" />
                                                            </div>
                                                            <div className="col-lg-6 form-group">
                                                                <label>End Time</label>
                                                                <input type="text" className="form-control" placeholder="00:00" />
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <label>Working Hours</label>
                                                                <input type="text" className="form-control" placeholder="00:00" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2">
                                                        <div className="row">
                                                            <div className="col-lg-12 form-group">
                                                                <label>Comment</label>
                                                                <textarea className="form-control" id="comment" placeholder="Type Here"></textarea>
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
        const { locationName, country, state, city, timezone, comment } = this.state;

        let status = true;
        if (isEmpty(locationName.value)) {
            this._setError('locationName', 'error');
            status = false;
        }
        if (isEmpty(country.value)) {
            this._setError('country', 'error');
            status = false;
        }
        if (isEmpty(state.value)) {
            this._setError('state', 'error');
            status = false;
        }
        if (isEmpty(city.value)) {
            this._setError('city', 'error');
            status = false;
        }
        if (isEmpty(timezone.value)) {
            this._setError('timezone', 'error');
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
        this._setError('locationName', '');
        this._setError('country', '');
        this._setError('state', '');
        this._setError('city', '');
        this._setError('timezone', '');
        this._setError('comment', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            locationName: stateData.locationName.value,
            country: stateData.country.value,
            state: stateData.state.value,
            city: stateData.city.value,
            timezone: stateData.timezone.value,
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

export default ShiftsModal;
