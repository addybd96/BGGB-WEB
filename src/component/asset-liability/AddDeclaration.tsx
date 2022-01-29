import * as React from 'react';
import moment from 'moment';

import { onChange, validateForm } from '../../utils';

class AddODComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const leaveDetail = props.leaveDetail;
        console.log(leaveDetail ? leaveDetail.description : '');

        this.state = {
            date: { name: 'date', value: '', error: '', isRequired: true },
            place: { name: 'place', value: '', error: '', isRequired: true, },
            agree: { name: 'agree', value: '', error: '', isRequired: true, },
        }
    }

    public render() {
        const { date, place, agree, showModal } = this.state;
        return (
            <React.Fragment>
                <div className="col-lg-12">
                    <form onSubmit={this._submitForm}>
                        {/* <div className="col-lg-12 mt-4">
                            <div className="row">
                                <div className="col-lg-12 pl-0">
                                    <h5 className="heading-h1">Assets and Liability</h5>
                                </div>
                            </div>
                        </div> */}

                        <div className="card mt-2">
                            <div className="card-header">
                                <b>Declaration</b>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-12 form-group d-flex align-items-center">
                                                <input type="checkbox"
                                                    name={date.name} value={date.value}
                                                    onChange={this.onCheckboxChange}
                                                    checked={agree.value}
                                                />
                                                <label className="mt-3 ml-4">I hereby declared that the retur enclosed viz. Annexture 'A', 'B', 'C' are completely true and correct to the best of my knowledge</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3 form-group">
                                                <label>Date</label>
                                                <input
                                                    type="date"
                                                    className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={date.name} value={date.value}
                                                    onChange={this._onChange}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-3 form-group">
                                        <label>Place</label>
                                        <input
                                            type="text"
                                            onChange={this._onChange} className={place.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            name={place.name}
                                            value={place.value}
                                            placeholder=""
                                        />
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

    private onCheckboxChange = (e: any) => {
        this.setState({ agree: { ...this.state.agree, value: e.target.checked } })
    }

    _submitForm = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const model = {
                agreeOn: this.state.date.value,
                place: this.state.place.value,
                assetId: this.props.assetId
            }
            this.props.onSubmit(model);
        }
    }

}

export default AddODComponent;
