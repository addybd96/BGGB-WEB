import * as React from 'react';
import { getCountryList, getStateList } from './../../action/GeographyActions';
import { onChange, setOptions, validateForm } from './../../utils';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: detail ? detail.id : 0,
            name: { name: 'name', value: detail ? detail.name : '', error: '', isRequired: true },
            countryId: { name: 'countryId', value: detail ? detail.countryId : '', error: '', isRequired: true, options: [] },
            stateId: { name: 'stateId', value: detail ? detail.stateId : '', error: '', isRequired: true, options: []},
            adminId: { name: 'adminId', value: detail && detail.adminId ? detail.adminId : '', error: '', isRequired: false, options: [] }
        }
    }

    componentDidMount() {
        this.getCountryList();
        if (this.state.id !== 0) {
            this.getStateList();
        }
    }

    public render() {
        const { id, name, countryId, stateId, adminId } = this.state;
        const { users } = this.props
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                Region detail
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <select
                                                className={countryId.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={countryId.name}
                                                value={countryId.value}
                                                onChange={this.onChange}
                                            >
                                                <option>Select country</option>
                                                {
                                                    countryId.options.map(function (item: any, index: number) {
                                                        return (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>State/Provience</label>
                                            <select
                                                className={stateId.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={stateId.name}
                                                value={stateId.value}
                                                onChange={this.onChange}
                                            >
                                                <option>Select state/provience</option>
                                                {
                                                    stateId.options.map(function (item: any, index: number) {
                                                        return (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Regional Admin</label>
                                            <select
                                                className={adminId.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={adminId.name}
                                                value={adminId.value}
                                                onChange={this.onChange}
                                            >
                                                <option>Select admin</option>
                                                {
                                                    users.map(function (item: any, index: number) {
                                                        return (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Region Name</label>
                                            <input
                                                className={name.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                name={name.name}
                                                value={name.value}
                                                onChange={this.onChange}
                                                placeholder="Name of the region"
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
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-sm btn-block btn-primary">Save changes</button>
                    </div>
                </div>
            </form>
        )
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value, () => {
            if (name === this.state.countryId.name) {
                this.getStateList();
            }
        });
    }

    getCountryList = () => {
        getCountryList().then((res: any) => {
            setOptions(this, this.state.countryId.name, res.result);
        });
    }

    getStateList = () => {
        const { countryId } = this.state;

        onChange(this, this.state.stateId.name, '');
        setOptions(this, this.state.stateId.name, [], () => {
            getStateList(countryId.value).then((res: any) => {
                setOptions(this, this.state.stateId.name, res.result);
            });
        });
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const { id, countryId, stateId, name, adminId } = this.state;
            const model: any = {
                countryId: countryId.value,
                stateId: stateId.value,
                name: name.value,
                adminId: adminId.value
            };
            if (id !== 0) {
                model.id = id;
            }
            this.props.onSubmit(model);
        }
    }
}

export default ComponentName;
