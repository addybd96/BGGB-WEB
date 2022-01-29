import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { onChange, validateForm } from '../../../utils';
import { approve, getMedicalAlneById } from '../../../action/PerMedicalAllowanceAction';
import { getAllowanceNameById } from '../../../action/SettingsActions';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            medical: [],
            id: undefined,
            Status: undefined,
            physicianFee: { name: 'physicianFee', value: 0, error: '', isRequired: true },
            diagnosticCharges: { name: 'diagnosticCharges', value: 0, error: '', isRequired: true },
            medicalMedicine: { name: 'medicalMedicine', value: 0, error: '', isRequired: true },
            injection: { name: 'injection', value: 0, error: '', isRequired: true },
            xRayInvestigation: { name: 'xRayInvestigation', value: 0, error: '', isRequired: true },
            fromDate: { name: 'fromDate', value: new Date().toISOString().split('T')[0], error: '', isRequired: true },
            toDate: { name: 'toDate', value: new Date().toISOString().split('T')[0], error: '', isRequired: true },
            illnessNature: { name: 'illnessNature', value: '', error: '', isRequired: true },
            treatmentDuration: { name: 'treatmentDuration', value: '', error: '', isRequired: true },
            clinicMedicine: { name: 'clinicMedicine', value: 0, error: '', isRequired: true },
            others: { name: 'others', value: 0, error: '', isRequired: true },
            total: { name: 'total', value: 0, error: '', isRequired: false },
            status: { name: "status", value: '', error: '' },
            actualAmount: { name: 'actualAmount', value: '', error: '', isRequired: true },
            showLoader: false,
            approvalStatus: false,
            allowanceName: "Medical Allowance",
            remarks:{ name: 'remarks', value: '', error: '', isRequired: true },

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.loadData()
    }

    public render() {
        const { showLoader, Status, medical, others, total, medicalMedicine, remarks, injection, clinicMedicine, physicianFee, purpose, fromDate, toDate, illnessNature, treatmentDuration, xRayInvestigation, diagnosticCharges, status, approvalStatus, actualAmount } = this.state;


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

                                {
                                    medical.map((e: any, i: number) => {
                                        return (
                                            <div className="card mt-2">
                                                <div className="card-header">
                                                    {i == 0 &&
                                                        <b>Approve Medical </b>
                                                    }
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-lg-12 mb-2" style={{ borderTop: "1px dotted black;", marginTop: "25px;" }}>
                                                            <div className="row" >
                                                                <div className="col-lg-6 form-group">
                                                                    <label>Name of Patient </label>
                                                                    <input
                                                                        type="text"
                                                                        disabled
                                                                        className="form-control"
                                                                        name={e.patientName.name}
                                                                        value={e.patientName.value}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-6 form-group">
                                                                    <label>Relationship </label>
                                                                    <input
                                                                        type="text"
                                                                        disabled
                                                                        className="form-control"
                                                                        name={e.relationship.name}
                                                                        value={e.relationship.value}
                                                                    />
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-6 mb-2"></div>
                                                                    <div className="col-lg-6 mb-2">
                                                                        <img src={`${process.env.REACT_APP_BASE_URL}/userTada/${e.imgUrl}`} alt="" />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                <div className="card mt-2">
                                    <div className="card-header"> </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12 mb-2">
                                                <div className="row" >

                                                    <div className="col-lg-6 form-group">
                                                        <label>From Date</label>
                                                        <input
                                                            type="date"
                                                            disabled
                                                            className={fromDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={fromDate.name}
                                                            value={fromDate.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>To Date</label>
                                                        <input
                                                            type="date"
                                                            disabled
                                                            className={toDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={toDate.name}
                                                            value={toDate.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Nature of illness </label>
                                                        <input
                                                            type="text"
                                                            disabled
                                                            className={illnessNature.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={illnessNature.name}
                                                            value={illnessNature.value}

                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Duration of Treatment </label>
                                                        <input
                                                            type="text"
                                                            disabled
                                                            className={treatmentDuration.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={treatmentDuration.name}
                                                            value={treatmentDuration.value}

                                                        />
                                                    </div>
                                                    <div className="col-lg-12 form-group">
                                                        <label>Total amount Spend</label>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>1. Consultation / Physician’s fee : </label>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <NumberFormat
                                                            disabled
                                                            className={physicianFee.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={physicianFee.name}
                                                            value={physicianFee.value === 0 ? '' : physicianFee.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>2. Medicine from Clinic : </label>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <NumberFormat
                                                            disabled
                                                            className={clinicMedicine.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={clinicMedicine.name}
                                                            value={clinicMedicine.value === 0 ? '' : clinicMedicine.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>3. Injections : </label>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <NumberFormat
                                                            disabled
                                                            className={injection.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={injection.name}
                                                            value={injection.value === 0 ? '' : injection.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>4. Medicine purchased from Medical Store : </label>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <NumberFormat
                                                            disabled
                                                            className={medicalMedicine.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={medicalMedicine.name}
                                                            value={medicalMedicine.value === 0 ? '' : medicalMedicine.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>5. X-Ray and other investigations : </label>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <NumberFormat
                                                            disabled
                                                            className={xRayInvestigation.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={xRayInvestigation.name}
                                                            value={xRayInvestigation.value === 0 ? '' : xRayInvestigation.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>6. Other diagnostic Charges : </label>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <NumberFormat
                                                            disabled
                                                            className={diagnosticCharges.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={diagnosticCharges.name}
                                                            value={diagnosticCharges.value === 0 ? '' : diagnosticCharges.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>7. Any Other : </label>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <NumberFormat
                                                            disabled
                                                            className={others.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={others.name}
                                                            value={others.value === 0 ? '' : others.value}
                                                        />
                                                    </div>

                                                    <div className="col-lg-6 form-group">
                                                        <label>Total : </label>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <NumberFormat
                                                            disabled
                                                            className={total.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={total.name}
                                                            value={total.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Status</label>
                                                        <select
                                                            disabled={(Status == "pending" || Status == "forward") ? false : true}
                                                            onChange={this._onChange}
                                                            className={status.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={status.name}
                                                            value={status.value}

                                                        >
                                                            <option >--Select--</option>
                                                            <option value="">Pending</option>
                                                            <option value="reject">Reject</option>
                                                            <option value="forward">Forward</option>
                                                            {approvalStatus === true ? <option value="approved">Approved</option> : ""}
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Actual Amount</label>
                                                        <NumberFormat
                                                            disabled
                                                            className={actualAmount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={actualAmount.name}
                                                            value={actualAmount.value}

                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Remarks</label>
                                                        <input
                                                            disabled={Status == "pending" || Status == "forward" ? false : true}
                                                            type="text"
                                                            onChange={this._onChange}
                                                            className={remarks.error.length > 0 && status.value==="reject"  ? "form-control is-invalid" : "form-control"}
                                                            name={remarks.name}
                                                            value={remarks.value}
                                                        />
                                                    </div>
                                                </div>
                                                {
                                                    !showLoader && (Status == "pending" || Status == "forward") &&
                                                    <div className="col-lg-12 ">
                                                        <Link to={CONSTANT.url.perquisites.medicalPendingAllowance} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
                                                        <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
                {showLoader && <Loader />
                }
            </React.Fragment >
        )
    }

    _onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;
        if(name==='status' && (value==='' || value ==='forward' || value==='approved')){
            if(value===''){
                value='pending'
            }
           let remarks=this.state.remarks
            remarks.value=value
            this.setState({
                remarks:remarks
            })
        }
        if(name==='status' && (value==='reject')){
           let remarks=this.state.remarks
            remarks.value=''
            this.setState({
                remarks:remarks
            })
        }
        this.setState({ [name]: { ...this.state[name], value:value, error: '' } })
    }

    loadData = () => {
        const { id } = this.props.match.params
        this.setState({ showLoader: true })
        const { allowanceName } = this.state;
        getMedicalAlneById({ id: id }).then((response: any) => {
            if (response === undefined) {
                this.props.history.push(CONSTANT.url.perquisites.medicalPendingAllowance)
            } else {
                const medical = response.list.map((res: any) => {
                    return {
                        id: res.id,
                        userId: res.userId,
                        name: { name: "name", value: res.name },
                        patientName: { name: 'patientName', value: res.patientName },
                        relationship: { name: 'relationship', value: res.relationship },
                    }
                }
                )
                this.setState({
                    medical,
                    id: response.id,
                    userId: response.userId,
                    Status: response.status,
                    physicianFee: { name: 'physicianFee', value: response.physicianFee ? response.physicianFee : 0, error: '' },
                    diagnosticCharges: { name: 'diagnosticCharges', value: response.diagnosticCharges ? response.diagnosticCharges : 0, error: '' },
                    medicalMedicine: { name: 'medicalMedicine', value: response.medicalMedicine ? response.medicalMedicine : 0, error: '' },
                    injection: { name: 'injection', value: response.injection ? response.injection : 0, error: '' },
                    xRayInvestigation: { name: 'xRayInvestigation', value: response.xRayInvestigation ? response.xRayInvestigation : 0, error: '' },
                    fromDate: { name: 'fromDate', value: moment(response.fromDate).format('YYYY-MM-DD'), error: '' },
                    toDate: { name: 'toDate', value: moment(response.toDate).format('YYYY-MM-DD'), error: '' },
                    illnessNature: { name: 'illnessNature', value: response.illnessNature ? response.illnessNature : "", error: '' },
                    treatmentDuration: { name: 'treatmentDuration', value: response.treatmentDuration ? response.treatmentDuration : "", error: '' },
                    clinicMedicine: { name: 'clinicMedicine', value: response.clinicMedicine ? response.clinicMedicine : 0, error: '' },
                    others: { name: 'others', value: response.others ? response.others : 0, error: '' },
                    total: { name: 'total', value: response.total ? response.total : 0, error: '' },
                    status: { name: "status", value: response.status === 'pending' ? '' : response.status, error: '', isRequired: true },
                    actualAmount: { ...this.state.actualAmount, value: response.actualAmount },
                    showLoader: false
                })
                getAllowanceNameById(response.userId, allowanceName).then((res: any) => {
                    if (res)
                        this.setState({
                            showLoader: false,
                            approvalStatus: res.approvalStatus,
                        })
                })
            }
        })
    }

    private onSubmit = (e: any) => {
        e.preventDefault()
        if (validateForm(this)) {
            this.setState({ showLoader: true })
            const model = {
                id: this.state.id,
                status: this.state.status.value,
                physicianFee: this.state.physicianFee.value,
                diagnosticCharges: this.state.diagnosticCharges.value,
                medicalMedicine: this.state.medicalMedicine.value,
                injection: this.state.injection.value,
                xRayInvestigation: this.state.xRayInvestigation.value,
                fromDate: this.state.fromDate.value,
                toDate: this.state.toDate.value,
                illnessNature: this.state.illnessNature.value,
                treatmentDuration: this.state.treatmentDuration.value,
                clinicMedicine: this.state.clinicMedicine.value,
                others: this.state.others.value,
                total: this.state.total.value,
                actualAmount: this.state.actualAmount.value,
                remarks:this.state.remarks.value,
            }

            approve(model).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.push(CONSTANT.url.perquisites.medicalPendingAllowance)
                }
            })

        }
    }

    validateForm = () => {
        const { medical } = this.state
        let index = 0, status = true;
        for (let st of medical) {
            for (let key in st) {
                if (st.hasOwnProperty(key)) {
                    const isRequired = st[key].isRequired;
                    if (isRequired) {
                        const value = st[key].value;
                        if (value === null || value === undefined || value.length === 0) {
                            status = false;
                            medical[index][key].error = 'is required'
                            this.setState({ medical });
                        }
                        else continue
                    }
                }
            }
            index = index + 1
        }
        return status
    }
}

export default ComponentName;
