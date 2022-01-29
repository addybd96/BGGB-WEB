import * as React from 'react';
import * as moment from 'moment'
import NumberFormat from 'react-number-format';
import { getLoginStatusList, getRoleList, getEmpStatusList } from './../../action/ConfigAction';
import { onChange, validateForm, setOptions, getCookie } from '../../utils';
import CONSTANT from './../../constant';
import { isMoment } from 'moment';

class EmployeeMaster extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        console.log("detail  ", detail)
        this.state = {
            id: detail ? detail.id : undefined,
            firstName: { value: detail ? detail.firstName : '', name: 'firstName', error: '', isRequired: true },
            middleName: { value: detail ? detail.middleName : '', name: 'middleName', error: '', isRequired: false },
            lastName: { value: detail ? detail.lastName : '', name: 'lastName', error: '', isRequired: true },
            mobile: { value: detail ? detail.mobile : '', name: 'mobile', error: '', isRequired: true },
            email: { value: detail ? detail.email : '', name: 'email', error: '', isRequired: true },
            employmentStatusId: { value: detail ? detail.employmentStatusId : '', name: 'employmentStatusId', error: '', isRequired: true, options: [] },
            prevEmploymentStatusId: { value: detail ? detail.employmentStatusId : ''},
            employmentStatusFromDate: { value: detail ? moment(detail.employmentStatusFromDate).format('YYYY-MM-DD') : '', name: 'employmentStatusFromDate', error: '', isRequired: true, options: [] },
            loginStatusId: { value: detail ? detail.loginStatusId : '', name: 'loginStatusId', error: '', isRequired: true, options: [] },
            // roleId: { value: detail ? detail.roleId : '', name: 'roleId', error: '', isRequired: true, options: [] },
            isOnboard: { value: detail ? detail.isOnboard : false, name: 'isOnboard', error: '', isRequired: true },
            userType: undefined,
            superannuatedStatusId: { value: detail && detail.superannuatedStatusId ? detail.superannuatedStatusId : '', name: 'superannuatedStatusId', error: '', isRequired: detail && detail.employmentStatusId == '4' ? true : false, options: [] },
            isSuperannuated: detail && detail.employmentStatusId == '4' ? true : false,
            minDateFrom: detail ? moment(detail.employmentStatusFromDate).add(1, 'day').format('YYYY-MM-DD') : '',
            maxDateFrom: moment().format('YYYY-MM-DD')
        }
    }

    componentDidMount() {
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        this.setState({ userType: userDetail.userType });
        getLoginStatusList().then((res: any) => {
            setOptions(this, this.state.loginStatusId.name, res.result);
        });

        getEmpStatusList().then((res: any) => {
            setOptions(this, this.state.employmentStatusId.name, res.result);
        });

        // getRoleList().then((res: any) => {
        //     setOptions(this, this.state.roleId.name, res.result);
        // });
    }

    public render() {
        const { firstName, middleName, lastName, email, mobile, loginStatusId, employmentStatusFromDate, employmentStatusId, userType, superannuatedStatusId, isSuperannuated, minDateFrom , maxDateFrom,prevEmploymentStatusId} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="card mt-3">
                    <div className="card-header">
                        Master detail
                                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-4 form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className={firstName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="First Name of the employee"
                                    name={firstName.name}
                                    value={firstName.value}
                                    onChange={this.onChange}
                                />

                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Middle Name</label>
                                <input
                                    type="text"
                                    className={middleName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Middle Name of the employee"
                                    name={middleName.name}
                                    value={middleName.value}
                                    onChange={this.onChange}
                                />

                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Last Name *</label>
                                <input
                                    type="text"
                                    className={lastName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Last Name of the employee"
                                    name={lastName.name}
                                    value={lastName.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                />

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className=" form-group">
                                    <label>Mobile number *</label>
                                    <NumberFormat
                                        maxLength={10}
                                        allowNegative={false}
                                        className={mobile.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter mobile number"
                                        name={mobile.name}
                                        value={mobile.value}
                                        onChange={this.onChange}
                                        disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                    />
                                    <small>* Will also be the password during inital login</small>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        className={email.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Login email of the employee"
                                        name={email.name}
                                        value={email.value}
                                        onChange={this.onChange}
                                        disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label>Employment Status*</label>
                                    <select
                                        className={employmentStatusId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        name={employmentStatusId.name}
                                        value={employmentStatusId.value}
                                        onChange={this.onChangeEmployment}
                                        disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                    >
                                        <option value="">Select Employment Status</option>
                                        {
                                            employmentStatusId.options.map((item: any, index: number) => {
                                                return (
                                                    <option value={item.id} key={index}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            {isSuperannuated &&
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Superannuated Status*</label>
                                        <select
                                            className={superannuatedStatusId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            name={superannuatedStatusId.name}
                                            value={superannuatedStatusId.value}
                                            onChange={this.onChange}
                                            disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                        >
                                            <option value="">Select Employment Status</option>
                                            <option value="1">Normal</option>
                                            <option value="2">Demise</option>
                                        </select>
                                    </div>
                                </div>
                            }
                            <div className="col-lg-3 form-group">
                                <label>Employment Status From</label>
                                <input
                                    type="date"
                                    className={employmentStatusFromDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Name of the employee"
                                    name={employmentStatusFromDate.name}
                                    value={employmentStatusFromDate.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                    min={minDateFrom}
                                    max={maxDateFrom}
                                />

                            </div>
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label>login status*</label>
                                    <select
                                        className={loginStatusId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        name={loginStatusId.name}
                                        value={loginStatusId.value}
                                        onChange={this.onChange}
                                        disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                    >
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
                <div className="col-lg-2 pull-right pr-0 pl-0">
                    <div className="row">

                        <div className="col-lg-12 pull-right mt-3 mb-3">
                            <button type="submit" className="btn btn-primary btn-sm" disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}>Save & Continue</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === this.state.isOnboard.name) {
            value = (value === 'true');
        }

        onChange(this, name, value);
    }

    onChangeEmployment = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;

        if (value && value == '4') {
            this.setState({ superannuatedStatusId: { ...this.state.superannuatedStatusId, isRequired: true }, isSuperannuated: true });
        } else {
            this.setState({ superannuatedStatusId: { ...this.state.superannuatedStatusId, isRequired: false, value: '' }, isSuperannuated: false });
        }

        onChange(this, name, value);
    }

    onSubmit = (e: any) => {
        e.preventDefault();

        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0)

     
            if ( this.props.detail.employmentStatusId == 5) {
                alert('Employment status cannot be changed for terminated/resigned Staff')
                   return
            }
            if ( this.props.detail.employmentStatusId == 4) {
                alert('Employment status cannot be changed for Retired Staff')
                   return
            }
            

     

        if (validateForm(this)) {
            const st = this.state;
            const model: any = {
                firstName: st.firstName.value,
                middleName: st.middleName.value,
                lastName: st.lastName.value,
                mobile: st.mobile.value,
                email: st.email.value,
                isOnboard: st.isOnboard.value,
                employmentStatusId: st.employmentStatusId.value,
                loginStatusId: parseInt(st.loginStatusId.value, 10),
                employmentStatusFromDate: st.employmentStatusFromDate.value,
                superannuatedStatusId: st.superannuatedStatusId.value
                // roleId: parseInt(st.roleId.value, 10),
            };
            if (st.id !== undefined) {
                model.id = st.id;
            }
            this.props.onSubmit(model);
        }
    }
}

export default EmployeeMaster;
