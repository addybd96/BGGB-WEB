import * as React from "react";
import { Link } from "react-router-dom";
import CONSTANT from "../../constant";

import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import Loader from "../../component/common/Loader";
import WFHList from "../../component/wfh/List";

import { getAllWFH, getAllWFHCount } from "../../action/WFHActions";

class ListLeave extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      wfh: [],
      showLoader: true,
      page: 1,
      limit: 20,
    };

    this.onTableChange = this.onTableChange.bind(this)
    this.loadList = this.loadList.bind(this)
  }
  componentDidMount() {
    this.loadList(this.state.page, this.state.limit);
  }
  public render() {
    const { wfh, showLoader, page, limit, count } = this.state;
    
    return showLoader ? <Loader /> : (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11 my-3">
              <div className="col-lg-12 mt-1">
                <div className="row">
                  <div className="col-lg-6 pl-0">
                  </div>
                  <div className="col-lg-6 text-right pr-0">
                  </div>
                </div>
              </div>

              <div className="card mt-2">
                <div className="card-header">
                  <div className="row">
                    <div className="col-lg-12">
                      <b>Work From Home Requests</b>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <WFHList wfh={wfh} loadList={this.loadList.bind(this)} count={count} page={page} limit={limit} onTableChange={this.onTableChange} />
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
    this.loadList(page, sizePerPage)
  }

  loadList = (page:any, limit:any) => {
    this.setState({ showLoader: true });
    getAllWFH(undefined, page, limit)
      .then((res: any) => {
        if (res) {
          this.setState({
            wfh: res.result,
            page, limit
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });

      getAllWFHCount()
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
