import * as React from 'react';

import CONSTANT from './../../../constant';
import AddLoanType from '../../../component/setting/loan-type/Add'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import Loader from '../../../component/common/Loader';

import { addLoanType } from '../../../action/SettingsActions';

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
                            <AddLoanType
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
        addLoanType(model).then((res: any) => {
            this.setState({ showLoader: false });
            this.props.history.push(CONSTANT.url.loanTypeList)
        }).catch((err: any) => {
            alert(err)
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.loanTypeList);
    }
}

export default AddLeave;
