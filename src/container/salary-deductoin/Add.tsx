import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import Loader from '../../component/common/Loader';
import AddSalaryDec from '../../component/salary-deduction/Add';
import CONSTANT from '../../constant';
import { addSalaryProv, addSalaryGroupInsurance, addSalaryWelfare, lwfDeduction, otherDeduction } from '../../action/salaryDeductionAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            showLoader: false
        }
    }

    public render() {
        const { showLoader } = this.state;
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
                            <AddSalaryDec
                                onSubmit={this.onSubmit}
                                onCancel={this.onCancel}
                                type={this.props.match.params.type}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    onSubmit = (model: any) => {

        if (this.props.match.params.type === "prov") {
            this.setState({ showLoader: true });
            addSalaryProv(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            })
                
        }
        else if (this.props.match.params.type === "insurance") {
            this.setState({ showLoader: true });
            addSalaryGroupInsurance(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            })
                
        }
        else if (this.props.match.params.type === "welfare") {
            this.setState({ showLoader: true });
            addSalaryWelfare(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            })
                
        }
        else if (this.props.match.params.type === "otherDeduction") {
            this.setState({ showLoader: true });
            otherDeduction(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            })
                
        }
        else if (this.props.match.params.type === "lwf") {
            this.setState({ showLoader: true });
            lwfDeduction(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
                }
            })
                
        }

    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.salaryDeductionList);
    }
}

export default ComponentName;
