import * as React from 'react';

import CONSTANT from './../../../constant';
import AddLeaveType from '../../../component/attendance-type/Add'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { getAttendanceTypeDetail, updateAttendanceType } from '../../../action/SettingsActions'

class AddAttendance extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.code,
            detail: undefined
        }
    }

    componentDidMount() {
        getAttendanceTypeDetail(this.state.id).then((res: any) => {
            this.setState({
                detail: res.result
            });
        }).catch((err: any) => {
            console.log(err);
        })
    }

    public render() {
        const { detail } = this.state;

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            {
                                detail === undefined && <div>Loading...</div>
                            }
                            {
                                detail && <AddLeaveType
                                    detail={detail}
                                    onSubmit={this.onSubmit}
                                    onCancel={this.onCancel}
                                />
                            }
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    onSubmit = (model: any) => {
        updateAttendanceType(model).then((res: any) => {
            this.props.history.push(CONSTANT.url.attendanceTypeList)
        }).catch((err: any) => {
            alert(err)
        })
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.attendanceTypeList)
    }
}

export default AddAttendance;
