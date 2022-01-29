import moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

import CONSTANT from "../../../constant";
import Loader from "../../../component/common/Loader";
import Header from "../../../component/common/Header";
import Sidebar from "../../../component/common/Sidebar";
import { onChange } from "../../../utils";
import {
  approve,
  getTadaAlneById,
  hr_recommendation_approve,
} from "../../../action/PerqTadaAllowanceAction";
import { getAllowanceNameById } from "../../../action/SettingsActions";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      tada: [],
      id: undefined,
      Status: undefined,
      farePaid: { name: "farePaid", value: "", error: "", isRequired: true },
      totalTada: { name: "totalTada", value: "", error: "", isRequired: true },
      autoRixaExpense: {
        name: "autoRixaExpense",
        value: "",
        error: "",
        isRequired: true,
      },
      hotelAmountPaidPerDay: {
        name: "hotelAmountPaidPerDay",
        value: "",
        error: "",
        isRequired: true,
      },
      totalAmount: {
        name: "totalAmount",
        value: "",
        error: "",
        isRequired: true,
      },
      status: { name: "status", value: "", error: "", isRequired: true },
      purpose: { name: "purpose", value: "", error: "", isRequired: true },
      date: {
        name: "date",
        value: new Date().toISOString().split("T")[0],
        error: "",
        isRequired: true,
      },
      remarks: { name: "remarks", value: "", error: "", isRequired: true },
      hr_remarks: {
        name: "hr_remarks",
        value: "",
        error: "",
        isRequired: true,
      },
      hr_recommend: {
        name: "hr_recommend",
        value: "",
        error: "",
        isRequired: true,
      },
      showLoader: false,
      approvalStatus: false,
      allowanceName: "TaDa",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
    this.loadData();
  }

  public render() {
    const {
      showLoader,
      Status,
      tada,
      totalTada,
      farePaid,
      hr_remarks,
      hr_recommend,
      autoRixaExpense,
      hotelAmountPaidPerDay,
      remarks,
      purpose,
      date,
      status,
      totalAmount,
      approvalStatus,
    } = this.state;
    console.log(hr_recommend, hr_remarks, "data");

    return (
      <React.Fragment>
        <Header />
        <div className="fluid-container px-0">
          <div className="row">
            <Sidebar />
            <div className="col-lg-11">
              <form onSubmit={this.onSubmit}>
                <div className="col-lg-12 mt-4">
                  <div className="row">
                    <div className="col-lg-12 pl-0">
                      {/* <h5 className="heading-h1">Add Vehicle Information</h5> */}
                    </div>
                  </div>
                </div>

                {tada.map((e: any, i: number) => {
                  return (
                    <div className="card mt-2">
                      <div className="card-header">
                        {i == 0 && <b>Approve Tada </b>}
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div
                            className="col-lg-12 mb-2"
                            style={{
                              borderTop: "1px dotted black;",
                              marginTop: "25px;",
                            }}
                          >
                            <div className="row">
                              <div className="col-lg-3 form-group">
                                <label>Place of Departure </label>
                                <input
                                  disabled
                                  type="text"
                                  className="form-control"
                                  name={e.departurePalace.name}
                                  value={e.departurePalace.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label>Category of Departure place</label>
                                <select
                                  disabled
                                  className="form-control"
                                  name={e.departureCategory.name}
                                  value={e.departureCategory.value}
                                >
                                  <option value="">--Select--</option>
                                  <option value="1">Rural</option>
                                  <option value="2">Area1</option>
                                </select>
                              </div>

                              <div className="col-lg-3 form-group">
                                <label>Date of Departure</label>
                                <input
                                  disabled
                                  type="date"
                                  className="form-control"
                                  name={e.departureDate.name}
                                  value={e.departureDate.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label>Time Of Departure</label>
                                <input
                                  disabled
                                  type="time"
                                  className="form-control"
                                  name={e.departureTime.name}
                                  value={e.departureTime.value}
                                />
                              </div>

                              <div className="col-lg-3 form-group">
                                <label>Place of Arrival </label>
                                <input
                                  disabled
                                  type="text"
                                  className="form-control"
                                  name={e.arrivalPalace.name}
                                  value={e.arrivalPalace.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label>Category of Arrival place</label>
                                <select
                                  disabled
                                  className="form-control"
                                  name={e.arrivalCategory.name}
                                  value={e.arrivalCategory.value}
                                >
                                  <option value="">--Select--</option>
                                  <option value="1">Rural</option>
                                  <option value="2">Area1</option>
                                </select>
                              </div>

                              <div className="col-lg-3 form-group">
                                <label>Date of Arrival</label>
                                <input
                                  disabled
                                  type="date"
                                  className="form-control"
                                  name={e.arrivalDate.name}
                                  value={e.arrivalDate.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label>Time Of Arrival</label>
                                <input
                                  disabled
                                  type="time"
                                  className="form-control"
                                  name={e.arrivalTime.name}
                                  value={e.arrivalTime.value}
                                />
                              </div>

                              <div className="col-lg-3 form-group">
                                <label>Travel by mode</label>
                                <select
                                  disabled
                                  className="form-control"
                                  name={e.travelBy.name}
                                  value={e.travelBy.value}
                                >
                                  <option value="">--Select--</option>
                                  <option value="1">Air</option>
                                  <option value="2">Bus</option>
                                  <option value="3">Train </option>
                                  <option value="4">Private Vehicle</option>
                                </select>
                              </div>

                              <div className="col-lg-3 form-group">
                                <label>
                                  Is hotel facility availed (Yes, No)
                                </label>
                                <select
                                  disabled
                                  className="form-control"
                                  name={e.isHotelFacilityAvailed.name}
                                  value={e.isHotelFacilityAvailed.value}
                                >
                                  <option value="">--Select--</option>
                                  <option value="true">YES</option>
                                  <option value="false">No</option>
                                </select>
                              </div>

                              <div className="col-lg-3 form-group">
                                <label> Kilometers</label>
                                <NumberFormat
                                  disabled
                                  className={
                                    e.km.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.km.name}
                                  value={e.km.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label> Tada</label>
                                <NumberFormat
                                  disabled
                                  className={
                                    e.tada.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.tada.name}
                                  value={e.tada.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label> Fare Paid</label>
                                <NumberFormat
                                  disabled
                                  className={
                                    e.farePaid.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.farePaid.name}
                                  value={e.farePaid.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label> Auto rixa expense</label>
                                <NumberFormat
                                  disabled
                                  className={
                                    e.autoRixaExpense.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.autoRixaExpense.name}
                                  value={e.autoRixaExpense.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label>Hotel Amount Paid Per day</label>
                                <NumberFormat
                                  disabled
                                  className={
                                    e.hotelAmountPaidPerDay.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.hotelAmountPaidPerDay.name}
                                  value={e.hotelAmountPaidPerDay.value}
                                />
                              </div>

                              <div className="row">
                                <div className="col-lg-6 mb-2"></div>
                                <div className="col-lg-6 mb-2">
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}/userTada/${e.imgUrl}`}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="card mt-2">
                  <div className="card-header"> </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-3 form-group">
                            <label>Total Tada</label>
                            <NumberFormat
                              disabled
                              className={
                                totalTada.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={totalTada.name}
                              value={totalTada.value}
                            />
                          </div>
                          <div className="col-lg-3 form-group">
                            <label>Total Fare Paid</label>
                            <NumberFormat
                              disabled
                              className={
                                farePaid.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={farePaid.name}
                              value={farePaid.value}
                            />
                          </div>
                          <div className="col-lg-3 form-group">
                            <label>Total Auto rixa expense</label>
                            <NumberFormat
                              disabled
                              className={
                                autoRixaExpense.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={autoRixaExpense.name}
                              value={autoRixaExpense.value}
                            />
                          </div>

                          <div className="col-lg-3 form-group">
                            <label>Total Hotel Amount Paid Per day</label>
                            <NumberFormat
                              disabled
                              className={
                                hotelAmountPaidPerDay.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={hotelAmountPaidPerDay.name}
                              value={hotelAmountPaidPerDay.value}
                            />
                          </div>
                          <div className="col-lg-3 form-group">
                            <label> Apply Date</label>
                            <input
                              disabled
                              type="date"
                              className={
                                date.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={date.name}
                              value={date.value}
                            />
                          </div>
                          <div className="col-lg-3 form-group">
                            <label>Total Amount</label>
                            <NumberFormat
                              disabled
                              className={
                                totalAmount.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={totalAmount.name}
                              value={totalAmount.value}
                            />
                          </div>
                          <div className="col-lg-6 form-group">
                            <label>Reason</label>
                            <textarea
                              disabled
                              cols={10}
                              rows={5}
                              name={purpose.name}
                              value={purpose.value}
                              className={
                                purpose.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12 mb-2">
                          <div className="row">
                            <div className="col-lg-6 form-group">
                              <label>Recommendation Status</label>
                              <select
                                onChange={this._onChange}
                                className="form-control"
                                name={hr_recommend.name}
                                value={hr_recommend.value}
                              >
                                <option value="">Please select</option>
                                <option value="true">Recommend</option>
                                <option value="false">Not Recommend</option>
                              </select>
                            </div>
                            <div className="col-lg-6 form-group">
                              <label>HR Remarks</label>
                              <input
                                type="text"
                                onChange={this._onChange}
                                className="form-control"
                                name={hr_remarks.name}
                                value={hr_remarks.value}
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-lg-6 form-group">
                          <label>Remarks</label>
                          <input
                            disabled={
                              Status == "pending" || Status == "forward"
                                ? false
                                : true
                            }
                            type="text"
                            onChange={this._onChange}
                            className={
                              remarks.error.length > 0 &&
                              status.value === "reject"
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            name={remarks.name}
                            value={remarks.value}
                          />
                        </div> */}
                        {!showLoader &&
                          (Status == "pending" || Status == "forward") && (
                            <div className="col-lg-12 ">
                              <Link
                                to={
                                    CONSTANT.url.perquisites.tadaAllowanceRecommendation
                                }
                                className="col-lg-2 btn primary-control pull-left"
                              >
                                Cancel
                              </Link>
                              <button
                                type="submit"
                                className="col-lg-2 btn primary-control pull-right"
                              >
                                Submit
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showLoader && <Loader />}
      </React.Fragment>
    );
  }

  _onChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: { ...this.state[name], value: value, error: "" } });
  };

  loadData = () => {
    const { id } = this.props.match.params;
    this.setState({ showLoader: true });
    const { allowanceName } = this.state;
    getTadaAlneById({ id: id }).then((response: any) => {
      if (response) {
        const tada = response.list.map((res: any) => {
          return {
            id: res.id,
            userId: res.userId,
            imgUrl: res.imgUrl,
            groupId: res.groupId,
            name: { name: "name", value: res.name },
            departureCategory: {
              name: "departureCategory",
              value: res.departureCategory,
            },
            departurePalace: {
              name: "departurePalace",
              value: res.departurePalace,
            },
            departureDate: {
              name: "departureDate",
              value: moment(res.departureDate).format("YYYY-MM-DD"),
            },
            departureTime: {
              name: "departureTime",
              value: moment(res.departureTime, "HH:mm").format("hh:mm"),
            },
            arrivalDate: {
              name: "arrivalDate",
              value: moment(res.arrivalDate).format("YYYY-MM-DD"),
            },
            arrivalTime: {
              name: "arrivalTime",
              value: moment(res.arrivalTime, "HH:mm").format("hh:mm"),
            },
            arrivalPalace: { name: "arrivalPalace", value: res.arrivalPalace },
            arrivalCategory: {
              name: "arrivalCategory",
              value: res.arrivalCategory,
            },
            travelBy: { name: "travelBy", value: res.travelBy },
            // km: { name: "km", value: res.farePaid, error: '', isRequired: true },
            // tada: { name: "tada", value: res.farePaid, error: '', isRequired: true },
            km: { name: "km", value: res.km, error: "", isRequired: true },
            tada: {
              name: "tada",
              value: res.tada,
              error: "",
              isRequired: true,
            },
            farePaid: {
              name: "farePaid",
              value: res.farePaid,
              error: "",
              isRequired: true,
            },
            autoRixaExpense: {
              name: "autoRixaExpense",
              value: res.autoRixaExpense,
              error: "",
              isRequired: true,
            },
            isHotelFacilityAvailed: {
              name: "isHotelFacilityAvailed",
              value: res.isHotelFacilityAvailed,
            },
            hotelAmountPaidPerDay: {
              name: "hotelAmountPaidPerDay",
              value: res.hotelAmountPaidPerDay,
              error: "",
              isRequired: res.isHotelFacilityAvailed ? true : false,
            },
          };
        });
        this.setState({
          tada,
          id: response.id,
          userId: response.userId,
          Status: response.status,
          farePaid: { name: "farePaid", value: response.farePaid, error: "" },
          totalTada: {
            name: "totalTada",
            value: response.totalTada,
            error: "",
          },
          autoRixaExpense: {
            name: "autoRixaExpense",
            value: response.autoRixaExpense,
            error: "",
          },
          hotelAmountPaidPerDay: {
            name: "hotelAmountPaidPerDay",
            value: response.hotelAmountPaidPerDay,
            error: "",
          },
          totalAmount: {
            name: "totalAmount",
            value: response.totalAmount,
            error: "",
            isRequired: true,
          },
          purpose: { name: "purpose", value: response.purpose, error: "" },
          date: {
            name: "date",
            value: moment(response.date).format("YYYY-MM-DD"),
            error: "",
          },
          status: {
            name: "status",
            value: response.status,
            error: "",
            isRequired: true,
          },
          hr_remarks: {
            name: "hr_remarks",
            value: response.hrRemarks,
            error: "",
          },
          hr_recommend: {
            name: "hr_recommend",
            value: response.isHrRecommended,
            error: "",
          },
          showLoader: false,
        });
        getAllowanceNameById(response.userId, allowanceName).then(
          (res: any) => {
            if (res)
              this.setState({
                showLoader: false,
                approvalStatus: res.approvalStatus,
              });
          }
        );
      }
    });
  };

  private onSubmit = (e: any) => {
    e.preventDefault();
   
    // let isStatus=this.validateForm()
    if (this.state.hr_recommend.value && this.state.hr_remarks.value.length>0) {
      this.setState({ showLoader: true });
      const model = {
        id: this.state.id,
        status:this.state.Status,
        isHrRecommended: this.state.hr_recommend.value,
        hrRemarks: this.state.hr_remarks.value,
        farePaid: this.state.farePaid.value,
        autoRixaExpense: this.state.autoRixaExpense.value,
        hotelAmountPaidPerDay:
          this.state.isHotelFacilityAvailed === "true"
            ? this.state.hotelAmountPaidPerDay.value
            : 0,
        // remarks: this.state.remarks.value,
      };

      hr_recommendation_approve(model).then((res: any) => {
        this.setState({ showLoader: false });
        if (res) {
          alert("record update sucessfully");
          this.props.history.push(
            CONSTANT.url.perquisites.tadaAllowanceRecommendation
          );
        }
      });
    }
  };

  validateForm = () => {
    const { tada } = this.state;
    let index = 0,
      status = true;
    for (let st of tada) {
      for (let key in st) {
        if (st.hasOwnProperty(key)) {
          const isRequired = st[key].isRequired;
          if (isRequired) {
            const value = st[key].value;
            if (value === null || value === undefined || value.length === 0) {
              status = false;
              tada[index][key].error = "is required";
              this.setState({ tada });
            } else continue;
          }
        }
      }

      index = index + 1;
    }
    return status;
  };
}

export default ComponentName;
