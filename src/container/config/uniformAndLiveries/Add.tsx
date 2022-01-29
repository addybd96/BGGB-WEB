import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { onChange, validateForm } from '../../../utils';
import { addUniformAndLiveries, getaddUniformAndLiveriesList, getAllowanceType } from '../../../action/SettingsActions';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: undefined,
            showLoader: false,
            price: { name: 'price', value: '', error: '', isRequired: true },
            //year: { name: 'year', value: '', error: '', isRequired: true },
             fromDate: { name: 'fromDate', value: '', error: '', isRequired: true },
             toDate: { name: 'toDate', value: '', error: '', isRequired: true },
            allowanceType: { name: 'allowanceType', value: '', error: '', isRequired: true },

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;

        getAllowanceType().then((response: any) => {
            if (response.status) {
                this.setState({ allowanceType: { ...this.state.allowanceType, options: response.result } })
            }
        });

        this.props.match.params.id && this.setState({ showLoader: true })
        this.props.match.params.id &&
            getaddUniformAndLiveriesList({ id: this.props.match.params.id }).then((res: any) => {
                this.setState({ showLoader: false })
                if (res)
                    this.setState({
                        id: res.id,
                        price: { ...this.state.price, value: res.price },
                        fromDate: { ...this.state.fromDate, value: moment(res.fromDate).format('YYYY-MM-DD') },
                        toDate: { ...this.state.toDate, value: moment(res.toDate).format('YYYY-MM-DD') },
                        allowanceType: { ...this.state.allowanceType, value: res.allowanceType }
                    });
            })

    }

    public render() {
        const { showLoader, price, year, allowanceType,fromDate,toDate } = this.state;
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
                                        <b> {this.props.match.params.id ? 'Update Uniform and Liveries' : 'Add New Uniform and Liveries'}</b>

                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div className="row">

                                                    <div className="col-lg-6 form-group">
                                                        <label>Price</label>
                                                        <NumberFormat
                                                            onChange={this.onChange}
                                                            className={price.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={price.name}
                                                            value={price.value}

                                                        />
                                                    </div>


                                                    <div className="col-lg-6 form-group">
                                                        <label>Allowance Type</label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={allowanceType.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={allowanceType.name}
                                                            value={allowanceType.value}

                                                        >
                                                            <option value="">--Select--</option>
                                                            <option value="Summer Uniform">Summer Uniform</option>
                                                            <option value="Winter Uniform">Winter Uniform</option>
                                                            <option value="Rain Coat">Rain Coat</option>
                                                            <option value="Umbrella">Umbrella</option>
                                                            <option value="Rainy Shoes">Rainy Shoes </option>
                                                            <option value="Leather Shoes"> Leather Shoes</option>
                                                            <option value="Driver Shoes"> Driver Shoes</option>
                                                        </select>
                                                    </div>
                                                    {/* <div className="col-lg-6 form-group">
                                                        <label>For Year</label>
                                                        <NumberFormat
                                                            onChange={this.onChange}
                                                            className={year.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={year.name}
                                                            value={year.value}

                                                        />
                                                    </div> */}
                                                    <div className="col-lg-6 form-group">
                                                        <label>From Date</label>
                                                        <input
                                                            type="date"
                                                            onChange={this.onChange}
                                                            className={fromDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={fromDate.name}
                                                            value={fromDate.value}

                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>To Date</label>
                                                        <input
                                                            type="date"
                                                            onChange={this.onChange}
                                                            className={toDate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={toDate.name}
                                                            value={toDate.value}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <Link to={CONSTANT.url.settingsOption.uniformAndLiveriesList} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
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
            const { price: { value: price }, allowanceType: { value: allowanceType }, fromDate: { value: fromDate },toDate: { value: toDate }, id } = this.state;

            this.setState({ showLoader: true })
            addUniformAndLiveries({ price, allowanceType, fromDate, toDate, id }).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.push(CONSTANT.url.settingsOption.uniformAndLiveriesList)
                }
            })

        }
    }



}

export default ComponentName;
