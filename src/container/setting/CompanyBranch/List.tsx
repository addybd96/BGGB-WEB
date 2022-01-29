import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../../constant';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import CompanyBranchList from '../../../component/setting/CompanyBranch/List'

import { getCompanyBranch } from '../../../action/CompanyBranchAction'

class ListLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            branches: [],
            showLoader: false
        }
    }
    componentDidMount() {
        this.loadList()

    }
    public render() {
        const { branches, showLoader } = this.state;
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
                                            <h5 className="heading-h1">Bank Branches</h5>
                                        </div>
                                        <div className="col-lg-6 text-right pr-0">
                                            <Link to={CONSTANT.url.settingsOption.bulkUploadCompanyBranch}>
                                                <a className="common-btn mr-1">
                                                    <i className="fa fa-plus"></i> &nbsp;Bulk Upload
                                                </a>
                                            </Link>
                                            <Link to={CONSTANT.url.settingsOption.addCompanyBranch}>
                                                <a className="common-btn">
                                                    <i className="fa fa-plus"></i> &nbsp;Add Branch/Office
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <b>Branch List </b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <CompanyBranchList branches={branches} loadList={this.loadList.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    loadList = () => {
        this.setState({ showLoader: true })
        getCompanyBranch()
            .then((res: any) => {
                console.log(res)
                if (res) {
                    this.setState({
                        branches: res.result,
                        showLoader: false
                    })
                }
            })
            .catch((err: any) => {
                console.log(err);

            })
    }


}

export default ListLeave;
