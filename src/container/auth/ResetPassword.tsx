import * as React from 'react';

import CONSTANT from '../../constant';
import Loader from '../../component/common/Loader'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { onChange, validateForm } from '../../utils';
import { resetPassword } from './../../action/AuthAction';


class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: undefined,
            showLoader: false,
            password: { name: 'password', value: '', error: '', isRequired: true },
            employeeId: { name: 'employeeId', value: '', error: '', isRequired: true },
            confirmPassword: { name: 'confirmPassword', value: '', error: '', isRequired: true },
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = "Reset Password - HRMS";
    }

    public render() {
        const { password, confirmPassword, showLoader, employeeId } = this.state;


        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <form onSubmit={this.onSubmit}>
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-12 pl-0">
                                            {/* <h5 className="heading-h1">Add Vehicle Information</h5> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b> Reset Password</b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div className="row">

                                                    <div className="col-lg-6 form-group">
                                                        <label>Employee Id</label>
                                                        <input
                                                            type="text"
                                                            className={employeeId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            placeholder="Enter employeeId"
                                                            name={employeeId.name}
                                                            value={employeeId.value}
                                                            onChange={this.onChange} />
                                                    </div>

                                                    <div className="col-lg-6 form-group">
                                                        <label>Password *</label>
                                                        <input
                                                            type="text"
                                                            className={password.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            placeholder="Enter password"
                                                            name={password.name}
                                                            value={password.value}
                                                            onChange={this.onChange} />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Confirm Password *</label>
                                                        <input
                                                            type="text"
                                                            className={confirmPassword.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            placeholder="Enter confirm password"
                                                            name={confirmPassword.name}
                                                            value={confirmPassword.value}
                                                            onChange={this.onChange} />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <button type="submit" onClick={this.onSubmit} className="col-lg-2 btn primary-control pull-right">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {showLoader && <Loader />}
            </React.Fragment >
        )
    }
    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value, () => {

        });
    }


    private onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const model = {
                password: this.state.password.value,
                employeeId: this.state.employeeId.value,
            };
            let conf = window.confirm('Are you sure, want to reset the password')
            if (conf) {
                this.setState({ showLoader: true });
                resetPassword(model).then((res: any) => {
                    this.setState({ showLoader: false });
                    if (res.status) {
                        alert('Password Reset Successfully')
                        this.props.history.push(`${CONSTANT.url.dashboard}`);
                    } else {
                        alert(res.error);
                    }
                });
            }
        }
    }



}

export default ComponentName;
