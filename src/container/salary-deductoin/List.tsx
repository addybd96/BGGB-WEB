import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from '../../constant';
import { getSalaryDeductionList } from '../../action/salaryDeductionAction';
import Loader from '../../component/common/Loader';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            page: 1,
            limit: 10,
            showLoader: false,
            lwfFundTogle: 1,
            welfareFundTogle: 1,
            groupInsuranceTogle: 1,
            otherDeductionTogle: 1,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;

        this.loadList();
    }

    togle = (name: any, value: any) => {
        this.setState({ [name]: value })
    }

    public render() {
        const { list, showLoader, lwfFundTogle, welfareFundTogle, groupInsuranceTogle, otherDeductionTogle, page, limit } = this.state;

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <div className="row mt-3">
                                <div className="col-lg-12">
                                    <h5 className="heading-h1">Salary Deductions</h5>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left">
                                        <b>Other Deduction </b>

                                        {
                                            otherDeductionTogle == 1 ?
                                                <i className="fa fa-angle-double-right" onClick={() => this.togle('otherDeductionTogle', undefined)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
                                                : <i className="fa fa-angle-double-down" onClick={() => this.togle('otherDeductionTogle', 1)} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                                        }
                                    </div>
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryDeduction.replace(':type', 'otherDeduction')}><i className="fa fa-plus"></i></Link>
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Deduction Name</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Date</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    (list === undefined) && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.otherDeduction !== undefined) && list.otherDeduction.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.otherDeduction !== undefined) &&
                                                    list.otherDeduction.slice(0, otherDeductionTogle).map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryDeduction}?code=${l.id}&type=otherDeduction`;
                                                        return (
                                                            <tr key={i}>
                                                                <td>{l.name}<br /></td>
                                                                <td>{l.dname}<br /></td>
                                                                <td>{l.amount !== null ? Number(l.amount) : '-'}</td>
                                                                <td>{moment(l.date).format('MMM Do YYYY')}</td>
                                                                <th scope="col"><Link to={detailPageURL}><i className="fas fa-edit"></i></Link></th>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left">
                                        <b> Group Insurance </b>
                                        {
                                            groupInsuranceTogle == 1 ?
                                                <i className="fa fa-angle-double-right" onClick={() => this.togle('groupInsuranceTogle', undefined)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
                                                : <i className="fa fa-angle-double-down" onClick={() => this.togle('groupInsuranceTogle', 1)} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                                        }
                                    </div>
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryDeduction.replace(':type', 'insurance')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    (list === undefined) && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.groupInsurance !== undefined) && list.groupInsurance.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.groupInsurance !== undefined) &&
                                                    list.groupInsurance.slice(0, groupInsuranceTogle).map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryDeduction}?code=${l.id}&type=groupInc`;
                                                        return (
                                                            <tr key={i}>
                                                                <td>{l.name}<br /></td>
                                                                <td>{l.amount !== null ? Number(l.amount) : '-'}</td>
                                                                <th scope="col"><Link to={detailPageURL}><i className="fas fa-edit"></i></Link></th>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left">
                                        <b>Welfare Fund </b>
                                        {
                                            welfareFundTogle == 1 ?
                                                <i className="fa fa-angle-double-right" onClick={() => this.togle('welfareFundTogle', undefined)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
                                                : <i className="fa fa-angle-double-down" onClick={() => this.togle('welfareFundTogle', 1)} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                                        }
                                    </div>
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryDeduction.replace(':type', 'welfare')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    (list === undefined) && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.welfare !== undefined) && list.welfare.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.welfare !== undefined) &&
                                                    list.welfare.slice(0, welfareFundTogle).map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryDeduction}?code=${l.id}&type=welfare`;
                                                        return (
                                                            <tr key={i}>
                                                                <td>{l.name}<br /></td>
                                                                <td>{l.amount !== null ? Number(l.amount) : '-'}</td>
                                                                <th scope="col"><Link to={detailPageURL}><i className="fas fa-edit"></i></Link></th>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left"><b>LWF Fund </b></div>
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryDeduction.replace(':type', 'lwf')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Designation</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Date</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    (list === undefined) && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.lwf !== undefined) && list.lwf.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.lwf !== undefined) && list.lwf.map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryDeduction}?code=${l.id}&type=lwf`;
                                                        return (
                                                            <tr key={i}>
                                                                <td>{l.name}<br /></td>
                                                                <td>{l.amount !== null ? Number(l.amount) : '-'}</td>
                                                                <td>{moment(l.date).format('MMM Do YYYY')}</td>
                                                                <th scope="col"><Link to={detailPageURL}><i className="fas fa-edit"></i></Link></th>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div> */}

                        </div>

                    </div>
                </div>
                {
                    showLoader && <Loader />
                }
            </React.Fragment >
        )
    }

    loadList = () => {
        const { page, limit } = this.state;
        getSalaryDeductionList(page, limit).then((res: any) => {

            this.setState({ list: res.result });
        })
    }

}

export default ComponentName;
