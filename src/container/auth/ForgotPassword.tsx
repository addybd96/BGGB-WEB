import * as React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import Loader from '../../component/common/Loader';
import CONSTANT from './../../constant';

import { onChange, validateForm, getStorage } from './../../utils';
import { sendForgotPasswordLink } from './../../action/AuthAction';

class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: { name: 'email', value: '', error: '', isRequired: true },
            mobile: { name: 'mobile', value: '', error: '', isRequired: true },
            showLoader: false,
            locale: getStorage(CONSTANT.storage.locale)
        }

        const language = getStorage(CONSTANT.storage.language);
        if (language === undefined || language === null) {
            this.props.history.push(CONSTANT.url.language);
        }
    }

    componentDidMount() {
        document.title = "Forgot Password - HRMS";
    }

    public render() {
        const { email, mobile, showLoader, locale } = this.state;
        return (
            <div className="fluid-container">
                <div className="row">
                    {
                        (locale === undefined || locale === null) && <div className="col-md-12 text-center">Redirecting...</div>
                    }
                    {
                        (locale !== undefined && locale !== null) &&
                        < div className="col-md-6 offset-md-3">
                            <div className="card m-3">
                                <div className="card-body">
                                    <h2 className="text-left">Forgot password</h2>
                                    {/* <p>Worried about payroll & compliance? Mount Talent Consulting provides the best Payroll Outsourcing solution.</p> */}
                                    <form onSubmit={this.submitForm}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Email *</label>
                                                    <input
                                                        type="email"
                                                        className={email.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                        placeholder="Employee email"
                                                        name={email.name}
                                                        value={email.value}
                                                        onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>mobile *</label>
                                                    <NumberFormat
                                                        className={mobile.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                        placeholder="Mobile number"
                                                        name={mobile.name}
                                                        maxLength={10}
                                                        allowNegative={false}
                                                        value={mobile.value}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <small>* Indicates required fields</small>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-8">
                                                <Link to={CONSTANT.url.login}>Login here</Link>
                                            </div>
                                            <div className="col-md-4">
                                                <button className="btn btn-primary btn-sm btn-block" type="submit">Send instructions</button>
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
                email: st.email.value,
                mobile: st.mobile.value
            };
            sendForgotPasswordLink(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res.result) {
                    // console.log("sendForgotPasswordLink   ", res);
                    this.props.history.push(CONSTANT.url.login);
                    if (!res.result.iob) {
                        // this.props.history.push(CONSTANT.url.onboardEditBasic.replace(':id', res.result.id));
                    } else {
                        // this.props.history.push(CONSTANT.url.dashboard);
                    }
                } else {
                    alert(res.error);
                }
            });
        }
    }
}

export default Login;