import * as React from "react";
import * as moment from "moment";
import { Link } from "react-router-dom";
import ModalWindow from "../common/ModalWindow";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import {
  getFestivalStatusList,
  approveFastivalAdvance,
} from "../../action/FastivalAdvanceAction";
import ApprovalModal from "./ApprovalModal";

export default class FastivalList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalOpen: false,
      festivalStatusList: [],
      isPending: false,
      itemData: undefined,
    };
  }

  componentDidMount() {
    getFestivalStatusList()
      .then((res: any) => {
        if (res) {
          console.log("getFestivalStatusList  ", res);
          this.setState({
            festivalStatusList: res.result,
            showLoader: false,
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public render() {
    console.log("props fastivalList111 ", this.props.fastivalList);
    const { isModalOpen, festivalStatusList, itemData } = this.state;
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
        dataField: "userId",
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
        dataField: "amount",
        text: "Amount",
        align: "center",
      },
      {
        dataField: "remainingAmount",
        text: "Outstanding Amount",
        align: "center",
      },
      {
        dataField: "date",
        text: "Date",
        formatter: this.dateCellFormatter,
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
        dataField: "action",
        text: "Respond",
        isDummyField: true,
        formatter: this.actionCellFormatter,
        align: "center",
      },
    ];

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
                data={this.props.fastivalList}
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
            title={"Update Fastival Status"}
            backdrop="static"
            toggleModal={this.toggleModal}
          >
            <ApprovalModal
              isModalOpen={isModalOpen}
              dismissModal={this.dismissModal}
              onSubmit={this.onSubmit.bind(this)}
              festivalStatusList={festivalStatusList}
              item={itemData}
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
    return <span>{cell}</span>;
  };

  dateCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return moment(cell).format("YYYY-MM-DD");
  };

  statusCellFormatter = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
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
    if (this.props.history)
      return (
        <a
          href="#"
          onClick={(e: any) => {
            e.preventDefault();
            this.toggleModal(row, true);
          }}
        >
          <i className="fa fa-hand-pointer-o"></i>
        </a>
      );
    else
      return (
        <a
          href="#"
          onClick={(e: any) => {
            e.preventDefault();
            this.toggleModal(row, false);
          }}
        >
          <i className="fa fa-hand-pointer-o"></i>
        </a>
      );
  };

  toggleModal = (e: any, isWithdrawn: boolean) => {
    console.log("eeeee   ", e);
    if (e && e.status === "pending") {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
        selectedId: e.id,
        isWithdrawn,
        isPending: true,
        itemData: e,
      });
    }
    if (e) {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
        selectedId: e.id,
        itemData: e,
      });
    } else {
      this.setState({ isModalOpen: !this.state.isModalOpen });
    }
  };

  dismissModal = () => {
    this.setState({ isModalOpen: false });
  };

  onSubmit = (payload: any) => {
    payload.id = this.state.selectedId;
    console.log("payload  ", payload);
    approveFastivalAdvance(payload)
      .then((resp: any) => {
        this.setState({ isModalOpen: false });
        if (resp.result) {
          console.log("approve  ", resp);
          this.props.loadList(this.props.page, this.props.limit);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}
