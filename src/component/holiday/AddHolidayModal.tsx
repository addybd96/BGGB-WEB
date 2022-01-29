import React, { useState } from 'react';
import { isEmpty } from '../../utils';

class ShiftsModal extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            name: { value: '', error: '' },
            type: { value: '', error: '' },
            description: { value: '', error: '' },
            date: { value: '', error: '' },
            week: [
                { id: 0, name: "Sunday" },
                { id: 1, name: "Monday" },
                { id: 2, name: "Tuesday" },
                { id: 3, name: "Wednesday" },
                { id: 4, name: "Thursday" },
                { id: 5, name: "Friday" },
                { id: 6, name: "Saturday" },
            ],

            month: [
                { id: 0, name: "January" },
                { id: 0, name: "February" },
                { id: 0, name: "March" },
                { id: 0, name: "April" },
                { id: 0, name: "May" },
                { id: 0, name: "June" },
                { id: 0, name: "July" },
                { id: 0, name: "August" },
                { id: 0, name: "September" },
                { id: 0, name: "October" },
                { id: 0, name: "November" },
                { id: 0, name: "December" },
            ],
            types: [
                { name: "Gazetted", value: 1 },
                { name: "Restricted", value: 2 },
            ]
        }
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { name, type, description, date } = this.state;
        const { isModalOpen, companyCode } = this.props;
        return (
            <React.Fragment>
                    <React.Fragment>
                        <div className="company-model">
                            <div className="modal-body">
                                <div>
                                    <div className="row">

                                        <div className="col-lg-12 mb-2">
                                            <div>
                                                <form>
                                                    <div className="mb-2">
                                                        <div className="row">
                                                            <div className="col-lg-12 form-group">
                                                                <label>Name</label>
                                                                <input onChange={this._onChange} type="text" className={isEmpty(name.error) ? "form-control" : "form-control is-invalid"} placeholder="Name" name="name" />
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <label>Date</label>
                                                                <input onChange={this._onChange} type="date" className={isEmpty(date.error) ? "form-control" : "form-control is-invalid"} placeholder="" name="date" />
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <label>Type</label>
                                                                {this.renderLocationSelectItems()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2">
                                                        <div className="row">
                                                            <div className="col-lg-12 form-group">
                                                                <label>Description</label>
                                                                <textarea onChange={this._onChange} className={isEmpty(description.error) ? "form-control" : "form-control is-invalid"} id="comment" name="description" placeholder="Type Here"></textarea>
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
                    </React.Fragment>
                    <React.Fragment>
                        <button type="button" onClick={this._submitFormModal} className="col-lg-12 btn btn-primary">Save</button>
                    </React.Fragment>
            </React.Fragment>
        );
    }

    renderLocationSelectItems = () => {
        return (<select className={isEmpty(this.state.type.error) ? "form-control" : "form-control is-invalid"} name="type" onChange={this._onChange}>
            <React.Fragment>
                <option>--Select--</option>
                {this.props.holidayType.map((dep: any, dIndex: number) => {
                    return (<option key={dIndex} value={dep.id}>{dep.name}</option>)
                })}
            </React.Fragment>
        </select>)

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
        const { name, type, description, date } = this.state;

        let status = true;
        if (isEmpty(name.value)) {
            this._setError('name', 'error');
            status = false;
        }
        if (isEmpty(type.value)) {
            this._setError('type', 'error');
            status = false;
        }
        if (isEmpty(description.value)) {
            this._setError('description', 'error');
            status = false;
        }
        if (isEmpty(date.value)) {
            this._setError('date', 'error');
            status = false;
        }
        return status;
    }

    private _clearFormError() {
        this._setError('name', '')
        this._setError('type', '');
        this._setError('description', '');
        this._setError('date', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            name: stateData.name.value,
            date: stateData.date.value,
            type: stateData.type.value,
            description: stateData.description.value,
        };

        return jsonToReturn;
    }

    _submitFormModal = (e: any) => {
        this._clearFormError();
        const isFormValid = this._validateForm();
        console.log(this.state)
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
