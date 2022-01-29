import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import CONSTANT from '../../../constant';
import Loader from '../../../component/common/Loader'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { apply, getBrifDateByUserId, getNewsPaperAlneById } from '../../../action/BriefCasePaperActions';
import { onChange, validateForm, appendFile } from '../../../utils';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: undefined,
            amount: { name: 'amount', value: '', error: '', isRequired: true },
            img: { name: 'img', value: '', imgUrl: '', error: '', isRequired: false },
            from: { name: 'date', value: '', isRequired: true },
            toDate: { name: 'date', value: '', isRequired: true },
            showLoader: false,
            list: [],

        }
    }

    componentDidMount() {
        this.loadData();

        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;
        const { id } = this.props.match.params
        id && this.setState({ showLoader: true })
        id && getNewsPaperAlneById({ id }).then((res: any) => {
            if (res)
                this.setState({
                    id: res.id,
                    userId: res.userId,
                    showLoader: false,
                    Status: res.status,
                    img: { ...this.state.ing, imgUrl: res.imgUrl },
                    amount: { ...this.state.amount, value: res.amount },
                    actualAmount: { ...this.state.actualAmount, value: res.actualAmount },
                    from: { ...this.state.date, value: moment(res.date).format("YYYY-MM-DD") },
                    status: { ...this.state.status, value: res.status === "pending" ? '' : res.status },
                })
        })

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
                                        <b>Apply for Brief Case </b>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12 mb-2">
                                                <div className="row">

                                                    <div className="col-lg-6 form-group">
                                                        <label>From</label>
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
                                                        <label>To Date</label>
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
                                                    {!this.props.match.params.id &&
                                                        <div className="col-lg-6 form-group">
                                                            <label>Upload Imgge</label>
                                                            <input
                                                                type="file"
                                                                className={img.error.length > 0 ? "form-control is-invalid p-1" : "form-control p-1"}
                                                                onChange={this.onSelect} />

                                                        </div>}
                                                    <div className="col-lg-6 col-lg-offset-3 mb-2">
                                                        {this.props.match.params.id &&
                                                            <img src={`${process.env.REACT_APP_BASE_URL}/userBriefCase/${img.imgUrl}`} alt="" />
                                                        }
                                                        {!this.props.match.params.id && img.imgUrl &&
                                                            <img src={img.imgUrl} alt="img" />
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                            {!this.props.match.params.id &&
                                                <div className="col-lg-12 ">
                                                    <Link to={CONSTANT.url.perquisites.briefCasePaperAllowance} className="col-lg-2 btn primary-control pull-left">Cancel</Link>
                                                    <button type="submit" className="col-lg-2 btn primary-control pull-right">Submit</button>
                                                </div>}
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


    private onSubmit = (e: any) => {
        e.preventDefault()
        if (this.props.match.params.id)
            return

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
                    this.props.history.push(CONSTANT.url.perquisites.briefCasePaperAllowance)
                }
            })

        }
    }

    loadData = (status?: any) => {
        this.setState({ showLoader: true })
        getBrifDateByUserId({ status }).then((res: any) => {
            this.setState({ showLoader: false })
            if (res) {
                this.setState({ list: res ? res : [] });
                this.setupDays(3);
            }
        })
        
    }


    calculateAllowanceDate = (fromDate: any, toDate: any) => {
        let currentDate = moment().format('YYYY-MM-DD')
        if (fromDate <= currentDate && toDate >= currentDate) {
            return true;
        } else {
            return false;
        }
    }

    setupDays = (addYears: any) => {
        const { list } = this.state;

        if (list.doj != null) {
            let toDate = moment(list.doj).add(addYears, 'year').format('YYYY-MM-DD');
            let fromDate = moment(list.doj).format('YYYY-MM-DD');
            let data = this.calculateAllowanceDate(fromDate, toDate)
            while (data != true) {
                fromDate = moment(toDate).subtract(1,'days').format('YYYY-MM-DD');
                toDate = moment(toDate).add(addYears, 'year').format('YYYY-MM-DD');
                data = this.calculateAllowanceDate(fromDate, toDate)
            }
            if (data == true) {
                this.setState({
                    toDate: moment(fromDate).subtract(1,'days').add(addYears,'year').format('YYYY-MM-DD'),
                    from: fromDate
                })
            }
        } else {
            let toDate = moment(list.date).add(addYears, 'year').format('YYYY-MM-DD');
            let fromDate = moment(list.date).format('YYYY-MM-DD');
            let data = this.calculateAllowanceDate(fromDate, toDate)
            while (data != true) {
                fromDate = moment(toDate).add(1, 'days').format('YYYY-MM-DD');
                toDate = moment(toDate).add(addYears, 'year').format('YYYY-MM-DD');
                data = this.calculateAllowanceDate(fromDate, toDate)
            }
            if (data == true) {
                this.setState({
                    toDate: moment(toDate).subtract(1,'days').format('YYYY-MM-DD'),
                    from: fromDate
                })
            }

        }

    }

}

export default ComponentName;
