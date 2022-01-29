import * as React from 'react';

import CONSTANT from '../../../constant';
import Edit from '../../../component/setting/CompanyBranch/Edit'
import Loader from '../../../component/common/Loader';
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { getLocationList } from "../../../action/GeographyActions";
import { getBranchCategories, getCompanyBranchDetail, editCompanyBranch } from '../../../action/CompanyBranchAction';


class AddLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false,
            detail: null
        }
    }

    componentWillMount = () => {
        this.setState({ showLoader: true })
        getCompanyBranchDetail(this.props.match.params.code).then((res: any) => {
            this.setState({ detail: res.result[0] })
            getBranchCategories(this.props.match.params.code).then((res1: any) => {
                this.setState({ categories: res1.result })
                getLocationList(this.props.match.params.code).then((res2: any) => {
                    this.setState({ locations: res2.result, showLoader: false })
                })
            })

        })
    }

    public render() {
        const { showLoader, detail, locations, categories } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            {
                                showLoader && <Loader />
                            }
                            {
                                !showLoader &&
                                <Edit
                                    onSubmit={this.onSubmit}
                                    onCancel={this.onCancel}
                                    detail={detail}
                                    categories={categories}
                                    locations={locations}
                                />
                            }

                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    onSubmit = (model: any) => {
        editCompanyBranch(model).then((res: any) => {
            if (res.result) {
                this.props.history.push(CONSTANT.url.settingsOption.companyBranchList)
            } else {
                alert(res.error)
            }
        }).catch((err: any) => {
            alert(err)
        })
    }

    onCancel = () => {
        this.props.history.push(CONSTANT.url.leaveList)
    }
}

export default AddLeave;
