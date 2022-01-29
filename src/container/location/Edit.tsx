import * as React from 'react';

import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import AddLocation from './../../component/location/Add';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Loader';
import CONSTANT from './../../constant';
import { getLocationDetail, updateLocation } from './../../action/GeographyActions';
import { getUser } from '../../action/SettingsActions';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            code: props.match.params.code,
            detail: undefined,
            showLoader: false
        }
    }

    componentDidMount() {
        const { code } = this.state;
        this.setState({showLoader: true})
        getLocationDetail(code).then((res: any) => {
            this.setState({ detail: res.result });
            getUser().then((response: any) => {
                if (response.status) {
                    this.setState({ users: response.result, showLoader: false })
                }
            });
        });
    }

    public render() {
        const { showLoader, detail, users } = this.state;
        return (
            <React.Fragment>
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="row mt-3">
                                <div className="col-lg-12">
                                    <h5 className="heading-h1">Location detail</h5>
                                </div>
                            </div>
                            {
                                users === undefined && <Shimmer />
                            }
                            {
                                users !== undefined && <AddLocation
                                    detail={detail}
                                    users={users}
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
        updateLocation(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.settingsOption.locationList);
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.locationList);
    }

}

export default ComponentName;
