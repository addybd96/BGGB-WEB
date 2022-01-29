import * as React from "react";
import { Link } from "react-router-dom";
import CONSTANT from "../../constant";
import Loader from "../../component/common/Loader";
import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import LeaveList from "../../component/LeaveApplication/List";

import { getLeaves, getLeavesCount } from "../../action/LeaveActions";

class ListLeave extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      leaveList: [],
      showLoader: true,
      page: 1,
      limit: 20,
    };
  }
  componentDidMount() {
    this.loadList(this.state.page, this.state.limit);
  }
  public render() {
    const { leaveList, showLoader, page, limit, count } = this.state;
    return showLoader ? (
      <Loader />
    ) : (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11 my-3">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6 pl-0">
                    <h5 className="heading-h1">Leaves</h5>
                  </div>
                  <div className="col-lg-6 text-right pr-0">
                    <Link to={CONSTANT.url.applyLeave}>
                      <a className="common-btn">
                        <i className="fa fa-plus"></i> &nbsp;Apply Leave
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
                    <LeaveList
                      leaves={leaveList}
                      loadList={this.loadList}
                      count={count}
                      page={page}
                      limit={limit}
                      onTableChange={this.onTableChange}
                      history
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  onTableChange = (type: any, { page, sizePerPage }: any) => {
    this.loadList(page, sizePerPage);
  };

  loadList = (page: any, limit: any) => {
    this.setState({ showLoader: true });
    getLeaves(page, limit)
      .then((res: any) => {
        if (res) {
          this.setState({
            leaveList: res.result,
            page,
            limit,
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });

    getLeavesCount()
      .then((res: any) => {
        if (res) {
          this.setState({
            count: res.result[0].count,
            showLoader: false,
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}

export default ListLeave;
