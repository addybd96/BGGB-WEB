import * as React from 'react';
import CONSTANT from '../../../constant'
import * as moment from 'moment-timezone'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getCountryList } from '../../../action/PublicActions'
import { getCompanyDetail, updateCompanyDetail } from '../../../action/CompanyDetail'
import { onChange, setOptions, isEmpty, setError, validateForm } from '../../../utils';

class CompanyDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isModalOpen: false,
            timezone: { name: 'timezone', required: true, error: '', value: '', options: moment.tz.names().map((item: any) => ({ name: item, value: moment.tz(item).format('Z') })) },
            countries: { name: 'countries', required: true, error: '', value: '', options: [] },
            name: { name: 'name', error: '', required: true, value: '' },
            payrollStart: { name: 'payrollStart', required: true, value: '', error: '' },
            payrollEnd: { name: 'payrollEnd', required: true, value: '', error: '' }
        }
        this.onChange = this.onChange.bind(this)
        this.loadDetails = this.loadDetails.bind(this)
    }

    componentDidMount() {
        getCountryList().then((res: any) => {
            if (Array.isArray(res.result))
                this.setState({
                    countries: {
                        ...this.state.countries,
                        options: res.result
                    }
                }, () => this.loadDetails())
        })


    }


    public render() {
        const { countries, timezone, name, payrollStart, payrollEnd } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            <div className="col-lg-11">

                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-12 pl-0">
                                            <h5 className="heading-h1">Company Details</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Basic Details</b>
                                        {/* <a>
                                            <i className="fa fa-pencil add-details float-right">
                                            </i>
                                        </a> */}
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-12 form-group">
                                                        <label>Company Name </label>
                                                        <input type="text" className={isEmpty(name.error) ? "form-control" : "form-control is-invalid"} name={name.name} value={name.value} onChange={this.onChange} />
                                                    </div>
                                                    {/* <div className="col-lg-6 form-group">
                                                        <label>Industry</label>
                                                        <input type="text" className="form-control" />
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <label>Payroll Start Date:</label>
                                                        <input type="text" className={isEmpty(payrollStart.error) ? "form-control" : "form-control is-invalid"} name={payrollStart.name} value={payrollStart.value} onChange={this.onChange} />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Payroll End Date:</label>
                                                        <input type="text" className={isEmpty(payrollEnd.error) ? "form-control" : "form-control is-invalid"} name={payrollEnd.name} value={payrollEnd.value} onChange={this.onChange} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Locale Settings</b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <label>Country/Region </label>
                                                        <Typeahead
                                                            id="ta-employee-ids"
                                                            allowNew={false}
                                                            labelKey={(option: any) => `${option.name}`}
                                                            name={countries.name}
                                                            selected={countries.value}
                                                            options={countries.options}
                                                            onChange={(e: any) => this.typeaheadOnChange(countries.name, e)}
                                                            placeholder="Select Country"
                                                            isInvalid={countries.error.length > 0} />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Time Zone</label>
                                                        <Typeahead
                                                            id="ta-employee-ids"
                                                            allowNew={false}
                                                            labelKey={(option: any) => `${option.name} (${option.value})`}
                                                            name={timezone.name}
                                                            selected={timezone.value}
                                                            options={timezone.options}
                                                            onChange={(e: any) => this.typeaheadOnChange(timezone.name, e)}
                                                            placeholder="Select Timezone"
                                                            isInvalid={timezone.error.length > 0} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-10 mb-2">

                                    </div>
                                    <div className="col-lg-2 mt-2">
                                        <button className="btn btn-primary btn-block" onClick={this.onSubmit}>Save</button>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

    typeaheadOnChange = (name: string, e: any) => {
        let value = e;
        if (e.length > 0 && e[0].customOption) {
            value = [{ name: e[0].name }];
        }
        onChange(this, name, value);
    }
    _onAddUser = () => {
        this.setState({ isModalOpen: true });
    }

    _closeModal = () => {
        this.setState({ isModalOpen: false });
    }

    onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;
        onChange(this, name, value);
    }

    loadDetails = () => {
        getCompanyDetail().then((res: any) => {
            if (Array.isArray(res.result)) {
                const company = res.result[0]
                console.log(company)
                this.setState({
                    name: {
                        ...this.state.name,
                        value: company.name
                    },
                    payrollEnd: {
                        ...this.state.payrollEnd,
                        value: company.payrollEnd ? company.payrollEnd : ''
                    },
                    payrollStart: {
                        ...this.state.payrollStart,
                        value: company.payrollStart ? company.payrollStart : ''
                    },
                    countries: {
                        ...this.state.countries,
                        value: this.state.countries.options.filter((item: any) => item.id === company.countryId)
                    },
                    timezone: {
                        ...this.state.timezone,
                        value: this.state.timezone.options.filter((item: any) => item.value === company.timezone)
                    },
                    id: company.id

                })
            }
        })
    }

    private _validateForm() {
        const { countries, timezone, name, payrollStart, payrollEnd } = this.state;

        console.log(timezone)
        let status = true;
        if (isEmpty(countries.value)) {
            setError(this, 'countries', 'error');
            status = false;
        }

        if (isEmpty(timezone.value)) {
            setError(this, 'timezone', 'error');
            status = false;
        }

        if (isEmpty(name.value)) {
            setError(this, 'name', 'error');
            status = false;
        }

        if (isEmpty(payrollStart.value)) {
            setError(this, 'payrollStart', 'error');
            status = false;
        }

        if (isEmpty(payrollEnd.value)) {
            setError(this, 'payrollEnd', 'error');
            status = false;
        }
        
        return status;
    }

    private _clearFormError() {
        setError(this, 'countries', '')
        setError(this, 'timezone', '')
        setError(this, 'name', '')
        setError(this, 'payrollStart', '')
        setError(this, 'payrollEnd', '')

    }

    onSubmit = (reqObj: any) => {

        this._clearFormError()
        if(this._validateForm())
        {
            let payload = {
                id: this.state.id,
                name: this.state.name.value,
                countryId: this.state.countries.value[0].id,
                payrollEnd: this.state.payrollEnd.value,
                payrollStart: this.state.payrollStart.value,
                timezone: this.state.timezone.value[0].value
            }
            updateCompanyDetail(payload).then((response: any) => {
                if (response.status) {
                    this.setState({ isModalOpen: false });
                    window.location.reload()
                }
            });
        }
        
    }

}

export default CompanyDetail;
