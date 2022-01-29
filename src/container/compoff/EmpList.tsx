import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../constant';
import Loader from '../../component/common/Loader';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CompOffList from '../../component/compoff/List'

import { getAllCompOffs, getAllCompOffsCount } from '../../action/CompOffActions'

class ListLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            compoffs: [],
            showLoader: false,
            page: 1,
            limit: 20
        }
        this.onTableChange = this.onTableChange.bind(this)
        this.loadList = this.loadList.bind(this)
    }
    componentDidMount() {
        this.loadList(this.state.page, this.state.limit)

    }
    public render() {
        const { compoffs, showLoader, page, limit, count } = this.state;
        return showLoader ? <Loader /> : (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12 mt-4">
                                <div className="row">
                                    <div className="col-lg-6 pl-0">
                                        <h5 className="heading-h1">Complementary Leaves</h5>
                                    </div>
                                    <div className="col-lg-6 text-right pr-0">
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
                                        <CompOffList compoffs={compoffs} loadList={this.loadList.bind(this)} count={count} page={page} limit={limit} onTableChange={this.onTableChange} />
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
        this.setState({ showLoader: true })
        getAllCompOffs(this.props.match.params.code, page, limit)
            .then((res: any) => {
                if (res) {
                    this.setState({
                        compoffs: res.result,
                        page, limit
                    })
                }
            })
            .catch((err: any) => {
                console.log(err);

            })

        getAllCompOffsCount()
            .then((res: any) => {
                if (res) {
                    this.setState({
                        count: res.result[0].count,
                        showLoader: false
                    });
                }
            })
            .catch((err: any) => {
                console.log(err);
            });
    }


}

export default ListLeave;
