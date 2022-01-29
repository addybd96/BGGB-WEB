import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import AddCommFactor from '../../component/pension-superannuation/AddFactorValue';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Loader';
import CONSTANT from '../../constant';
import queryString from 'query-string';

import { getPensionDAbyId } from '../../action/PensionSuperAnnAction';
import { getPensionCommFactorDetail, updatePensionCommFactor } from '../../action/PensionConfigAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.id,
            detail: undefined
        }
    }

    componentDidMount() {
        getPensionCommFactorDetail(this.state.id).then((res: any) => {
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
                                detail !== undefined && <AddCommFactor
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
        updatePensionCommFactor(model).then((res: any) => {
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