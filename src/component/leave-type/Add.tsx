import * as React from 'react';
import { onChange, validateForm } from './../../utils';

class AddComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            id: detail ? detail.id : undefined,
            name: { name: 'name', value: detail ? detail.name : '', error: '', isRequired: true },
            description: { name: 'description', value: detail ? detail.description : '', error: '', isRequired: false }
        }
    }

    public render() {
        const { name, description } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="card">
                    <div className="card-header">
                        Leave detail
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12 form-group">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    className={name.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Name of the leave"
                                    name={name.name}
                                    value={name.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-lg-12 form-group">
                                <label>Description</label>
                                <textarea
                                    rows={3}
                                    className={description.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                    placeholder="Write description"
                                    name={description.name}
                                    value={description.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-md-12"><small>* Indicates required fields</small></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-3">
                                <button type="button" onClick={this.props.onCancel} className="btn btn-sm btn-secondary btn-block">Cancel</button>
                            </div>
                            <div className="col-md-6"></div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-sm btn-primary btn-block">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    private onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const model: any = {
                name: this.state.name.value,
                description: this.state.description.value
            };
            if (this.state.id) {
                model.id = this.state.id
            }
            this.props.onSubmit(model);
        }
    }
}

export default AddComponent;
