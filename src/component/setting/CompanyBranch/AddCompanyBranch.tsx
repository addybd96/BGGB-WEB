import * as React from "react";

import Header from "../../../component/common/Header";
import Sidebar from "../../../component/common/Sidebar";
import { isEmpty } from "../../../utils";
import { getLocationList } from "../../../action/GeographyActions";
import { getWorkLocations } from '../../../action/SettingsActions'
import {
    addCompanyBranch,
    getBranchCategories
} from "../../../action/CompanyBranchAction";
import CONSTANT from "../../../constant";
import NumberFormat from 'react-number-format';

class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false,
            locations: [
                { id: "1", name: "Noida" },
                { id: "2", name: "Gurgaon" }
            ],
            email: { value: "", error: "" },
            officeTypeId: { value: "", error: "", options: [] },
            contact: { value: "", error: "" },
            mobile: { value: "", error: "" },
            name: { value: "", error: "" },
            location: { value: "", error: "" },
            category: { value: "", error: "" },
            hraClerical: { value: "", error: "" },
            hraOfficers: { value: "", error: "" },
            address: { value: "", error: "" },
            soul: { value: "", error: "" },
            cca: { value: "", error: "" },
        };

        this._onChange = this._onChange.bind(this);
        this._setError = this._setError.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ showLoader: true });
        getLocationList().then((resp: any) => {
            console.log("resp", resp);
            this.setState({ locations: resp.result });
        });

        getBranchCategories().then((resp: any) => {
            console.log("resp", resp);
            this.setState({ categories: resp.result, showLoader: false });
        });

        getWorkLocations(1, 20).then((response: any) => {
            if (response.status) {
                this.setState({ officeTypeId: { ...this.state.officeTypeId, options: response.result } })
            }
        });
    }

    public render() {
        // const { isModalOpen } = this.state;
        const { officeTypeId, name, address, hraClerical, hraOfficers, soul, cca, email, mobile, contact } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            <div className="col-lg-11 mt-4">
                                <div className="col-lg-12">
                                    <div className="col-lg-12 mt-4">
                                        <div className="row">
                                            <div className="col-lg-6 pl-0">
                                                <h5 className="heading-h1">Add Branch/Office </h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mt-2">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <b>Company Branch</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this._onSubmit}>
                                                <div className="row">
                                                    <div className="col-lg-12 mb-2">
                                                        <div className="row">
                                                            <div className="col-lg-3 form-group">
                                                                <label>Location </label>
                                                                {this.renderLocationSelectItems()}
                                                            </div>
                                                            <div className="col-lg-3 form-group">
                                                                <label>Type</label>
                                                                <select
                                                                    className={officeTypeId.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                                    name="officeTypeId"
                                                                    value={officeTypeId.value}
                                                                    onChange={this._onChange}
                                                                >
                                                                    <option>Select a Work Location</option>
                                                                    {
                                                                        officeTypeId.options.map(function (item: any, index: number) {
                                                                            return (
                                                                                <option key={index} value={item.id}>{item.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="col-lg-3 form-group">
                                                                <label>Name</label>
                                                                <input
                                                                    value={name.value}
                                                                    type="text"
                                                                    name="name"
                                                                    onChange={this._onChange}
                                                                    className={
                                                                        isEmpty(name.error)
                                                                            ? "form-control"
                                                                            : "form-control is-invalid"
                                                                    }
                                                                    placeholder="Enter Name	"
                                                                />
                                                            </div>
                                                            <div className="col-lg-3 form-group">
                                                                <label>SOL ID</label>
                                                                <input
                                                                    value={soul.value}
                                                                    type="text"
                                                                    name="soul"
                                                                    onChange={this._onChange}
                                                                    className={
                                                                        isEmpty(soul.error)
                                                                            ? "form-control"
                                                                            : "form-control is-invalid"
                                                                    }
                                                                    placeholder="Enter SOUL ID	"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="form-group">
                                                            <label>Email</label>
                                                            <input
                                                                value={email.value}
                                                                type="text"
                                                                name="email"
                                                                onChange={this._onChange}
                                                                className={
                                                                    isEmpty(email.error)
                                                                        ? "form-control"
                                                                        : "form-control is-invalid"
                                                                }
                                                                placeholder="Enter email	"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="form-group">
                                                            <label>Mobile No.</label>
                                                            <input
                                                                value={mobile.value}
                                                                type="text"
                                                                name="mobile"
                                                                onChange={this._onChange}
                                                                className={
                                                                    isEmpty(mobile.error)
                                                                        ? "form-control"
                                                                        : "form-control is-invalid"
                                                                }
                                                                placeholder="Enter mobile	"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="form-group">
                                                            <label>Contact No.</label>
                                                            <input
                                                                value={contact.value}
                                                                type="text"
                                                                name="contact"
                                                                onChange={this._onChange}
                                                                className={
                                                                    isEmpty(contact.error)
                                                                        ? "form-control"
                                                                        : "form-control is-invalid"
                                                                }
                                                                placeholder="Enter contact number"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-3">
                                                        <div className="form-group">
                                                            <label>Category </label>
                                                            {this.renderCategorySelectItems()}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="form-group">
                                                            <label>CCA</label>
                                                            <NumberFormat
                                                                allowLeadingZeros={false}
                                                                allowNegative={false}
                                                                thousandSeparator={true}
                                                                className={cca.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                                placeholder="Enter CCA"
                                                                name="cca"
                                                                value={cca.value}
                                                                onChange={this._onChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-3">
                                                        <div className="form-group">
                                                            <label>HRA Clerical</label>
                                                            <input
                                                                value={hraClerical.value}
                                                                type="text"
                                                                name="hraClerical"
                                                                onChange={this._onChange}
                                                                className={
                                                                    isEmpty(hraClerical.error)
                                                                        ? "form-control"
                                                                        : "form-control is-invalid"
                                                                }
                                                                placeholder="Enter HRA for Clerical	Staff"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-3">
                                                        <div className="form-group">
                                                            <label>HRA Officers</label>
                                                            <input
                                                                value={hraOfficers.value}
                                                                type="text"
                                                                name="hraOfficers"
                                                                onChange={this._onChange}
                                                                className={
                                                                    isEmpty(hraOfficers.error)
                                                                        ? "form-control"
                                                                        : "form-control is-invalid"
                                                                }
                                                                placeholder="Enter HRA for Officers	"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 mb-2">
                                                        <div className="row">
                                                            <div className="col-lg-12 form-group">
                                                                <label>Address</label>
                                                                <textarea
                                                                    value={address.value}
                                                                    className={
                                                                        isEmpty(address.error)
                                                                            ? "form-control"
                                                                            : "form-control is-invalid"
                                                                    }
                                                                    name="address"
                                                                    onChange={this._onChange}
                                                                    rows={5}
                                                                    id="comment"
                                                                    placeholder="Enter Address"
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 ">
                                                        <a href="department.html">
                                                            <button
                                                                type="submit"
                                                                className="col-lg-2 btn primary-control pull-right"
                                                            >
                                                                Save Changes </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderLocationSelectItems = () => {
        if (!this.state.showLoader)
            return (
                <select
                    className={
                        isEmpty(this.state.location.error)
                            ? "form-control"
                            : "form-control is-invalid"
                    }
                    name="location"
                    onChange={this._onChange}
                >
                    <React.Fragment>
                        <option>--Select--</option>
                        {this.state.locations.map((dep: any, dIndex: number) => {
                            return (
                                <option key={dIndex} value={dep.id}>
                                    {dep.name}
                                </option>
                            );
                        })}
                    </React.Fragment>
                </select>
            );
    };

    renderCategorySelectItems = () => {
        if (this.state.categories)
            return (
                <select
                    className={
                        isEmpty(this.state.category.error)
                            ? "form-control"
                            : "form-control is-invalid"
                    }
                    name="category"
                    onChange={this._onChange}
                >
                    <React.Fragment>
                        <option>--Select--</option>
                        {this.state.categories.map((dep: any, dIndex: number) => {
                            return (
                                <option key={dIndex} value={dep.id}>
                                    {dep.name}
                                </option>
                            );
                        })}
                    </React.Fragment>
                </select>
            );
    };

    private _onChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: { ...this.state[name], value } }, callback);
    }

    private _setError(name: string, error: string) {
        this.setState({ [name]: { ...this.state[name], error } });
    }

    private _validateForm() {
        const { officeTypeId, name, address, location, category, hraOfficers, hraClerical, soul, cca, email, mobile, contact } = this.state;
        let status = true;
        if (isEmpty(name.value)) {
            this._setError("name", "error");
            status = false;
        }

        if (isEmpty(officeTypeId.value)) {
            this._setError("officeTypeId", "error");
            status = false;
        }


        if (isEmpty(address.value)) {
            this._setError("address", "error");
            status = false;
        }

        if (isEmpty(location.value)) {
            this._setError("location", "error");
            status = false;
        }

        if (isEmpty(category.value)) {
            this._setError("category", "error");
            status = false;
        }

        if (isEmpty(hraClerical.value)) {
            this._setError("hraClerical", "error");
            status = false;
        }

        if (isEmpty(hraOfficers.value)) {
            this._setError("hraOfficers", "error");
            status = false;
        }

        if (isEmpty(soul.value)) {
            this._setError("soul", "error");
            status = false;
        }

        if (isEmpty(cca.value)) {
            this._setError("cca", "error");
            status = false;
        }

        if (isEmpty(email.value)) {
            this._setError("email", "error");
            status = false;
        }
        if (isEmpty(mobile.value)) {
            this._setError("mobile", "error");
            status = false;
        }
        if (isEmpty(contact.value)) {
            this._setError("contact", "error");
            status = false;
        }
        return status;
    }

    private _clearFormError() {
        this._setError("address", "");
        this._setError("name", "");
        this._setError("location", "");
        this._setError("category", "");
        this._setError("hraClerical", "");
        this._setError("hraOfficers", "");
    }

    private _onSubmit = (e: any) => {
        e.preventDefault();
        this._clearFormError();
        const isFormValid = this._validateForm();
        // this.props.history.push(CONSTANT.url.addEmployeeAddress);
        if (isFormValid) {
            const jsonToPost = {
                name: this.state.name.value,
                address: this.state.address.value,
                locationId: this.state.location.value,
                branchCategoryId: this.state.category.value,
                hraOfficers: this.state.hraOfficers.value,
                hraClerical: this.state.hraClerical.value,
                cca: parseInt(this.state.cca.value.replace(/,/g, ''), 10),
                soul: this.state.soul.value,
                email: this.state.email.value,
                mobile: this.state.mobile.value,
                contact: this.state.contact.value,
                officeTypeId: this.state.officeTypeId.value
            };
            console.log("add basic request  => ", jsonToPost);
            addCompanyBranch(jsonToPost).then((response: any) => {
                console.log("add basic response  => ", response);
                if (response.result) {
                    this.props.history.push(CONSTANT.url.settingsOption.companyBranchList);
                } else {
                    alert(response.error)
                }
            });
        }
    };
}

export default Dashboard;
