import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isEmpty } from './../../utils';
import { updateAttendance } from '../../action/AttendanceActions'

export default class UpdateAttendanceModal extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);
        this.state = {
            status: { name:'status', value: '', error: '' },
            remark: { name: 'remark', value: '', error: '' },
            status_: [
                { name: "Pending", value: 'pending' },
                { name: "Approve", value: 'approved' },
                { name: "Reject", value: 'rejected' },
            ]
        }

        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props: any, state: any) {
        
        return null;
    }

    public render() {

        const { isModalOpen } = this.props;
        const { status, remark } = this.state;
        return (<React.Fragment>
                <React.Fragment>
                    <div className="modal-body">
                        <div>
                            <div className="row">

                                <div className="col-lg-12 mb-2">
                                    <div>
                                        <form>
                                            <div className="mb-2">
                                                <div className="row">
                                                <div className="col-lg-12 form-group">
                                                            <label>Status</label>
                                                            {this.renderDepartmentSelect(status)}
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <div className="row">
                                                    <div className="col-lg-12 form-group">
                                                        <label >Remark </label>
                                                        <textarea name={remark.name} value={remark.value}
                                                    onChange={this._onChange} className={remark.error.length > 0 ? "form-control is-invalid" : "form-control"} rows={5} id="comment" placeholder="Type Here" ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                <React.Fragment>
                    <button type="button" className="col-lg-12 btn btn-primary" onClick={this._onSubmit}>Update</button>
                </React.Fragment>
        </React.Fragment>)
    }

    renderDepartmentSelect = (type: any) => {
        return (<select name={type.name} value={type.value}
            onChange={this._onChange} className={type.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                {this.state.status_.map((dep: any, dIndex: number) => {
                    return (<option key={dIndex} value={dep.value}>{dep.name}</option>)
                })}
        </select>)
    }

    private _onChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: { ...this.state[name], value } }, callback);
    }

    private _validateForm() {
        const { status, remark } = this.state;
        let status_ = true;
        if (isEmpty(status.value)) {
            this._setError('status', 'error');
            status_ = false;
        }
        if (isEmpty(remark.value)) {
            this._setError('remark', 'error');
            status_ = false;
        }
        return status;
    }

    _onSubmit = () => {
        this._clearFormError();
        if (this._validateForm()) {
            let payload = {
                status: this.state.status.value,
                comment: this.state.remark.value,
                //empId: this.props.attendance.empId
            }
            this.props.onSubmit(payload)
            // this.setState({status: { name:'status', value: '', error: '' },
            // remark: { name: 'remark', value: '', error: '' }})
            // updateAttendance(payload).then((resp: any) => {
            //     console.log('updateAttendance resp', resp)
            //     this.props.toggleModal(this.props.attendance);
            // })
        }
    }

    private _setError(name: string, error: string) {
        this.setState({ [name]: { ...this.state[name], error } });
    }

    private _clearFormError() {
        this._setError('status', '')
        this._setError('remark', '');
    }

    _dismissModal = () => {
        this.props.dismissModal();
    }
}