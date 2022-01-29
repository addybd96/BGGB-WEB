import * as React from 'react';
import moment from 'moment'
import { onChange, validateForm } from './../../utils';

class AddEducation extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        const detail = props.detail
        this.state = {
            userId: props.userId,
            course: { value: detail ? detail.course : '', name: 'course', error: '', isRequired: true },
            institute: { value: detail ? detail.institute : '', name: 'institute', error: '', isRequired: true },
            marks: { value: detail ? detail.marks : '', name: 'marks', error: '', isRequired: true },
            specialization: { value: detail ? detail.specialization : '', name: 'specialization', error: '', isRequired: false },
            startYear: { value: detail ? moment(detail.startYear).format('YYYY-MM-DD') : '', name: 'startYear', error: '', isRequired: true },
            endYear: { value: detail ? moment(detail.endYear).format("YYYY-MM-DD") : '', name: 'endYear', error: '', isRequired: false }
        }
    }

    render() {
        const { course, specialization, institute, marks, startYear, endYear } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label >Degree/Diploma </label>

                        <input
                            type="text"
                            className={course.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter degree"
                            name={course.name}
                            value={course.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label >Institute Name</label>
                        <input
                            type="text"
                            className={institute.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter institute name"
                            name={institute.name}
                            value={institute.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>marks</label>
                        <input
                            type="text"
                            className={marks.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Percentage/Grade"
                            name={marks.name}
                            value={marks.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Specialization / Branch</label>
                        <input
                            type="text"
                            name={specialization.name}
                            placeholder="Enter Specialization or Branch"
                            value={specialization.value}
                            onChange={this.onChange}
                            className={specialization.error.length > 0 ? "form-control is-invalid" : "form-control"}
                        />

                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Start Date</label>
                        <input
                            type="date"
                            className={startYear.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter start Date"
                            name={startYear.name}
                            maxLength={4}
                            value={startYear.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6 form-group">
                        <label >End Date</label>

                        <input
                            type="date"
                            className={endYear.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter end Date"
                            name={endYear.name}
                            value={endYear.value}
                            onChange={this.onChange}
                        />
                        <small>Leave empty if pursuing</small>
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
            marks: stateData.marks.value,
            course: stateData.course.value,
            endYear: stateData.endYear.value,
            institute: stateData.institute.value,
            startYear: stateData.startYear.value,
            specialization: stateData.specialization.value,
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
        }
    }
}

export default AddEducation;

