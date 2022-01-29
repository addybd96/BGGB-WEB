import * as React from 'react';

import CONSTANT from './../../constant';
import AddLoan from '../../component/loan/Add'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { addLoan } from '../../action/LoanActions';
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
                            <AddLoan
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
        addLoan(model).then((res: any) => {
            console.log(res);
            if (res.result) {
                this.props.history.push(CONSTANT.url.loanList)
            }
        }).catch((err: any) => {
            alert(err)
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.loanList)
    }
}

export default AddLeave;
