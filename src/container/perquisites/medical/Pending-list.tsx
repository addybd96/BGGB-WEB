import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader';
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { onChange, textTransform } from '../../../utils';
import { getMedicalAln } from '../../../action/PerMedicalAllowanceAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            showLoader: false,
            status: { name: 'status', value: '', error: '', isRequired: true }

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.loadData()

    }

    public render() {
        const { list, status, showLoader } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-right">
                                    <select
                                            onChange={this.onChange}
                                            className={status.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            name={status.name}
                                            value={status.value}

                                        >
                                            <option value="">All</option>
                                            <option value="approved">Approved</option>
                                            <option value="pending">Pending</option>
                                            <option value="reject">Reject</option>
                                        </select>
                                    </div>
                                    <div className="float-left">
                                    <b>Medical Allowance Pending</b>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>                                                  
                                                    <th className="text-center" scope="col">  S. NO. </th>
                                                    <th className="text-center"> Employee Name </th>
                                                    <th className="text-center"> From Date </th>
                                                    <th className="text-center"> To Date</th>
                                                    <th className="text-center"> Nature of illness </th>
                                                    <th className="text-center"> Duration of Treatment</th>
                                                    <th className="text-center"> Consultation / Physician’s fee</th>
                                                    <th className="text-center"> Medicine from Clinic</th>
                                                    <th className="text-center"> Injections</th>
                                                    <th className="text-center"> Medicine purchased from Medical Store</th>
                                                    <th className="text-center"> X-Ray and other investigations</th>
                                                    <th className="text-center"> Other diagnostic Charges</th>
                                                    <th className="text-center"> Any Other</th>
                                                    <th className="text-center"> Total</th>
                                                    <th className="text-center"> Actual Amount</th>
                                                    <th className="text-center"> Apply Date</th>
                                                    <th className="text-center"> Status</th>
                                                    <th className="text-center" scope="col">  Action </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={16}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={16}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length > 0 && list.map((l: any, i: any) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td className="text-center"> {i + 1} </td>                                                   
                                                                <td className="text-center">{l.name} </td>
                                                                <td className="text-center">{moment(l.fromDate).format('MMM Do YYYY')} </td>
                                                                <td className="text-center">{moment(l.toDate).format('MMM Do YYYY')} </td>
                                                                <td className="text-center">{l.illnessNature} </td>
                                                                <td className="text-center">{l.treatmentDuration} </td>
                                                                <td className="text-center">{l.physicianFee} </td>
                                                                <td className="text-center">{l.clinicMedicine} </td>
                                                                <td className="text-center">{l.injection} </td>
                                                                <td className="text-center"> {l.medicalMedicine} </td>
                                                                <td className="text-center">{l.xRayInvestigation} </td>
                                                                <td className="text-center"> {l.diagnosticCharges} </td>
                                                                <td className="text-center">{l.others} </td>
                                                                <td className="text-center">{l.total} </td>
                                                                <td className="text-center">{l.actualAmount} </td>
                                                                <td className="text-center">{moment(l.createdOn).format('MMM Do YYYY')} </td>
                                                                <td className={`text-center ${l.status == 'pending' && 'text-warning'} ${l.status == 'reject' && 'text-danger'} ${l.status == 'approved' && 'text-success'} `}>
                                                                    {textTransform(l.status)}
                                                                </td>
                                                                {
                                                                    l.showAction && 
                                                                    <td className="text-center">
                                                                    <Link to={CONSTANT.url.perquisites.medicalApproveAllowance.replace(':id', l.id)} >
                                                                        <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                                                                    </Link>
                                                                </td>
                                                                }
                                                               
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {showLoader && <Loader />}
            </React.Fragment >
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value, () => {
            this.loadData(value)
        });
    }

    loadData = (status?: any) => {
        this.setState({ showLoader: true })
        getMedicalAln({ status }).then((res: any) => {
            this.setState({ showLoader: false })
            if (res)
                this.setState({ list: res ? res : [] });
        })
    }
}


export default ComponentName;
