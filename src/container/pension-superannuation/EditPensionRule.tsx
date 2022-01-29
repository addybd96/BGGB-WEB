import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import AddRule from '../../component/pension-superannuation/Rule';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Loader';
import CONSTANT from '../../constant';
import queryString from 'query-string';

import { updatePensionRule, getPensionRuleDetail } from '../../action/PensionConfigAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.id,
            detail: undefined
        }
    }

    componentDidMount() {
        console.log(queryString.parse(this.props.location.search));

        getPensionRuleDetail(this.state.id).then((res: any) => {
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
                                detail !== undefined && <AddRule
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
        updatePensionRule(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.pensionConfig);
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.pensionConfig);
    }

}

export default ComponentName;