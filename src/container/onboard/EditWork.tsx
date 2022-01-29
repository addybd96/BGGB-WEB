import * as React from 'react';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/employee-master/OnboardProgressBar';
import AddWork from './../../component/employee-master/AddWork';
import Shimmer from '../../component/common/Shimmer';
import Loader from '../../component/common/Loader';

import { updateWorkDetail, getWorkDetail } from './../../action/EmployeeAction';
import { clearUnwanted, getCookie } from './../../utils'
import CONSTANT from './../../constant';



class EmployeeWorkProfile extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const ud = getCookie(CONSTANT.cookie.userDetail);
        this.state = {
            userId: ud.id,
            detail: undefined,
            showLoader: false
        }
    }

    componentDidMount() {
        const { userId } = this.state;
        this.setState({ showLoader: true });
        getWorkDetail(userId).then((res: any) => {
            this.setState({ showLoader: false, detail: res.result });
        })
    }

    public render() {
        const { userId, detail, showLoader } = this.state;
        return (
            <React.Fragment>
            <Header />
            <div className="fluid-container">
                <div className="row">
                    <div className="my-3">
                        <div className="col-lg-12  mt-2 mb-3">
                        <ProgressBar />
                            </div>
                            {
                                detail === undefined && <Shimmer />
                            }
                            {
                                detail !== undefined && <AddWork
                                    userId={userId}
                                    detail={detail}
                                    onSubmit={this.onSubmit}
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
        updateWorkDetail(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.editEmployeeSalary.replace(':id', this.state.userId))
        }, (error: any) => {
            alert(error.message);
        });
    }
}

export default EmployeeWorkProfile;
