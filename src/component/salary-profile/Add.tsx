import * as React from 'react';
// import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { onChange, setOptions, validateForm } from './../../utils';
import { getSalaryComponentList } from '../../action/SalaryComponentActions';
// import { getEmployeeListSummary } from './../../action/EmployeeAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: detail ? detail.id : 0,
            name: { name: 'name', value: detail ? detail.name : '', error: '', isRequired: true },
            salaryComponentIds: { name: 'salaryComponentIds', value: detail ? detail.salaryComponentIds : [], error: '', isRequired: true, options: [] },
        }
    }

    componentDidMount() {
        getSalaryComponentList(1, 100).then((res: any) => {
            const scOptions = res.result.filter((i: any) => i.isActive === true);
            setOptions(this, this.state.salaryComponentIds.name, scOptions);
        });

        // getEmployeeListSummary().then((res: any) => {
        //     setOptions(this, this.state.employeeIds.name, res.result);
        // });
    }

    public render() {
        const { id, name, salaryComponentIds } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="card mt-2">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <b> Salary profile</b>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                className={name.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={name.name}
                                                value={name.value}
                                                onChange={this.onChange}
                                                placeholder="Name of the component"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className={salaryComponentIds.error.length > 0 ? "card mt-2 border border-danger" : "card mt-2"} >
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <b> Salary profile components</b>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        salaryComponentIds.options.map((item: any, i: number) => {
                                            const checked = salaryComponentIds.value.filter((sci: any) => sci.id === item.id).length > 0;
                                            return (
                                                <div className="col-md-12" key={i}>
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input name={salaryComponentIds.name} className="form-check-input" type="checkbox" checked={checked} value={item.id} onChange={this.onChange} />
                                                                {item.name}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row mt-3">
                    <div className="col-md-12">
                        <div className={salaryComponentIds.error.length > 0 ? "card mt-2 border border-danger" : "card mt-2"} >
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <b> Salary group members</b>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Employees </label>
                                            <Typeahead
                                                id="ta-employee-ids"
                                                allowNew={false}
                                                labelKey={(option: any) => `${option.name} (${option.code})`}
                                                name={employeeIds.name}
                                                selected={employeeIds.value}
                                                multiple={true}
                                                options={employeeIds.options}
                                                onChange={(e: any) => this.typeaheadOnChange(employeeIds.name, e)}
                                                placeholder="List of employees"
                                                isInvalid={employeeIds.error.length > 0}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row mt-3">
                    <div className="col-md-3">
                        <button type="button" onClick={this.props.onCancel} className="btn btn-sm btn-block btn-info">Cancel</button>
                    </div>
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-sm btn-block btn-primary">Save changes</button>
                    </div>
                </div>
            </form>
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === this.state.salaryComponentIds.name) {
            let compIdArr = this.state.salaryComponentIds.value;
            let compId = parseInt(value, 10);
            let alreadyExist = compIdArr.filter((i: any) => i.id === compId).length > 0;
            if (alreadyExist) {
                compIdArr = compIdArr.filter((i: any) => i.id !== compId);
            } else {
                compIdArr.push({ id: compId, name: '' });
            }
            value = compIdArr;
        }
        onChange(this, name, value);
    }

    // typeaheadOnChange = (name: string, e: any) => {
    //     let value = e;
    //     if (e.length > 0 && e[0].customOption) {
    //         value = [{ name: e[0].name }];
    //     }
    //     onChange(this, name, value);
    // }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, name, salaryComponentIds } = this.state;
            const model: any = {
                name: name.value,
                salaryComponentIds: salaryComponentIds.value.map((i: any) => i.id)
            };
            if (id !== 0) {
                model.id = id;
            }
            this.props.onSubmit(model);
        }
    }
}

export default ComponentName;
