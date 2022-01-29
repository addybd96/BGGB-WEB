import * as React from 'react';
import { onChange, validateForm } from '../../utils';

class EmployeeBankDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail1 = this.props.detail[0] && this.props.detail[0].isSalaryAccount ? this.props.detail[0] : this.props.detail[1]
        const detail2 = this.props.detail[0] && this.props.detail[0].isSalaryAccount ? this.props.detail[1] : this.props.detail[0]
        console.log(detail1, detail2)
        console.log(this.props)
        this.state = {
            accountNumber1: { value: detail1 ? detail1.accountNumber : '', name: 'accountNumber1', error: '', isRequired: true },
            accountType1: { value: detail1 ? detail1.accountType : '', name: 'accountType1', error: '', isRequired: false },
            bankName1: { value: detail1 ? detail1.bankName : 'Baroda Gujrat Gramin Bank', name: 'bankName1', error: '', isRequired: true },
            branchName1: { value: detail1 ? detail1.branchName : '', name: 'branchName1', error: '', isRequired: true },
            branchCode1: { value: detail1 ? detail1.branchCode : '', name: 'branchCode1', error: '', isRequired: true },

            accountNumber2: { value: detail2 ? detail2.accountNumber : '', name: 'accountNumber2', error: '', isRequired: true },
            accountType2: { value: detail2 ? detail2.accountType : 'Overdraft', name: 'accountType2', error: '', isRequired: false },
            bankName2: { value: detail2 ? detail2.bankName : 'Baroda Gujrat Gramin Bank', name: 'bankName2', error: '', isRequired: true },
            branchName2: { value: detail2 ? detail2.branchName : '', name: 'branchName2', error: '', isRequired: true },
            branchCode2: { value: detail2 ? detail2.branchCode : '', name: 'branchCode2', error: '', isRequired: true },
        }
        this._setError = this._setError.bind(this)
    }

    public render() {
        const { accountNumber1, accountType1, bankName1, branchName1, branchCode1, accountNumber2, accountType2, bankName2, branchName2, branchCode2 } = this.state;
        const { isu, freezed } = this.props
        return (
            <React.Fragment>
                <div className="card mt-3">
                    <div className="h5 ml-3 mt-3"><div className="row">
                        <div className="col-md-2">
                            Salary Account
                            </div>
                        <div className="col-md-9">

                        </div>
                        <div className="col-md-1">
                            {isu === 'true' ? this.renderFreezeButtons(freezed) : null}
                        </div>
                    </div>  </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-lg-6 form-group">
                                    <label>Account Number </label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={accountNumber1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter account number"
                                        name={accountNumber1.name}
                                        value={accountNumber1.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-6 form-group d-none">
                                    <label>Account Type</label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={accountType1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter account type"
                                        name={accountType1.name}
                                        value={accountType1.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>Bank Name</label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={bankName1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter bank name"
                                        name={bankName1.name}
                                        value={bankName1.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>Branch Name </label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={branchName1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter branch name"
                                        name={branchName1.name}
                                        value={branchName1.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>Branch Code </label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={branchCode1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter branch code"
                                        name={branchCode1.name}
                                        value={branchCode1.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="h5 ml-2 mt-3"> Overdraft Account </div>
                            <div className="row">
                                <div className="col-lg-6 form-group">
                                    <label>Account Number </label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={accountNumber2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter account number"
                                        name={accountNumber2.name}
                                        value={accountNumber2.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-6 form-group d-none">
                                    <label>Account Type</label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={accountType2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter account type"
                                        name={accountType2.name}
                                        value={accountType2.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>Bank Name</label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={bankName2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter bank name"
                                        name={bankName2.name}
                                        value={bankName2.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>Branch Name </label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={branchName2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter branch name"
                                        name={branchName2.name}
                                        value={branchName2.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>Branch Code </label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={branchCode2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter branch code"
                                        name={branchCode2.name}
                                        value={branchCode2.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-2 pull-right pr-0 pl-0">
                    <div className="row">
                        <div className="col-lg-12 pull-right mt-3 mb-3">
                            <button onClick={this.onSubmit} type="submit"
                                className="btn btn-primary btn-sm">Save & Continue</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    renderFreezeButtons = (freezed: any) => {
        return <button onClick={(e: any) => {
            this.props.toggleFreezed(!freezed);
        }} className="btn btn-primary" >{freezed ? 'Unlock' : 'Lock'}</button>
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    private _setError(name: string, error: string) {
        this.setState({ [name]: { ...this.state[name], error } });
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const st = this.state;
            let model1 = {
                userId: this.props.userId,
                accountNumber: st.accountNumber1.value,
                accountType: st.accountType1.value,
                bankName: st.bankName1.value,
                branchName: st.branchName1.value,
                branchCode: st.branchCode1.value,
                isSalaryAccount: true
            };
            let model2 = {
                userId: this.props.userId,
                accountNumber: st.accountNumber2.value,
                accountType: st.accountType2.value,
                bankName: st.bankName2.value,
                branchName: st.branchName2.value,
                branchCode: st.branchCode2.value,
                isSalaryAccount: false
            };

            if (this.props.detail[0]) {
                model1 = Object.assign({ ...model1 }, { id: this.props.detail[0].id })
            }

            if (this.props.detail[1]) {
                model2 = Object.assign({ ...model2 }, { id: this.props.detail[1].id })
            }

            let payload = [model1, model2]
            this.props.onSubmit(payload);
        }
    }

}

export default EmployeeBankDetail;
