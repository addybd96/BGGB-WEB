import * as React from 'react';

import Header from './../../../component/common/Header';
import Sidebar from './../../../component/common/Sidebar';
import Loader from './../../../component/common/Loader';
import Shimmer from './../../../component/common/Loader';
import AddCategoryCard from './../../../component/setting/helpdesk-category/AddCategory';
import CONSTANT from './../../../constant';
import { updateUserRole } from './../../../action/SettingsActions';

class EditCategory extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            detail: props.location.state.detail
        }
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
                                    <h5 className="heading-h1">Edit Role</h5>
                                </div>
                            </div>
                            {
                                detail === undefined && <Shimmer />
                            }
                            {
                                detail !== undefined && <AddCategoryCard
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
        updateUserRole(model).then((res: any) => {
            this.setState({ showLoader: false });
            alert('Changes were saved successfully');
            this.props.history.push(CONSTANT.url.settingsOption.role);
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.role);
    }

}

export default EditCategory;
