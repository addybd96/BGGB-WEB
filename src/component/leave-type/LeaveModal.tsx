import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { isEmpty } from './../../utils';
import {addLeave} from '../../action/LeaveActions'

export default class LeaveModal extends React.Component<any, any>
{
    constructor(props:any)
    {
        super(props);
        this.state = {
            type: {value: '', error: ''},
            from: {value: '', error: ''},
            to: {value: '', error: ''},
            reason: {value: '', error: ''},
        }

        this._onChange = this._onChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }

    public render() {
        const { isModalOpen } = this.props
        const { from, to, reason, type } = this.state;

        return (<React.Fragment>
            <Modal isOpen={isModalOpen} className="company-model" >
                <div className="modal-header">
                    <h1 className="modal-title" id="exampleModalLabel">{this.props.title}</h1>
                    <button type="button" className="close" data-dismiss="modal" onClick={this._dismissModal}>&times;</button>
                </div>
                <ModalBody>
                    <div className="modal-body">
                        <div>
                            <div className="row">

                                <div className="col-lg-12 mb-2">
                                    <div>
                                        <form>
                                            <div className="mb-2">
                                                <div className="row">
                                                <div className="col-lg-6 form-group">
                                                    <label >From</label>
                                                        <input name="from" value={from.value} type="date" className={isEmpty(from.error) ? "form-control" : "form-control is-invalid"}  placeholder="yyyy-mm-dd" onChange={this._onChange} />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                    <label >To</label>
                                                        <input name="to" value={to.value} type="date" className={isEmpty(to.error) ? "form-control" : "form-control is-invalid"}  placeholder="yyyy-mm-dd" onChange={this._onChange}/>
                                                    </div>
                                                    <div className="col-lg-12 form-group">
                                                    <label >Type</label>
                                                        <select name="type" value={type.value} className={isEmpty(type.error) ? "form-control" : "form-control is-invalid"}  onChange={this._onChange}>
                                                            <option >--Select--</option>
                                                            <option value="0">Casual</option>
                                                            <option value="1">Medical</option>
                                                            <option value="1">Complementary</option>
                                                        </select>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <div className="row">

                                                    <div className="col-lg-12 form-group">
                                                        <label >Reason</label>
                                                        <textarea name="reason" value={reason.value} className={isEmpty(reason.error) ? "form-control" : "form-control is-invalid"}  rows={5} id="comment" placeholder="Type Here" onChange={this._onChange}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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

    private _validateForm() {
        const { from, to, reason, type } = this.state;
        let status = true;
        if (isEmpty(from.value)) {
            this._setError('from', 'error');
            status = false;
        }
        if (isEmpty(to.value)) {
            this._setError('to', 'error');
            status = false;
        }
        if (isEmpty(type.value)) {
            this._setError('type', 'error');
            status = false;
        }
        if (isEmpty(reason.value)) {
            this._setError('reason', 'error');
            status = false;
        }

        return status;
    }

    _onSubmit = () =>{
        console.log('onsubmit addleave')
        this._clearFormError();
        if(this._validateForm())
        {
            const { from, to, reason, type } = this.state;
            let payload = {
                from: from.value,
                to: to.value,
                type: type.value,
                remark: reason.value,
                //empId: this.props.attendance.empId
            }

            addLeave(payload).then((resp: any)=>{
                console.log('addLeave resp', resp)
                this.props.toggleModal();
            })
        }
    }

    private _setError(name: string, error: string) {
        this.setState({ [name]: { ...this.state[name], error } });
    }

    private _clearFormError() {
        this._setError('from', '')
        this._setError('to', '');
        this._setError('reason', '');
        this._setError('type', '');
    }
    
    _dismissModal = () => {
        this.props.dismissModal();
    }
}