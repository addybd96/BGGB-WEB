import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { onChange, setOptions, validateForm } from './../../../utils';
import { getUserPermissions} from './../../../action/SettingsActions';

class AddRole extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: detail ? detail.id : 0,
            roleName: { name: 'roleName', value: detail ? detail.name : '', error: '', isRequired: true },
            roleDescription: { name: 'roleDescription', value: detail ? detail.description : '', error: '', isRequired: false },
            permission: { name: 'permission', value: '', error: '', isRequired: true, options: [] },
        }
    }

    componentDidMount() {
        getUserPermissions().then((res: any) => {
            setOptions(this, this.state.permission.name, res.result);
        });
    }

    public render() {
        const { id, roleName, permission, roleDescription } = this.state;
        return (
            <form onSubmit={this.onSubmit}>

                <div className="card mt-2">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-lg-12">
                                <b> Roles & Permissions</b>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">

                            <div className="col-lg-12 mb-2">
                                <div className="row">
                                    <div className="col-lg-12 form-group">
                                        <label>Add Role</label>
                                        <input
                                            type="text"
                                            className={roleName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder="Enter Role Name"
                                            name="roleName"
                                            value={roleName.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 form-group">
                                <label>Permission</label>
                                <Typeahead
                                    id="ta-permission-ids"
                                    allowNew={false}
                                    labelKey={(option: any) => `${option.name}`}
                                    name={permission.name}
                                    selected={permission.value}
                                    multiple={true}
                                    options={permission.options}
                                    onChange={(e: any) => this.typeaheadOnChange(permission.name, e)}
                                    placeholder="List of permissions"
                                    isInvalid={permission.error.length > 0}
                                />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <div className="row">
                                    <div className="col-lg-12 form-group">
                                        <label>Description</label>
                                        <textarea
                                            id="Description"
                                            className={roleDescription.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder="Enter Description"
                                            name="roleDescription"
                                            value={roleDescription.value}
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

    onChange = (e: any) => {
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

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, roleName, permission, roleDescription } = this.state;
            const model: any = {
                name: roleName.value,
                permission: permission.value.map((i: any) => i.id),
                description: roleDescription.value,
            };
            if (id !== 0) {
                model.id = id;
            }
            // console.log("model  =>  ", model);
            this.props.onSubmit(model);
        }
    }
}

export default AddRole;
