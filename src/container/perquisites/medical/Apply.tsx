import * as React from 'react';
import moment from 'moment'
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { apply, getMedicalAlneById } from '../../../action/PerMedicalAllowanceAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            medical: [
                {
                    patientName: { name: 'patientName', value: '', error: '', isRequired: true },
                    relationship: { name: 'relationship', value: '', error: '', isRequired: true },
                }
            ],
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
            showLoader: false,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        const { id } = this.props.match.params
        id && this.loadData(id)
    }

    public render() {
        const { showLoader, medical, others, total, medicalMedicine, injection, clinicMedicine, physicianFee, purpose, fromDate, toDate, illnessNature, treatmentDuration, xRayInvestigation, diagnosticCharges } = this.state;
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
                                            <h5 className="heading-h1">Apply Annual Medical Aid</h5>
                                        </div>
                                    </div>
                                </div>


                                {
                                    medical.map((e: any, i: number) => {
                                        return (
                                            <div className="card mt-2">
                                                <div className="card-header">
                                                    {/* <b>Apply for Halting ( {i + 1} )</b> */}
                                                    <div className="float-right">
                                                        {!this.props.match.params.id && medical.length == i + 1 &&
                                                            <a onClick={this.addNewRow}><i className="fa fa-plus"></i></a>
                                                        }
                                                        &nbsp;&nbsp;
                                                        {!this.props.match.params.id && i > 0 &&
                                                            <a onClick={() => this.removeRow(i)}><i className="fa fa-trash" aria-hidden="true"></i></a>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-lg-12 mb-2">
                                                            <div className="row" >
                                                                <div className="col-lg-6 form-group">
                                                                    <label>Name of Patient </label>
                                                                    <input
                                                                        type="text"
                                                                        onChange={(event) => this.onChange(event, i)}
                                                                        className={e.patientName.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                                        name={e.patientName.name}
                                                                        value={e.patientName.value}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-6 form-group">
                                                                    <label>Relationship </label>
                                                                    <input
                                                                        type="text"
                                                                        onChange={(event) => this.onChange(event, i)}
                                                                        className={e.relationship.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                                        name={e.relationship.name}
                                                                        value={e.relationship.value}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
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
                                                            onChange={this._onChange}
                                                            className={fromDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={fromDate.name}
                                                            value={fromDate.value}
                                                            min={moment().subtract(2, "years").startOf('year').format('YYYY-MM-DD')}
                                                            max={moment().format('YYYY-MM-DD')}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>To Date</label>
                                                        <input
                                                            type="date"
                                                            onChange={this._onChange}
                                                            className={toDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={toDate.name}
                                                            value={toDate.value}
                                                            min={moment().subtract(2, "years").startOf('year').format('YYYY-MM-DD')}
                                                            max={moment().format('YYYY-MM-DD')}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Nature of illness </label>
                                                        <input
                                                            type="text"
                                                            onChange={this._onChange}
                                                            className={illnessNature.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={illnessNature.name}
                                                            value={illnessNature.value}

                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Duration of Treatment </label>
                                                        <input
                                                            type="text"
                                                            onChange={this._onChange}
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
                                                            onChange={this._onChange}
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
                                                            onChange={this._onChange}
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
                                                            onChange={this._onChange}
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
                                                            onChange={this._onChange}
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
                                                            onChange={this._onChange}
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
                                                            onChange={this._onChange}
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
                                                            onChange={this._onChange}
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
                                                            onChange={this._onChange}
                                                            className={total.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={total.name}
                                                            value={total.value}
                                                        />
                                                    </div>

                                                </div>
                                                {!this.props.match.params.id &&
                                                    <div className="col-lg-12 ">
                                                        <Link to={CONSTANT.url.perquisites.medicalAllowance} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
                                                        <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
                                                    </div>}

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

    addNewRow = () => {
        this.setState({
            medical: [
                ...this.state.medical,
                {
                    patientName: { name: 'patientName', value: '', error: '', isRequired: true },
                    relationship: { name: 'relationship', value: '', error: '', isRequired: true },
                }
            ]
        })
    }

    removeRow = (i: number) => {
        const { medical } = this.state
        medical.splice(i, 1)
        this.setState({
            medical,
        })
    }

    onChange = (e: any, i: number) => {
        const name = e.target.name;
        const value = e.target.value;
        const { medical } = this.state
        medical[i][name] = { ...medical[i][name], value, error: '' }
        this.setState({
            medical
        })
    }
    _onChange = (e: any) => {
        this.setState({ [e.target.name]: { ...this.state[e.target.name], value: e.target.value, error: '' } })
        if (e.target.name == "physicianFee") {
            let newData = parseInt(this.state.others.value) + parseInt(this.state.clinicMedicine.value) + parseInt(this.state.injection.value) + parseInt(this.state.medicalMedicine.value) + parseInt(this.state.xRayInvestigation.value) + parseInt(this.state.diagnosticCharges.value) + (e.target.value != '' ? parseInt(e.target.value) : 0);
            this.setState({ ["total"]: { ...this.state["physicianFee"], value: newData, error: '' } })
            this.forceUpdate()
        } else if (e.target.name == "clinicMedicine") {
            let newData = parseInt(this.state.others.value) + parseInt(this.state.physicianFee.value) + parseInt(this.state.injection.value) + parseInt(this.state.medicalMedicine.value) + parseInt(this.state.xRayInvestigation.value) + parseInt(this.state.diagnosticCharges.value) + (e.target.value != '' ? parseInt(e.target.value) : 0);
            this.setState({ ["total"]: { ...this.state["clinicMedicine"], value: newData, error: '' } })
            this.forceUpdate();
        }
        else if (e.target.name == "injection") {
            let newData = parseInt(this.state.others.value) + parseInt(this.state.physicianFee.value) + parseInt(this.state.clinicMedicine.value) + parseInt(this.state.medicalMedicine.value) + parseInt(this.state.xRayInvestigation.value) + parseInt(this.state.diagnosticCharges.value) + (e.target.value != '' ? parseInt(e.target.value) : 0);
            this.setState({ ["total"]: { ...this.state["injection"], value: newData, error: '' } })
        }
        else if (e.target.name == "medicalMedicine") {
            let newData = parseInt(this.state.others.value) + parseInt(this.state.physicianFee.value) + parseInt(this.state.clinicMedicine.value) + parseInt(this.state.injection.value) + parseInt(this.state.xRayInvestigation.value) + parseInt(this.state.diagnosticCharges.value) + (e.target.value != '' ? parseInt(e.target.value) : 0);
            this.setState({ ["total"]: { ...this.state["medicalMedicine"], value: newData, error: '' } })
        }
        else if (e.target.name == "xRayInvestigation") {
            let newData = parseInt(this.state.physicianFee.value) + parseInt(this.state.clinicMedicine.value) + parseInt(this.state.injection.value) + parseInt(this.state.medicalMedicine.value) + parseInt(this.state.others.value) + parseInt(this.state.diagnosticCharges.value) + (e.target.value != '' ? parseInt(e.target.value) : 0);
            this.setState({ ["total"]: { ...this.state["xRayInvestigation"], value: newData, error: '' } })
        }
        else if (e.target.name == "diagnosticCharges") {
            let newData = parseInt(this.state.physicianFee.value) + parseInt(this.state.clinicMedicine.value) + parseInt(this.state.injection.value) + parseInt(this.state.medicalMedicine.value) + parseInt(this.state.xRayInvestigation.value) + parseInt(this.state.others.value) + (e.target.value != '' ? parseInt(e.target.value) : 0);
            this.setState({ ["total"]: { ...this.state["diagnosticCharges"], value: newData, error: '' } })
        }
        else if (e.target.name == "others") {
            let newData = parseInt(this.state.physicianFee.value) + parseInt(this.state.clinicMedicine.value) + parseInt(this.state.injection.value) + parseInt(this.state.medicalMedicine.value) + parseInt(this.state.xRayInvestigation.value) + parseInt(this.state.diagnosticCharges.value) + (e.target.value != '' ? parseInt(e.target.value) : 0);
            this.setState({ ["total"]: { ...this.state["others"], value: newData, error: '' } })
        }
    }

    loadData = (id: number) => {
        this.setState({ showLoader: true })
        getMedicalAlneById({ id: id }).then((response: any) => {
            if (response === undefined) {
                this.props.history.push(CONSTANT.url.perquisites.medicalAllowance)
            } else {
                const medical = response.list.map((res: any) => {
                    return {
                        id: res.id,
                        userId: res.userId,
                        patientName: { name: 'patientName', value: res.patientName, error: '', isRequired: true },
                        relationship: { name: 'relationship', value: res.relationship, error: '', isRequired: true },
                    }
                }
                )
                this.setState({
                    medical,
                    Status: response.status,
                    physicianFee: { name: 'physicianFee', value: response.physicianFee ? response.physicianFee : 0, error: '', isRequired: true },
                    diagnosticCharges: { name: 'diagnosticCharges', value: response.diagnosticCharges ? response.diagnosticCharges : 0, error: '', isRequired: true },
                    medicalMedicine: { name: 'medicalMedicine', value: response.medicalMedicine ? response.medicalMedicine : 0, error: '', isRequired: true },
                    injection: { name: 'injection', value: response.injection ? response.injection : 0, error: '', isRequired: true },
                    xRayInvestigation: { name: 'xRayInvestigation', value: response.xRayInvestigation ? response.xRayInvestigation : 0, error: '', isRequired: true },
                    fromDate: { name: 'fromDate', value: moment(response.fromDate).format('YYYY-MM-DD'), error: '', isRequired: true },
                    toDate: { name: 'toDate', value: moment(response.toDate).format('YYYY-MM-DD'), error: '', isRequired: true },
                    illnessNature: { name: 'illnessNature', value: response.illnessNature ? response.illnessNature : "", error: '', isRequired: true },
                    treatmentDuration: { name: 'treatmentDuration', value: response.treatmentDuration ? response.treatmentDuration : "", error: '', isRequired: true },
                    clinicMedicine: { name: 'clinicMedicine', value: response.clinicMedicine ? response.clinicMedicine : 0, error: '', isRequired: true },
                    others: { name: 'others', value: response.others ? response.others : 0, error: '', isRequired: true },
                    total: { name: 'total', value: response.total ? response.total : 0, error: '', isRequired: false },
                    showLoader: false
                })
            }
        })
    }

    private onSubmit = (e: any) => {
        e.preventDefault()
        if (this.validateForm()) {
            this.setState({ showLoader: true })
            const medical: any = this.state.medical.map((st: any) => ({
                patientName: st.patientName.value,
                relationship: st.relationship.value
            }))
            let model = {
                medical,
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
            }

            apply(model).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.push(CONSTANT.url.perquisites.medicalAllowance)
                }
            })
        }
    }

    validateForm = () => {
        const { medical } = this.state
        let index = 0, status = true;
        let fromDate=new Date(this.state.fromDate.value) 
        let fromYear=fromDate.getFullYear();
        let toDate=new Date(this.state.toDate.value) 
        let toYear=toDate.getFullYear();
        
        if((this.state.fromDate.value > this.state.toDate.value) || (fromYear !== toYear)){
         status=false
        }else{
            status=true
        }
        for (let k in this.state) {
            if (this.state[k] !== null) {
                if (this.state[k].constructor === Array) {
                    for (let st of this.state[k]) {
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
                }
                else {
                    if (this.state.hasOwnProperty(k)) {
                        const isRequired = this.state[k].isRequired;
                        if (isRequired) {
                            const value = this.state[k].value;
                            if (value === null || value === undefined || value.length === 0) {
                                status = false;
                                this.setState({ [k]: { ...this.state[k], error: 'is required' } });
                            }
                            else continue
                        }
                    }

                }
            }
        }
        return status
    }
}

export default ComponentName;
