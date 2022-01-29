import * as React from 'react';
import NumberFormat from 'react-number-format';
import Loader from '../../component/common/Loader';
import CONSTANT from './../../constant';

import { onChange, validateForm, getCookie } from '../../utils';
import { updateUnionDetail } from '../../action/DeclarationAction'

class EmployeeUnion extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const userDetail = getCookie(CONSTANT.cookie.userDetail)
        const detail = props.detail;
        this.state = {
            userId: props.userId,
            amount: { value: props.detail.uamount ? props.detail.uamount : '', name: 'amount', error: '', isRequired: true, show: true },
            userType: userDetail.userType
        }
    }

    public render() {
        const { amount, showLoader, userType } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <div className="card mt-3">
                        <div className="card-header">
                            Union Details
                                </div>
                        <div className="card-body">
                            <form>
                                <div className="row">

                                    <div className="col-lg-8 form-group">
                                        <label>Amount *</label>
                                        <NumberFormat
                                            className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder="Enter Ammount"
                                            name={amount.name}
                                            value={amount.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    {(userType === 'sadmin' || userType === 'radmin') &&
                                        <div className="col-lg-2 pull-right mt-3 d-flex justify-content-center align-items-center ">
                                            <button className="btn btn-primary btn-sm">Save</button>
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
            };
            this.setState({ showLoader: true });

            updateUnionDetail(model).then((res: any) => {
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

export default EmployeeUnion;
