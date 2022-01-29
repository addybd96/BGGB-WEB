import * as React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import CONSTANT from "../../../constant";
import { onChange } from "../../../utils";
import Loader from "../../../component/common/Loader";
import Header from "../../../component/common/Header";
import Sidebar from "../../../component/common/Sidebar";
import {
  getLeaveApprovalConfigList,
  getPaymentConfigList,
} from "../../../action/SettingsActions";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: undefined,
      showLoader: false,
      date: { name: "date", value: "", error: "", isRequired: true },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
    this.loadData();
  }

  public render() {
    const { list, date, showLoader } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11">
              <div className="row mt-3">
                <div className="col-lg-12">
                  <h5 className="heading-h1">Approval Config</h5>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-header">
                  <div className="float-right">
                    <Link to={CONSTANT.url.settingsOption.addPaymentApproval}>
                      Add new Approval
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="text-center" scope="col">
                            {" "}
                            S. NO.{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Allowance Type{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            GL Head{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Remarks{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Edit{" "}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {list === undefined && (
                          <tr>
                            <td className="text-center" colSpan={10}>
                              Loading...
                            </td>
                          </tr>
                        )}
                        {list !== undefined && list.length === 0 && (
                          <tr>
                            <td className="text-center" colSpan={10}>
                              No records found
                            </td>
                          </tr>
                        )}
                        {list !== undefined &&
                          list.length > 0 &&
                          list.map((l: any, i: any) => {
                            return (
                              <tr key={i}>
                                <td className="text-center"> {i + 1} </td>
                                <td className="text-center">
                                  {" "}
                                  {l.allowanceType}{" "}
                                </td>
                                <td className="text-center"> {l.glHead} </td>
                                <td className="text-center"> {l.remarks} </td>

                                <th className="text-center">
                                  <Link
                                    to={CONSTANT.url.settingsOption.editPaymentApproval.replace(
                                      ":id",
                                      l.id
                                    )}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </Link>
                                </th>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showLoader && <Loader />}
      </React.Fragment>
    );
  }
  onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    onChange(this, name, value, () => {
      //this.loadData()
    });
  };

  loadData = () => {
    this.setState({ showLoader: true });
    getPaymentConfigList().then((res: any) => {
      this.setState({ showLoader: false });
      if (res) this.setState({ list: res ? res : [] });
    });
  };
}

export default ComponentName;
