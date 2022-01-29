import * as React from 'react';
import { onChange, validateForm, isEquivalent } from '../../utils';

class EmployeeAddress extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail1 = this.props.detail[0] && this.props.detail[0].isPermanent ? this.props.detail[0] : this.props.detail[1]
        const detail2 = this.props.detail[0] && this.props.detail[0].isPermanent ? this.props.detail[1] : this.props.detail[0]
        console.log(detail1, detail2)
        this.state = {
            userId: props.userId,
            country1: { value: detail1 ? detail1.country : '', name: 'country1', error: '', isRequired: true, show: true },
            state1: { value: detail1 ? detail1.state : '', name: 'state1', error: '', isRequired: true, show: true },
            city1: { value: detail1 ? detail1.city : '', name: 'city1', error: '', isRequired: true, show: true },
            address1: { value: detail1 ? detail1.address : '', name: 'address1', error: '', isRequired: true, show: true },
            pinCode1: { value: detail1 ? detail1.pinCode : '', name: 'pinCode1', error: '', isRequired: true, show: true },
            country2: { value: detail2 ? detail2.country : '', name: 'country2', error: '', isRequired: true, show: true },
            state2: { value: detail2 ? detail2.state : '', name: 'state2', error: '', isRequired: true, show: true },
            city2: { value: detail2 ? detail2.city : '', name: 'city2', error: '', isRequired: true, show: true },
            address2: { value: detail2 ? detail2.address : '', name: 'address2', error: '', isRequired: true, show: true },
            pinCode2: { value: detail2 ? detail2.pinCode : '', name: 'pinCode2', error: '', isRequired: true, show: true },
            sameAsPermanent: props.detail.length > 0 && (isEquivalent(props.detail[0], props.detail[1], "id"))
        }
        this._setError = this._setError.bind(this)

    }

    public render() {
        const { sameAsPermanent, country1, state1, city1, address1, pinCode1, country2, state2, city2, address2, pinCode2 } = this.state;
        const { isu, freezed } = this.props
        let disabled = isu === 'true' ? false : freezed
        return (
            <React.Fragment >
                <div className="card mt-3">
                    <div className="h5 ml-3 mt-3"> <div className="row">
                        <div className="col-md-2">
                            Permanent Address
                            </div>
                        <div className="col-md-9">

                        </div>
                        <div className="col-md-1">
                            {isu === 'true' ? this.renderFreezeButtons(freezed) : null}
                        </div>
                    </div> </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-lg-4 form-group">
                                    <label>Country *</label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={country1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter country"
                                        name={country1.name}
                                        value={country1.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-4 form-group">
                                    <label>State *</label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={state1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter state"
                                        name={state1.name}
                                        value={state1.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-4 form-group">
                                    <label>City *</label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={city1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter city"
                                        name={city1.name}
                                        value={city1.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-8 form-group">
                                    <label>Address *</label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={address1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter address"
                                        name={address1.name}
                                        value={address1.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-4 form-group">
                                    <label>Pincode *</label>
                                    <input
                                        disabled={isu === 'true' ? false : freezed}
                                        type="text"
                                        className={pinCode1.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter pincode"
                                        name={pinCode1.name}
                                        value={pinCode1.value}
                                        onChange={this.onChange}
                                    />

                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-3">
                                    <h5 className="kt-section__title kt-section__title-sm">
                                        Correspondence Address
                                                </h5>
                                </div>
                                <div className="col-md-4">
                                    <label><input checked={sameAsPermanent} type="checkbox" onChange={this.onChangeSameAsAbove} />*Same as above</label>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-lg-4 form-group">
                                    <label>Country *</label>
                                    <input
                                        disabled={sameAsPermanent || disabled}
                                        type="text"
                                        className={country2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter country"
                                        name={country2.name}
                                        value={country2.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-4 form-group">
                                    <label>State *</label>
                                    <input
                                        disabled={sameAsPermanent || disabled}
                                        type="text"
                                        className={state2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter state"
                                        name={state2.name}
                                        value={state2.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-4 form-group">
                                    <label>City *</label>
                                    <input
                                        disabled={sameAsPermanent || disabled}
                                        type="text"
                                        className={city2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter city"
                                        name={city2.name}
                                        value={city2.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-8 form-group">
                                    <label>Address *</label>
                                    <input disabled={sameAsPermanent || disabled}
                                        type="text"
                                        className={address2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter address"
                                        name={address2.name}
                                        value={address2.value}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-lg-4 form-group">
                                    <label>Pincode *</label>
                                    <input disabled={sameAsPermanent || disabled}
                                        type="text"
                                        className={pinCode2.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                        placeholder="Enter pincode"
                                        name={pinCode2.name}
                                        value={pinCode2.value}
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
                            <button onClick={this.onSubmit} className="btn btn-primary btn-sm">Save & Continue</button>
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

    onChangeSameAsAbove = (e: any) => {
        const { country2, state2, city2, address2, pinCode2 } = this.state
        let checked = e.target.checked
        this.setState({
            sameAsPermanent: checked,
            country2: { ...country2, isRequired: !checked, error: checked ? '' : country2.error },
            state2: { ...state2, isRequired: !checked, error: checked ? '' : state2.error },
            city2: { ...city2, isRequired: !checked, error: checked ? '' : city2.error },
            address2: { ...address2, isRequired: !checked, error: checked ? '' : address2.error },
            pinCode2: { ...pinCode2, isRequired: !checked, error: checked ? '' : pinCode2.error },
        })
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
            var model1 = {
                userId: parseInt(st.userId, 10),
                country: st.country1.value,
                state: st.state1.value,
                city: st.city1.value,
                address: st.address1.value,
                pinCode: st.pinCode1.value,
                isPermanent: true
            };

            var model2;

            console.log(st.sameAsPermanent, 'same')

            if (st.sameAsPermanent)
                model2 = { ...model1, isPermanent: false }
            else
                model2 = {
                    userId: parseInt(st.userId, 10),
                    country: st.country2.value,
                    state: st.state2.value,
                    city: st.city2.value,
                    address: st.address2.value,
                    pinCode: st.pinCode2.value,
                    isPermanent: false
                }

            //insert id
            if (this.props.detail[0]) {
                model1 = Object.assign({ ...model1 }, { id: this.props.detail[0].id })
            }

            if (this.props.detail[1]) {
                model2 = Object.assign({ ...model2 }, { id: this.props.detail[1].id })
            }

            const payload = [model1, model2]
            console.log('pay', payload)
            this.props.onSubmit(payload);
        }
    }

}

export default EmployeeAddress;
