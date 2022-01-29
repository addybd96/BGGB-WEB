import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../constant';
import Loader from '../../component/common/Loader';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import FastivalEmpList from '../../component/FastivalAdvance/EmpList'
import { getFastivalAdvanceEmp } from '../../action/FastivalAdvanceAction'
import { getCookie } from '../../utils';

class EmpFestivalAdvList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            fastivalList: [],
            showLoader: true,
            page: 1,
            limit: 10,
            count: 0,
            userType: undefined
        }
    }
    componentDidMount() {
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        this.setState({ userType: userDetail.userType }, () => {
            this.loadList(this.state.page, this.state.limit)
        });
    }
    public render() {
        const { fastivalList, showLoader, page, limit, count } = this.state;
        return showLoader ? <Loader /> : (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-6 pl-0">
                                        <h5 className="heading-h1">Fastival Advance.</h5>
                                    </div>
                                    <div className="col-lg-6 text-right pr-0">
                                        <Link to={CONSTANT.url.applyFasitvalAdd}>
                                            <a className="common-btn">
                                                <i className="fa fa-plus"></i> &nbsp;Request for Fastival Adv.
                                                </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <b>Role </b>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <FastivalEmpList fastivalList={fastivalList} type="employee" loadList={this.loadList} count={count} page={page} limit={limit} onTableChange={this.onTableChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment >
        )
    }

    onTableChange = (type: any, { page, sizePerPage }: any) => {
        this.loadList(page, sizePerPage)
    }

    loadList = (page: any, limit: any) => {
        this.setState({ showLoader: true });
        getFastivalAdvanceEmp(page, limit)
            .then((res: any) => {
                this.setState({ showLoader: false });
                if (res.result) {
                    console.log("getFastivalAdvanceEmp   ", res)
                    this.setState({
                        fastivalList: res.result.list,
                        page,
                        limit,
                        count: res.result.count
                    });
                }
            })
            .catch((err: any) => {
                console.log(err);
            })
    }




}

export default EmpFestivalAdvList;
