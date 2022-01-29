import * as React from "react";
import moment from "moment";
import Shimmer from "../../component/common/Shimmer";
import { getLeaves } from "../../action/LeaveActions";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: undefined,
    };
  }

  componentDidMount() {
    getLeaves(1, 3).then((res: any) => {
      if (res.result !== null) {
        this.setState({ list: res.result });
      }
    });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="card emp-leave-details text-left">
        <div className="card-header">Leaves</div>
        <div className="card-body">
          {list === undefined && <Shimmer />}
          {list !== undefined && list.length === 0 && (
            <div className="text-center mt-5">
              <i className="fa fa-3x fa-heartbeat"></i>
              <br />
              <small>No records found</small>
            </div>
          )}
          {list !== undefined &&
            list.map((item: any, key: number) => {
              return (
                <div className="row" key={key}>
                  <div className="col-6 col-lg-6 leave-date">
                    <p className="mb-0">{item.reason}</p>
                    <span>
                      {moment(item.fromDate).format("DD-MMM-YYYY")} -{" "}
                      {moment(item.toDate).format("DD-MMM-YYYY")}
                    </span>
                  </div>
                  <div className="col-6 col-lg-6 leave-status text-right">
                    <span className={`${item.status} text-capitalize`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default ComponentName;
