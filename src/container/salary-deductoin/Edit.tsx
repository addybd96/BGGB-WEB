import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import EditSalaryDec from '../../component/salary-deduction/Add';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Loader';
import CONSTANT from '../../constant';
import queryString from 'query-string';

import { getById, otherDeduction, lwfDeduction } from '../../action/salaryDeductionAction';
import { addSalaryProv, addSalaryGroupInsurance, addSalaryWelfare } from '../../action/salaryDeductionAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            detail: undefined
        }
    }

    componentDidMount() {
        console.log(queryString.parse(this.props.location.search));

        const { code, type } = queryString.parse(this.props.location.search);
        getById(code, type).then((res: any) => {
            this.setState({ detail: res.result });
        });
    }

    public render() {
        const { showLoader, detail } = this.state;
        return (
            <React.Fragment>
                <Header />
                {
                    showLoader && <Loader />
                }
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            {
                                detail === undefined && <Shimmer />
                            }
                            {
                                detail !== undefined && <EditSalaryDec
                                    detail={detail}
                                    onSubmit={this.onSubmit}
                                    onCancel={this.onCancel}
                                    type={queryString.parse(this.props.location.search).type}
                                />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    onSubmit = (model: any) => {
        if (queryString.parse(this.props.location.search).type === "prov") {
            this.setState({ showLoader: true });
            addSalaryProv(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "groupInc") {
            this.setState({ showLoader: true });
            addSalaryGroupInsurance(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "welfare") {
            this.setState({ showLoader: true });
            addSalaryWelfare(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "otherDeduction") {
            this.setState({ showLoader: true });
            otherDeduction(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "lwf") {
            this.setState({ showLoader: true });
            lwfDeduction(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
    }

}

export default ComponentName;
