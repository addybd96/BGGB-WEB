import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { onChange, setOptions, validateForm } from './../../../utils';
import { getAllEmployeeList } from './../../../action/EmployeeAction';
import { getCategory } from './../../../action/HelpdeskActions';

class AddSubCategoryCard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: detail ? detail.id : 0,
            subCategoryName: { name: 'subCategoryName', value: detail ? detail.name : '', error: '', isRequired: true },
            category: { name: 'category', value: '', error: '', isRequired: true, options: [] },
        }
    }

    public componentDidMount() {
        this.getCategoryList();
    }

    public render() {
        const { subCategoryName, category } = this.state;
        return (
            <form onSubmit={this.onSubmit}>

                <div className="card mt-2">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-lg-12">
                                <b>Add Sub Category</b>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">

                            <div className="col-lg-12 form-group">
                                <label>Category</label>
                                <select
                                    className={category.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                    name={category.name}
                                    value={category.value}
                                    onChange={this.onChange}>
                                    <option value=''>Select Category</option>
                                    {
                                        category.options.map((item: any, index: number) => {
                                            return (<option value={item.id} key={index}>{item.name}</option>)
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-lg-12 mb-2">
                                <div className="row">
                                    <div className="col-lg-12 form-group">
                                        <label>Sub Category Name</label>
                                        <input
                                            type="text"
                                            className={subCategoryName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder="Enter Sub Category Name"
                                            name={subCategoryName.name}
                                            value={subCategoryName.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
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

    private getCategoryList = () => {
        getCategory().then((response: any) => {
            console.log("get help cat response  => ", response);
            if (response.status) {
                this.setState({
                    category: {
                        ...this.state.category,
                        options: response.result
                    }
                })
            }
        });
    }

    // getEmployees = () => {
    //     this.setState({ showLoader: true });
    //     getAllEmployeeList().then((response: any) => {
    //         console.log("response owner  => ", response.result);
    //         this.setState({ showLoader: false });
    //         this.setState({
    //             category: {
    //                   ...this.state.category,
    //                   options: response.result
    //             }
    //         })
    //     });
    // }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, subCategoryName, category } = this.state;
            const model: any = {
                name: subCategoryName.value,
                categoryId: category.value,
            };
            if (id !== 0) {
                model.id = id;
            }
            console.log("model  =>  ", model);
            this.props.onSubmit(model);
        }
    }
}

export default AddSubCategoryCard;
