import * as React from 'react';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import MasterDetail from './../../component/employee-master/AddMaster'
import ProgressBar from '../../component/employee-master/ProgressBar';
import CONSTANT from './../../constant';

import { addEmployeeMaster } from '../../action/EmployeeAction';
import Loader from '../../component/common/Loader';


class EmployeeMaster extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false
        }
    }

    public render() {
        const { showLoader, userId } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12  mt-2 mb-3">
                                <ProgressBar userId={userId} />
                            </div>
                            <MasterDetail
                                onSubmit={this.onSubmit}
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
        addEmployeeMaster(model).then((response: any) => {
            this.setState({ showLoader: false });
            if (response.status) {
                alert('Changes were saved successfully');
                this.props.history.push(CONSTANT.url.editEmployeeBasic.replace(':id', response.result.id))
            } else {
                alert(response.error);
            }
        }, (error: any) => {
            alert(error.message);
        });
    }
}

export default EmployeeMaster;
