import * as React from 'react';

import CONSTANT from './../../constant';
import AddLeaves from '../../component/LeaveApplication/Add'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { addLeave } from '../../action/LeaveActions';
class AddLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

    }

    public render() {

        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            <AddLeaves
                                onSubmit={this.onSubmit}
                                onCancel={this.onCancel}
                            />

                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    onSubmit = (model: any) => {
        addLeave(model).then((res: any) => {
            console.log(res);
            if(res.status === false)
            {
                alert(res.error)
            }
            else
            {
                this.props.history.push(CONSTANT.url.leaveList)
            }
        }).catch((err: any) => {
            console.log(err)
            alert(err)
        })
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.leaveList)
    }
}

export default AddLeave;
