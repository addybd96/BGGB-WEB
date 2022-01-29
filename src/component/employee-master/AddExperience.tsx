import * as React from 'react';
import { onChange, validateForm } from './../../utils';

class AddExperience extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        const detail = props.detail
        this.state = {
            userId: props.userId,
            jobProfile: { value: detail? detail.jobProfile:'', name: 'jobProfile', error: '', isRequired: true, show: true },
            companyName: { value: detail? detail.companyName:'', name: 'companyName', error: '', isRequired: true, show: true },
            from: { value: detail? detail.from:'', name: 'from', error: '', isRequired: true, show: true },
            to: { value: detail? detail.to:'', name: 'to', error: '', isRequired: false, show: true },
            remarks: { value: detail? detail.remarks:'', name: 'remarks', error: '', isRequired: true, show: true },
        }
    }

    render() {
        const { jobProfile, companyName, from, to, remarks } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>Job Profile </label>
                        <input
                            type="text"
                            className={jobProfile.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter job profile"
                            name={jobProfile.name}
                            value={jobProfile.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Company Name </label>
                        <input
                            type="text"
                            placeholder="Enter company name"
                            className={companyName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={companyName.name}
                            value={companyName.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>From </label>
                        <input
                            type="date"
                            className={from.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter start year"
                            name={from.name}
                            value={from.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>To </label>
                        <input
                            type="date"
                            placeholder="Enter end year"
                            className={to.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={to.name}
                            value={to.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-12 form-group">
                        <label>Summary </label>
                        <input
                            type="text"
                            className={remarks.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter remarks"
                            name={remarks.name}
                            value={remarks.value}
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

    private onChange = (e: any, callback?: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    getJsonToPOST = () => {
        const stateData = JSON.parse(JSON.stringify(this.state));
        const jsonToReturn = {
            userId: stateData.userId,
            jobProfile: stateData.jobProfile.value,
            remarks: stateData.remarks.value,
            companyName: stateData.companyName.value,
            from: stateData.from.value,
            to: stateData.to.value,

        };

        if(this.props.detail)
            return {...jsonToReturn, id: this.props.detail.id}
        return jsonToReturn;
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const model = this.getJsonToPOST();
            this.props.onSubmit(model);
            // this.setState({ showLoader: true }, () => {
            //     addEmployeeExperience(model).then((response: any) => {
            //         this.props.history.push(CONSTANT.url.addEmployeeExp)
            //     }, (error: any) => {
            //         alert(error.message);
            //     });
            // });
        }
    }
}

export default AddExperience;

