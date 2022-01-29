import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import EditSalaryDec from '../../component/salary-allowance/Add';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Loader';
import CONSTANT from '../../constant';
import queryString from 'query-string';

import { getById, daAllow } from '../../action/salaryAllowanceAction';
import { addCycleAllow, addOfficiatingAllow, conveyanceAllow, errearsAllow, addWashingAllow, addPensionDaAllow } from '../../action/salaryAllowanceAction';

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
        console.log("type update => ", queryString.parse(this.props.location.search).type);
        if (queryString.parse(this.props.location.search).type === "officiating") {
            this.setState({ showLoader: true });
            addOfficiatingAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "washing") {
            this.setState({ showLoader: true });
            addWashingAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "cycle") {
            this.setState({ showLoader: true });
            addCycleAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "errears") {
            this.setState({ showLoader: true });
            errearsAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "conv") {
            this.setState({ showLoader: true });
            conveyanceAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "da") {
            this.setState({ showLoader: true });
            daAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            });
        }
        else if (queryString.parse(this.props.location.search).type === "pension-da") {
            this.setState({ showLoader: true });
            addPensionDaAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                alert('Changes were saved successfully');
                this.props.history.push(CONSTANT.url.settingsOption.salaryAllowanceList);
            });
        }

    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.salaryAllowanceList);
    }

}

export default ComponentName;
