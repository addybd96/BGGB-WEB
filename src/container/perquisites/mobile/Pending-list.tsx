import * as React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import CONSTANT from "../../../constant";
import Loader from "../../../component/common/Loader";
import Header from "../../../component/common/Header";
import Sidebar from "../../../component/common/Sidebar";
import { onChange, textTransform } from "../../../utils";
import { getMobileAlne } from "../../../action/MobileAction";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: undefined,
      showLoader: false,
      status: { name: "status", value: "", error: "", isRequired: true },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
    this.loadData();
  }

  public render() {
    const { list, status, showLoader } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11">
              <div className="card mt-3">
                <div className="card-header">
                  <div className="float-right">
                  <select
                      onChange={this.onChange}
                      className={
                        status.error.length > 0
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name={status.name}
                      value={status.value}
                    >
                      <option value="">All</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="reject">Reject</option>
                    </select>
                  </div>
                  <div className="float-left">
                    <b>Mobile Allowance Pending</b>
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
                            Employee Name{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Amount{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Actual Amount{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Month{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Status{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Download{" "}
                          </th>
                          <th className="text-center" scope="col">
                            {" "}
                            Action{" "}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {list === undefined && (
                          <tr>
                            <td className="text-center" colSpan={7}>
                              Loading...
                            </td>
                          </tr>
                        )}
                        {list !== undefined && list.length === 0 && (
                          <tr>
                            <td className="text-center" colSpan={7}>
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
                                <td className="text-center"> {l.name} </td>
                                <td className="text-center"> {l.amount} </td>
                                <td className="text-center">
                                  {" "}
                                  {l.actualAmount}{" "}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {moment(l.date).format("MMM Do YYYY")}{" "}
                                </td>
                                <td
                                  className={`text-center ${l.status ==
                                    "pending" && "text-warning"} ${l.status ==
                                    "reject" && "text-danger"} ${l.status ==
                                    "approved" && "text-success"} `}
                                >
                                  {textTransform(l.status)}
                                </td>
                                <td className="text-center">
                                  <a
                                    href={`${process.env.REACT_APP_BASE_URL}${CONSTANT.url.perquisites.mobileAllowanceFile}${l.userId}/${l.imgUrl}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      this.downloadResource(
                                        `${process.env.REACT_APP_BASE_URL}${CONSTANT.url.perquisites.mobileAllowanceFile}${l.userId}/${l.imgUrl}`,
                                        l.imgUrl
                                      );
                                    }}
                                    target="_blank"
                                  >
                                    <i className="fa fa-hand-pointer-o"></i>
                                  </a>
                                </td>
                                {
                                  l.showAction &&
                                  <td className="text-center">
                                  <Link
                                    to={CONSTANT.url.perquisites.mobileApproveAllowance.replace(
                                      ":id",
                                      l.id
                                    )}
                                  >
                                    <i
                                      className="fa fa-hand-pointer-o"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </td>
                                }
                               
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

  downloadResource = (url: any, filename: any) => {
    if (!filename)
      filename = url
        .split("\\")
        .pop()
        .split("/")
        .pop();
    fetch(url, {
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        this.forceDownload(blobUrl, filename);
      })
      .catch((e) => console.error(e));
  };

  forceDownload = (blob: any, filename: any) => {
    var a = document.createElement("a");
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    onChange(this, name, value, () => {
      this.loadData(value);
    });
  };

  loadData = (status?: any) => {
    this.setState({ showLoader: true });
    getMobileAlne({ status }).then((res: any) => {
      this.setState({ showLoader: false });
      if (res) this.setState({ list: res ? res : [] });
    });
  };
}

export default ComponentName;
