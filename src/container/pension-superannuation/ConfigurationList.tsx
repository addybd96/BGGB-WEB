import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from '../../constant';
import { getPensionDaAllowList } from '../../action/PensionSuperAnnAction';
import { getPensionRuleList, getPensionCommFactorList } from '../../action/PensionConfigAction';
import Loader from '../../component/common/Loader';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            page: 1,
            limit: 10,
            showLoader: false,
            ruleData: undefined,
            factorData: undefined
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;

        this.loadList();
    }

    public render() {
        const { list, showLoader, ruleData, factorData } = this.state;

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left"><b>Pension D.A Index</b></div>
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.addPensionAllowance.replace(':type', 'pension-da')}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Date of Retirement From</th>
                                                    <th scope="col">Date of Retirement To</th>
                                                    <th scope="col">D.A From</th>
                                                    <th scope="col">D.A To</th>
                                                    <th scope="col">D.A %</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    (list && list === undefined) && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list !== undefined) && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (list && list !== undefined) && list.map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.editPensionAllowance}?code=${l.id}`;
                                                        return (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{moment(l.dateOfRetirementFrom).format("MMM Do YYYY")}</td>
                                                                <td>{moment(l.dateOfRetirementTo).format("MMM Do YYYY")}</td>
                                                                <td>{moment(l.daFrom).format("MMM Do YYYY")}</td>
                                                                <td>{moment(l.daTo).format("MMM Do YYYY")}</td>
                                                                <td>{l.daPercentage} %<br /></td>
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
                                    <div className="float-left"><b>Pension Configuration Rule</b></div>
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.addPensionRule}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Date of Retirement From</th>
                                                    <th scope="col">Date of Retirement To</th>
                                                    <th scope="col">Basic From</th>
                                                    <th scope="col">Basic To</th>
                                                    <th scope="col">Percentage</th>
                                                    <th scope="col">Minimum</th>
                                                    <th scope="col">Maximum</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    (ruleData && ruleData === undefined) && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    (ruleData && ruleData !== undefined) && ruleData.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (ruleData && ruleData !== undefined) && ruleData.map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.editPensionRule.replace(':id', l.id)}`;
                                                        return (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{moment(l.dateOfRetirementFrom).format("MMM Do YYYY")}</td>
                                                                <td>{moment(l.dateOfRetirementTo).format("MMM Do YYYY")}</td>
                                                                <td>{moment(l.daFrom).format("MMM Do YYYY")}</td>
                                                                <td>{moment(l.daTo).format("MMM Do YYYY")}</td>
                                                                <td>{l.percentage} %<br /></td>
                                                                <td>{l.minAmount}<br /></td>
                                                                <td>{l.maxAmount}<br /></td>
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
                                    <div className="float-left"><b>Commutation value factor</b></div>
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.addCommutataionFactor}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Age</th>
                                                    <th scope="col">Commutation value factor</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    (factorData && factorData === undefined) && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    (factorData && factorData !== undefined) && factorData.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    (factorData && factorData !== undefined) && factorData.map((l: any, i: any) => {
                                                        const detailPageURL = `${CONSTANT.url.editCommutataionFactor.replace(':id', l.id)}`;
                                                        return (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{l.age}<br /></td>
                                                                <td>{l.value}<br /></td>
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
        getPensionDaAllowList(page, limit).then((res: any) => {
            if (res && res.result)
                this.setState({ list: res.result });
        });
        getPensionRuleList().then((response: any) => {
            if (response.result) {
                this.setState({ ruleData: response.result })
            }
        });
        getPensionCommFactorList(page, limit).then((response: any) => {
            if (response.result) {
                this.setState({ factorData: response.result })
            }
        });
    }

}

export default ComponentName;
