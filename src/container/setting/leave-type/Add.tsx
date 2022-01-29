import * as React from 'react';

import Loader from '../../../component/common/Loader';
import CONSTANT from './../../../constant';
import AddLeaveType from '../../../component/leave-type/Add'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';

import { addLeaveType } from '../../../action/SettingsActions';

class AddLeave extends React.Component<any, any> {
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
                        <div className="col-lg-11 my-3">
                            <AddLeaveType
                                onSubmit={this.onSubmit}
                                onCancel={this.onCancel}
                            />
                        </div>
                    </div>
                </div>
                {
                    showLoader && <Loader />
                }
            </React.Fragment >
        )
    }

    onSubmit = (model: any) => {
        this.setState({ showLoader: true });
        addLeaveType(model).then((res: any) => {
            this.setState({ showLoader: false });
            this.props.history.push(CONSTANT.url.leaveTypeList)
        }).catch((err: any) => {
            alert(err.message);
        })
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.leaveTypeList)
    }
}

export default AddLeave;
