import * as React from "react";
import { Link } from "react-router-dom";
import CONSTANT from "../../constant";
import Loader from "../../component/common/Loader";
import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import LeaveList from "../../component/LeaveApplication/List";

import {
  getPendingLeaveApplications,
  getPendingLeaveApplicationsCount,
} from "../../action/LeaveActions";
import { getCookie } from "../../utils";

class ListLeave extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      filter: "pending",
      leaveList: [],
      showLoader: false,
      page: 1,
      limit: 20,
      userDetail: null,
    };
    this.onTableChange = this.onTableChange.bind(this);
    this.loadList = this.loadList.bind(this);
  }
  componentDidMount() {
    this.loadList(this.state.page, this.state.limit);
    const userDetail = getCookie(CONSTANT.cookie.userDetail);
    this.setState({ userDetail });
  }
  public render() {
    const {
      filter,
      leaveList,
      showLoader,
      page,
      limit,
      count,
      userDetail,
    } = this.state;

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
                  <div className="col-lg-6 pl-0"></div>
                  <div className="col-lg-6 text-right pr-0"></div>
                </div>
              </div>
              <div className="card mt-2">
                <div className="card-header">
                  <div className="row">
                    <div className="col-lg-10">
                      <b>Leaves </b>
                    </div>
                    <div className="col-lg-2">
                      <select
                        value={filter}
                        onChange={(e) => {
                          this.loadList(page, limit, e.target.value);
                          this.setState({ filter: e.target.value });
                        }}
                        className="form-control"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Withdrawn">Withdrawn</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Forwarded">Forwarded</option>
                      </select>
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
                      userDetail={userDetail}
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

  loadList = (page: any, limit: any, sort: any = this.state.filter) => {
    this.setState({ showLoader: true });
    getPendingLeaveApplications(undefined, page, limit, sort)
      .then((res: any) => {
        console.log("res ", res);
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

    getPendingLeaveApplicationsCount(sort)
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
