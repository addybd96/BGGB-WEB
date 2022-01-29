import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from '../../constant';
import Loader from '../../component/common/Loader'
import { runPension } from '../../action/PensionSuperAnnAction';
import { onChange, validateForm } from '../../utils';

class RunPension extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            showLoader: false,
            date: { name: 'date', value: '', error: '', isRequired: true }
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
    }

    public render() {
        const { list, date, showLoader } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <div className="card mt-3">
                                <div className="card-header">
                                    <b>Pension Superannuation Process</b>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <label>Select Process Date </label>
                                                </div>
                                                <div className="col-lg-4">
                                                    <input
                                                        type="date"
                                                        className={date.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                        name={date.name}
                                                        value={date.value}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="col-lg-4">
                                                    <button
                                                        className="col-lg-12 btn primary-control float-right"
                                                        onClick={this.submit}
                                                    >Submit
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left">
                                        <b>Pension cycle </b> {date.value ? moment(date.value).startOf('month').format('MMM Do') : moment().startOf('month').format('MMM Do')} - {date.value ? moment(date.value).endOf('month').format('MMM Do') : moment().endOf('month').format('MMM Do YYYY')}
                                    </div>
                                    <div className="float-right">
                                        <b><Link to={CONSTANT.url.pensionDetail}>Pension Detail</Link> </b>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center" headers='' colSpan={5} scope="col">Employee</th>
                                                    <th className="text-center" colSpan={13} scope="col">Earnings(+)</th>
                                                    <th className="text-center" colSpan={14} scope="col">Deductions(-)</th>
                                                    <th className="text-center" colSpan={2} scope="col"></th>
                                                </tr>
                                                <tr>

                                                    <th className="text-center" scope="col">  Employee Id </th>
                                                    <th className="text-center" scope="col">  Name </th>
                                                    <th className="text-center" scope="col">  Designation </th>
                                                    <th className="text-center" scope="col">  Department </th>
                                                    <th className="text-center" scope="col">  Branch </th>
                                                    <th className="text-center" scope="col">  Basic, </th>
                                                    <th className="text-center" scope="col">  PQP </th>
                                                    <th className="text-center" scope="col">  SP. Pay </th>
                                                    <th className="text-center" scope="col">  D.A </th>
                                                    <th className="text-center" scope="col">  H.R.A </th>
                                                    <th className="text-center" scope="col">  SP. Allowance {/*spAllow*/}  </th>
                                                    <th className="text-center" scope="col">  C.C.A</th>
                                                    <th className="text-center" scope="col">  Handicap Allowance {/*officAmount*/} </th>
                                                    <th className="text-center" scope="col">  Conveyance Allowance {/*convAmount*/} </th>
                                                    <th className="text-center" scope="col">  Washing Allowance {/*washingAmount*/} </th>
                                                    <th className="text-center" scope="col">  Cycle Allowance {/*cycleAmount*/}</th>
                                                    <th className="text-center" scope="col">  Arrears / D.A ARR.{/*errAmount*/}  </th>
                                                    <th className="text-center" scope="col">  Subsistence Allowance.{/*Subsistence Allowance*/}  </th>
                                                    <th className="text-center" scope="col">  Gross Salary {/*totalAllow*/} </th>

                                                    <th className="text-center" scope="col">  PROV. FUND {/*provdent fund*/} </th>
                                                    <th className="text-center" scope="col">  NPS {/*nps*/} </th>
                                                    <th className="text-center" scope="col">  L.I.C {/*lifeInsurance*/} </th>
                                                    <th className="text-center" scope="col">  PROF. Tax {/*profTax*/} </th>
                                                    <th className="text-center" scope="col">  Welfare Association  {/*profTax*/} </th>
                                                    <th className="text-center" scope="col">  Festival Adv. {/*festivalAd*/} </th>
                                                    <th className="text-center" scope="col">  Group Insu. {/*festivalAd*/} </th>
                                                    <th className="text-center" scope="col">  Income Tax  {/*inctAmount*/} </th>
                                                    <th className="text-center" scope="col">  Welfare Fund {/*welfareAmount*/} </th>
                                                    <th className="text-center" scope="col">  Union Fee {/*welfareAmount*/} </th>
                                                    <th className="text-center" scope="col">  Housing Loan {/*welfareAmount*/} </th>
                                                    <th className="text-center" scope="col">  Vehicle Loan {/*welfareAmount*/} </th>
                                                    <th className="text-center" scope="col">  Consumer Loan {/*welfareAmount*/} </th>
                                                    <th className="text-center" scope="col">  Other Deduction {/*otherDeduction*/} </th>
                                                    <th className="text-center" scope="col">  Total {/*totalDeduc*/}</th>
                                                    <th className="text-center" scope="col">  Net </th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={34}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={34}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.map((l: any, i: any) => {
                                                        // const detailPageURL = CONSTANT.url.settingsOption.editSalaryProfileMember.replace(':code', l.id);
                                                        return (
                                                            <tr>
                                                                <td> {l.employeeId} </td>
                                                                <td> {l.name} </td>
                                                                <td> {l.designation} </td>
                                                                <td> {l.department} </td>
                                                                <td> {l.companyBranch} </td>
                                                                <td> {l.basic} </td>
                                                                <td> {l.pqp} </td>
                                                                <td> {l.sppay} </td>
                                                                <td> {l.da} </td>
                                                                <td> {l.hra} </td>
                                                                <td> {l.spAllow} </td>
                                                                <td> {l.cca} </td>
                                                                <td> {l.officAmount} </td>
                                                                <td> {l.convAmount} </td>
                                                                <td> {l.washingAmount} </td>
                                                                <td> {l.cycleAmount} </td>
                                                                <td> {l.errAmount} </td>
                                                                <td> {l.subsistenceAmount} </td>
                                                                <td> {l.totalAllow} </td>

                                                                <td> {l.prov} </td>
                                                                <td> {l.nps} </td>
                                                                <td> {l.lifeInsurance} </td>
                                                                <td> {l.profTax} </td>
                                                                <td> {l.societyAmount} </td>
                                                                <td> {l.festivalAd} </td>
                                                                <td> {l.gpAmount} </td>
                                                                <td> {l.inctAmount} </td>
                                                                <td> {l.welfareAmount} </td>
                                                                <td> {l.unionAmount} </td>
                                                                <td> {l.hsAmount} </td>
                                                                <td> {l.vehAmount} </td>
                                                                <td> {l.conAmount} </td>
                                                                <td> {l.otherDeduction} </td>
                                                                <td> {l.totalDeduc} </td>
                                                                <td> {l.net} </td>
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
        onChange(this, name, value);
    }
    submit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            this.setState({ showLoader: true })
            runPension({ date: this.state.date.value }).then((res: any) => {
                this.setState({ showLoader: false })
                if (res && res.result)
                    this.setState({ list: res.result ? res.result : [] });
            })
        }
    }
}

export default RunPension;
