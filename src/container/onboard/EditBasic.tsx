import * as React from 'react';
import Header from '../../component/common/Header';
import CONSTANT from './../../constant';
import ProgressBar from '../../component/employee-master/OnboardProgressBar';
import AddBasic from './../../component/employee-master/AddBasic';
import Loader from '../../component/common/Loader';

import { getBasicDetail, updateBasicDetail } from './../../action/EmployeeAction';
import Shimmer from '../../component/common/Shimmer';
import { getCookie } from '../../utils';

class EmployeeBasicDetail extends React.Component<any, any> {
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
        getBasicDetail(userId).then((res: any) => {
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
                                detail !== undefined && <AddBasic
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
        updateBasicDetail(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.obEmployeeAddress);
        }, (error: any) => {
            alert(error.message);
        });
    }
}

export default EmployeeBasicDetail;