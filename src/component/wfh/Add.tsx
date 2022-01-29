import * as React from 'react';

import { onChange, setOptions, isEmpty, setError, validateForm } from './../../utils';

class AddODComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const leaveDetail = props.leaveDetail;
        console.log(leaveDetail ? leaveDetail.description : '');

        this.state = {
            date: { name: 'date', value: '', error: '', isRequired: true },
            reason: { name: 'reason', value: '', error: '', isRequired: true, },
        }
    }

    public render() {
        const { empId, date, reason } = this.state;
        return (
            <React.Fragment>
                <div className="col-lg-11">
                    <form onSubmit={this._submitForm}>
                        <div className="col-lg-12 mt-4">
                            <div className="row">
                                <div className="col-lg-12 pl-0">
                                    <h5 className="heading-h1">Apply Work From Home</h5>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-header">
                                <b>Work From Home Request</b>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            {/* <div className="col-lg-6 form-group">
                                                <label>Emp ID</label>

                                                <input type="text" name={empId.name} value={empId.value}
                                                    onChange={this._onChange} className={empId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter Employee ID" />
                                            </div> */}
                                            <div className="col-lg-12 form-group">
                                                <label>Date
                                              </label>
                                                <input type="date" name={date.name} value={date.value}
                                                    onChange={this._onChange} className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-12 form-group">
                                                <label>Reason
                                              </label>
                                                <textarea name={reason.name} value={reason.value}
                                                    onChange={this._onChange} className={reason.error.length > 0 ? "form-control is-invalid" : "form-control"} rows={5} id="comment" placeholder="Enter Description"></textarea>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-lg-12 ">
                                        <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
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
        this._setError('reason', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));

        const jsonToReturn = {
            date: stateData.date.value,
            reason: stateData.reason.value,

        };

        return jsonToReturn;
    }

    _submitForm = (e: any) => {
        e.preventDefault();
        this._clearFormError();

        if (validateForm(this)) {
            const model = this._getJsonToPOST(this.state);
            this.props.onSubmit(model);
        }
    }

}

export default AddODComponent;
