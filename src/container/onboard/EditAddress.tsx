import * as React from 'react';
import Header from '../../component/common/Header';

import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/employee-master/OnboardProgressBar';
import AddAddress from './../../component/employee-master/AddAddress';
import Shimmer from '../../component/common/Shimmer';
import CONSTANT from './../../constant';
import Loader from '../../component/common/Loader';

import { getAddressDetail, updateAddressDetail } from './../../action/EmployeeAction';
import { getCookie } from '../../utils';

class EmployeeAddress extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const ud = getCookie(CONSTANT.cookie.userDetail);
        this.state = {
            userId: ud.id,
            showLoader: false,
            detail: undefined
        }
    }

    componentDidMount() {
        const { userId } = this.state;
        this.setState({ showLoader: true });
        getAddressDetail(userId).then((res: any) => {
            console.log(res)
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
                        <div className="col-lg-12  mt-2 mb-3">
                            <ProgressBar />
                        </div>
                        {
                            detail === undefined && <Shimmer />
                        }
                        {
                            detail !== undefined && <AddAddress
                                userId={userId}
                                detail={detail}
                                onSubmit={this.onSubmit}
                            />
                        }
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
        updateAddressDetail(model).then((response: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.obEmployeeFamily);
        }, (error: any) => {
            alert(error.message);
        });
    }
}

export default EmployeeAddress;
