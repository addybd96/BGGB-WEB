import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import { onChange } from '../../../utils';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { getaddUniformAndLiveriesList } from '../../../action/SettingsActions'

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            showLoader: false,
            date: { name: 'date', value: '', error: '', isRequired: true }
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        this.loadData()

    }

    public render() {
        const { list, date, showLoader } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                        <div className="row mt-3">
                                <div className="col-lg-12">
                                    <h5 className="heading-h1">Uniform and Liveries </h5>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addUniformAndLiveries}>Add new Price</Link>
                                    </div>
                                    {/* <div className="float-left ">
                                        <input
                                            type="date"
                                            onChange={this.onChange}
                                            className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            name={date.name}
                                            value={date.value}

                                        />
                                    </div> */}

                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center" scope="col">  S. NO. </th>
                                                    <th className="text-center" scope="col">  Allowance Type </th>
                                                    <th className="text-center" scope="col">  Price </th>
                                                    {/* <th className="text-center" scope="col">  Year </th> */}
                                                    <th className="text-center" scope="col">  From Date </th>
                                                    <th className="text-center" scope="col">  To Date </th>
                                                    <th className="text-center" scope="col">  Edit </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={7}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={7}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length > 0 && list.map((l: any, i: any) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td className="text-center"> {i + 1} </td>
                                                                <td className="text-center"> {l.allowanceType} </td>
                                                                <td className="text-center"> {l.price} </td>
                                                                {/* <td className="text-center"> {l.year} </td> */}
                                                                <td className="text-center"> {l.fromDate ? moment(l.fromDate).format('MMM Do YYYY') : ""} </td>
                                                                <td className="text-center"> {l.toDate ? moment(l.toDate).format('MMM Do YYYY') : ""} </td>
                                                                <th className="text-center"><Link to={CONSTANT.url.settingsOption.editUniformAndLiveries.replace(':id', l.id)}><i className="fas fa-edit"></i></Link></th>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {showLoader && <Loader />}
            </React.Fragment >
        )
    }
    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value, () => {
            this.loadData(value)
        });
    }

    loadData = (date?: any) => {

        this.setState({ showLoader: true })
        getaddUniformAndLiveriesList({ date }).then((res: any) => {
            this.setState({ showLoader: false })
            if (res)
                this.setState({ list: res ? res : [] });
        })
    }
}


export default ComponentName;
