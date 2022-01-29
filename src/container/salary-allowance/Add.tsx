import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import Loader from '../../component/common/Loader';
import AddAllowance from '../../component/salary-allowance/Add';
import CONSTANT from '../../constant';
import { addCycleAllow, addWashingAllow, conveyanceAllow, errearsAllow, addOfficiatingAllow, daAllow, addPensionDaAllow } from '../../action/salaryAllowanceAction';

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
                            <AddAllowance
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
        console.log("type add => ", this.props.match.params.type);

        if (this.props.match.params.type === "officiating") {
            this.setState({ showLoader: true });
            addOfficiatingAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryAllowanceList);
                }
            }
            , (error: any) => {
                alert(error);
               
            }
            );
        }
        else if (this.props.match.params.type === "washing") {
            this.setState({ showLoader: true });
            addWashingAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryAllowanceList);
                }
               
            }
            , (error: any) => {
                alert(error);
               
            }
            );
        }
        else if (this.props.match.params.type === "cycle") {
            this.setState({ showLoader: true });
            addCycleAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryAllowanceList);
                }
            }
            , (error: any) => {
                alert(error);
               
            }
            );
        }
        else if (this.props.match.params.type === "errears") {
            this.setState({ showLoader: true });
            errearsAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryAllowanceList);
                }
            }
            , (error: any) => {
                alert(error);
               
            }
            );
        }
        else if (this.props.match.params.type === "conv") {
            this.setState({ showLoader: true });
            conveyanceAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryAllowanceList);
                }
            });
        }
        else if (this.props.match.params.type === "da") {
            this.setState({ showLoader: true });
            daAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                if (res && res.result) {
                    alert('Changes were saved successfully');
                    this.props.history.push(CONSTANT.url.settingsOption.salaryAllowanceList);
                }
            });
        }
        else if (this.props.match.params.type === "pension-da") {
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
