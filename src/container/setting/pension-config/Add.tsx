import * as React from 'react';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import AddPensionRule from './../../../component/setting/pension-config/Add';
import Loader from '../../../component/common/Loader';
import { addPensionRule } from '../../../action/PensionConfigAction';
import CONSTANT from './../../../constant';

class AddPension extends React.Component<any, any> {
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
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            <div className="col-lg-11">
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6 pl-0">
                                            <h5 className="heading-h1">Add Pension Rule Configuration</h5>
                                        </div>
                                    </div>
                                </div>

                                <AddPensionRule
                                    onSubmit={this.onSubmit}
                                    onCancel={this.onCancel}
                                />

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

    onSubmit = (model: any) => {
        this.setState({ showLoader: true });
        addPensionRule(model).then((res: any) => {
            this.setState({ showLoader: false });
            if (res.result) {
                // alert('Changes were saved successfully');
                this.props.history.push(CONSTANT.url.settingsOption.pensionRuleList);
            }
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.pensionRuleList);
    }

}

export default AddPension;
