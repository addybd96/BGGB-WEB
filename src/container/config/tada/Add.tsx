import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { onChange, validateForm } from '../../../utils';
import { getBranchCategories } from '../../../action/CompanyBranchAction'
import { getDesignations, addTaDa, getTaDaList } from '../../../action/SettingsActions';


class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: undefined,
            showLoader: false,
            price: { name: 'price', value: '', error: '', isRequired: true },
            designationId: { name: 'designationId', value: '', options: [], error: '', isRequired: true },
            branchCategoryId: { name: 'branchCategoryId', value: '', options: [], error: '', isRequired: true },

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;

        getDesignations().then((response: any) => {
            if (response.status) {
                this.setState({ designationId: { ...this.state.designationId, options: response.result } })
            }
        });
        getBranchCategories(1, 100).then((res: any) => {
            this.setState({
                branchCategoryId: { ...this.state.branchCategoryId, options: res.result }
            })
        }).catch((err: any) => {
            console.log(err);
        })

        this.props.match.params.id &&
            getTaDaList({ id: this.props.match.params.id }).then((res: any) => {
                this.setState({ showLoader: false })
                if (res)
                    this.setState({
                        id: res.id,
                        price: { ...this.state.price, value: res.price },
                        designationId: { ...this.state.designationId, value: res.designationId },
                        branchCategoryId: { ...this.state.branchCategoryId, value: res.branchCategoryId }
                    });
            })
    }

    public render() {
        const { showLoader, price, designationId, branchCategoryId } = this.state;


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
                                    <b> {this.props.match.params.id ?'Update TaDa Price':'Add New TaDa Price' }</b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-lg-12 mb-2">
                                                <div className="row">

                                                    <div className="col-lg-6 form-group">
                                                        <label>TaDa</label>
                                                        <NumberFormat
                                                            onChange={this.onChange}
                                                            className={price.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={price.name}
                                                            value={price.value}

                                                        />
                                                    </div>

                                                    <div className="col-lg-6 form-group">
                                                        <label>Designation</label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={designationId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={designationId.name}
                                                            value={designationId.value}

                                                        >
                                                            <option value="">--Select--</option>
                                                            {
                                                                designationId.options.length > 0 &&
                                                                designationId.options.map((o: any) => {
                                                                    return (
                                                                        <option value={o.designationId}>{o.name}</option>

                                                                    )
                                                                })
                                                            }

                                                        </select>
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Branch Category</label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={branchCategoryId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={branchCategoryId.name}
                                                            value={branchCategoryId.value}

                                                        >
                                                            <option value="">--Select--</option>
                                                            {
                                                                branchCategoryId.options.length > 0 &&
                                                                branchCategoryId.options.map((c: any) => {
                                                                    return (
                                                                        <option value={c.id}>{c.name}</option>

                                                                    )
                                                                })
                                                            }

                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <Link to={CONSTANT.url.settingsOption.tadaList} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
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
            const { price: { value: price }, branchCategoryId: { value: branchCategoryId }, designationId: { value: designationId }, id } = this.state;
            this.setState({ showLoader: true })
            addTaDa({ price, branchCategoryId, designationId, id }).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.push(CONSTANT.url.settingsOption.tadaList)
                }
            })

        }
    }



}

export default ComponentName;
