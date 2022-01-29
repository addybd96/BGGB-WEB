import * as React from 'react';

import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import Loader from '../../component/common/Loader';
import AddLocation from './../../component/location/Add';
import CONSTANT from './../../constant';
import { getUser } from '../../action/SettingsActions';
import { addLocation } from './../../action/GeographyActions';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            showLoader: false,
            users : null
        }
    }

    componentWillMount = () => {
        this.setState({showLoader: true})
        getUser().then((response: any) => {
            if (response.status) {
                this.setState({ users: response.result, showLoader: false })
            }
        });
    }

    public render() {
        const { showLoader, users } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            {users && <AddLocation
                                users={users}
                                onSubmit={this.onSubmit}
                                onCancel={this.onCancel}
                            />}
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
        addLocation(model).then((res: any) => {
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
