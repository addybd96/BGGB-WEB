import * as React from "react";
import * as moment from "moment";
import Loader from "../../component/common/Loader";
import ApprovalModal from "./ApprovalModal";
import { approveLeave } from "../../action/LeaveActions";
import { getLeaveStatusList } from "../../action/SettingsActions";
import { Link } from "react-router-dom";
import ModalWindow from "../../component/common/ModalWindow";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import CONSTANT from "./../../constant";
import { getCookie } from "../../utils";

export default class LeaveList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalOpen: false,
      leaveStatus: [],
      isWithdrawn: false,
      showLoader: false,
      isApprovingManager: false,
      selectedId: undefined,
      data: [],
      approvalPower: false,
    };
  }

  componentDidMount() {
    this.setState({ showLoader: true });
    getLeaveStatusList(1, 20)
      .then((res: any) => {
        if (res.result) {
          let ind = res.result.findIndex((item: any) => item.id == 5);
          if (ind > -1) res.result.splice(ind, 1);
          this.setState({
            leaveStatus: res.result,
            data: this.props.leaves,
            showLoader: false,
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public render() {
    const {
      isModalOpen,
      leaveStatus,
      isWithdrawn,
      showLoader,
      isApprovingManager,
      data,
      selectedId,

      approvalPower,
    } = this.state;
    const rowStyle = (row: any, rowIndex: any) => {
      if (rowIndex % 2 === 0) {
        return {
          backgroundColor: "#efefef",
        };
      }
      return {
        backgroundColor: "#ffffff",
      };
    };
    const columns = [
      {
        dataField: "employeeId",
        text: "Employee Code",
        align: "center",
        formatter: this.empCodeCellFormatter,
      },
      {
        dataField: "name",
        text: "Name",
        align: "center",
      },
      {
        dataField: "leaveTypeName",
        text: "Leave Type",
        align: "center",
      },
      {
        dataField: "fromDate",
        text: "From",
        formatter: this.dateCellFormatter,
        align: "center",
      },
      {
        dataField: "toDate",
        text: "To",
        formatter: this.dateCellFormatter,
        align: "center",
      },
      {
        dataField: "dayType",
        text: "Day Type",
        align: "center",
      },
      {
        dataField: "address",
        text: "Address",
        align: "center",
      },
      {
        dataField: "reason",
        text: "Reason",
        align: "center",
      },
      {
        dataField: "status",
        text: "Status",
        formatter: this.statusCellFormatter,
        align: "center",
        style: { width: "150px" },
      },
      {
        text: "Download",
        isDummyField: true,
        formatter: this.getMericalCertificate,
        align: "center",
      },
      {
        dataField: "action",
        text: this.props.history ? "Withdraw" : "Respond",
        isDummyField: true,
        formatter: this.actionCellFormatter,
        align: "center",
      },
    ];

    if (showLoader) return <Loader />;
    return (
      <React.Fragment>
        <PaginationProvider
          pagination={paginationFactory({
            custom: true,
            page: this.props.page,
            sizePerPage: this.props.limit,
            totalSize: this.props.count,
            showTotal: true,
            pageStartIndex: 1,
            firstPageText: "First",
            prePageText: "Back",
            nextPageText: "Next",
            lastPageText: "Last",
            nextPageTitle: "First page",
            prePageTitle: "Pre page",
            firstPageTitle: "Next page",
            lastPageTitle: "Last page",
            withFirstAndLast: true,
            alwaysShowAllBtns: true,
          })}
        >
          {({ paginationProps, paginationTableProps }: any) => (
            <React.Fragment>
              <BootstrapTable
                remote
                keyField="id"
                rowStyle={rowStyle}
                columns={columns}
                data={this.props.leaves}
                onTableChange={this.props.onTableChange}
                {...paginationTableProps}
              />

              <div>
                <PaginationListStandalone {...paginationProps} />
              </div>
            </React.Fragment>
          )}
        </PaginationProvider>
        {this.state.isModalOpen ? (
          <ModalWindow
            title={isWithdrawn ? "Withdraw Leave" : "Update Leave Status"}
            backdrop="static"
            toggleModal={this.toggleModal}
          >
            <ApprovalModal
              isModalOpen={isModalOpen}
              dismissModal={this.dismissModal}
              onSubmit={this.onSubmit.bind(this)}
              leaveStatus={leaveStatus}
              isWithdrawn={isWithdrawn}
              isApprovingManager={isApprovingManager}
              isValidate={data}
              selectedId={selectedId}
              approvalPower={approvalPower}
            />
          </ModalWindow>
        ) : null}
      </React.Fragment>
    );
  }

  empCodeCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return <Link to={`/emp-leaves/${cell}`}>{cell}</Link>;
  };

  dateCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return moment(cell).format("DD-MM-YYYY");
  };

  statusCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    if (row.status)
      return (
        <span
          className={
            (row.status.toLowerCase() === "pending" ||
            row.status.toLowerCase() === "forwarded"
              ? "pending-leave"
              : row.status.toLowerCase() === "rejected"
              ? "rejected-leave"
              : "approved-leave ") + " text-capitalize"
          }
          style={{ width: "80px" }}
        >
          {row.status}
        </span>
      );
  };

  actionCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    if (this.props.history) {
      if (
        ((row.leaveType == 3 || row.leaveType == 5) &&
          row.status === "Approved") ||
        row.status === "Rejected" ||
        row.status === "Withdrawn"
      ) {
        return null;
      }
      if (row.status === "Approved") {
        return (
          <></>
          // <a
          //   href="#"
          //   onClick={(e: any) => {
          //     e.preventDefault();
          //     this.toggleModal(row.id, true, false);
          //   }}
          // >
          //   Raise Request
          // </a>
        );
      }

      if (row.status === "Pending" || row.status === "Forwarded") {
        return (
          <a
            href="#"
            onClick={(e: any) => {
              e.preventDefault();
              this.toggleModal(row.id, true, false);
            }}
          >
            <i className="fa fa-hand-pointer-o"></i>
          </a>
        );
      }
      if (row.status === "Withdraw Requested") {
        return <span>Request Raised Sucessfully</span>;
      }
      if (row.status === "Withdraw Approved") {
        return <span>Request Approved Sucessfully</span>;
      }
      if (row.status === "Withdraw Rejected") {
        return <span>Request Rejected Sucessfully</span>;
      }
    } else {
      if (
        row.status === "Pending" ||
        (row.status === "Forwarded" &&
          row.forwardToId == getCookie(CONSTANT.cookie.userDetail).id)
      ) {
        return (
          <a
            href="#"
            onClick={(e: any) => {
              this.setState({ approvalPower: row.approvalPower });
              e.preventDefault();
              this.toggleModal(
                row.id,
                false,
                this.props.userDetail.id == row.forwardToId
              );
            }}
          >
            <i className="fa fa-hand-pointer-o"></i>
          </a>
        );
      } else return <></>;
    }
  };

  getMericalCertificate = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    const detailPageURL = `${process.env.REACT_APP_BASE_URL}${CONSTANT.url.medicalCertificate}${row.userId}/${row.medicalCert}`;
    return (
      <React.Fragment>
        {row.medicalCert ? (
          <a
            href={detailPageURL}
            onClick={(e) => {
              e.preventDefault();
              this.downloadResource(detailPageURL, row.medicalCert);
            }}
            target="_blank"
          >
            <i className="fa fa-hand-pointer-o"></i>
          </a>
        ) : null}
      </React.Fragment>
    );
  };

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

  toggleModal = (e: any, isWithdrawn: boolean, isApprovingManager: boolean) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      selectedId: e,
      isWithdrawn,
      isApprovingManager,
    });
  };

  dismissModal = () => {
    this.setState({ isModalOpen: false, isWithdrawn: false });
  };

  onSubmit = (payload: any) => {
    payload.id = this.state.selectedId;
    if (this.props.history) {
      payload.statusId = 5;
    }
    this.setState({ isModalOpen: false, showLoader: true });
    approveLeave(payload)
      .then((resp: any) => {
        if (resp.error) {
          alert(resp.error.message);
        }
        this.setState({ isModalOpen: false });
        this.props.loadList(this.props.page, this.props.limit);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}
