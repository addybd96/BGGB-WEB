import * as React from 'react';

import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import AddSalaryComp from './../../component/salary-component/Add';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Loader';
import CONSTANT from './../../constant';
import { getSalaryComponentDetail, updateSalaryComponent } from './../../action/SalaryComponentActions';

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
        getSalaryComponentDetail(code).then((res: any) => {
            this.setState({ detail: res.result });
        });
    }

    public render() {
        const { showLoader, detail } = this.state;
        return (
            <React.Fragment>
                <Header />
                {
                    showLoader && <Loader />
                }
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            {
                                detail === undefined && <Shimmer />
                            }
                            {
                                detail !== undefined && <AddSalaryComp
                                    detail={detail}
                                    onSubmit={this.onSubmit}
                                    onCancel={this.onCancel}
                                />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    onSubmit = (model: any) => {
        this.setState({ showLoader: true });
        updateSalaryComponent(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.settingsOption.salaryComponentList);
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.salaryComponentList);
    }

}

export default ComponentName;
