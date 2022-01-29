import * as React from 'react';
import NumberFormat from 'react-number-format';
import Loader from '../../component/common/Loader';

import { onChange, validateForm } from '../../utils';
import { updateSocietyTaxDetail } from '../../action/DeclarationAction'
class EmployeeSocity extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.userId,
            amount: { value: props.detail.samount ? props.detail.samount : '', name: 'amount', error: '', isRequired: true, show: true },
            showLoader: false

        }
    }

    public render() {
        const { amount, showLoader } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <div className="card mt-3">
                        <div className="card-header">
                            Society Details
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-lg-8 form-group">
                                        <label>Amount *</label>
                                        <NumberFormat
                                            className={amount.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                            placeholder="Enter Amount"
                                            name={amount.name}
                                            value={amount.value}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-lg-2 pull-right mt-3 d-flex justify-content-center align-items-center ">
                                        <button className="btn btn-primary btn-sm">Save</button>
                                    </div>
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

            updateSocietyTaxDetail(model).then((res: any) => {
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

export default EmployeeSocity;
