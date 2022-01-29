import * as React from 'react';

import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import AddSalaryProfileMember from './../../component/salary-profile-member/Add';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Loader';
import CONSTANT from './../../constant';
import { getSalaryProfileMemberDetail, updateSalaryProfileMember } from './../../action/SalaryProfileMemberActions';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            code: props.match.params.code,
            detail: undefined
        }
    }

    componentDidMount() {
        const { code } = this.state;
        getSalaryProfileMemberDetail(code).then((res: any) => {
            this.setState({ detail: res.result });
        });
    }

    public render() {
        const { showLoader, detail } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <div className="row mt-3">
                                <div className="col-lg-12">
                                    <h5 className="heading-h1">Salary profile member</h5>
                                </div>
                            </div>
                            {
                                detail === undefined && <Shimmer />
                            }
                            {
                                detail !== undefined && <AddSalaryProfileMember
                                    detail={detail}
                                    onSubmit={this.onSubmit}
                                    onCancel={this.onCancel}
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
        updateSalaryProfileMember(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.settingsOption.salaryProfileMemberList);
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.salaryProfileMemberList);
    }

}

export default ComponentName;
