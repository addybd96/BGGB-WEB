import * as React from 'react';
import * as moment from 'moment'
import NumberFormat from 'react-number-format';
import { onChange, validateForm, isEmpty, getCookie, setOptions } from '../../utils';
import CONSTANT from './../../constant';
import { getSalaryStatusList } from './../../action/SalaryComponentActions';

class EmployeeSalaryProfile extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        const work = props.work;

        let dateOfJoiningBank = null;

        if (work && work.dateOfJoiningBank) {
            dateOfJoiningBank = moment(work.dateOfJoiningBank)
        }

        this.state = {
            userId: props.userId,
            basic: { value: detail && detail.basic ? detail.basic.toString() : '', name: 'basic', error: '', isRequired: true },
            pqp: { value: detail && detail.pqp ? detail.pqp.toString() : '0', name: 'pqp', error: '', isRequired: true },
            sppay: { value: detail && detail.sppay ? detail.sppay.toString() : '0', name: 'sppay', error: '', isRequired: true },
            prov: { value: detail && detail.prov ? detail.prov.toString() : '0', name: 'prov', error: '', isRequired: false },
            rent: { value: detail && detail.rent ? detail.rent.toString() : '0', name: 'rent', error: '', isRequired: false },
            nps: { value: detail && detail.nps ? detail.nps.toString() : '0', name: 'nps', error: '', isRequired: false },
            optHundredFiftyHRA: { value: detail && detail.optHundredFiftyHRA ? detail.optHundredFiftyHRA : false, name: 'optHundredFiftyHRA', error: '', isRequired: false },
            dateOfJoiningBank: dateOfJoiningBank ? new Date(work.dateOfJoiningBank) : null,
            salaryStatusId: { value: detail && detail.salaryStatusId ? detail.salaryStatusId : '', name: 'salaryStatusId', error: '', isRequired: true, options: [] },
            userType: undefined
        }

    }
    componentDidMount() {
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        this.setState({ userType: userDetail.userType });
        this.setState({ showLoader: true, userType: userDetail.userType });

        getSalaryStatusList().then((res: any) => {
            setOptions(this, this.state.salaryStatusId.name, res.result);
        });
    }

    public render() {
        const { sppay, pqp, basic, dateOfJoiningBank, prov, nps, rent, optHundredFiftyHRA, userType, salaryStatusId } = this.state;

        let date = new Date("2010-04-01");
        return (
            <form onSubmit={this.onSubmit}>
                <div className="card mt-3">
                    <div className="card-header">
                        Salary Profile
                                </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 form-group">
                                <label>Basic</label>
                                <NumberFormat
                                    allowLeadingZeros={false}
                                    allowNegative={false}
                                    thousandSeparator={true}
                                    className={basic.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter Basic"
                                    name={basic.name}
                                    value={basic.value}
                                    onChange={this.onChange}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-lg-2 form-group d-flex justify-content-center align-items-center mt-4">
                                <label className="mt-1">Opt 150% HRA ?&nbsp;&nbsp;&nbsp; </label>
                                <input type="checkbox" onChange={this.onCheckboxChange} checked={optHundredFiftyHRA.value} disabled={userType === 'sadmin' || userType === 'radmin' ? false : true} />

                            </div>
                            {optHundredFiftyHRA.value && <div className="col-lg-4 form-group">
                                <label>Rent</label>
                                <NumberFormat
                                    allowLeadingZeros={false}
                                    allowNegative={false}
                                    thousandSeparator={true}
                                    className={rent.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter Rent"
                                    name={rent.name}
                                    value={rent.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                />
                            </div>}
                        </div>
                        <div className="row">
                            <div className="col-lg-6 form-group">
                                <label>SP Pay</label>
                                <NumberFormat
                                    allowLeadingZeros={false}
                                    allowNegative={false}
                                    thousandSeparator={true}
                                    className={sppay.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter SP Pay"
                                    name={sppay.name}
                                    value={sppay.value}
                                    onChange={this.onChange}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-lg-6 form-group">
                                <label >PQP</label>
                                <NumberFormat
                                    allowLeadingZeros={false}
                                    allowNegative={false}
                                    thousandSeparator={true}
                                    className={pqp.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter PQP"
                                    name={pqp.name}
                                    value={pqp.value}
                                    onChange={this.onChange}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            {(dateOfJoiningBank && (dateOfJoiningBank < date)) && <div className="col-lg-12 form-group">
                                <label >Prov Fund %</label>
                                <NumberFormat
                                    allowLeadingZeros={false}
                                    allowNegative={false}
                                    thousandSeparator={true}
                                    className={prov.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter Prov Fund"
                                    name={prov.name}
                                    value={prov.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                />
                            </div>}

                            {(dateOfJoiningBank && (dateOfJoiningBank > date)) && <div className="col-lg-6 form-group">
                                <label >NPS %</label>
                                <NumberFormat
                                    allowLeadingZeros={false}
                                    allowNegative={false}
                                    thousandSeparator={true}
                                    className={nps.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Enter NPS"
                                    name={nps.name}
                                    value={nps.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                />



                            </div>}
                            <div className="col-lg-6 form-group">
                                <label>Salary Status*</label>
                                <select
                                    className={salaryStatusId.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    name={salaryStatusId.name}
                                    value={salaryStatusId.value}
                                    onChange={this.onChange}
                                    disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                >
                                    <option value="">Select salary status</option>
                                    {
                                        salaryStatusId.options.map((item: any, index: number) => {
                                            return (
                                                <option value={item.id} key={index}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 pull-right pr-0 pl-0">
                    <div className="row">
                        <div className="col-lg-12 pull-right mt-3 mb-3">
                            <button type="submit" className="btn btn-primary btn-sm" disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}>Save & Continue</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    private onCheckboxChange = (e: any) => {
        this.setState({ optHundredFiftyHRA: { ...this.state.optHundredFiftyHRA, value: e.target.checked } })
    }

    onSubmit = (e: any) => {
        e.preventDefault();

        //validate prov and nps
        const { prov, nps, joiningYear, basic } = this.state
        let status = true;

       

        if (joiningYear < 2010) {
            if (isEmpty(prov.value)) {
                status = false
                this.setState({ prov: { ...prov, error: 'Cannot be Empty' } })
            }
        }
        else if (joiningYear >= 2010 && joiningYear <= 2018) {
            if (prov.value.length > 0 && nps.value.length > 0) {
                alert('Cannot Opt both Provident fund and NPS!')
                status = false
                this.setState({ prov: { ...prov, error: 'Cannot Opt both Provident fund and NPS' }, nps: { ...nps, error: 'Cannot Opt both Provident fund and NPS' } })
            }

            if (isEmpty(prov.value) && isEmpty(nps.value)) {
                status = false
                this.setState({ prov: { ...prov, error: 'Cannot be Empty' }, nps: { ...nps, error: 'Cannot be Empty' } })
            }
        }
        else if (joiningYear > 2018) {
            if (isEmpty(nps.value)) {
                status = false
                this.setState({ nps: { ...nps, error: 'Cannot be Empty' } })
            }
        }

        if (status) {
           
            this.setState({ prov: { ...prov, error: '' }, nps: { ...nps, error: '' } })
            if (validateForm(this)) {
                if(basic.value <= 0)
                {
                    alert('basic cannot be zero')
                    return;
                }

                const st = this.state;
                const model = {
                    userId: parseInt(st.userId, 10),
                    basic: parseInt(st.basic.value.replace(/,/g, ''), 10),
                    pqp: parseInt(st.pqp.value.replace(/,/g, ''), 10),
                    sppay: parseInt(st.sppay.value.replace(/,/g, ''), 10),
                    prov: parseInt(st.prov.value.replace(/,/g, ''), 10),
                    rent: parseInt(st.rent.value.replace(/,/g, ''), 10),
                    nps: parseInt(st.nps.value.replace(/,/g, ''), 10),
                    optHundredFiftyHRA: st.optHundredFiftyHRA.value,
                    salaryStatusId: st.salaryStatusId.value
                };
                this.props.onSubmit(model);
            }
        }
    }

}

export default EmployeeSalaryProfile;
