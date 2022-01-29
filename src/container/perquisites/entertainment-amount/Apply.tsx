import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { apply } from '../../../action/EntertainmentAction';
import { onChange, validateForm, appendFile } from '../../../utils';

import moment from 'moment';


class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: undefined,
            amount: { name: 'amount', value: '', error: '', isRequired: true },
            img: { name: 'img', value: '', imgUrl: '', error: '', isRequired: false },
            showLoader: false,
            from: { name: 'date', value: '', isRequired: true },
            toDate: { name: 'date', value: '', isRequired: true },



        }
    }

    componentDidMount() {
        this.setQuarterDate()
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
    }

    public render() {
        const { showLoader, date, img, amount, from, toDate } = this.state;


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
                                        <b>Apply for Entertainment Amount </b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">


                                                    <div className="col-lg-6 form-group">
                                                        <label>Start Quarter Day</label>
                                                        <input
                                                            type="date"
                                                            disabled={from}
                                                            onChange={this.onChange}
                                                            className="form-control"
                                                            name={from}
                                                            value={from}
                                                        />
                                                    </div>


                                                    <div className="col-lg-6 form-group">
                                                        <label>End Quarter Day</label>
                                                        <input
                                                            type="date"
                                                            disabled={toDate}
                                                            onChange={this.onChange}
                                                            className="form-control"
                                                            name={toDate}
                                                            value={toDate}
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
                                                    <div className="col-lg-6 form-group">
                                                        <label>Upload Imgge</label>
                                                        <input
                                                            type="file"
                                                            className={img.error.length > 0 ? "form-control is-invalid p-1" : "form-control p-1"}
                                                            onChange={this.onSelect} />

                                                    </div>
                                                    {
                                                        img.imgUrl &&
                                                        <div className="col-lg-6 col-lg-offset-3 mb-2">
                                                            <img src={img.imgUrl} alt="img" />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <Link to={CONSTANT.url.perquisites.entertainmentAllowance} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
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


    onSelect = (e: any) => {
        let files = e.target.files
        if (files && files.length) {
            if (files[0].size <= 1000000)
                this.setState({
                    img: { ...this.state.img, value: files[0], imgUrl: URL.createObjectURL(files[0]) }
                })
            else
                window.alert("File cannot be larger than 1 MB!")
        }
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value, () => {
        });
    }

    setQuarterDate = () => {
        let startDateOfPreviousQuarter = moment().startOf('quarter').format('YYYY-MM-DD')
        let endDateOfPreviousQuarter = moment().endOf('quarter').format('YYYY-MM-DD')

        this.setState({ from: moment(startDateOfPreviousQuarter).subtract(1, 'quarter').format('YYYY-MM-DD') });
        this.setState({ toDate: moment(endDateOfPreviousQuarter).subtract(1, 'quarter').format('YYYY-MM-DD') })
    }

    private onSubmit = (e: any) => {
        e.preventDefault()
        if (validateForm(this)) {
            this.setState({ showLoader: true });
            let model: any = {
                id: this.state.id,
                file: this.state.img.value,
                date: this.state.from,
                toDate: this.state.toDate,
                amount: this.state.amount.value,
            }
            model = appendFile(model)
            apply(model).then((res: any) => {
                this.setState({ showLoader: false })
                if (res) {
                    alert('record update sucessfully')
                    this.props.history.push(CONSTANT.url.perquisites.entertainmentAllowance)
                }
            })

        }
    }
}

export default ComponentName;
