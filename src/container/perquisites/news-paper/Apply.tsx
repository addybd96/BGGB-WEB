import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { apply } from '../../../action/NewsPaperActions';
import { onChange, validateForm } from '../../../utils';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: undefined,
            amount: { name: 'amount', value: '', error: '', isRequired: true },
            date: { name: 'date', value: new Date().toISOString().split('T')[0], error: '', isRequired: true },
            showLoader: false,

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
    }

    public render() {
        const { showLoader, date, amount } = this.state;


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
                                        <b>Apply for News Paper </b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">
                                                    <div className="col-lg-6 form-group">
                                                        <label>Financial Year</label>
                                                        <input
                                                            type="date"
                                                            onChange={this.onChange}
                                                            className={date.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={date.name}
                                                            value={date.value}

                                                        />

                                                    </div>
                                                    <div className="col-lg-6 form-group">
                                                        <label> Amount</label>
                                                        <NumberFormat
                                                            onChange={this.onChange}
                                                            className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                            name={amount.name}
                                                            value={amount.value}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <Link to={CONSTANT.url.perquisites.newsPaperAllowance} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
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
            let model: any = {
                id: this.state.id,
                date: this.state.date.value,
                amount: this.state.amount.value,
            }
            apply(model).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.push(CONSTANT.url.perquisites.newsPaperAllowance)
                }
            })

        }
    }



}

export default ComponentName;
