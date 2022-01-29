import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import Loader from '../../component/common/Loader';
import AddDaAllowance from '../../component/pension-superannuation/AddDA';
import CONSTANT from '../../constant';
import { addPensionDaAllow } from '../../action/salaryAllowanceAction';

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
                            <AddDaAllowance
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
        console.log("type add => ", this.props.match.params.type);

        if (this.props.match.params.type === "pension-da") {
            this.setState({ showLoader: true });
            addPensionDaAllow(model).then((res: any) => {
                this.setState({ showLoader: false });
                alert('Changes were saved successfully');
                this.props.history.push(CONSTANT.url.pensionConfig);
            });
        }


    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.pensionConfig);
    }
}

export default ComponentName;
