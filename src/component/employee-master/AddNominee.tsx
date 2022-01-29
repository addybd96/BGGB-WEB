import * as React from 'react';
import moment from 'moment'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { onChange, validateForm } from './../../utils';

class AddEducation extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        const detail = props.detail
        let familyList = props.familyList

        console.log(props.total)

        this.state = {
            userId: props.userId,
            familyMemberId: { value: detail ? familyList.filter((i: any) => i.id === detail.familyMemberId) : '', name: 'familyMemberId', error: '', isRequired: true, options: familyList },
            amount: { value: detail ? detail.amount : '', name: 'amount', error: '', isRequired: true },
        }
    }

    render() {
        const { familyMemberId, amount } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-12 form-group">
                        <label>Nominee </label>
                        <Typeahead
                            id="ta-employee-ids"
                            allowNew={false}
                            labelKey={(option: any) => `${option.name}`}
                            name={familyMemberId.name}
                            selected={familyMemberId.value}
                            multiple={false}
                            options={familyMemberId.options}
                            onChange={(e: any) => this.typeaheadOnChange(familyMemberId.name, e)}
                            placeholder="Select a nominee"
                            isInvalid={familyMemberId.error.length > 0} />

                    </div>
                    <div className="col-lg-12 form-group">
                        <label>Share</label>
                        <input
                            type="text"
                            className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Percentage/Grade"
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

    typeaheadOnChange = (name: string, e: any) => {
        let value = e;
        if (e.length > 0 && e[0].customOption) {
            value = [{ name: e[0].name }];
        }
        onChange(this, name, value);
    }

    private _getJsonToPOST = () => {
        const stateData = JSON.parse(JSON.stringify(this.state));
        let jsonToReturn = {
            userId: stateData.userId,
            amount: stateData.amount.value,
            familyMemberId: stateData.familyMemberId.value[0].id,
            name: stateData.familyMemberId.options.filter((item: any)=> stateData.familyMemberId.value[0].id === item.id)[0].name
        };
        if (this.props.detail)
            return { ...jsonToReturn, id: this.props.detail.id }

        return jsonToReturn;
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        console.log('here')
        if (validateForm(this)) {

            var amount = parseInt(this.state.amount.value)
            var status = true

            if(this.props.total + amount > 100)
            {
                status = false
                alert('Total share cannot exceed 100')
            }

            let model = this._getJsonToPOST();

            if(this.props.detail)
            if(this.props.detail.id)
                model = {...model, id: this.props.detail.id}

            if(status)    
            this.props.onSubmit(model, this.props.lIndex);
        }
    }
}

export default AddEducation;

