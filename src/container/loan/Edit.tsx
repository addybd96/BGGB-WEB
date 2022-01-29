import * as React from 'react';

import CONSTANT from './../../constant';
import EditLoan from '../../component/loan/Edit'
import Loader from '../../component/common/Loader';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { updateLoan, getLoanDetail } from '../../action/LoanActions';


class AddLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false,
            detail: null,
            emp: true
        }
    }

    componentWillMount() {
        if(this.props.match.path.includes('loan-emp'))
            this.setState({ showLoader: true, emp: true })
        else
            this.setState({ showLoader: true, emp: false })
        getLoanDetail(this.props.match.params.code).then((res: any) => {
            console.log('res', res.result)
            this.setState({ detail: res.result, showLoader: false })
        })
    }

    public render() {
        const { showLoader, detail, emp } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            {
                                showLoader && <Loader />
                            }
                            {
                                detail &&
                                <EditLoan
                                    emp={emp}
                                    onSubmit={this.onSubmit}
                                    onCancel={this.onCancel}
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
        updateLoan(model).then((res: any) => {
            console.log(res);
            this.props.history.push(CONSTANT.url.loanList)
        }).catch((err: any) => {
            alert(err)
        })
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.leaveList)
    }
}

export default AddLeave;
