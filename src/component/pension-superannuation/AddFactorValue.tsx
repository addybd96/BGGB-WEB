import * as React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { onChange, setOptions, validateForm, setError } from '../../utils';
import { getEpmList } from '../../action/salaryAllowanceAction';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: props.detail ? props.detail.id : 0,
            age: { name: 'age', value: detail && detail.age ? detail.age : '', error: '', isRequired: true },
            value: { name: 'value', value: detail && detail.value ? detail.value : '', error: '', isRequired: true },
        }
    }

    public render() {
        const { age, value } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="card mt-2">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <b>Pension Rule</b>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Age</label>
                                            <NumberFormat
                                                className={age.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={age.name}
                                                value={age.value}
                                                onChange={this.onChange}
                                                placeholder="Enter age"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Value Factor</label>
                                            <NumberFormat
                                                className={value.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={value.name}
                                                value={value.value}
                                                onChange={this.onChange}
                                                placeholder="Enter value"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <button type="button" onClick={this.props.onCancel} className="btn btn-sm btn-block btn-info">Cancel</button>
                    </div>
                    <div className="col-md-6" />
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-sm btn-block btn-primary">Save changes</button>
                    </div>
                </div>
            </form>
        )
    }

    onChange = (e: any) => {

        const name = e.target.name;
        let value = e.target.value;
        onChange(this, name, value);
    }

    loadList = () => {
        getEpmList().then((res: any) => {
            if (res && res.result)
                setOptions(this, this.state.name.name, res.result)
        })
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, age, value } = this.state;
            const model: any = {
                age: age.value,
                value: value.value
            };
            if (id !== 0) {
                model.id = id;
            }
            this.props.onSubmit(model);
        }
    }


}

export default ComponentName;