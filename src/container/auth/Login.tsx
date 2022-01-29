import * as React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import Loader from '../../component/common/Loader';
import CONSTANT from './../../constant';

import { onChange, validateForm, getStorage, setCookie } from './../../utils';
import { login } from './../../action/AuthAction';
import SessionLogout from '../../component/common/SessionLogout';

class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            mobile: { name: 'mobile', value: '', error: '', isRequired: true },
            password: { name: 'password', value: '', error: '', isRequired: true },
            showLoader: false,
            locale: getStorage(CONSTANT.storage.locale)
        }

        const language = getStorage(CONSTANT.storage.language);
        if (language === undefined || language === null) {
            this.props.history.push(CONSTANT.url.language);
        }
    }

    componentDidMount() {
        document.title = "Login - HRMS";
    }

    public render() {
        const { mobile, password, showLoader, locale } = this.state;
        return (
            <div className="fluid-container">
                <SessionLogout />
                <div className="row">
                    {
                        (locale === undefined || locale === null) && <div className="col-md-12 text-center">Redirecting...</div>
                    }
                    {
                        (locale !== undefined && locale !== null) &&
                        < div className="col-md-6 offset-md-3">
                            <div className="card m-3">
                                <div className="card-body">
                                    <h2 className="text-left">{locale.lbl_login}</h2>
                                    {/* <p>Worried about payroll & compliance? Mount Talent Consulting provides the best Payroll Outsourcing solution.</p> */}
                                    <form onSubmit={this.submitForm}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>User Id *</label>
                                                    <NumberFormat
                                                        className={mobile.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                        placeholder="User Id"
                                                        name={mobile.name}
                                                        maxLength={11}
                                                        allowNegative={false}
                                                        value={mobile.value}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Password *</label>
                                                    <input
                                                        type="password"
                                                        className={password.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                        placeholder="Password"
                                                        name={password.name}
                                                        value={password.value}
                                                        onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <small>* Indicates required fields</small>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-3">
                                                {/* <Link to={CONSTANT.url.register}>Register here</Link> */}
                                            </div>
                                            <div className="col-md-6">
                                                {/* <Link to={CONSTANT.url.forgotPassword}>Forgot password?</Link> */}
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btn-primary btn-sm btn-block" type="submit">{locale.btn_submit}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {
                    showLoader && <Loader />
                }
            </div >
        )
    }

    private onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        onChange(this, name, value);
    }

    private submitForm = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            this.setState({ showLoader: true });
            const st = this.state;
            const model = {
                mobile: st.mobile.value,
                password: st.password.value
            };
            login(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res.result) {
                    setCookie('isu', res.result.isu)
                    if (!res.result.iob) {
                        this.props.history.push(CONSTANT.url.onboardEditBasic.replace(':id', res.result.id));
                    } else {
                        this.props.history.push(CONSTANT.url.dashboard);
                    }
                } else {
                    // alert(this.state.locale[res.error]);
                    alert(res.error);
                }
            });
        }
    }
}

export default Login;