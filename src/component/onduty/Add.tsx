import * as React from 'react';
import { isValid24HourTime } from '../../utils'
import { onChange, setOptions, isEmpty, setError, validateForm } from './../../utils';

class AddODComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const leaveDetail = props.leaveDetail;
        console.log(leaveDetail ? leaveDetail.description : '');

        this.state = {
            date: { name: 'date', value: '', error: '', isRequired: true },
            checkIn: { name: 'checkIn', value: '', error: '', isRequired: true },
            checkOut: { name: 'checkOut', value: '', error: '', isRequired: true },
            clientName: { name: 'clientName', value: '', error: '', isRequired: true, },
            reason: { name: 'reason', value: '', error: '', isRequired: true, },
        }
    }

    public render() {
        const { empId, date, checkIn, checkOut, clientName, reason } = this.state
        return (<React.Fragment>
            <div className="col-lg-11">

                <div className="col-lg-12 mt-4">
                    <div className="row">
                        <div className="col-lg-12 pl-0">
                            <h5 className="heading-h1">Apply OD</h5>
                        </div>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-header">
                        <b>OD Request</b>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this._submitForm}>
                            <div className="row">

                                <div className="col-lg-12 mb-2">
                                    <div className="row">
                                        {/* <div className="col-lg-3 form-group">
                                            <label >Emp ID</label>

                                            <input type="text" name={empId.name} value={empId.value}
                                                onChange={this._onChange} className={empId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Enter Name" />
                                        </div> */}
                                        <div className="col-lg-4 form-group">
                                            <label >Date</label>

                                            <input type="date" name={date.name} value={date.value}
                                                onChange={this._onChange} className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Enter Name" />
                                        </div>
                                        <div className="col-lg-4 form-group">
                                            <label>Check In Time
                                              </label>
                                            <input type="time" name={checkIn.name} value={checkIn.value}
                                                onChange={this._onChange} className={checkIn.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Enter Name" />
                                        </div>
                                        <div className="col-lg-4 form-group">
                                            <label>Check Out Time
                                              </label>
                                            <input type="time" name={checkOut.name} value={checkOut.value}
                                                onChange={this._onChange} className={checkOut.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Enter Name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="row">
                                        <div className="col-lg-12 form-group">
                                            <label>Client Name</label>

                                            <input type="text" name={clientName.name} value={clientName.value}
                                                onChange={this._onChange} className={clientName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Enter Name" />
                                        </div>


                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="row">
                                        <div className="col-lg-12 form-group">
                                            <label>Reason for leave
                                              </label>
                                            <textarea name={reason.name} value={reason.value}
                                                onChange={this._onChange} className={reason.error.length > 0 ? "form-control is-invalid" : "form-control"} rows={5} id="comment" placeholder="Enter Reason for leave"></textarea>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-12 ">
                                    <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </React.Fragment>)
    }

    private _onChange = (e: any, callback?: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    private _setError = (name: string, error: string) => {
        setError(this, name, error);
    }



    private _clearFormError() {
        this._setError('isFormValid', '')
        this._setError('date', '');
        this._setError('checkIn', '');
        this._setError('checkOut', '');
        this._setError('clientName', '');
        this._setError('reason', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));

        const jsonToReturn = {
            date: stateData.date.value,
            checkIn: stateData.checkIn.value,
            checkOut: stateData.checkOut.value,
            clientName: stateData.clientName.value,
            reason: stateData.reason.value,
            source: 'web'
        };

        return jsonToReturn;
    }

    _submitForm = (e: any) => {
        e.preventDefault();
        this._clearFormError();

        //check time validation

        if (validateForm(this)) {
            const model = this._getJsonToPOST(this.state);
            console.log(model)
            this.props.onSubmit(model);
        }
    }

}

export default AddODComponent;
