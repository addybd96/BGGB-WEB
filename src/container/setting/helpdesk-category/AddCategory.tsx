import * as React from 'react';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import AddCategoryCard from './../../../component/setting/helpdesk-category/AddCategory';
import Loader from '../../../component/common/Loader';
import { addCategory } from './../../../action/HelpdeskActions';

import CONSTANT from './../../../constant';

class AddCategory extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false
        }
    }

    public render() {
        const  { showLoader, employeeList } = this.state;
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
                                            <h5 className="heading-h1">Category</h5>
                                        </div>
                                    </div>
                                </div>

                                <AddCategoryCard
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
        addCategory(model).then((res: any) => {
            this.setState({ showLoader: false });
            this.props.history.push(CONSTANT.url.settingsOption.helpdeskListCategory);
        });
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.settingsOption.helpdeskListCategory);
    }

}

export default AddCategory;
