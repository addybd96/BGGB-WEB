import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isEmpty } from '../../utils';

class AddDepartmentModal extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            departmentName: { value: '', error: '' },
            departmentHead: { value: '', error: '', options: [{ label: '1', value: 1 }, { label: '1', value: 1 }] },
            parentDepartment: { value: '', error: '', options: [{ label: '1', value: 1 }, { label: '1', value: 1 }] },
            comment: { value: '', error: '' },
        }
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { departmentName, departmentHead, parentDepartment, comment } = this.state;
        const { isModalOpen, companyCode } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isModalOpen}>
                    <ModalBody>
                        <div className="company-model">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Department</h5>
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
                                                                <label>Department Name</label>
                                                                <input
                                                                    type="text"
                                                                    className={isEmpty(departmentName.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                    placeholder="Department Name"
                                                                    name="departmentName"
                                                                    value={departmentName.value}
                                                                    onChange={this._onChange}
                                                                />
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <label>Department Head</label>
                                                                <select
                                                                    className={isEmpty(departmentHead.error) ? 'form-control' : 'form-control border has-error'}
                                                                    name="departmentHead"
                                                                    value={departmentHead.value}
                                                                    onChange={this._onChange}>
                                                                    {
                                                                        departmentHead.options.map((item: any, index: number) => {
                                                                            return (<option value={item.value} key={index}>{item.label}</option>)
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <label>Parent Department</label>
                                                                <select
                                                                    className={isEmpty(parentDepartment.error) ? 'form-control' : 'form-control border has-error'}
                                                                    name="parentDepartment"
                                                                    value={parentDepartment.value}
                                                                    onChange={this._onChange}>
                                                                    {
                                                                        parentDepartment.options.map((item: any, index: number) => {
                                                                            return (<option value={item.value} key={index}>{item.label}</option>)
                                                                        })
                                                                    }
                                                                </select>
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
        const { departmentName, departmentHead, parentDepartment, comment } = this.state;

        let status = true;
        if (isEmpty(departmentName.value)) {
            this._setError('companyId', 'error');
            status = false;
        }
        if (isEmpty(departmentHead.value)) {
            this._setError('email', 'error');
            status = false;
        }
        if (isEmpty(parentDepartment.value)) {
            this._setError('firstName', 'error');
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
        this._setError('departmentName', '');
        this._setError('departmentHead', '');
        this._setError('parentDepartment', '');
        this._setError('comment', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            departmentName: stateData.departmentName.value,
            departmentHead: stateData.departmentHead.value,
            parentDepartment: stateData.parentDepartment.value,
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

export default AddDepartmentModal;
