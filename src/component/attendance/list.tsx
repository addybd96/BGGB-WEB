import * as React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import UpdateAttendanceModal from "./UpdateAttendanceModal";
import ApplyLeaveModal from "./ApplyLeaveModal";
import CONSTANT from "./../../constant";
import { updateAttendance } from "./../../action/AttendanceActions";
import { addLeave } from "./../../action/LeaveActions";

class AttendanceList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      updateModalVisible: false,
      LeaveModalVisible: false,
      selected: "",
    };
    this.formatTime = this.formatTime.bind(this);
  }

  actionCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return (
      <React.Fragment>
        {row.type == 1 || row.type == 5 || row.type == 6 ? (
          <a
            href="#"
            onClick={(e: any) => {
              e.preventDefault();
              this.toggleUpdateAttendanceModal(row);
            }}
          >
            <i className="fa fa-hand-pointer-o"></i>
          </a>
        ) : null}
      </React.Fragment>
    );
  };

  leaveActionCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return (
      <React.Fragment>
        <a
          href="#"
          onClick={(e: any) => {
            e.preventDefault();
            this.toggleLeaveModal(row);
          }}
        >
          <i className="fa fa-hand-pointer-o"></i>
        </a>
      </React.Fragment>
    );
  };

  public render() {
    const { isModalOpen, selected } = this.state;
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
        //formatter: this.empCodeCellFormatter,
        style: {
          fontSize: "14px",
        },
        headerStyle: {
          width: "150px",
        },
      },

      {
        dataField: "name",
        text: "Name",
        style: {
          fontSize: "14px",
        },
        headerStyle: {
          width: "450px",
        },
      },
      {
        dataField: "date",
        text: "Date",
        formatter: this.dateCellFormatter,
        style: {
          fontSize: "14px",
        },
        headerStyle: {
          width: "150px",
        },
      },
      {
        dataField: "aType",
        text: "Type",
        headerStyle: {
          width: "150px",
        },
        formatter: this.typeCellFormatter,
      },
      {
        dataField: "action",
        text: "Mark LOP",
        isDummyField: true,
        headerStyle: {
          width: "50px",
        },
        formatter: this.actionCellFormatter,
        align: "center",
      },
    ];

    let attendance = this.props.attendance;

    return (
      <React.Fragment>
        {attendance !== undefined && (
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
                  data={attendance.sort(
                    (a: any, b: any) =>
                      moment(b.inTime, "HH:mm:ss") -
                      moment(a.inTime, "HH:mm:ss")
                  )}
                  onTableChange={this.props.onTableChange}
                  {...paginationTableProps}
                />

                <div>
                  <PaginationListStandalone {...paginationProps} />
                </div>
              </React.Fragment>
            )}
          </PaginationProvider>
        )}
        {selected && (
          <UpdateAttendanceModal
            dismissModal={this.dismissModal}
            isModalOpen={this.state.updateModalVisible}
            toggleModal={this.toggleUpdateAttendanceModal}
            attendance={this.state.selected}
            onSubmitModal={this.onSubmitModal}
            date={this.props.date}
          />
        )}
        {selected && (
          <ApplyLeaveModal
            dismissModal={this.dismissModal}
            isModalOpen={this.state.LeaveModalVisible}
            toggleModal={this.toggleLeaveModal}
            attendance={this.state.selected}
            onSubmitModal={this.onSubmitLeaveModal}
          />
        )}
      </React.Fragment>
    );
  }

  renderAttendanceTable = () => {
    return this.props.attendance
      .sort(
        (a: any, b: any) =>
          moment(b.inTime, "HH:mm:ss") - moment(a.inTime, "HH:mm:ss")
      )
      .map((item: any, index: number) => {
        return (
          <tr key={index}>
            <td className="text-center">
              <Link to={`/attendance/${item.employeeId}`}>
                {item.employeeCode}
              </Link>
            </td>
            <td className="text-center">{item.fullName}</td>
            <td className="text-center">{this.formatTime(item.inTime)}</td>
            <td className="text-center">{this.formatTime(item.outTime)}</td>
            <td className="text-center">{item.source}</td>
            <td className="text-center">{item.ip}</td>
            <td className="text-center">
              {item.lat && item.lng ? (
                <a
                  target="blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`}
                >
                  {" "}
                  View Location{" "}
                </a>
              ) : (
                "NA"
              )}
            </td>
            <td className="text-center">{item.category}</td>
            {/* <th className="text-center"><a href="#"><i id={`emp_id_${index}`} className="fa fa-hand-pointer-o"></i><UncontrolledTooltip target={`emp_id_${index}`}>{item.remark}</UncontrolledTooltip></a></th> */}
          </tr>
        );
      });
  };

  toggleUpdateAttendanceModal = (item: any) => {
    this.setState({
      updateModalVisible: !this.state.updateModalVisible,
      selected: item,
    });
  };

  toggleLeaveModal = (item: any) => {
    this.setState({
      LeaveModalVisible: !this.state.LeaveModalVisible,
      selected: item,
    });
  };

  dismissModal = () => {
    this.setState({ updateModalVisible: false, LeaveModalVisible: false });
  };

  dateCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return moment(cell).format("YYYY-MM-DD");
  };

  empCodeCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return <Link to={`/attendance/${cell}`}>{cell}</Link>;
  };

  typeCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    if (row.leaveTypeId > 0) return row.leaveTypeName;
    return cell;
  };

  locationCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    if (row.lat && row.lng)
      return (
        <a
          target="blank"
          href={`https://www.google.com/maps/search/?api=1&query=${row.lat},${row.lng}`}
        >
          {" "}
          View Location{" "}
        </a>
      );
    else return "NA";
  };

  timeCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return this.formatTime(cell);
  };

  formatTime = (time: any) => {
    if (time) {
      return moment(time, "HH:mm:ss").format("HH:mm");
    }
  };

  onSubmitModal = (payload: any) => {
    console.log("payload  ", payload);
    updateAttendance(payload).then((resp: any) => {
      console.log("updateAttendance resp", resp);
      if (resp.result) {
        alert("Your Data has been saved Succesfully!");
        this.dismissModal();
        window.location.reload();
      } else {
        alert(resp.error.message);
      }
    });
  };

  onSubmitLeaveModal = (model: any) => {
    console.log("model  ", model);
    addLeave(model)
      .then((res: any) => {
        console.log("res  ", res);
        if (res.status === false) {
          alert(res.error);
        } else {
          //this.props.history.push(CONSTANT.url.leaveList);
          this.dismissModal();
          window.location.reload();
        }
      })
      .catch((err: any) => {
        console.log(err);
        alert(err);
      });
  };
}

export default AttendanceList;
