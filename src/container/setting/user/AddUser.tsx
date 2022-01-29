import * as React from 'react';
import NumberFormat from 'react-number-format';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import Loader from '../../../component/common/Loader';
import { onChange, validateForm, setOptions } from '../../../utils';
import { addUser, getUserRole } from './../../../action/SettingsActions';
import CONSTANT from './../../../constant';
import { getLoginStatusList } from './../../../action/ConfigAction';

class AddUser extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const roleOptions = [{ label: 'Admin', value: 1 }, { label: 'HR Manager', value: 2 },
        { label: 'HR Executive', value: 3 }, { label: 'Payroll Executive', value: 4 }];
        this.state = {
            userName: { name: 'userName', value: '', error: '', isRequired: true },
            userEmail: { name: 'userEmail', value: '', error: '', isRequired: false },
            userMobileNo: { name: 'userMobileNo', value: '', error: '', isRequired: true },
            role: { name: 'role', value: '', error: '', options: [], isRequired: true },
            loginStatusId: { name: 'loginStatusId', value: '', error: '', options: [], isRequired: true },
            showLoader: false
        }
    }

    public componentDidMount() {
        getLoginStatusList().then((res: any) => {
            setOptions(this, this.state.loginStatusId.name, res.result);
        });
        getUserRole().then((response: any) => {
            if (response.status) {
                setOptions(this, this.state.role.name, response.result);
            }
        });
    }

    public render() {
        const { userName, userEmail, userMobileNo, role, loginStatusId, showLoader } = this.state;

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <form onSubmit={this.submitForm}>
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6 pl-0">
                                            <h5 className="heading-h1">Add User</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <b>User</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <label>User Name* </label>
                                                        <input
                                                            type="text"
                                                            className={userName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            placeholder="Enter User Name"
                                                            name="userName"
                                                            value={userName.value}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Email</label>
                                                        <input
                                                            type="text"
                                                            className={userEmail.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            placeholder="Enter Email"
                                                            name="userEmail"
                                                            value={userEmail.value}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Mobile Number*</label>
                                                        <NumberFormat
                                                            className={userMobileNo.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            placeholder="Enter Mobile Number"
                                                            name="userMobileNo"
                                                            allowNegative={false}
                                                            value={userMobileNo.value}
                                                            onChange={this.onChange}
                                                            maxLength={10}
                                                        />
                                                        <small>* Will also be the password during inital login</small>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Role</label>
                                                        <select
                                                            className={role.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                            name="role"
                                                            value={role.value}
                                                            onChange={this.onChange}>
                                                            <option value=''>Select a role</option>
                                                            {
                                                                role.options.map((item: any, index: number) => {
                                                                    return (<option value={item.id} key={index}>{item.name}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="col-lg-6 form-group">
                                                        <label>login status*</label>
                                                        <select
                                                            className={loginStatusId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={loginStatusId.name}
                                                            value={loginStatusId.value}
                                                            onChange={this.onChange}>
                                                            <option value="">Select login status</option>
                                                            {
                                                                loginStatusId.options.map((item: any, index: number) => {
                                                                    return (
                                                                        <option value={item.id} key={index}>{item.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-3">
                                        <button type="button" onClick={this.onCancel} className="btn btn-sm btn-block btn-info">Cancel</button>
                                    </div>
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-3">
                                        <button type="submit" className="btn btn-sm btn-block btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    showLoader && <Loader />
                }
            </React.Fragment >
        )
    }

    private onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        onChange(this, name, value);
    }

    submitForm = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            this.setState({ showLoader: true });
            const { userName, userEmail, userMobileNo, role, loginStatusId } = this.state;
            const jsonToPost = {
                name: userName.value,
                email: userEmail.value,
                mobile: userMobileNo.value,
                roleId: role.value,
                loginStatusId: loginStatusId.value
            };
            // console.log("add user jsonToPost  => ", jsonToPost);
            addUser(jsonToPost).then((response: any) => {
                this.setState({ showLoader: false });
                // console.log("add user response  => ", response);
                if (response.result) {
                    this.props.history.push(CONSTANT.url.settingsOption.userList);
                }else{
                    alert(response.error);
                }
            });
        }
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.userList);
    }
}

export default AddUser;
