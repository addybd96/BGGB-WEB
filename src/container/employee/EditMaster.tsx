import * as React from 'react';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import MasterDetail from './../../component/employee-master/AddMaster'
import ProgressBar from '../../component/employee-master/ProgressBar';
import CONSTANT from './../../constant';
import Shimmer from '../../component/common/Shimmer';
import { getMasterDetail, updateEmployeeMaster } from '../../action/EmployeeAction';
import Loader from '../../component/common/Loader';


class EmployeeMaster extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            detail: undefined,
            showLoader: false
        }
    }

    componentDidMount() {
        const { userId } = this.state;
        this.setState({ showLoader: true });
        getMasterDetail(userId).then((res: any) => {
            this.setState({ showLoader: false });
            if (res.result) {
                console.log('user master', res)
                this.setState({ detail: res.result });
            }
        })
    }

    public render() {
        const { userId, detail, showLoader } = this.state;
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
                            {
                                detail === undefined ? <Shimmer /> :
                                    <MasterDetail
                                        onSubmit={this.onSubmit}
                                        detail={detail}
                                    />
                            }
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
        updateEmployeeMaster(model).then((response: any) => {
            this.setState({ showLoader: false });
            if (response.result) {
                alert('Changes were saved successfully');
                this.props.history.push(CONSTANT.url.editEmployeeBasic.replace(':id', response.result.id));
            }
            else
            {
                alert(response.error)
                this.setState({ showLoader: false });
                
            }
        }, (error: any) => {
            alert(error);
           
        });
    }
}

export default EmployeeMaster;
