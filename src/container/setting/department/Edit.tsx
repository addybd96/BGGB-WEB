import * as React from 'react';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { isEmpty } from '../../../utils';
import { updateDepartment } from '../../../action/SettingsActions';
import CONSTANT from '../../../constant';

class EditDepartment extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            departmentId: props.location.state.departmentId,
            departmentName: { value: props.location.state.name, error: '' },
            departmentHead: { value: '', error: '', options: [{ label: '1', value: 1 }, { label: '1', value: 1 }] },
            parentDepartment: { value: '', error: '', options: [{ label: '1', value: 1 }, { label: '1', value: 1 }] },
            comment: { value: props.location.state.description, error: '' },
        }
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { departmentName, departmentHead, parentDepartment, comment } = this.state;

        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            <div className="col-lg-11">
                                <form onSubmit={this._submitForm}>
                                    <div className="col-lg-12 mt-4">
                                        <div className="row">
                                            <div className="col-lg-6 pl-0">
                                                <h5 className="heading-h1">Edit Department</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mt-2">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <b> Department</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-12 form-group">
                                                            <label>Department Name </label>
                                                            <input
                                                                type="text"
                                                                className={isEmpty(departmentName.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                placeholder="Enter Department Name"
                                                                name="departmentName"
                                                                value={departmentName.value}
                                                                onChange={this._onChange}
                                                            />
                                                        </div>
                                                        {/* <div className="col-lg-6 form-group">
                                                            <label>Department Lead</label>
                                                            <select
                                                                className={isEmpty(departmentHead.error) ? 'form-control' : 'form-control border has-error'}
                                                                name="departmentHead"
                                                                value={departmentHead.value}
                                                                onChange={this._onChange}>
                                                                {
                                                                    departmentHead.options.map((item: any, index: number) => {
                                                                        return (<option value={item.value} key={index}>{item.label}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mb-2">
                                                    {/* <div className="row">
                                                        <div className="col-lg-12 form-group">
                                                            <label>Parent Department</label>
                                                            <select
                                                                className={isEmpty(parentDepartment.error) ? 'form-control' : 'form-control border has-error'}
                                                                name="parentDepartment"
                                                                value={parentDepartment.value}
                                                                onChange={this._onChange}>
                                                                {
                                                                    parentDepartment.options.map((item: any, index: number) => {
                                                                        return (<option value={item.value} key={index}>{item.label}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>

                                                    </div> */}
                                                </div>
                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-12 form-group">
                                                            <label>Comments</label>
                                                            <textarea
                                                                className={isEmpty(comment.error) ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
                                                                placeholder="Type Here"
                                                                name="comment"
                                                                value={comment.value}
                                                                onChange={this._onChange}
                                                            />
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

                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    private _onChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: { ...this.state[name], value } }, callback);
    }

    private _setError(name: string, error: string) {
        this.setState({ [name]: { ...this.state[name], error } });
    }

    private _validateForm() {
        const { departmentName, comment } = this.state;

        let status = true;
        if (isEmpty(departmentName.value)) {
            this._setError('departmentName', 'error');
            status = false;
        }
        if (isEmpty(comment.value)) {
            this._setError('comment', 'error');
            status = false;
        }
        return status;
    }

    private _clearFormError() {
        this._setError('isFormValid', '')
        this._setError('departmentName', '');
        this._setError('comment', '');
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            departmentId: stateData.departmentId,
            name: stateData.departmentName.value,
            description: stateData.comment.value
        };

        return jsonToReturn;
    }

    _submitForm = (e: any) => {
        e.preventDefault();
        this._clearFormError();
        const isFormValid = this._validateForm();
        if (isFormValid) {
            const jsonToPost = this._getJsonToPOST(this.state);
            updateDepartment(jsonToPost).then((response: any) => {
                console.log("update dept response  => ", response);
                if (response.status) {
                    this.props.history.push(CONSTANT.url.settingsOption.department);
                }
            });
        }
    }

}

export default EditDepartment;
