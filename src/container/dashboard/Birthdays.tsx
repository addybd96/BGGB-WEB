import * as React from 'react';
import moment from 'moment';
import CONSTANT from '../../constant'
import Shimmer from '../../component/common/Shimmer';
import { checkinAttendance } from './../../action/EmployeeAttendanceActions';
import { getDateParts, getCookie } from '../../utils';
import {getUpcomingBirthdays} from '../../action/SettingsActions'

class ComponentName extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined
        }
    }

    componentDidMount() {
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        getUpcomingBirthdays(userDetail.userType).then((res: any) => {
            if (res.result !== null) {
                this.setState({ list: res.result })
            }
        })
    }

    render() {
        const { list } = this.state;
        return (
            <div className="card emp-leave-details text-left">
                <div className="card-header">
                    Upcoming Birthdays
                </div>
                <div className="card-body">
                    {
                        list === undefined && <Shimmer />
                    }
                    {
                        list !== undefined && list.length === 0 && <div className="text-center mt-5">
                            <i className="fa fa-3x fa-calendar"></i><br />
                            <small>No records found</small>
                        </div>
                    }
                    {
                        list !== undefined && list.map((item: any, key: number) => {
                            return (<div className="col-lg-12 pl-0 pr-0" key={key}>
                                <div className="row">
                                    <div className="col-6 col-lg-6 leave-date">
                                        <p className="mb-0">{item.firstName} {item.lastName}</p>
                                        <span>{moment(item.dateOfBirth).format('YYYY-MM-DD')}</span>
                                    </div>
                                    <div className="col-6 col-lg-6 leave-status text-right">
                                        <span className="pending">{moment(item.dateOfBirth).format('MMM DD')}</span>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        );
    }
}

export default ComponentName;