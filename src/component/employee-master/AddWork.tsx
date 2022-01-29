import * as React from 'react';
import Loader from '../../component/common/Loader'
import moment from 'moment'
import { onChange, validateForm, setOptions, getCookie, setError } from '../../utils';
import { getCompanyBranch } from '../../action/CompanyBranchAction';
import { getEmployeeList } from '../../action/EmployeeAction';
import { getDepartments, getDesignations, getWorkLocations, getWorkRoles } from '../../action/SettingsActions';
import CONSTANT from './../../constant';

class EmployeeWorkProfile extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            showLoader: true,
            userId: props.userId,            
            onlyReportingManagerModified: true,
            predesignationId: detail ? detail.designationId : '',
            precompanyBranchId:detail ? detail.companyBranchId : '',            
            preworkRoleId: detail ? detail.workRoleId : '',
            preDateOfJoining: detail && detail.dateOfJoining ? moment(detail.dateOfJoining).format('YYYY-MM-DD') : '',
            employeeId: { value: detail ? detail.employeeId : '', name: 'employeeId', error: '', isRequired: true },
            designationId: { value: detail ? detail.designationId : '', name: 'designationId', error: '', isRequired: true, options: [] },
            companyBranchId: { officeTypeId: detail ? detail.officeTypeId : '', value: detail ? detail.companyBranchId : '', name: 'companyBranchId', error: '', isRequired: true, options: [] },
            dateOfJoining: { value: detail && detail.dateOfJoining ? moment(detail.dateOfJoining).format('YYYY-MM-DD') : '', name: 'dateOfJoining', error: '', isRequired: true },
            workRoleId: { value: detail ? detail.workRoleId : '', name: 'workRoleId', error: '', isRequired: true, options: [] },
            departmentId: { value: detail ? detail.departmentId : '', name: 'departmentId', error: '', isRequired: false, options: [] },
            dateOfJoiningBank: { value: detail && detail.dateOfJoiningBank ? moment(detail.dateOfJoiningBank).format('YYYY-MM-DD') : '', name: 'dateOfJoiningBank', error: '', isRequired: true },
            reportingManagerId: { value: detail ? detail.reportingManagerId : '', name: 'reportingManagerId', error: '', isRequired: true, options: [] },
            userType: undefined
        }
    }

    componentDidMount() {
        const isu = getCookie('isu');
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        this.setState({ showLoader: true, isu, userType: userDetail.userType }, () => {
            this.loadList();
        });
        getCompanyBranch().then((res: any) => {
            const cbOptions = res.result.map((item: any) => {
                return {
                    id: item.branchId,
                    name: item.branchName,
                    location: item.locationName,
                }
            });
            setOptions(this, this.state.companyBranchId.name, cbOptions);
        });

        getWorkRoles(1, 20).then((response: any) => {
            if (response.status) {
                this.setState({ workRoleId: { ...this.state.workRoleId, options: response.result } })
            }
        });

        // getWorkLocations(1, 20).then((response: any) => {
        //     if (response.status) {
        //         this.setState({ workLocationId: { ...this.state.workLocationId, options: response.result } })
        //     }
        // });

        getDesignations().then((response: any) => {
            if (response.status) {
                this.setState({ designationId: { ...this.state.designationId, options: response.result } })
            }
        });

        getDepartments().then((response: any) => {
            if (response.status) {
                this.setState({ departmentId: { ...this.state.departmentId, options: response.result }, showLoader: false })
            }
        });

        if (this.state.designationId.value <= '2') {
            if (this.state.workRoleId.value > 1) {
                this.setState({ workRoleId: { ...this.state.workRoleId, error: 'cannot have work role other than staff' } })
            }
        }
    }

    public render() {
        const { showLoader, employeeId,designationId, companyBranchId, dateOfJoining, dateOfJoiningBank, departmentId, reportingManagerId, workRoleId, userType } = this.state;
        return (
            showLoader ? <Loader /> : <form onSubmit={this.onSubmit}>
                <div className="card mt-3">
                    <div className="card-header">
                        Work Profile
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-4 form-group">
                                <label>EmployeeId </label>

                                <input
                                    disabled={this.props.detail ? true : false}
                                    type="text"
                                    className={employeeId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter employee Id"
                                    name={employeeId.name}
                                    value={employeeId.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Designation</label>
                                <select
                                    className={designationId.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                    name={designationId.name}
                                    value={designationId.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                >
                                    <option>Select a Designation</option>
                                    {
                                        designationId.options.map(function (item: any, index: number) {
                                            return (
                                                <option key={index} value={item.designationId}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-4 form-group">
                                <label>Department</label>

                                <select
                                    className={departmentId.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                    name={departmentId.name}
                                    value={departmentId.value}
                                    onChange={this.onChange}
                                    disabled={(userType === 'sadmin' || userType === 'radmin') && ((!companyBranchId.value) || companyBranchId.officeTypeId < 3) ? false : true}
                                >
                                    <option>Select a Department</option>
                                    {
                                        departmentId.options.map(function (item: any, index: number) {
                                            return (
                                                <option key={index} value={item.departmentId}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-3 form-group">
                                <label>Branch</label>
                                <select
                                    className={companyBranchId.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                    name={companyBranchId.name}
                                    value={companyBranchId.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                >
                                    <option>Select a branch</option>
                                    {
                                        companyBranchId.options.map(function (item: any, index: number) {
                                            return (
                                                <option key={index} value={item.id}>{item.name} ({item.location})</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-3 form-group">
                                <label>Date Of Joining Branch </label>
                                <input
                                    type="date"
                                    className={dateOfJoining.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter date of joining Branch/Office"
                                    name={dateOfJoining.name}
                                    value={dateOfJoining.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                />
                                <small className="text-danger">{dateOfJoining.error}</small>
                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Work Role</label>
                                <select
                                    className={workRoleId.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                    name={workRoleId.name}
                                    value={workRoleId.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                >
                                    <option>Select a work role</option>
                                    {
                                        workRoleId.options.map(function (item: any, index: number) {
                                            return (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-lg-6 form-group">
                                <label>Date Of Joining </label>
                                <input
                                    type="date"
                                    className={dateOfJoiningBank.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter date of joining bank"
                                    name={dateOfJoiningBank.name}
                                    value={dateOfJoiningBank.value}
                                    onChange={this.onChange}
                                    disabled={dateOfJoiningBank.value ? true : false}
                                />

                            </div>
                            <div className="col-lg-6 form-group">
                                <label>Reporting Manager </label>

                                <select
                                    className={reportingManagerId.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                    name={reportingManagerId.name}
                                    value={reportingManagerId.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                >
                                    <option>Select a reporting manager</option>
                                    {
                                        reportingManagerId.options.map(function (item: any, index: number) {
                                            return (
                                                <option key={index} value={item.userId}>{`${item.name} (${item.employeeId})`}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 pull-right pr-0 pl-0">
                    <div className="row">
                        <div className="col-lg-12 pull-right mt-3 mb-3">
                            <button onClick={this.onSubmit}
                                type="submit"
                                className="btn btn-primary btn-sm"
                                disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}>Save & Continue</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    onChange = (e: any) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        debugger
        if (name == "reportingManagerId" || name == "departmentId") {
            console.log('reporting manager changed')
            onChange(this, name, value, () => {

                if (this.state.designationId.value <= 2) {

                    if (this.state.workRoleId.value == 1) {
                        //error
                        this.setState({
                            workRoleId: {
                                ...this.state.workRoleId, error: ''
                            },

                            designationId: {
                                ...this.state.designationId, error: '',
                            }
                        })
                    }
                    else {
                        this.setState({
                            workRoleId: {
                                ...this.state.workRoleId, error: 'error'
                            },

                            designationId: {
                                ...this.state.designationId, error: 'error',
                            }
                        })
                    }

                }
                else {
                    this.setState({
                        workRoleId: {
                            ...this.state.workRoleId, error: ''
                        },

                        designationId: {
                            ...this.state.designationId, error: '',
                        }
                    })
                }

                if (name !== 'designationId' && name !== 'workRoleId')
                    setError(this, name, '')
            });
        }
        else {
            console.log("something else changed")
            this.setState({ onlyReportingManagerModified: false }, () => {
                onChange(this, name, value, () => {

                    if (this.state.designationId.value <= 2) {

                        if (this.state.workRoleId.value == 1) {
                            //error
                            this.setState({
                                workRoleId: {
                                    ...this.state.workRoleId, error: ''
                                },

                                designationId: {
                                    ...this.state.designationId, error: '',
                                }
                            })
                        }
                        else {
                            this.setState({
                                workRoleId: {
                                    ...this.state.workRoleId, error: 'error'
                                },

                                designationId: {
                                    ...this.state.designationId, error: 'error',
                                }
                            })
                        }

                    }
                    else {
                        this.setState({
                            workRoleId: {
                                ...this.state.workRoleId, error: ''
                            },

                            designationId: {
                                ...this.state.designationId, error: '',
                            }
                        })
                    }

                    if (name !== 'designationId' && name !== 'workRoleId')
                        setError(this, name, '')
                });
            })
        }

    }

    loadList = () => {
        const { userType } = this.state;
        getEmployeeList(1, 1000, 0, userType ? userType : 'user', '').then((res: any) => {
            if (res.result) {
                let cbOptions = res.result.list.map((item: any) => {
                    return {
                        id: item.id,
                        name: item.name,
                        email: item.email,
                        employeeId: item.employeeId,
                        userId:item.userId
                    }
                });
                
                let mgmt = [];
                if (res.result.mgmt.length > 0) {
                    mgmt = res.result.mgmt.map((item: any) => {
                        return {
                            id: item.id,
                            name: item.name,
                            email: item.email,
                            employeeId: item.employeeId,
                            userId:item.userId
                        }
                    });
                    console.log(mgmt,"mgmt");
                    cbOptions = cbOptions.concat(mgmt)
                }
                console.log(cbOptions,"cbOptions");
                
                setOptions(this, this.state.reportingManagerId.name, cbOptions);
            }
        });
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        
        if ((this.state.preDateOfJoining != this.state.dateOfJoining.value) 
        && ((this.state.predesignationId==this.state.designationId.value)  && (this.state.precompanyBranchId==this.state.companyBranchId.value) && (this.state.preworkRoleId==this.state.workRoleId.value))) {
           // alert('Date of Joining of Branch/Office can only be changed if there is change in Branch, Designation & Work Role')
            this.setState({ dateOfJoining: { ...this.state.dateOfJoining, error: 'Date of Joining of Branch/Office can only be changed if change is made either in Branch, Designation or in Work Role' } })
            return;
        }
        if (this.state.designationId.error.length > 0 || this.state.workRoleId.error.length > 0) {
            alert('Incorrect work role for the selected designation')
            return;
        }

        if (!this.state.onlyReportingManagerModified && this.state.preDateOfJoining)
            if (this.state.userId) {
                const diff = moment(this.state.dateOfJoining.value).diff(moment(this.state.preDateOfJoining), 'days', false);
                if (diff <= 0) {
                    this.setState({ dateOfJoining: { ...this.state.dateOfJoining, error: 'Date should be greater than the previous date' } })
                    return
                }
            }

        if (validateForm(this)) {
            const st = this.state;
            let updatedCol = {
                designationId: true,
                departmentId: true,
                companyBranchId: true,
                dateOfJoining: true,
                workLocationId: true,
                workRoleId: true,
                reportingManagerId: true,
            }
            if (this.props.detail) {
                if (this.props.detail.designationId === st.designationId.value) updatedCol.designationId = false
                if (this.props.detail.departmentId === st.departmentId.value) updatedCol.departmentId = false
                if (moment(this.props.detail.dateOfJoining).format('YYYY-MM-DD') === st.dateOfJoining.value) updatedCol.dateOfJoining = false
                if (this.props.detail.companyBranchId === st.companyBranchId.value) updatedCol.companyBranchId = false
                if (this.props.detail.workRoleId === st.workRoleId.value) updatedCol.workRoleId = false
                if (this.props.detail.reportingManagerId === st.reportingManagerId.value) updatedCol.reportingManagerId = false
            }
            const colom = JSON.stringify(updatedCol)
            const model = {
                onlyReportingManagerModified: this.state.onlyReportingManagerModified,
                userId: parseInt(st.userId, 10),
                employeeId: st.employeeId.value,
                designationId: parseInt(st.designationId.value, 10),
                departmentId: st.departmentId.value,
                dateOfJoining: st.dateOfJoining.value,
                dateOfJoiningBank: st.dateOfJoiningBank.value,
                companyBranchId: parseInt(st.companyBranchId.value, 10),
                workRoleId: parseInt(st.workRoleId.value, 10),
                reportingManagerId: parseInt(st.reportingManagerId.value, 10),
                colom,
            };
            // console.log(model,"rm");
            
            this.props.onSubmit(model);
        }
    }
}

export default EmployeeWorkProfile;
