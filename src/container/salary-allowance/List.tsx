import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from '../../constant';
import { getSalaryAllowanceList } from '../../action/salaryAllowanceAction';
import Loader from '../../component/common/Loader';
import { getCookie } from './../../utils';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            page: 1,
            limit: 10,
            daTogle: 1,
            convTogle: 1,
            cycleTogle: 1,
            errearsTogle: 1,
            washingTogle: 1,
            officiatingTogle: 1,
            showLoader: false,
            userType: getCookie(CONSTANT.cookie.userDetail).userType

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
        const { list, showLoader, daTogle, userType, cycleTogle, errearsTogle, washingTogle, officiatingTogle, } = this.state;

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <div className="row mt-3">
                                <div className="col-lg-12">
                                    <h5 className="heading-h1">Salary Allowance</h5>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left"><b>Handicap Allowance  </b></div>
                                    {
                                        officiatingTogle == 1 ?
                                            <i className="fa fa-angle-double-right" onClick={() => this.togle('officiatingTogle', undefined)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
                                            : <i className="fa fa-angle-double-down" onClick={() => this.togle('officiatingTogle', 1)} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                                    }
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryAllowance.replace(':type', 'officiating')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Amount</th>
                                                    {/* <th scope="col">Date</th> */}
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
                                                    (list && list.officiating !== undefined) && list.officiating.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.officiating !== undefined) && list.officiating.slice(0, officiatingTogle).map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryAllowance}?code=${l.id}&type=officiating`;
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
                                    <div className="float-left"><b> Washing Allowance  </b></div>
                                    {
                                        washingTogle == 1 ?
                                            <i className="fa fa-angle-double-right" onClick={() => this.togle('washingTogle', undefined)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
                                            : <i className="fa fa-angle-double-down" onClick={() => this.togle('washingTogle', 1)} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                                    }
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryAllowance.replace(':type', 'washing')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">name</th>
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
                                                    (list && list.washing !== undefined) && list.washing.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.washing !== undefined) && list.washing.slice(0, washingTogle).map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryAllowance}?code=${l.id}&type=washing`;
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
                                    <div className="float-left"><b>Cycle Allowance  </b></div>
                                    {
                                        cycleTogle == 1 ?
                                            <i className="fa fa-angle-double-right" onClick={() => this.togle('cycleTogle', undefined)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
                                            : <i className="fa fa-angle-double-down" onClick={() => this.togle('cycleTogle', 1)} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                                    }
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryAllowance.replace(':type', 'cycle')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">name</th>
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
                                                    (list && list.cycle !== undefined) && list.cycle.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.cycle !== undefined) && list.cycle.slice(0, cycleTogle).map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryAllowance}?code=${l.id}&type=cycle`;
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
                                    <div className="float-left"><b>Arrears Allowance  </b></div>
                                    {
                                        errearsTogle == 1 ?
                                            <i className="fa fa-angle-double-right" onClick={() => this.togle('errearsTogle', undefined)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
                                            : <i className="fa fa-angle-double-down" onClick={() => this.togle('errearsTogle', 1)} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                                    }
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryAllowance.replace(':type', 'errears')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">name</th>
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
                                                    (list && list.errears !== undefined) && list.errears.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.errears !== undefined) && list.errears.slice(0, errearsTogle).map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryAllowance}?code=${l.id}&type=errears`;
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
                                    <div className="float-left"><b>Conveyance Allowance  </b></div>{
                                            otherDeductionTogle == 1 ?
                                                <i className="fa fa-angle-double-right" onClick={() => this.togle('otherDeductionTogle', undefined)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
                                                : <i className="fa fa-angle-double-down" onClick={() => this.togle('otherDeductionTogle', 1)} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                                        }
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryAllowance.replace(':type', 'conv')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">name</th>
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
                                                    (list && list.conv !== undefined) && list.conv.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.conv !== undefined) && list.conv.slice(0, otherDeductionTogle).map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryAllowance}?code=${l.id}&type=conv`;
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
                            </div> */}

                            {userType === 'sadmin' && <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left"><b>DA % </b></div>{
                                        daTogle == 1 ?
                                            <i className="fa fa-angle-double-right" onClick={() => this.togle('daTogle', undefined)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
                                            : <i className="fa fa-angle-double-down" onClick={() => this.togle('daTogle', 1)} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                                    }
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryAllowance.replace(':type', 'da')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">% Of Applicable D.A</th>
                                                    <th scope="col">Quarter</th>
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
                                                    (list && list.da !== undefined) && list.da.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list.da !== undefined) && list.da.slice(0, daTogle).map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.settingsOption.editSalaryAllowance}?code=${l.id}&type=da`;
                                                        return (
                                                            <tr key={i}>
                                                                <td>{l.daPercentage} %<br /></td>
                                                                <td>{moment(l.startDate).format("MMM Do YYYY")} - {moment(l.endDate).format("MMM Do YYYY")} </td>
                                                                <th scope="col"><Link to={detailPageURL}><i className="fas fa-edit"></i></Link></th>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>}

                        </div>

                    </div>
                </div>
                {
                    showLoader && <Loader />
                }
            </React.Fragment>
        )
    }

    loadList = () => {
        const { page, limit } = this.state;
        getSalaryAllowanceList(page, limit).then((res: any) => {
            if (res && res.result)
                this.setState({ list: res.result });
        })
    }

}

export default ComponentName;
