import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { onChange, setOptions, validateForm } from './../../../utils';
import { getAllEmployeeList } from './../../../action/EmployeeAction';

class AddCategoryCard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: detail ? detail.id : 0,
            categoryName: { name: 'categoryName', value: detail ? detail.name : '', error: '', isRequired: true },
            owner: { name: 'owner', value: '', error: '', isRequired: true, options: [] },
        }
    }

    public componentDidMount() {
        this.getEmployees();
    }

    public render() {
        const { categoryName, owner } = this.state;
        console.log("owner  ", owner.value)
        return (
            <form onSubmit={this.onSubmit}>

                <div className="card mt-2">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-lg-12">
                                <b>Add Category</b>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">

                            <div className="col-lg-12 mb-2">
                                <div className="row">
                                    <div className="col-lg-12 form-group">
                                        <label>Category Name</label>
                                        <input
                                            type="text"
                                            className={categoryName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder="Enter Category Name"
                                            name={categoryName.name}
                                            value={categoryName.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 form-group">
                                <label>Owner</label>
                                <select
                                    className={owner.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                    name={owner.name}
                                    value={owner.value}
                                    onChange={this.onChange}>
                                    <option value=''>Select an owner</option>
                                    {
                                        owner.options.map((item: any, index: number) => {
                                            return (<option value={item.id} key={index}>{item.name}</option>)
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-lg-12 ">
                                <div className="row mt-3">
                                    <div className="col-md-3">
                                        <button type="button" onClick={this.props.onCancel} className="btn btn-sm btn-block btn-info">Cancel</button>
                                    </div>
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-3">
                                        <button type="submit" className="btn btn-sm btn-block btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </form>
        )
    }

    getEmployees = () => {
        this.setState({ showLoader: true });
        getAllEmployeeList().then((res: any) => {
            console.log("res owner  => ", res.result);
            this.setState({ showLoader: false });
            this.setState({
                owner: {
                      ...this.state.owner,
                      options: res.result
                }
            })
        });
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, categoryName, owner } = this.state;
            const model: any = {
                name: categoryName.value,
                ownerId: owner.value,
            };
            if (id !== 0) {
                model.id = id;
            }
            console.log("model  =>  ", model);
            this.props.onSubmit(model);
        }
    }
}

export default AddCategoryCard;
