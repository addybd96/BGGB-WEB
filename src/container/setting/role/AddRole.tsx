import * as React from 'react';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import AddRole from './../../../component/setting/role/Add';
import Loader from '../../../component/common/Loader';
import { addUserRole } from './../../../action/SettingsActions';
import CONSTANT from './../../../constant';

class Role extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false
        }
    }

    public render() {
        const  { showLoader } = this.state;
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
                                            <h5 className="heading-h1">Add Roles & Permissions</h5>
                                        </div>
                                    </div>
                                </div>

                                <AddRole
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
        addUserRole(model).then((res: any) => {
            this.setState({ showLoader: false });
            // alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.settingsOption.role);
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.role);
    }

}

export default Role;
