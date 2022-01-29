import * as React from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { onChange } from "../../../utils";
import CONSTANT from "../../../constant";
import Loader from "../../../component/common/Loader";
import Header from "../../../component/common/Header";
import Sidebar from "../../../component/common/Sidebar";
import {
  apply,
  getTadaAlneById,
  hotelAndTadaConf,
} from "../../../action/PerqTadaAllowanceAction";

class ComponentName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      tada: [
        {
          tadaTemp: 0,
          departureCategory: {
            name: "departureCategory",
            value: "",
            error: "",
            isRequired: true,
          },
          departurePalace: {
            name: "departurePalace",
            value: "",
            error: "",
            isRequired: true,
          },
          departureDate: {
            name: "departureDate",
            value: "",
            error: "",
            isRequired: true,
          },
          departureTime: {
            name: "departureTime",
            value: "",
            error: "",
            isRequired: true,
          },

          arrivalDate: {
            name: "arrivalDate",
            value: "",
            error: "",
            isRequired: true,
          },
          arrivalTime: {
            name: "arrivalTime",
            value: "",
            error: "",
            isRequired: true,
          },
          arrivalPalace: {
            name: "arrivalPalace",
            value: "",
            error: "",
            isRequired: true,
          },
          arrivalCategory: {
            name: "arrivalCategory",
            value: "",
            error: "",
            isRequired: true,
          },

          km: { name: "km", value: 0, error: "", isRequired: true },
          tada: { name: "tada", value: 0, error: "", isRequired: true },
          travelBy: {
            name: "travelBy",
            value: "",
            error: "",
            isRequired: true,
          },
          farePaid: {
            name: "farePaid",
            value: 0,
            error: "",
            isRequired: true,
          },
          autoRixaExpense: {
            name: "autoRixaExpense",
            value: 0,
            error: "",
            isRequired: true,
          },
          hotelAmountPaidPerDay: {
            name: "hotelAmountPaidPerDay",
            value: 0,
            error: "",
            isRequired: false,
          },
          foodFacility: {
            name: "foodFacility",
            value: "false",
            error: "",
            isRequired: false,
          },
          isHotelFacilityAvailed: {
            name: "isHotelFacilityAvailed",
            value: "false",
            error: "",
            isRequired: false,
          },
          img: { name: "img", value: "", error: "", isRequired: false },
        },
      ],
      tadas: undefined,
      hotel: undefined,
      totalTada: { name: "totalTada", value: 0, error: "", isRequired: true },
      farePaid: { name: "farePaid", value: 0, error: "", isRequired: true },
      autoRixaExpense: {
        name: "autoRixaExpense",
        value: 0,
        error: "",
        isRequired: true,
      },
      hotelAmountPaidPerDay: {
        name: "hotelAmountPaidPerDay",
        value: 0,
        error: "",
        isRequired: true,
      },

      purpose: { name: "purpose", value: "", error: "", isRequired: true },
      date: {
        name: "date",
        value: new Date().toISOString().split("T")[0],
        error: "",
        isRequired: true,
      },
      totalTadaAmount: {
        name: "totalTadaAmount",
        value: 0,
        error: "",
        isRequired: true,
      },
      showLoader: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = CONSTANT.title.locationList;
    const { id } = this.props.match.params;
    id && this.loadData(id);
    hotelAndTadaConf().then((res: any) => {
      if (res) this.setState({ tadas: res.tada, hotel: res.hotel });
    });
  }

  public render() {
    const {
      showLoader,
      tada,
      farePaid,
      autoRixaExpense,
      totalTada,
      hotelAmountPaidPerDay,
      purpose,
      date,
      totalTadaAmount,
    } = this.state;
    var total = 0;
    total =
      +farePaid.value +
      +autoRixaExpense.value +
      +totalTada.value +
      +hotelAmountPaidPerDay.value;
    console.log("total", total);
    console.log(tada,'tadadadaa');
    
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
                  console.log(e,'eeeeeeeee');
                  
                  return (
                    <div className="card mt-2">
                      <div className="card-header">
                        <b>Apply for Halting ( {i + 1} )</b>
                        <div className="float-right">
                          {!this.props.match.params.id && tada.length == i + 1 && (
                            <a onClick={this.addNewRow}>
                              <i className="fa fa-plus"></i>
                            </a>
                          )}
                          &nbsp;&nbsp;
                          {!this.props.match.params.id && i > 0 && (
                            <a onClick={() => this.removeRow(i)}>
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <b className="is-invalid">
                            {/* {e.error} */}
                          </b>
                          <div className="col-lg-12 mb-2">
                            <div className="row">
                              <div className="col-lg-3 form-group">
                                <label>Place of Departure </label>
                                <input
                                  type="text"
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.departurePalace.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.departurePalace.name}
                                  value={e.departurePalace.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label>Category of Departure place</label>
                                <select
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.departureCategory.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
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
                                  type="date"
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.departureDate.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.departureDate.name}
                                  value={e.departureDate.value}
                                  min={
                                    i == 0 ? "" : tada[i - 1].arrivalDate.value
                                  }
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label>Time Of Departure</label>
                                <input
                                  type="time"
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.departureTime.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.departureTime.name}
                                  value={e.departureTime.value}
                                />
                              </div>

                              <div className="col-lg-3 form-group">
                                <label>Place of Arrival </label>
                                <input
                                  type="text"
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.arrivalPalace.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.arrivalPalace.name}
                                  value={e.arrivalPalace.value}
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label>Category of Arrival place</label>
                                <select
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.arrivalCategory.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
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
                                  type="date"
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.arrivalDate.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.arrivalDate.name}
                                  value={e.arrivalDate.value}
                                  min={
                                    e.departureDate.value
                                      ? e.departureDate.value
                                      : i == 0
                                      ? e.departureDate.value
                                      : tada[i - 1].arrivalDate.value
                                  }
                                />
                              </div>
                              <div className="col-lg-3 form-group">
                                <label>Time Of Arrival</label>
                                <input
                                  type="time"
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.arrivalTime.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.arrivalTime.name}
                                  value={e.arrivalTime.value}
                                />
                              </div>

                              <div className="col-lg-3 form-group">
                                <label>Travel by mode</label>
                                <select
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.travelBy.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
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
                                <label> Kilometers</label>
                                <NumberFormat
                                  onChange={(event) => this.onChange(event, i)}
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
                                <label> Fare Paid</label>
                                <NumberFormat
                                  onChange={(event) => this.onChange(event, i)}
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
                                  onChange={(event) => this.onChange(event, i)}
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
                                <label> Halting</label>
                                <NumberFormat
                                  onChange={(event) => this.onChange(event, i)}
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
                                <label>
                                  Is hotel facility availed (Yes, No)
                                </label>
                                <select
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.isHotelFacilityAvailed.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.isHotelFacilityAvailed.name}
                                  value={e.isHotelFacilityAvailed.value}
                                >
                                  <option value="">--Select--</option>
                                  <option value="true">YES</option>
                                  <option value="false">No</option>
                                </select>
                              </div>

                              <div className="col-lg-3 form-group">
                                <label>Food facility availed (Yes, No)</label>
                                <select
                                  onChange={(event) => this.onChange(event, i)}
                                  className={
                                    e.foodFacility.error.length > 0
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name={e.foodFacility.name}
                                  value={e.foodFacility.value}
                                >
                                  <option value="">--Select--</option>
                                  <option value="true">YES</option>
                                  <option value="false">No</option>
                                </select>
                              </div>

                              {this.props.match.params.id &&
                                  <div className="col-lg-3 form-group">
                                    <label>Download Document</label>
                                   
                                      {
                                        e.imgUrl &&  <div>
                                           <a
                                    href={`${process.env.REACT_APP_BASE_URL}${CONSTANT.url.perquisites.tadaAllowanceFile}${e.userId}/${e.imgUrl}`}
                                    onClick={(k:any) => {
                                      k.preventDefault();
                                      this.downloadResource(
                                        `${process.env.REACT_APP_BASE_URL}${CONSTANT.url.perquisites.tadaAllowanceFile}${e.userId}/${e.imgUrl}`,
                                        e.imgUrl);
                                    }}
                                    target="_blank"
                                  >
                                    download link
                                  </a>
                                      </div>
                                      }
                                   
        
                                  </div>
                              }
                              {e.isHotelFacilityAvailed.value === "true" && (
                                <div className="col-lg-3 form-group">
                                  <label>Hotel Amount Paid Per day</label>
                                  <NumberFormat
                                    onChange={(event) =>
                                      this.onChange(event, i)
                                    }
                                    className={
                                      e.hotelAmountPaidPerDay.error.length > 0
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                    name={e.hotelAmountPaidPerDay.name}
                                    value={e.hotelAmountPaidPerDay.value}
                                  />
                                </div>
                              )}

                              {!this.props.match.params.id &&
                                e.isHotelFacilityAvailed.value === "true" && (
                                  <div className="col-lg-6 form-group">
                                    <label>Upload Image</label>
                                    <input
                                      type="file"
                                      accept="image/png, image/jpeg"
                                      className={
                                        e.img.error.length > 0
                                          ? "form-control p-1"
                                          : "form-control p-1"
                                      }
                                      onChange={(event) =>
                                        this.onSelect(event, i)
                                      }
                                    />
                                  </div>
                                )}
                            </div>
                            <div className="row">
                              {this.props.match.params.id && (
                                <div className="col-lg-6 mb-2">
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}/userTada/${e.imgUrl}`}
                                    alt=""
                                  />
                                </div>
                              )}
                              {!this.props.match.params.id && e.imgUrl && (
                                <div className="col-lg-6 col-lg-offset-3 mb-2">
                                  <img src={e.imgUrl} alt="img" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="card mt-2">
                  <div className="card-header">
                    <b>Summary</b>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <div className="row">
                          <div className="col-lg-3 form-group">
                            <label>Total Fare Paid</label>
                            <NumberFormat
                              onChange={this._onChange}
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
                              onChange={this._onChange}
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
                            <label>Total Halting</label>
                            <NumberFormat
                              onChange={this._onChange}
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
                            <label>Total Hotel Amount Paid Per day</label>
                            <NumberFormat
                              onChange={this._onChange}
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
                            <label>Total_TA & DA</label>
                            <NumberFormat
                              onChange={this._onChange}
                              className={
                                totalTadaAmount.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={totalTadaAmount.name}
                              value={total}
                            />
                          </div>
                          <div className="col-lg-3 form-group">
                            <label>Apply Date</label>
                            <input
                              type="date"
                              onChange={this._onChange}
                              className={
                                date.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name={date.name}
                              value={date.value}
                            />
                          </div>
                          <div className="col-lg-6 form-group">
                            <label>Reason & Tour Apporving Authority</label>
                            <textarea
                              cols={10}
                              rows={5}
                              name={purpose.name}
                              value={purpose.value}
                              onChange={this._onChange}
                              className={
                                purpose.error.length > 0
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                            ></textarea>
                          </div>
                        </div>
                        {!this.props.match.params.id && (
                          <div className="col-lg-12 ">
                            <Link
                              to={CONSTANT.url.perquisites.tadaAllowance}
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

  addNewRow = () => {
    this.setState({
      tada: [
        ...this.state.tada,
        {
          tadaTemp: 0,
          departureCategory: {
            name: "departureCategory",
            value: "",
            error: "",
            isRequired: true,
          },
          departurePalace: {
            name: "departurePalace",
            value: "",
            error: "",
            isRequired: true,
          },
          departureDate: {
            name: "departureDate",
            value: "",
            error: "",
            isRequired: true,
          },
          departureTime: {
            name: "departureTime",
            value: "",
            error: "",
            isRequired: true,
          },

          arrivalDate: {
            name: "arrivalDate",
            value: "",
            error: "",
            isRequired: true,
          },
          arrivalTime: {
            name: "arrivalTime",
            value: "",
            error: "",
            isRequired: true,
          },
          arrivalPalace: {
            name: "arrivalPalace",
            value: "",
            error: "",
            isRequired: true,
          },
          arrivalCategory: {
            name: "arrivalCategory",
            value: "",
            error: "",
            isRequired: true,
          },

          km: { name: "km", value: "", error: "", isRequired: true },
          tada: { name: "tada", value: "0", error: "", isRequired: true },
          travelBy: {
            name: "travelBy",
            value: "",
            error: "",
            isRequired: true,
          },
          farePaid: {
            name: "farePaid",
            value: "",
            error: "",
            isRequired: true,
          },
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
            isRequired: false,
          },
          foodFacility: {
            name: "foodFacility",
            value: "false",
            error: "",
            isRequired: false,
          },
          isHotelFacilityAvailed: {
            name: "isHotelFacilityAvailed",
            value: "false",
            error: "",
            isRequired: false,
          },

          img: { name: "img", value: "", error: "", isRequired: true },
        },
      ],
    });
  };

  removeRow = (i: number) => {
    const { tada, tadas } = this.state;
    tada.splice(i, 1);
    const cTime = tada[i - 1].arrivalTime.value.split(":");
    const pTime = tada[i - 1].departureTime.value.split(":");
    const cDate = moment(tada[i - 1].arrivalDate.value).set({
      hour: cTime[0],
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const pDate = moment(tada[i - 1].departureDate.value).set({
      hour: pTime[0],
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    let diff = moment(cDate).diff(pDate, "days") + 1;
    if (diff === 1) {
      const timeDiff = moment(cDate).diff(pDate, "hours");
      if (timeDiff >= 8) diff = 1;
      else if (timeDiff >= 4 && timeDiff < 8) diff = 0.5;
      else diff = 0;
      tada[i - 1].tadaTemp = diff * tadas;
      tada[i - 1].tada = { ...tada[i - 1].tada, value: diff * tadas };
    }
    this.setState({
      tada,
      farePaid: {
        ...this.state.farePaid,
        value: tada.reduce(
          (a: number, t: any) => Number(t.farePaid.value) + a,
          0
        ),
      },
      totalTada: {
        ...this.state.totalTada,
        value: tada.reduce((a: number, t: any) => Number(t.tada.value) + a, 0),
      },
      autoRixaExpense: {
        ...this.state.autoRixaExpense,
        value: tada.reduce(
          (a: number, t: any) => Number(t.autoRixaExpense.value) + a,
          0
        ),
      },
      hotelAmountPaidPerDay: {
        ...this.state.hotelAmountPaidPerDay,
        value: tada.reduce(
          (a: number, t: any) => Number(t.hotelAmountPaidPerDay.value) + a,
          0
        ),
      },
    });
  };

  onChange = (e: any, i: number) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const { tada } = this.state;
    tada[i][name] = { ...tada[i][name], value, error: "" };

    const totalTada = this.state.totalTada;
    const farePaid = this.state.farePaid;
    const autoRixaExpense = this.state.autoRixaExpense;
    const hotelAmountPaidPerDay = this.state.hotelAmountPaidPerDay;
    const totalTadaAmount = this.state.totalTadaAmount;

    this.setState(
      {
        tada,
        totalTada: {
          ...this.state.totalTada,
          value: tada.reduce(
            (a: number, t: any) => Number(t.tada.value) + a,
            0
          ),
        },
        farePaid: {
          ...this.state.farePaid,
          value: tada.reduce(
            (a: number, t: any) => Number(t.farePaid.value) + a,
            0
          ),
        },
        autoRixaExpense: {
          ...this.state.autoRixaExpense,
          value: tada.reduce(
            (a: number, t: any) => Number(t.autoRixaExpense.value) + a,
            0
          ),
        },
        hotelAmountPaidPerDay: {
          ...this.state.hotelAmountPaidPerDay,
          value: tada.reduce(
            (a: number, t: any) => Number(t.hotelAmountPaidPerDay.value) + a,
            0
          ),
        },
        totalTadaAmount: {
          ...this.state.totalTadaAmount,
          value:
            Number(totalTada.value) +
            Number(farePaid.value) +
            Number(autoRixaExpense.value) +
            Number(hotelAmountPaidPerDay.value),
        },
      }
      // () => {
      //   const { tada, tadas } = this.state;
      //   if (i + 1 == tada.length && name === "arrivalTime") {
      //     const cTime = value.split(":");
      //     const pTime = tada[i].departureTime.value.split(":");
      //     const cDate = moment(tada[i].arrivalDate.value).set({
      //       hour: cTime[0],
      //       minute: 0,
      //       second: 0,
      //       millisecond: 0,
      //     });
      //     const pDate = moment(tada[i].departureDate.value).set({
      //       hour: pTime[0],
      //       minute: 0,
      //       second: 0,
      //       millisecond: 0,
      //     });
      //     let diff = moment(cDate).diff(pDate, "days") + 1;
      //     if (diff === 1) {
      //       const timeDiff = moment(cDate).diff(pDate, "hours");
      //       if (timeDiff >= 8) diff = 1;
      //       else if (timeDiff >= 4 && timeDiff < 8) diff = 0.5;
      //       else diff = 0;
      //     }
      //     tada[i].tadaTemp = diff * tadas;
      //     tada[i].tada = { ...tada[i].tada, value: diff * tadas };
      //     this.setState({ tada });
      //   } else if (tada.length > 1 && name === "departureTime") {
      //     const cTime = value.split(":");
      //     const pTime = tada[i - 1].departureTime.value.split(":");
      //     const cDate = moment(tada[i].departureDate.value).set({
      //       hour: cTime[0],
      //       minute: 0,
      //       second: 0,
      //       millisecond: 0,
      //     });
      //     const pDate = moment(tada[i - 1].departureDate.value).set({
      //       hour: pTime[0],
      //       minute: 0,
      //       second: 0,
      //       millisecond: 0,
      //     });

      //     let diff = moment(cDate).diff(pDate, "days") + 1;
      //     if (diff === 1) {
      //       const timeDiff = moment(cDate).diff(pDate, "hours");
      //       if (timeDiff >= 8) diff = 1;
      //       else if (timeDiff >= 4 && timeDiff < 8) diff = 0.5;
      //       else diff = 0;
      //     }
      //     tada[i - 1].tadaTemp = diff * tadas;
      //     tada[i - 1].tada = { ...tada[i - 1].tada, value: diff * tadas };
      //     this.setState({ tada });
      //   }

      //   if (name === "isHotelFacilityAvailed") {
      //     if (tada[i].isHotelFacilityAvailed.value === "true") {
      //       const deduction = (25 / 100) * tada[i].tadaTemp;
      //       tada[i].tada = {
      //         ...tada[i].tada,
      //         value: tada[i].tada.value - deduction,
      //       };
      //       tada[i].hotelAmountPaidPerDay = {
      //         ...tada[i].hotelAmountPaidPerDay,
      //         isRequired: true,
      //       };
      //       //tada[i].img = { ...tada[i].img, isRequired: true }
      //       this.setState({
      //         tada,
      //         totalTada: {
      //           ...this.state.totalTada,
      //           value: tada.reduce(
      //             (a: number, t: any) => Number(t.tada.value) + a,
      //             0
      //           ),
      //         },
      //       });
      //     } else {
      //       const deduction = (25 / 100) * tada[i].tadaTemp;
      //       tada[i].tada = {
      //         ...tada[i].tada,
      //         value: tada[i].tada.value + deduction,
      //       };
      //       tada[i].hotelAmountPaidPerDay = {
      //         ...tada[i].hotelAmountPaidPerDay,
      //         value: 0,
      //         isRequired: false,
      //       };
      //       //tada[i].img = { ...tada[i].img, isRequired: false }
      //       this.setState({
      //         tada,
      //         totalTada: {
      //           ...this.state.totalTada,
      //           value: tada.reduce(
      //             (a: number, t: any) => Number(t.tada.value) + a,
      //             0
      //           ),
      //         },
      //       });
      //     }
      //   }
      // if (name === "foodFacility") {
      // if (tada[i].foodFacility.value === "true") {
      //   const deduction = (50 / 100) * tada[i].tadaTemp;
      //   tada[i].tada = {
      //     ...tada[i].tada,
      //     value: tada[i].tada.value - deduction,
      //   };
      //   this.setState({
      //     tada,
      //     totalTada: {
      //       ...this.state.totalTada,
      //       value: tada.reduce(
      //         (a: number, t: any) => Number(t.tada.value) + a,
      //         0
      //       ),
      //     },
      //   });
      // } else {
      //   const deduction = (50 / 100) * tada[i].tadaTemp;
      //   tada[i].tada = {
      //     ...tada[i].tada,
      //     value: tada[i].tada.value + deduction,
      //   };
      //   this.setState({
      //     tada,
      //     totalTada: {
      //       ...this.state.totalTada,
      //       value: tada.reduce(
      //         (a: number, t: any) => Number(t.tada.value) + a,
      //         0
      //       ),
      //     },
      //   });
      // }
      // }
      //   }
    );
  };

  _onChange = (e: any) => {
    this.setState({
      [e.target.name]: {
        ...this.state[e.target.name],
        value: e.target.value,
        error: "",
      },
    });
  };

  onSelect = (e: any, i: number) => {
    let files = e.target.files;
    console.log(files[0]);

    if (files[0].type !== "image/jpeg" && files[0].type !== "image/png") {
      alert("Please upload png/jpeg format only");
      const { tada } = this.state;
      tada[i].img.error = "Please upload valid image";
      this.setState({ tada });
    } else if (files[0].size >= 1000000) {
      window.alert("File cannot be larger than 1 MB!");
      const { tada } = this.state;
      tada[i].img.error = "Please upload image size smaller than 1MB";
      this.setState({ tada });
    } else {
      const { tada } = this.state;
      tada[i].img = { ...tada[i].img, value: files[0], error: "" };
      tada[i].imgUrl = URL.createObjectURL(files[0]);
      this.setState({ tada });
    }
  };

  loadData = (id: number) => {
    this.setState({ showLoader: true });
    getTadaAlneById({ id: id }).then((response: any) => {
      if (response) {
        const tada = response.list.map((res: any) => {
          return {
            id: res.id,
            userId: res.userId,
            imgUrl: res.imgUrl,
            groupId: res.groupId,
            name: { name: "name", value: res.name, error: "" },
            km: { name: "km", value: res.km, error: "", isRequired: true },
            tada: {
              name: "tada",
              value: res.tada,
              error: "",
              isRequired: true,
            },
            departureCategory: {
              name: "departureCategory",
              value: res.departureCategory,
              error: "",
            },
            departurePalace: {
              name: "departurePalace",
              value: res.departurePalace,
              error: "",
            },
            departureDate: {
              name: "departureDate",
              value: moment(res.departureDate).format("YYYY-MM-DD"),
              error: "",
            },
            departureTime: {
              name: "departureTime",
              value: moment(res.departureTime, "HH:mm").format("hh:mm"),
              error: "",
            },
            arrivalDate: {
              name: "arrivalDate",
              value: moment(res.arrivalDate).format("YYYY-MM-DD"),
              error: "",
            },
            arrivalTime: {
              name: "arrivalTime",
              value: moment(res.arrivalTime, "HH:mm").format("hh:mm"),
              error: "",
            },
            arrivalPalace: {
              name: "arrivalPalace",
              value: res.arrivalPalace,
              error: "",
            },
            arrivalCategory: {
              name: "arrivalCategory",
              value: res.arrivalCategory,
              error: "",
            },
            travelBy: { name: "travelBy", value: res.travelBy, error: "" },
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
            foodFacility: {
              name: "foodFacility",
              value: res.foodFacility,
              error: "",
            },
            isHotelFacilityAvailed: {
              name: "isHotelFacilityAvailed",
              value: res.isHotelFacilityAvailed,
              error: "",
            },
            hotelAmountPaidPerDay: {
              name: "hotelAmountPaidPerDay",
              value: res.hotelAmountPaidPerDay,
              error: "",
              isRequired: res.isHotelFacilityAvailed ? true : false,
            },
          };
        });
        
        let data=tada.reverse()
        this.setState({
          tada:data,
          Status: response.status,
          totalTada: {
            name: "totalTada",
            value: response.totalTada,
            error: "",
          },
          farePaid: { name: "farePaid", value: response.farePaid, error: "" },
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

          purpose: { name: "purpose", value: response.purpose, error: "" },
          date: {
            name: "date",
            value: moment(response.date).format("YYYY-MM-DD"),
            error: "",
          },
          showLoader: false,
        });
      }
    });
  };

  private onSubmit = (e: any) => {
    e.preventDefault();
    let isValid = this.validateForm();
    if (isValid) {
      this.setState({ showLoader: true });
      const tada: any = this.state.tada.map((st: any) => ({
        km: st.km.value,
        img: st.img.value,
        tada: st.tada.value,
        farePaid: st.farePaid.value,
        travelBy: st.travelBy.value,
        arrivalTime: st.arrivalTime.value,
        arrivalDate: st.arrivalDate.value,
        foodFacility: st.foodFacility.value,
        departureDate: st.departureDate.value,
        departureTime: st.departureTime.value,
        arrivalPalace: st.arrivalPalace.value,
        departurePalace: st.departurePalace.value,
        arrivalCategory: st.arrivalCategory.value,
        autoRixaExpense: st.autoRixaExpense.value,
        departureCategory: st.departureCategory.value,
        isHotelFacilityAvailed: st.isHotelFacilityAvailed.value,
        hotelAmountPaidPerDay:
          st.isHotelFacilityAvailed.value === "true"
            ? st.hotelAmountPaidPerDay.value
            : 0,
      }));
      let model = {
        tada,
        departureDate: tada[0].departureDate,
        departurePalace: tada[0].departurePalace,

        arrivalDate: tada[tada.length - 1].arrivalDate,
        arrivalPalace: tada[tada.length - 1].arrivalPalace,

        totalTada: this.state.totalTada.value,
        farePaid: this.state.farePaid.value,
        autoRixaExpense: this.state.autoRixaExpense.value,
        hotelAmountPaidPerDay: this.state.hotelAmountPaidPerDay.value,
        totalAmount:
          parseInt(this.state.totalTada.value) +
          parseInt(this.state.hotelAmountPaidPerDay.value) +
          parseInt(this.state.autoRixaExpense.value) +
          parseInt(this.state.farePaid.value),
        date: this.state.date.value,
        purpose: this.state.purpose.value,
      };

      apply(this.appendFile(model)).then((res: any) => {
        this.setState({ showLoader: false });
        if (res) {
          alert("record update sucessfully");
          this.props.history.push(CONSTANT.url.perquisites.tadaAllowance);
        }
      });
    }
  };

  downloadResource = (url: any, filename: any) => {
    debugger
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

  validateForm = () => {
    const { tada } = this.state;
    let index = 0,
      status = true;

    for (let i = 0; i < tada.length; i++) {
      // if (tada.length === 1) {
      //   if (
      //     tada[i].departureDate.value > tada[i].arrivalDate.value ||
      //     tada[i].departureTime.value > tada[i].arrivalTime.value
      //   ) {
      //     status = false;
      //     alert(
      //       "Arrival date and time should be greater than departure date and time"
      //     );
      //   } else if (tada[i].departureDate.value === tada[i].arrivalDate.value) {
      //     if (tada[i].departureTime.value > tada[i].arrivalTime.value) {
      //       status = false;
      //       alert("Arrival time should be greater than departure time");
      //     }
      //   }
      // }
      
        if (tada[i].departureDate.value > tada[i].arrivalDate.value) {
          status = false;
          tada[i]={...this.state.tada[i], error: "Arrival date and time should be greater than departure date and time"}
          this.setState({
            tada: tada,
          });
          return false;
         
        } else if (tada[i].departureDate.value === tada[i].arrivalDate.value) {
          if (tada[i].departureTime.value > tada[i].arrivalTime.value) {
            status = false;
            tada[i]={ ...this.state.tada[i], error: "Arrival time should be greater than departure time" }
            this.setState({
              tada: tada,
            });
            return false;
          }
        } else if (
          tada[i + 1] !== undefined &&
          tada[i].arrivalDate.value > tada[i + 1].departureDate.value
        ) {
          status = false;
          tada[i]={ ...this.state.tada[i], error: "arrival date of previous halt should be less than equal to departure date of next halt" }
          this.setState({
            tada: tada
          });
         return false;
        } else{
            //condition validated within row
        }
        
       if( i < tada.length-1){
        if (tada[i+1].departureDate.value < tada[i].arrivalDate.value) {
          status = false;
          tada[i+1]= { ...this.state.tada[i], error: "Arrival date and time should be greater than departure date and time" }

          this.setState({
            tada:tada
          });
         return false;
          
        } else if (tada[i+1].departureDate.value === tada[i].arrivalDate.value) {
          if (tada[i+1].departureTime.value < tada[i].arrivalTime.value) {
            status = false;
            tada[i+1]=  { ...this.state.tada[i], error: "Arrival time should be greater than departure time" }

            this.setState({
            tada:tada
            });
           return false;
           
          }
        } else{
            //condition validated between rows
        }
       }
      
    }

    for (let k in this.state) {
      if (this.state[k] !== null) {
        if (this.state[k].constructor === Array) {
          for (let st of this.state[k]) {
            for (let key in st) {
              if (st.hasOwnProperty(key)) {
                if (
                  st.isHotelFacilityAvailed.value == "false" ||
                  st.hotelAmountPaidPerDay === "" ||
                  st.foodFacility == "false"
                ) {
                  status = true;
                  tada[index].img.isRequired = false;
                  tada[index].img.error = "";
                  this.setState({ tada });
                }
                const isRequired = st[key].isRequired;
                if (isRequired) {
                  const value = st[key].value;
                  if (
                    value === null ||
                    value === undefined ||
                    value.length === 0
                  ) {
                    status = false;
                    tada[index][key].error = "is required";
                    this.setState({ tada });
                  } else continue;
                }
              }
            }
            index = index + 1;
          }
        } else {
          if (this.state.hasOwnProperty(k)) {
            const isRequired = this.state[k].isRequired;
            if (isRequired) {
              const value = this.state[k].value;
              if (value === null || value === undefined || value.length === 0) {
                status = false;
                this.setState({
                  [k]: { ...this.state[k], error: "is required" },
                });
              } else continue;
            }
          }
        }
      }
    }
    return status;
  };

  appendFile = (modle: any) => {
    const formData = new FormData();
    for (const [k, v] of Object.entries(modle)) {
      let key: string = k,
        value: any = v;
      if (!!value && value.constructor === Array) {
        value.forEach((m: any, i: number) => {
          formData.append(`tada[${i}]`, JSON.stringify(m));
          formData.append(`file[${i}]`, m.img);
          // }
        });
      } else formData.append(key, value);
    }
    return formData;
  };
}

export default ComponentName;
