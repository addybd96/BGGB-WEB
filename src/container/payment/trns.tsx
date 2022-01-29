import * as React from 'react';
import queryString from 'query-string';

import CONSTANT from '../../constant';
import { onChange, validateForm } from '../../utils';
import Loader from '../../component/common/Loader'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { updatePayment } from '../../action/payment';
import moment from "moment";
class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const { name, id, tb, sch } = queryString.parse(this.props.location.search);
        console.log(id,tb,sch)
        this.state = {
            id, tb, sch,
            name: { name: 'name', value: name, error: '', isRequired: false },
            trnId: { name: 'trnId', value: '', error: '', isRequired: true },
            trnStatus: { name: 'trnStatus', value: '', error: '', isRequired: true },
            trndate: { name: 'date', value: new Date().toISOString().split('T')[0], error: '', isRequired: true },
            showLoader: false,

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
    }

    public render() {
        const { showLoader, name, trndate, trnId, trnStatus } = this.state;


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
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Update Payment </b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <label> Transaction Id</label>
                                                        <input
                                                            disabled
                                                            className={name.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={name.name}
                                                            value={name.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label>Date</label>
                                                        <input
                                                            type="date"
                                                            onChange={this.onChange}
                                                            className={trndate.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={trndate.name}
                                                            value={moment(trndate.value).format('YYYY-MM-DD')}

                                                        />

                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label> Transaction Id</label>
                                                        <input
                                                            onChange={this.onChange}
                                                            className={trnId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={trnId.name}
                                                            value={trnId.value}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label> Staus</label>
                                                        <select
                                                            onChange={this.onChange}
                                                            className={trnStatus.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={trnStatus.name}
                                                            value={trnStatus.value}

                                                        >
                                                            <option value="false">Pending</option>
                                                            <option value="true">Completed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <button type="button" onClick={() => this.props.history.goBack()} className="col-lg-2 btn primary-control pull-left">Cancel</button>
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
            this.setState({ showLoader: true });
            let model = {
                id: this.state.id,
                tb: this.state.tb,
                sch: this.state.sch,
                trnId: this.state.trnId.value,
                trnStatus: this.state.trnStatus.value,
                trndate: this.state.trndate.value,
            }
            updatePayment(model).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.goBack()
                }
            })

        }
    }



}

export default ComponentName;
