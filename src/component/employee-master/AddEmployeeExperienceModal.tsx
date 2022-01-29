import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { addExperienceDetail } from './../../action/EmployeeAction';
import { isEmpty } from './../../utils';

export default class AddEmployeeExperienceModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            company:{value: '', error: ''},
            designation:{value: '', error: ''},
            summary:{value: '', error: ''},
            durationStart:{value: '', error: ''},
            durationEnd:{value: '', error: ''},
            isModalOpen: false,
        }
        this._onChange = this._onChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }

    public render() {
        const { company, durationStart, durationEnd, designation, summary } = this.state;
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
                                        <form>
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <label>Company Name</label>
                                                        <input type="text" className={isEmpty(company.error) ? "form-control" : "form-control is-invalid"} value={company.value} onChange={this._onChange} name="company" />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Designation</label>
                                                        <input type="text" className={isEmpty(designation.error) ? "form-control" : "form-control is-invalid"} value={designation.value} onChange={this._onChange} name="designation" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <label>From </label>

                                                        <input type="date" className={isEmpty(durationStart.error) ? "form-control" : "form-control is-invalid"} value={durationStart.value} onChange={this._onChange} name="durationStart"/>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label >To</label>
                                                        <input type="date" className={isEmpty(durationEnd.error) ? "form-control" : "form-control is-invalid"} value={durationEnd.value} onChange={this._onChange} name="durationEnd"/>
                                                    </div>
                                                </div>
                                            
                                            <div className="mb-2">
                                                <div className="row">

                                                    <div className="col-lg-12 form-group">
                                                        <label >Summary
                          </label>
                                                        <textarea className={isEmpty(summary.error) ? "form-control" : "form-control is-invalid"} name="summary" value={summary.value} onChange={this._onChange} rows={5} id="comment" placeholder="Type Here"></textarea>
                                                    </div>
                                                </div>
                                            </div>



                                        </form>
                                </div>
                            </div>
                        </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="col-lg-12 btn btn-primary" onClick={this._onSubmit}>Update</button>
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
        const { company, durationStart, durationEnd, designation, summary } = this.state;
        let status = true;
        if (isEmpty(company.value)) {
            this._setError('company', 'error');
            status = false;
        }
        if (isEmpty(durationEnd.value)) {
            this._setError('durationEnd', 'error');
            status = false;
        }
        if (isEmpty(durationStart.value)) {
            this._setError('durationStart', 'error');
            status = false;
        }
        if (isEmpty(designation.value)) {
            this._setError('designation', 'error');
            status = false;
        }
        if (isEmpty(summary.value)) {
            this._setError('summary', 'error');
            status = false;
        }
        return status;
    }

    private _clearFormError() {
        this._setError('company', '')
        this._setError('designation', '');
        this._setError('durationStart', '');
        this._setError('durationEnd', '');
        this._setError('summary', '');
    }

    private _onSubmit = (e: any) => {
        console.log('onsubmit')
        const { company, durationStart, durationEnd, designation, summary } = this.state;
        e.preventDefault();
        this._clearFormError();
        const isFormValid = this._validateForm();
        
        if (isFormValid) {
            const jsonToPost = { 
                companyName:  company.value,
                designation: designation.value,
                durationStart: durationStart.value,
                durationEnd: durationEnd.value,
                summary: summary.value
            }
            console.log("add basic request  => ", jsonToPost);
            addExperienceDetail(jsonToPost).then((response: any) => {
                this.props.toggleModal();
                this.props.onSuccess();
            });
        }
    }

}