import * as React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import CONSTANT from './../../../constant';
import { getPensionRuleList } from '../../../action/PensionConfigAction';

class PensionList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    public componentDidMount() {
        getPensionRuleList().then((response: any) => {
            if (response.result) {
                this.setState({ data: response.result })
            }
        });
    }

    public render() {
        const { data } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            <div className="col-lg-11">
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6 pl-0">
                                            <h5 className="heading-h1">Pension Rule Configuration</h5>
                                        </div>
                                        <div className="col-lg-6 text-right pr-0">
                                            <Link to={CONSTANT.url.settingsOption.AddPensionRule}>
                                                <a className="common-btn"><i className="fa fa-plus"></i> &nbsp; Add Rule</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-2 role-head1">
                                                <b>Rules</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Id</th>
                                                        <th scope="col">From Date</th>
                                                        <th scope="col">To Date</th>
                                                        <th scope="col">Min Amount</th>
                                                        <th scope="col">Max Amount</th>
                                                        <th scope="col">Percentage</th>
                                                        <th scope="col">Min Percentage Amount</th>
                                                        <th scope="col">Max Percentage Amount</th>
                                                        <th scope="col">Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data && data.length > 0 && data.map((item: any, index: any) =>
                                                        <tr>
                                                            <td>{item.id}</td>
                                                            <td>{`${moment(item.fromDate).format("DD/MM/YYYY")}`}</td>
                                                            <td>{`${moment(item.toDate).format("DD/MM/YYYY")}`}</td>
                                                            <td>{item.minAmount}</td>
                                                            <td>{item.maxAmount}</td>
                                                            <td>{`${item.percentage} %`}</td>
                                                            <td>{item.minPercentageAmount}</td>
                                                            <td>{item.maxPercentageAmount}</td>
                                                            <th scope="col">
                                                                <Link
                                                                    to={{
                                                                        pathname: CONSTANT.url.settingsOption.editPensionRule.replace(':id', item.id),
                                                                        state: {
                                                                            detail: {
                                                                                id: item.id, fromDate: item.fromDate, toDate: item.toDate, minAmount: item.minAmount,
                                                                                maxAmount: item.maxAmount, percentage: item.percentage, minPercentageAmount: item.minPercentageAmount, maxPercentageAmount: item.maxPercentageAmount
                                                                            }
                                                                        }
                                                                    }}>
                                                                    <a>
                                                                        <i className="fas fa-edit"></i>
                                                                    </a>
                                                                </Link>
                                                            </th>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}

export default PensionList;
