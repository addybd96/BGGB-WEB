import * as React from 'react';
import { onChange, validateForm } from './../../utils';
import NumberFormat from 'react-number-format';
class AddTrainingExperience extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        const detail = props.detail
        this.state = {
            userId: props.userId,
            Course: { value: detail ? detail.Course : '', name: 'Course', error: '', isRequired: true, show: true },
            Organization: { value: detail ? detail.Organization : '', name: 'Organization', error: '', isRequired: true, show: true },
            Description: { value: detail ? detail.Description : '', name: 'Description', error: '', isRequired: true, show: true },
            Duration: { value: detail ? detail.Duration : '', name: 'Duration', error: '', isRequired: true, show: true },
            from: { value: detail ? detail.from : '', name: 'from', error: '', isRequired: true, show: true },
            to: { value: detail ? detail.to : '', name: 'to', error: '', isRequired: true, show: true },
            remarks: { value: detail ? detail.remarks : '', name: 'remarks', error: '', isRequired: true, show: true },
        }
    }

    render() {
        const { Course, Organization, Description, Duration, from, to, remarks } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>Training Name </label>
                        <input
                            type="text"
                            className={Course.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter Training Name"
                            name={Course.name}
                            value={Course.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Organization </label>
                        <input
                            type="text"
                            placeholder="Enter Organization name"
                            className={Organization.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={Organization.name}
                            value={Organization.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Description </label>
                        <input
                            type="text"
                            placeholder="Enter Description"
                            className={Description.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={Description.name}
                            value={Description.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Duration </label>
                        {/* <input
                            type="text"
                            placeholder="Enter Duration"
                            className={Duration.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            name={Duration.name}
                            value={Duration.value}
                            onChange={this.onChange}
                        /> */}
                        <NumberFormat
                           placeholder="Enter Duration"
                           className={Duration.error.length > 0 ? "form-control is-invalid" : "form-control"}
                           name={Duration.name}
                           value={Duration.value}
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

                    <div className="col-lg-6 form-group">
                        <label>remarks </label>
                        <input
                            type="text"
                            placeholder="Enter remarks"
                            className={remarks.error.length > 0 ? "form-control is-invalid" : "form-control"}
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
            Course: stateData.Course.value,
            Organization: stateData.Organization.value,
            Description: stateData.Description.value,
            Duration: stateData.Duration.value,
            from: stateData.from.value,
            to: stateData.to.value,
            remarks: stateData.remarks.value,

        };

        if (this.props.detail)
            return { ...jsonToReturn, id: this.props.detail.id }
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

export default AddTrainingExperience;

