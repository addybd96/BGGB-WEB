import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../constant';

import LIC from '../employee/EditLIC';
import AllowAnceList from '../employee/AllowanceList';
import DeductionList from '../employee/DeductionList';
import Union from '../employee/EditUnion';
import Society from '../employee/EditSocity';
import IncomeTax from '../employee/EditIncomeTax';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import Shimmer from '../../component/common/Shimmer';
import ProgressBar from '../../component/employee-master/ProgressBar';

import { getDeclaratioinDetails, getSalaryAllowanceList, getSalaryDeductionList } from '../../action/DeclarationAction';

class EmployeeEducation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            detail: undefined,
            deduc: undefined,
            allow: undefined,
        }
    }

    componentDidMount() {
        this.loadList()

    }

    public render() {
        const { detail, deduc, allow } = this.state

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12  mt-2 mb-3">
                                <ProgressBar userId={this.props.match.params.id} />
                            </div>
                            {
                                detail === undefined && <Shimmer />

                            }
                            {detail !== undefined && <IncomeTax
                                userId={this.props.match.params.id}
                                detail={detail}
                                loadList={this.loadList}
                            />}
                            {/* {detail !== undefined && <Society
                                userId={this.props.match.params.id}
                                detail={detail}
                                loadList={this.loadList}

                            />} */}
                            {detail !== undefined && <Union
                                userId={this.props.match.params.id}
                                detail={detail}
                                loadList={this.loadList}

                            />}
                            {detail !== undefined && <LIC
                                userId={this.props.match.params.id}
                                detail={detail}
                                loadList={this.loadList}

                            />}
                            {deduc !== undefined && <DeductionList
                                userId={this.props.match.params.id}
                                list={deduc}
                                loadList={this.loadList}

                            />}
                            {allow !== undefined && <AllowAnceList
                                userId={this.props.match.params.id}
                                list={allow}
                                loadList={this.loadList}

                            />}
                            <div className="col-lg-2 pull-right pr-0 pl-0">
                                <div className="row">
                                    <div className="col-lg-12 pull-right mt-3 mb-3">
                                        <Link to={CONSTANT.url.jobHistory.replace(':id', this.props.match.params.id)}
                                            className="btn btn-primary btn-sm">Continue</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    loadList = () => {
        this.setState({ showLoader: true });
        getDeclaratioinDetails(this.props.match.params.id).then((res: any) => {
            this.setState({ showLoader: false, detail: res.result });
        })
        this.setState({ showLoader: true });
        getSalaryDeductionList(this.props.match.params.id).then((res: any) => {
            this.setState({ showLoader: false, deduc: res.result });
        })
        this.setState({ showLoader: true });
        getSalaryAllowanceList(this.props.match.params.id).then((res: any) => {
            this.setState({ showLoader: false, allow: res.result });
        })
    }

}

export default EmployeeEducation;