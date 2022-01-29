import * as React from 'react';
import NumberFormat from 'react-number-format';
import { onChange, validateForm } from '../../utils';

class Lic extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.userId,
            insuranceProvider: { value: props.detail ? props.detail.insuranceProvider : '', name: 'insuranceProvider', error: '', isRequired: true },
            amount: { value: props.detail ? props.detail.amount : '', name: 'amount', error: '', isRequired: true },
            licNo: { value: props.detail ? props.detail.licNo : '', name: 'licNo', error: '', isRequired: true },

        }
    }

    render() {
        const { insuranceProvider, amount, licNo, } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label >insurance provider name </label>

                        <input
                            type="text"
                            className={insuranceProvider.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter insurance provider name"
                            name={insuranceProvider.name}
                            value={insuranceProvider.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label > Lic No </label>
                        <input
                            type="text"
                            className={licNo.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter  LIC Number"
                            name={licNo.name}
                            value={licNo.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Amount</label>
                        <NumberFormat
                            className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="12000"
                            name={amount.name}
                            value={amount.value}
                            onChange={this.onChange}
                        />
                    </div>


                </div>
                <div className="row">
                    <div className="col-md-3">
                        <button onClick={this.props.onCancel} type="button" className="btn btn-secondary btn-sm btn-block">Cancel</button>
                    </div>
                    <div className="col-md-6" />
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary btn-sm btn-sm btn-block">Submit</button>
                    </div>
                </div>
            </form>
        )
    }

    private onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    private _getJsonToPOST = () => {
        const stateData = JSON.parse(JSON.stringify(this.state));
        let jsonToReturn = {
            userId: stateData.userId,
            insuranceProvider: stateData.insuranceProvider.value,
            amount: stateData.amount.value,
            licNo: stateData.licNo.value,
        };
        if (this.props.detail)
            return { ...jsonToReturn, id: this.props.detail.id }

        return jsonToReturn;
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const model = this._getJsonToPOST();
            this.props.onSubmit(model);
            this.props.onCancel()
        }
    }
}

export default Lic;

