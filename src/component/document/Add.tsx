import * as React from 'react';

import { onChange, validateForm, setError } from '../../utils';


class AddDocumentComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const documentDetail = props.documentDetail;
        const isMandOptions = [{ id: true, name: 'Yes' }, { id: false, name: 'No' }];
        this.state = {
            name: { name: 'name', value: documentDetail ? documentDetail.name : '', error: '', isRequired: true },
            isMandatory: { name: 'isMandatory', value: documentDetail ? documentDetail.isMandatory : true, error: '', options: isMandOptions, },
        }
    }

    public render() {
        const { name, isMandatory } = this.state;
        return (
            <React.Fragment>

                <div className="col-lg-11">
                    <form onSubmit={this._submitForm}>
                        <div className="col-lg-12 mt-4">
                            <div className="row">
                                <div className="col-lg-6 pl-0">
                                    <h5 className="heading-h1">Add Document Type</h5>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <b> Documents</b>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <div className="col-lg-6 form-group">
                                                <label>Document Name </label>
                                                <input
                                                    type="text"
                                                    className={name.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Enter document type name"
                                                    name={name.name}
                                                    value={name.value}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Is Mandatory </label>
                                                <select
                                                    className={isMandatory.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    name={isMandatory.name}
                                                    value={isMandatory.value}
                                                    onChange={this.onChange}>
                                                    {
                                                        isMandatory.options.map((item: any, index: number) => {
                                                            return (<option value={item.id} key={index}>{item.name}</option>)
                                                        })
                                                    }
                                                </select>
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

            </React.Fragment >
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;


        if (name === this.state.isMandatory.name) {
            value = (value === 'true');
        }
        onChange(this, name, value);
    }

    _setError = (name: string, error: string) => {
        setError(this, name, error);
    }

    private _clearFormError() {
        setError(this, 'isFormValid', '')
        setError(this, 'name', '');
        setError(this, 'isMandatory', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            name: stateData.name.value,
            isMandatory: stateData.isMandatory.value,

        };

        return jsonToReturn;
    }

    _submitForm = (e: any) => {
        e.preventDefault();
        this._clearFormError();
        if (validateForm(this)) {
            const jsonToPost = this._getJsonToPOST(this.state);
            this.props.onSubmit(jsonToPost)
        }
    }

    _onBack = () => {

    }

}

export default AddDocumentComponent