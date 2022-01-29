import * as React from "react";

import Loader from "../../component/common/Loader";
import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import AddLeaveBalance from "../../component/employee-master/AddLeaveBalance";
import EditLeaveBalanceModal from "../../component/employee-master/EditLeaveBalanceModal";
import ModalWindow from "../../component/common/ModalWindow";
import ProgressBar from "../../component/employee-master/ProgressBar";
import { getLeaveTypeList } from "./../../action/SettingsActions";
import { onChange } from "../../utils";

import {
  updateLeaveBalance,
  getLeaveBalanceDetail,
  deleteLeaveBalance,
  leaveBalanceTransaction,
  getLeaveLogs,
} from "./../../action/EmployeeAction";
import { getCookie } from "../../utils";
import CONSTANT from "./../../constant";

class EmployeeDocument extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showLoader: false,
      userId: props.match.params.id,
      list: undefined,
      page: 1,
      limit: 20,
      showModal: false,
      detail: undefined,
      userType: undefined,
      showEditModal: false,
      leaveLogs: [],
      leaveTypeId: {
        value: "",
        name: "leaveTypeId",
        error: "",
        isRequired: true,
        options: [],
      },
    };
  }

  componentDidMount() {
    const userDetail = getCookie(CONSTANT.cookie.userDetail);
    this.setState({ userType: userDetail.userType });
    this.loadList();
  }

  public render() {
    const {
      showLoader,
      showModal,
      userId,
      list,
      detail,
      userType,
      showEditModal,
      leaveTypeId,
      leaveLogs
    } = this.state;
    let usedTypes = list && list.map((item: any) => item.leaveTypeId);
    return (
      <React.Fragment>
        <Header />
        {showLoader && <Loader />}
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11 my-3">
              <div className="col-lg-12  employee-tab mt-2 mb-3">
                <ProgressBar userId={userId} />
              </div>
              <div className="card">
                <div className="card-header">
                  Leave Details
                  {userType === "sadmin" || userType === "radmin" ? (
                    <a
                      className="btn btn-primary btn-sm btn-sm float-right"
                      href="javascript:void"
                      onClick={this.showModal}
                    >
                      <i className="fas fa-plus-circle mr-1"></i>Add leave
                      balance
                    </a>
                  ) : null}
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Leave type</th>
                          <th scope="col">Balance</th>
                          <th scope="col">Year</th>
                          {userType === "sadmin" || userType === "radmin" ? (
                            <th scope="col">Edit</th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                        {list === undefined && (
                          <tr>
                            <td className="text-center" colSpan={5}>
                              Loading...
                            </td>
                          </tr>
                        )}
                        {list !== undefined && list.length === 0 && (
                          <tr>
                            <td className="text-center" colSpan={5}>
                              No records found
                            </td>
                          </tr>
                        )}
                        {list !== undefined &&
                          list.map((item: any, index: number) => {
                            return (
                              <tr key={index}>
                                <td>{item.leaveTypeName}</td>
                                <td>{item.balance}</td>
                                <td>{item.year}</td>
                                {userType === "sadmin" ||
                                userType === "radmin" ? (
                                  <th scope="col">
                                    <a
                                      href="javascript:void;"
                                      onClick={this.onEdit}
                                      data-id={item.id}
                                    >
                                      <i className="fas fa-edit pe-none"></i>
                                    </a>
                                  </th>
                                ) : null}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card mt-5">
                <div className="card-header row">
                  <div className="col-md-9">Leave Logs</div>
                  <div className="col-md-3">
                    <select
                      name={leaveTypeId.name}
                      onChange={this.onChange}
                      className={
                        leaveTypeId.error.length > 0
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={leaveTypeId.value}
                    >
                      <option value="">Select leave type</option>
                      {leaveTypeId.options.map((item: any, index: any) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Description</th>
                          <th scope="col">Type</th>
                          <th scope="col">Value</th>
                          {userType === "sadmin" || userType === "radmin" ? (
                            <th scope="col">Balance</th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                        {leaveLogs === undefined && (
                          <tr>
                            <td className="text-center" colSpan={5}>
                              Loading...
                            </td>
                          </tr>
                        )}
                        {leaveLogs !== undefined && leaveLogs.length === 0 && (
                          <tr>
                            <td className="text-center" colSpan={5}>
                              No records found
                            </td>
                          </tr>
                        )}
                        {leaveLogs !== undefined &&
                          leaveLogs.map((item: any, index: number) => {
                            return (
                              <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.type}</td>
                                <td>{item.value}</td>
                                <td>{item.balance}</td>
                                
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
        {showModal && (
          <ModalWindow
            title="Leave balance detail"
            backdrop="static"
            toggleModal={this.onCancel}
          >
            <AddLeaveBalance
              userId={userId}
              detail={detail}
              usedTypes={usedTypes}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
              onDelete={this.onDelete}
            />
          </ModalWindow>
        )}
        {showEditModal && (
          <ModalWindow
            title="Leave balance detail"
            backdrop="static"
            toggleModal={this.onCancel}
          >
            <EditLeaveBalanceModal
              userId={userId}
              detail={detail}
              usedTypes={usedTypes}
              onSubmit={this.onSubmitTransaction}
              onCancel={this.showEditModal}
              // onDelete={this.onDelete}
            />
          </ModalWindow>
        )}
      </React.Fragment>
    );
  }

  onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    onChange(this, name, value, () => {
      this.getLogs();
    });
  };

  loadList = () => {
    const { userId, page, limit } = this.state;
    this.setState({ showLoader: true });
    getLeaveBalanceDetail(userId, page, limit).then((res: any) => {
      this.setState({ list: res.result, showLoader: false });
    });
    getLeaveTypeList(1, 100).then((res: any) => {
      this.setState(
        {
          leaveTypeId: {
            ...this.state.leaveTypeId,
            options: res.result,
            value: res.result[0].id,
          },
        },
        () => {
          getLeaveLogs(this.state.userId, this.state.leaveTypeId.value).then(
            (res: any) => {
              if (res.result)
                this.setState({ leaveLogs: res.result, showLoader: false });
            }
          );
        }
      );
      //setOptions(this, this.state.leaveTypeId.name, res.result);
    });
  };

  getLogs = () => {
    this.setState({ showLoader: true }, () => {
      getLeaveLogs(this.state.userId, this.state.leaveTypeId.value).then(
        (res: any) => {
          if (res.result)
            this.setState({ leaveLogs: res.result, showLoader: false });
        }
      );
    });
  };

  onSubmit = (e: any) => {
    this.setState({ showLoader: true }, () => {
      updateLeaveBalance(e).then(
        (response: any) => {
          this.onCancel();
          this.loadList();
        },
        (error: any) => {
          alert(error.message);
        }
      );
    });
  };

  showEditModal = () => {
    this.setState({ showEditModal: !this.state.showEditModal });
  };

  showModal = () => {
    this.setState({ showModal: true, detail: null });
  };

  onCancel = () => {
    this.setState({ showModal: false });
  };

  onSubmitTransaction = (e: any) => {
    console.log("leavem", e);

    this.setState({ showLoader: true }, () => {
      leaveBalanceTransaction(e).then(
        (response: any) => {
          this.showEditModal();
          this.loadList();
        },
        (error: any) => {
          alert(error.message);
        }
      );
    });
  };

  onEdit = (e: any) => {
    const id = parseInt(e.target.dataset.id, 10);
    const detail = this.state.list.filter((i: any) => i.id === id)[0];
    this.setState({ showEditModal: true, detail });
  };

  onDelete = (id: number) => {
    // const id = parseInt(e.target.dataset.id, 10);
    this.setState({ showLoader: true });
    deleteLeaveBalance(id).then((res: any) => {
      this.setState({ showModal: false, showLoader: false });
      this.loadList();
    });
  };
}

export default EmployeeDocument;
