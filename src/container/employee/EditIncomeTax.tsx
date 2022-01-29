import * as React from 'react';

import NumberFormat from 'react-number-format';
import Loader from '../../component/common/Loader';
import CONSTANT from './../../constant';
import { onChange, validateForm, getCookie, } from '../../utils';
import { updateIncomeTaxDetail } from '../../action/DeclarationAction';

class EmployeeIncomdeTax extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const userDetail = getCookie(CONSTANT.cookie.userDetail)
      
        const taxRegimeOptions = [
            { value: 'old', name: 'Old' },
            { value: 'new', name: 'New' }
        ]
        this.state = {
            userId: props.userId,
            taxRegime: { value: props.detail && props.detail.taxRegime ? props.detail.taxRegime : '', name: 'taxRegime', error: '', isRequired: false, options: taxRegimeOptions },
            amount: { value: props.detail.iamount ? props.detail.iamount : '', name: 'amount', error: '', isRequired: true, show: true },
            showLoader: false,
            userType: userDetail.userType
        }
    }

    componentDidMount() {
    }

    public render() {
        const { amount, showLoader, taxRegime, userType } = this.state
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <div className="card mt-3">
                        <div className="card-header">
                            Income Tax Details
                                </div>
                        <div className="card-body">
                            <form>
                                <div className="row">

                                    <div className="col-lg-7 form-group">
                                        <label>Amount *</label>
                                        <NumberFormat
                                            className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder="Enter Amount"
                                            name={amount.name}
                                            value={amount.value}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    <div className="col-lg-3 form-group">
                                        <label>Tax Regime</label>
                                        <select
                                            className={taxRegime.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                            name={taxRegime.name}
                                            value={taxRegime.value}
                                            onChange={this.onChange}
                                            disabled={userType === 'sadmin' || userType === 'radmin' ? false : true}
                                        >
                                            <option>Select a Tax Regime</option>
                                            {
                                                taxRegime.options.map(function (item: any, index: number) {
                                                    return (
                                                        <option key={index} value={item.value}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    {(userType === 'sadmin' || userType === 'radmin') &&
                                        <div className="col-lg-2 pull-right d-flex justify-content-center align-items-center mt-3">
                                            <button onClick={this.onSubmit} className="btn btn-primary btn-sm">Save</button>
                                        </div>}
                                </div>
                            </form>
                        </div>
                    </div>
                </form>
                {
                    showLoader && <Loader />
                }
            </React.Fragment>
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const st = this.state;
            const model = {
                userId: parseInt(st.userId, 10),
                amount: st.amount.value,
                taxRegime: st.taxRegime.value,
            };
            this.setState({ showLoader: true });

            updateIncomeTaxDetail(model).then((res: any) => {
                this.setState({ showLoader: false });
                alert('Changes were saved successfully');
                this.props.loadList()
            }, (error: any) => {
                alert(error.message);
                this.setState({ showLoader: false });

            });
        }
    }

}

export default EmployeeIncomdeTax;
