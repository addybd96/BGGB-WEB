import * as React from 'react';

import CONSTANT from './../../constant';
import Loader from '../../component/common/Loader';
import Header from './../../component/common/Header';
import Sidebar from './../../component/common/Sidebar';
import { onChange, validateForm } from './../../utils';
import { changePassword } from './../../action/AuthAction';

class ChangePassword extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            oldPassword: { name: 'oldPassword', value: '', error: '', isRequired: true },
            newPassword: { name: 'newPassword', value: '', error: '', isRequired: true },
            confirmfNewPassword: { name: 'confirmfNewPassword', value: '', error: '', isRequired: true },
            showLoader: false
        }
    }

    public render() {
        const { oldPassword, newPassword, confirmfNewPassword, showLoader } = this.state;
        return (
            <React.Fragment>
                {
                    showLoader && <Loader />
                }
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            <div className="col-lg-10 mx-auto">
                                <div className="card mt-5">
                                    <div className="card-header">
                                        <b>Change Password</b>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-4 form-group">
                                                        <label>Old Password </label>
                                                        <input
                                                            type="password"
                                                            className={oldPassword.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            placeholder="Enter Old Password"
                                                            name={oldPassword.name}
                                                            value={oldPassword.value}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-4 form-group">
                                                        <label>New Password</label>
                                                        <input
                                                            type="password"
                                                            className={newPassword.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            placeholder="Enter New Password"
                                                            name={newPassword.name}
                                                            value={newPassword.value}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-4 form-group">
                                                        <label>Confirm Password</label>
                                                        <input
                                                            type="password"
                                                            className={confirmfNewPassword.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            placeholder="Enter Confrim New Password"
                                                            name={confirmfNewPassword.name}
                                                            value={confirmfNewPassword.value}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-3 pull-right">
                                                <button type="submit" className="btn primary-control float-right">Submit</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

    private onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        onChange(this, name, value);
    }

    private getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            oldPassword: stateData.oldPassword.value,
            newPassword: stateData.newPassword.value,
            confirmfNewPassword: stateData.confirmfNewPassword.value
        };

        return jsonToReturn;
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { newPassword, confirmfNewPassword } = this.state;
            const jsonToPost = this.getJsonToPOST(this.state);
            if(newPassword.value.length < 8)
            {
                alert('Password must have 8 characters or more!')
                return;
            }
            if (newPassword.value === confirmfNewPassword.value) {
                this.setState({ showLoader: true });

                changePassword(jsonToPost).then((response: any) => {
                    this.setState({ showLoader: false });
                    console.log("change pass response  => ", response);
                    if (response.status) {
                        this.props.history.push(CONSTANT.url.dashboard);
                    }
                });
            } else {
                alert("Password doesn't match")
            }

        }
    }

}

export default ChangePassword;
