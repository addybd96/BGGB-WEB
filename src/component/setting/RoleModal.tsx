import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isEmpty } from '../../utils';

class RoleModal extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            roleName: { value: '', error: '' },
            permission: { value: '', error: '', options: [{ label: '1', value: 1 }, { label: '1', value: 1 }] },
            comment: { value: '', error: '' },
        }
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { roleName, permission, comment } = this.state;
        const { isModalOpen, companyCode } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isModalOpen}>
                    <ModalBody>
                        <div className="company-model">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Role</h5>
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
                                                                <label>Role Name</label>
                                                                <input
                                                                    type="text"
                                                                    className={isEmpty(roleName.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                    placeholder="Department Name"
                                                                    name="roleName"
                                                                    value={roleName.value}
                                                                    onChange={this._onChange}
                                                                />
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <label>Select Permission</label>
                                                                <select
                                                                    className={isEmpty(permission.error) ? 'form-control' : 'form-control border has-error'}
                                                                    name="permission"
                                                                    value={permission.value}
                                                                    onChange={this._onChange}>
                                                                    {
                                                                        permission.options.map((item: any, index: number) => {
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
        const { roleName, permission, comment } = this.state;

        let status = true;
        if (isEmpty(roleName.value)) {
            this._setError('roleName', 'error');
            status = false;
        }
        if (isEmpty(permission.value)) {
            this._setError('permission', 'error');
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
        this._setError('roleName', '');
        this._setError('permission', '');
        this._setError('comment', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            roleName: stateData.roleName.value,
            permission: stateData.permission.value,
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

export default RoleModal;
