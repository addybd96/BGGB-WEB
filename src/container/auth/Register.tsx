import * as React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import CONSTANT from './../../constant';
import Loader from '../../component/common/Loader';
import { onChange, validateForm, setOptions, getStorage } from './../../utils';
import { registerCompany } from './../../action/AuthAction';
import { getCountryList } from './../../action/PublicActions';

class Register extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            companyName: { name: 'companyName', value: '', error: '', isRequired: true },
            countryId: { name: 'countryId', value: '', error: '', isRequired: true, options: [] },
            email: { name: 'email', value: '', error: '', isRequired: true },
            mobile: { name: 'mobile', value: '', error: '', isRequired: true },
            name: { name: 'name', value: '', error: '', isRequired: true },
            password: { name: 'password', value: '', error: '', isRequired: true },
            showLoader: false,
            locale: getStorage(CONSTANT.storage.locale)
        }
    }

    componentDidMount() {
        document.title = "Registration - HRMS";
        getCountryList().then((res: any) => {
            setOptions(this, this.state.countryId.name, res.result);
        })
    }

    public render() {
        const { companyName, countryId, email, mobile, name, password, showLoader, locale } = this.state;
        return (
            <div className="fluid-container">
                <div className="row my-3">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Why us?
                            </div>
                            <div className="card-body">
                                <div className="">
                                    <div className="font-weight-bold">Centralized and secure employee data.</div>
                                    <p>Manage all your HR administrative actions from a central location. Search employees, set favorites, view organization trees, and analyze attrition reports--all from a single dashboard.</p>
                                </div>
                                <div className="">
                                    <div className="font-weight-bold">Track time, leave, and attendance in a snap.</div>
                                    <p>Eliminate errors due to manual entries, consolidate attendance data from multiple devices, customize leave types, schedule jobs, and create timesheets with ease.</p>
                                </div>
                                <div className="">
                                    <div className="font-weight-bold">Simplify employee performance reviews.</div>
                                    <p>Identify your employees' strengths and weaknesses. Set goals, gather 360-degree feedback, and review performance. Bridge the gap between where employees are and where they need to be.</p>
                                </div>
                                <div className="">
                                    <div className="font-weight-bold">Answer your employees' questions.</div>
                                    <p>Too many questions from employees? With our HR case-management tool, create a category for every type of question, assign an agent, organize, and discuss the case through comments.</p>
                                </div>
                                <div className="">
                                    <div className="font-weight-bold">Automate and accelerate your HR tasks.</div>
                                    <p>Automate mail alerts, create tasks and checklists, initiate automatic field updates, and build custom applications. Configure intelligent workflows and spend your time wisely.</p>
                                </div>
                                <div className="">
                                    <div className="font-weight-bold">Customize. Fit your business needs.</div>
                                    <p>Create custom forms for all the information that you like to collect and make sure all your data stays up to date.</p>
                                </div>
                                <div className="">
                                    <div className="font-weight-bold"></div>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                {locale.lbl_register}
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Company Name *</label>
                                                <input
                                                    type="text"
                                                    className={companyName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Name of your company"
                                                    name={companyName.name}
                                                    value={companyName.value}
                                                    onChange={this.onChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Country *</label>
                                                <select
                                                    name={countryId.name}
                                                    value={countryId.value}
                                                    onChange={this.onChange}
                                                    className={countryId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                >
                                                    <option>Select your country</option>
                                                    {
                                                        countryId.options.filter((i: any) => i.featured === true).map(function (item: any, i: number) {
                                                            return (<option key={i} value={item.id}>{item.name}</option>)
                                                        })
                                                    }
                                                    <option disabled={true}>------------------------------------------------------------------</option>
                                                    {
                                                        countryId.options.filter((i: any) => i.featured === false).map(function (item: any, i: number) {
                                                            return (<option key={i} value={item.id}>{item.name}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Your Name *</label>
                                                <input
                                                    type="text"
                                                    className={name.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Your full name"
                                                    name={name.name}
                                                    value={name.value}
                                                    onChange={this.onChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Email *</label>
                                                <input
                                                    type="email"
                                                    className={email.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Your email"
                                                    name={email.name}
                                                    value={email.value}
                                                    onChange={this.onChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Mobile *</label>
                                                <NumberFormat
                                                    allowNegative={false}
                                                    className={mobile.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Your mobile number"
                                                    name={mobile.name}
                                                    maxLength={10}
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
                                            <Link to={CONSTANT.url.login}>Login here</Link>
                                        </div>
                                        <div className="col-md-5">

                                        </div>
                                        <div className="col-md-4">
                                            <button className="btn btn-primary btn-sm btn-block" type="submit">{locale.btn_register}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
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

    private onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            this.setState({ showLoader: true });
            const sd = this.state;
            const model = {
                companyName: sd.companyName.value,
                countryId: sd.countryId.value,
                name: sd.name.value,
                email: sd.email.value,
                mobile: sd.mobile.value,
                password: sd.password.value
            };
            registerCompany(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res.result) {
                    this.props.history.push(`${CONSTANT.url.dashboard}?nu=1`);
                } else {
                    alert(res.error);
                }
            });
        }
    }

}

export default Register;