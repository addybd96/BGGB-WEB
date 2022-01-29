import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { isEmpty } from '../../utils';

export default class WithdrawModal extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            amount: { name: 'amount', value: '', error: '', },
            tenure: { name: 'tenure', value: '', error: '', options: [] },
            remark: { name: 'remark', value: '', error: '' },
            itemData: undefined,
        }

        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        const item = this.props.item;
        if (item) {
            let startD = moment(item.date).format('YYYY-MM-DD');
            let todayD = moment().format('YYYY-MM-DD');
            console.log("startD  ", startD);
            console.log("todayD  ", todayD);

            const monthDifference = moment(new Date()).diff(new Date(item.date), 'months', true);
            console.log("monthDifference ", monthDifference);

            this.setState({ itemData: item })
        }

        console.log("iteemmmm  ", this.props.item);

    }

    static getDerivedStateFromProps(props: any, state: any) {
        return null;
    }

    public render() {
        console.log("isPending  ", this.props.isPending);
        const { festivalStatusList, isPending } = this.props;
        const { status, amount, remark, date, tenure, itemData } = this.state;

        return (<React.Fragment>
            <React.Fragment>
                <div className="modal-body">
                    <div>
                        <div className="row">

                            <div className="col-lg-12 mb-2">
                                <div>
                                    <form>
                                        {!this.props.isPending ?
                                            <div className="mb-2">
                                                <div className="row">
                                                    <div className="col-lg-12 form-group">
                                                        <span><label>Outstanding Amount: </label>  {itemData && itemData.remainingAmount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            : null}

                                        {!this.props.isPending ?
                                            <div className="mb-2">
                                                <div className="row">
                                                    <div className="col-lg-12 form-group">
                                                        <label>Select Month Tenure</label>
                                                        {this.renderTenureSelect(tenure)}
                                                    </div>
                                                </div>
                                            </div>
                                            : null}
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
            {this.props.festivalStatusList.map((dep: any, dIndex: number) => {
                return (<option key={dIndex} value={dep.id}>{dep.name}</option>)
            })}
        </select>)
    }

    renderTenureSelect = (type: any) => {
        return (<select name={type.name} value={type.value}
            onChange={this._onChange} className={type.error.length > 0 ? "form-control is-invalid" : "form-control"}>
            <option value={1}>{1}</option>
            <option value={2}>{2}</option>
            <option value={3}>{3}</option>
            <option value={4}>{4}</option>
            <option value={5}>{5}</option>
        </select>)
    }

    private _onChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: { ...this.state[name], value } }, callback);
    }

    private _validateForm() {
        const { status, remark, date } = this.state;
        let status_ = true;
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
                amount: this.state.itemData.amount,
                statusId: this.state.status.value,
                comment: this.state.remark.value,
                emiMonth: this.state.tenure.value ? parseInt(this.state.tenure.value) : null
            }
            this.props.onSubmit(payload)
            this.setState({
                status: { name: 'status', value: '', error: '' },
                remark: { name: 'remark', value: '', error: '' },
                date: { name: 'date', value: '', error: '' }
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
