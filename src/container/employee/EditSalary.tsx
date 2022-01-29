import * as React from 'react';
import CONSTANT from '../../constant'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/employee-master/ProgressBar';
import AddSalary from './../../component/employee-master/AddSalary';
import { updateSalaryDetail, getSalaryDetail } from './../../action/EmployeeAction';
import Shimmer from '../../component/common/Shimmer';
import Loader from '../../component/common/Loader';
import { getWorkDetail } from './../../action/EmployeeAction';

class EmployeeSalaryProfile extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            detail: undefined,
            showLoader: false
        }
    }

    componentDidMount = () => {
        const { userId } = this.state;
        this.setState({ showLoader: true });
        getSalaryDetail(userId).then((res: any) => {
            this.setState({ detail: res.result });
            getWorkDetail(userId).then((res: any) => {
                this.setState({ showLoader: false, work: res.result });
            })
        })
    }


    public render() {
        const { userId, detail, work, showLoader } = this.state;
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
                                detail === undefined && <Shimmer />
                            }
                            {
                                work !== undefined && <AddSalary
                                    userId={userId}
                                    detail={detail}
                                    work={work}
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
        updateSalaryDetail(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.editEmployeeLeaveBalance.replace(':id', this.state.userId))
        }, (error: any) => {
            alert(error.message);
        });
    }
}

export default EmployeeSalaryProfile;
