import * as React from 'react';

import CONSTANT from './../../../constant';
import AddHolidayType from '../../../component/setting/branch-category/Add';
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { getBranchCategoryDetail, addBranchCategory } from '../../../action/CompanyBranchAction'

class AddLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.id,
            detail: undefined
        }
    }

    componentDidMount() {
    }

    public render() {

        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            {
                                <AddHolidayType
                                    onSubmit={this.onSubmit}
                                    detail={null}
                                />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }

    onSubmit = (model: any) => {
        addBranchCategory(model).then((res: any) => {
            this.props.history.push(CONSTANT.url.settingsOption.branchCategoryList)
        }).catch((err: any) => {
            alert(err)
        })
    }
}

export default AddLeave;
