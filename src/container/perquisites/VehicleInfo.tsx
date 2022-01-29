import * as React from 'react';
import moment from 'moment';
import CONSTANT from '../../constant';
import Loader from '../../component/common/Loader'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';

import { getPuserInfo, addPuserInfo } from '../../action/PerqTravelAllowanceAction'
import { onChange, validateForm, appendFile } from '../../utils';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: undefined,
            rucUrl: undefined,
            showLoader: false,
            rc: { name: 'rc', value: '', error: '', isRequired: true },
            name: { name: 'name', value: '', error: '', isRequired: true },
            fuel: { name: 'fuel', value: '', error: '', isRequired: true },
            status: { name: 'status', value: '', error: '', isRequired: false },
            modelNo: { name: 'modelNo', value: '', error: '', isRequired: true },
            vehicleType: { name: 'vehicleType', value: '', error: '', isRequired: true },
            vehiclePurchaseDate: { name: 'vehiclePurchaseDate', value: '', error: '', isRequired: true }
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.loadData()
    }

    public render() {
        const { showLoader, vehicleType, name, fuel, modelNo, status, rucUrl, vehiclePurchaseDate } = this.state;


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

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Vehicle Information </b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div className="row">

                                                    <div className="col-lg-6 form-group">
                                                        <label>Vehicle Name</label>
                                                        <input
                                                            type="text"
                                                            onChange={this.onChange}
                                                            className={name.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={name.name}
                                                            value={name.value}

                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Registration No.</label>
                                                        <input
                                                            type="text"
                                                            onChange={this.onChange}
                                                            className={modelNo.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={modelNo.name}
                                                            value={modelNo.value}

                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Vechile Type</label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={vehicleType.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={vehicleType.name}
                                                            value={vehicleType.value}

                                                        >
                                                            <option value="">--Select--</option>
                                                            <option value="four wheeler (below 1000 cc)">Four wheeler (Below 1000 CC)</option>
                                                            <option value="four wheeler (above 1000 cc)">Four wheeler (Above 1000 CC)</option>
                                                            <option value="two wheeler">Two wheeler</option>
                                                            <option value="mopeds">Mopeds</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Fuel Type </label>
                                                        <select
                                                            name={fuel.name} value={fuel.value}
                                                            onChange={this.onChange}
                                                            className={fuel.error.length > 0 ? "form-control is-invalid" : "form-control"}

                                                        >
                                                            <option value="">--Select--</option>
                                                            <option value="diesel">Diesel</option>
                                                            <option value="petrol">Petrol</option>
                                                            <option value="cng">CNG</option>
                                                            <option value="electric">Electric</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Status </label>
                                                        <select
                                                            disabled
                                                            name={status.name} value={status.value}
                                                            onChange={this.onChange}
                                                            className={status.error.length > 0 ? "form-control is-invalid" : "form-control"}

                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="reject">Reject</option>
                                                            <option value="approved">Approved</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Vehicle Purchase Date</label>
                                                        <input
                                                            type="date"
                                                            onChange={this.onChange}
                                                            className={vehiclePurchaseDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={vehiclePurchaseDate.name}
                                                            value={vehiclePurchaseDate.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Upload RC</label>
                                                        <input type="file"  accept="image/jpeg" className="form-control p-1" onChange={this.onSelect} />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mb-2">
                                                <img src={`${process.env.REACT_APP_BASE_URL}/userRC/${rucUrl}`} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {showLoader && <Loader />}
            </React.Fragment >
        )
    }



    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value, () => {

        });
    }

    onSelect = (e: any) => {
        let files = e.target.files

        // if (files && files.length) {
        //     if (files[0].size <= 1000000)
        //         this.setState({ rc: { ...this.state.rc, value: files[0] } })
        //     else
        //         window.alert("File cannot be larger than 1 MB!")
        // }

        if (files[0].type !== "image/jpeg") {
            alert("Please upload jpeg format only");
            const { rc } = this.state;
            rc.error = "Please upload valid image";
            this.setState({ rc });
          } else if (files[0].size >= 1000000) {
            window.alert("File cannot be larger than 1 MB!");
            const { rc } = this.state;
            rc.error = "Please upload image size smaller than 1MB";
            this.setState({ rc });
          } else {
            this.setState({ rc: { ...this.state.rc, value: files[0] } })
          }
    }


    private loadData = () => {
        this.setState({ showLoader: true })
        getPuserInfo().then((res: any) => {
            this.setState({ showLoader: false })
            if (res) {
                this.setState({
                    id: res.id,
                    rucUrl: `${res.rcUrl}?q=${Math.random()}`,
                    name: { ...this.state.name, value: res.name },
                    fuel: { ...this.state.fuel, value: res.fuel },
                    status: { ...this.state.status, value: res.status },
                    modelNo: { ...this.state.modelNo, value: res.modelNo },
                    vehicleType: { ...this.state.vehicleType, value: res.vehicleType },
                    vehiclePurchaseDate: { ...this.state.vehiclePurchaseDate, value: moment(res.vehiclePurchaseDate).format('YYYY-MM-DD') }
                })
            }
        })
    }

    private onSubmit = (e: any) => {
        e.preventDefault()
        if (validateForm(this)) {
            const { name, modelNo, fuel, id, vehicleType, rc, vehiclePurchaseDate } = this.state;
            const model = appendFile({ id, name: name.value, modelNo: modelNo.value, fuel: fuel.value, vehicleType: vehicleType.value, file: rc.value, vehiclePurchaseDate: vehiclePurchaseDate.value })
            this.setState({ showLoader: true })
            addPuserInfo(model).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    this.loadData()
                    alert('record update sucessfully')
                }
            })

        }
    }



}

export default ComponentName;
