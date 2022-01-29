import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { onChange, validateForm } from '../../../utils';
import { getWorkRoles, addApprovalConfig, getApprovalConfigList } from '../../../action/SettingsActions';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: undefined,
            showLoader: false,
            allowanceName: { name: 'allowanceName', value: '', options: [], error: '', isRequired: true },
            reportingManagerWorkRole: { name: 'reportingManagerWorkRole', options: [], value: '', error: '', isRequired: true },
            applyingEmployeeWorkRole: { name: 'applyingEmployeeWorkRole', options: [], value: '', error: '', isRequired: true },
            approvalPower: { name: 'approvalPower', value: false, error: '', isRequired: true, },

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        getWorkRoles(0, 0).then((response: any) => {
            if (response.status) {
                this.setState({ reportingManagerWorkRole: { ...this.state.reportingManagerWorkRole, options: response.result }, applyingEmployeeWorkRole: { ...this.state.applyingEmployeeWorkRole, options: response.result } })
            }
        });

        this.props.match.params.id && this.setState({ showLoader: true })
        this.props.match.params.id &&
        getApprovalConfigList({ id: this.props.match.params.id }).then((res: any) => {
                this.setState({ showLoader: false })
                if (res)
                    this.setState({
                        id: res.id,
                        allowanceName: { ...this.state.allowanceName, value: res.allowanceName },
                        reportingManagerWorkRole: { ...this.state.reportingManagerWorkRole, value: res.reportingManagerWorkRoleId },
                        applyingEmployeeWorkRole: { ...this.state.applyingEmployeeWorkRole, value: res.applyingEmployeeWorkRoleId },
                        approvalPower: { ...this.state.approvalPower, value: res.approvalPower }
                    });
            })
    }

    private onCheckboxChange = (e: any) => {
        this.setState({ approvalPower: { ...this.state.approvalPower, value: e.target.checked } })
    }

    public render() {
        const { showLoader, allowanceName, applyingEmployeeWorkRole, approvalPower, reportingManagerWorkRole } = this.state;
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
                                        <b>Add New Perquisite Approval Config</b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div className="row">

                                                    <div className="col-lg-6 form-group">
                                                        <label>Allowance Name</label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={allowanceName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={allowanceName.name}
                                                            value={allowanceName.value}

                                                        >
                                                            <option value="">--Select--</option>
                                                            <option value="Fuel">Fuel</option>
                                                            <option value="TaDa">TaDa</option>
                                                            <option value="Hotel">Hotel</option>
                                                            <option value="News Paper">News Paper</option>
                                                            <option value="Mobile Allowance">Mobile Allowance</option>
                                                            <option value="Brief Case">Brief Case</option>
                                                            <option value="Entertainment">Entertainment</option>
                                                            <option value="Uniform and Liveries">Uniform and Liveries</option>
                                                            <option value="Medical Allowance">Medical Allowance</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-lg-6 form-group">
                                                        <label>Applying Employee Work Role</label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={applyingEmployeeWorkRole.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={applyingEmployeeWorkRole.name}
                                                            value={applyingEmployeeWorkRole.value}

                                                        >
                                                            <option value="">--Select--</option>
                                                            {
                                                                applyingEmployeeWorkRole.options.length > 0 &&
                                                                applyingEmployeeWorkRole.options.map((w: any) => {
                                                                    return (
                                                                        <option value={w.id}>{w.name}</option>

                                                                    )
                                                                })
                                                            }

                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Approval Power</label><br />
                                                        <input type="checkbox" onChange={this.onCheckboxChange} checked={approvalPower.value} />
                                                    </div>

                                                    <div className="col-lg-6 form-group">
                                                        <label>Reporting Manager Work Role </label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={reportingManagerWorkRole.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={reportingManagerWorkRole.name}
                                                            value={reportingManagerWorkRole.value}

                                                        >
                                                            <option value="">--Select--</option>
                                                            {
                                                                reportingManagerWorkRole.options.length > 0 &&
                                                                reportingManagerWorkRole.options.map((w: any) => {
                                                                    return (
                                                                        <option value={w.id}>{w.name}</option>

                                                                    )
                                                                })
                                                            }

                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <Link to={CONSTANT.url.settingsOption.perquisiteApprovalList} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
                                                <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
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
        e.preventDefault()
        if (validateForm(this)) {
            const { allowanceName: { value: allowanceName }, reportingManagerWorkRole: { value: reportingManagerWorkRole }, applyingEmployeeWorkRole: { value: applyingEmployeeWorkRole }, approvalPower: { value: approvalPower }, id } = this.state;
            this.setState({ showLoader: true })
            addApprovalConfig({ allowanceName, reportingManagerWorkRole, applyingEmployeeWorkRole, approvalPower, id }).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.push(CONSTANT.url.settingsOption.perquisiteApprovalList)
                }
            })

        }
    }
}

export default ComponentName;
