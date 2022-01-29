import * as React from 'react';

import CONSTANT from './../../../constant';
import AddHolidayType from '../../../component/setting/holiday-type/Add';
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { getHolidayTypeDetail, updateHolidayType } from '../../../action/SettingsActions'

class AddLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.code,
            detail: undefined
        }
    }

    componentDidMount() {
        getHolidayTypeDetail(this.state.id).then((res: any) => {
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
                                detail &&
                                <AddHolidayType
                                    onSubmit={this.onSubmit}
                                    detail={detail}
                                />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }

    onSubmit = (model: any) => {
        updateHolidayType(model).then((res: any) => {
            this.props.history.push(CONSTANT.url.holidayTypeList)
        }).catch((err: any) => {
            alert(err)
        })
    }
}

export default AddLeave;
