import * as React from 'react';

import Loader from '../../../component/common/Loader';
import CONSTANT from './../../../constant';
import AddLeaveType from '../../../component/attendance-type/Add'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';

import { addAttendanceType } from '../../../action/SettingsActions';

class AddAttendance extends React.Component<any, any> {
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
        addAttendanceType(model).then((res: any) => {
            this.setState({ showLoader: false });
            this.props.history.push(CONSTANT.url.attendanceTypeList)
        }).catch((err: any) => {
            alert(err.message);
        })
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.attendanceTypeList)
    }
}

export default AddAttendance;
