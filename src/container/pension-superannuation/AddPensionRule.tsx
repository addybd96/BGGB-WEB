import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import Loader from '../../component/common/Loader';
import AddRule from '../../component/pension-superannuation/Rule';
import CONSTANT from '../../constant';
import { addPensionRule } from '../../action/PensionConfigAction';

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
                            <AddRule
                                onSubmit={this.onSubmit}
                                onCancel={this.onCancel}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    onSubmit = (model: any) => {
        this.setState({ showLoader: true });
        addPensionRule(model).then((res: any) => {
            this.setState({ showLoader: false });
            if (res.result) {
                // alert('Changes were saved successfully');
                this.props.history.push(CONSTANT.url.pensionConfig);
            }
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.pensionConfig);
    }
}

export default ComponentName;