import * as React from 'react';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import AddSubCategoryCard from './../../../component/setting/helpdesk-category/AddSubCategory';
import Loader from '../../../component/common/Loader';
import CONSTANT from './../../../constant';
import { addSubCategory } from './../../../action/HelpdeskActions';

class AddSubCategory extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false,
        }
    }

    public render() {
        const  { showLoader } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            <div className="col-lg-11">
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6 pl-0">
                                            <h5 className="heading-h1">Sub Category</h5>
                                        </div>
                                    </div>
                                </div>

                                <AddSubCategoryCard
                                    onSubmit={this.onSubmit}
                                    onCancel={this.onCancel}
                                />

                            </div>

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
        addSubCategory(model).then((res: any) => {
            this.setState({ showLoader: false });
            this.props.history.push(CONSTANT.url.settingsOption.helpdeskListCategory);
        });
    }
    
    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.helpdeskListCategory);
    }

}

export default AddSubCategory;
