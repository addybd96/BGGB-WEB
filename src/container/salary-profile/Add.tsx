import * as React from 'react';

import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import Loader from '../../component/common/Loader';
import AddSalaryProfile from './../../component/salary-profile/Add';
import CONSTANT from './../../constant';
import { addSalaryProfile } from './../../action/SalaryProfileActions';

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
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <AddSalaryProfile
                                onSubmit={this.onSubmit}
                                onCancel={this.onCancel}
                            />
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
        addSalaryProfile(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.settingsOption.salaryProfileList);
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.salaryProfileList);
    }
}

export default ComponentName;
