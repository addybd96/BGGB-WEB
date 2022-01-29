import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { updateVechicalAllowanceWithdrawl } from '../../../action/PerqTravelAllowanceAction';


export default class WithdrawAllowanceModal extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);
        this.state = {
            status: { name: 'status', value: '', error: '', options: [] },
            remark: { name: 'remark', value: '', error: '' },
            statuschk: []
        }

        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props: any, state: any) {
        // if (state.status.value === '')
        //     if (props.leaveStatus)
        //         if (props.isValidate) {
        //             return { ...state, status: { ...state.status, value: props.leaveStatus[0].id } }
        //         }
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

    private _onChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: { ...this.state[name], value } }, callback);
    }

    private _validateForm() {
        const {  remark } = this.state;
        let status = true;
        if (remark.value==='') {
            this._setError('remark', 'error');
            status = false;
        }
        return status;
    }

    _onSubmit = () => {
        this._clearFormError();
        if (this._validateForm()) {
            let payload = {
                remark: this.state.remark.value,
            }
      
          this.props.onSubmit(payload)
            this.setState({
                remark: { name: 'remark', value: '', error: '' }
            })
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