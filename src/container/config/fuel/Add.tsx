import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { onChange, validateForm } from '../../../utils';
import { getWorkRoles, addFuel } from '../../../action/SettingsActions';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false,
            date: { name: 'date', value: '', error: '', isRequired: true },
            price: { name: 'price', value: '', error: '', isRequired: true },
            // fuelType: { name: 'fuelType', value: '', error: '', isRequired: true },
            // vehicleType: { name: 'vehicleType', value: '', error: '', isRequired: true },
            workRoleId: { name: 'workRoleId', value: '', options: [], error: '', isRequired: true },

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        getWorkRoles(0, 0).then((response: any) => {
            if (response.status) {
                this.setState({ workRoleId: { ...this.state.workRoleId, options: response.result } })
            }
        });
    }

    public render() {
        const { showLoader, date, price, fuelType, vehicleType, workRoleId } = this.state;
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
                                        <b>Add New Fuel Price </b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div className="row">

                                                    <div className="col-lg-6 form-group">
                                                        <label>price</label>
                                                        <NumberFormat
                                                            onChange={this.onChange}
                                                            className={price.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={price.name}
                                                            value={price.value}

                                                        />
                                                    </div>

                                                    <div className="col-lg-6 form-group">
                                                        <label>Month</label>
                                                        <input
                                                            type="date"
                                                            onChange={this.onChange}
                                                            className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={date.name}
                                                            value={date.value}

                                                        />
                                                    </div>
                                                    {/* <div className="col-lg-6 form-group">
                                                        <label>Fuel Type</label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={fuelType.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={fuelType.name}
                                                            value={fuelType.value}

                                                        >
                                                            <option value="">--Select--</option>
                                                            <option value="diesel">Diesel</option>
                                                            <option value="petrol">Petrol</option>
                                                        </select>
                                                    </div> */}
                                                    {/* <div className="col-lg-6 form-group">
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
                                                    </div> */}
                                                    <div className="col-lg-6 form-group">
                                                        <label>Work Role </label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={workRoleId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={workRoleId.name}
                                                            value={workRoleId.value}

                                                        >
                                                            <option value="">--Select--</option>
                                                            {
                                                                workRoleId.options.length > 0 &&
                                                                workRoleId.options.map((w: any) => {
                                                                    return (
                                                                        <option value={w.id}>{w.name}</option>

                                                                    )
                                                                })
                                                            }

                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <Link to={CONSTANT.url.settingsOption.fuelList} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
                                                <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
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


    private onSubmit = (e: any) => {
        e.preventDefault()
        if (validateForm(this)) {
            const { price: { value: price }, date: { value: date }, workRoleId: { value: workRoleId } } = this.state;

            this.setState({ showLoader: true })
            addFuel({ price, date, workRoleId }).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.push(CONSTANT.url.settingsOption.fuelList)
                }
            })

        }
    }



}

export default ComponentName;
