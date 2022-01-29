import * as React from 'react';
import { onChange, setOptions, isEmpty, setError, validateForm } from './../../utils';
import Loader from '../../component/common/Loader';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import CONSTANT from '../../constant';

import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';


import { getAllGeofencingEmp, deleteGeofencing } from './../../action/GeofencingActions';
import { getAllEmployeeList } from './../../action/EmployeeAction';

class EditGeofencingComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            showLoader: true,
            groupName: { name: 'groupName', value: '', error: '', isRequired: true, },
            radius: { name: 'radius', value: '', error: '', isRequired: true, },
            marker: { show: false, lat: '', lng: '' },
            employeeIds: { name: 'employeeIds', value: [], error: '', isRequired: true, options: [] },
        }

        this._onChange = this._onChange.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.setState({ showLoader: true })
        getAllEmployeeList().then((res: any) => {
            setOptions(this, this.state.employeeIds.name, res.result);
        });
        getAllGeofencingEmp(this.props.code).then((res: any) => {

            if (res.result) {
                this.setState({
                    showLoader: false, groupName: { ...this.state.groupName, value: res.result.geo.groupName },
                    radius: { ...this.state.radius, value: res.result.geo.radius },
                    employeeIds: { ...this.state.employeeIds, value: res.result.emps },
                    marker: { show: true, lat: res.result.geo.lat, lng: res.result.geo.lng }
                })
            }
            //setOptions(this, this.state.employeeIds.name, res.result);
        });
    }

    public render() {
        const { employeeIds, groupName, showLoader, radius } = this.state;
        //console.table([empId, fromDate, toDate, dayType, type, reason, showLoader])

        if (showLoader)
            return (<Loader />)
        const style = {
            width: '700px',
            height: '500px',
            position: 'relative !important'
        }
        return (
            <React.Fragment>
                <div className="col-md-6">
                    <Map
                        style={{ height: '90%', width: '97%' }}
                        google={this.props.google}
                        initialCenter={this.state.marker ? {
                            lat: this.state.marker.lat,
                            lng: this.state.marker.lng
                        } : {
                                lat: 28.5774,
                                lng: 77.3145
                            }}
                        onClick={this.onMapClicked}
                    >
                        {this.state.marker.show ? <Marker
                            name={'Here...'}
                            position={{ lat: this.state.marker.lat, lng: this.state.marker.lng }} /> : null}
                    </Map>
                </div>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header"><b>Geofencing Form</b></div>
                        <div className="card-body">
                            <form onSubmit={this._submitForm}>
                                <div className="form-group">
                                    <label>Group Name </label>
                                    <input type="text" name={groupName.name} value={groupName.value}
                                        onChange={this._onChange} className={groupName.error.length > 0 ? "form-control is-invalid" : "form-control"} />

                                </div>
                                <div className="form-group">
                                    <label>Group Radius(Meter) </label>
                                    <input type="number" name={radius.name} value={radius.value}
                                        onChange={this._onChange} className={radius.error.length > 0 ? "form-control is-invalid" : "form-control"} />

                                </div>
                                <div className="form-group">
                                    <label>Employees </label>
                                    <Typeahead
                                        id="ta-employee-ids"
                                        allowNew={false}
                                        labelKey={(option: any) => `${option.name} `}
                                        name={employeeIds.name}
                                        selected={employeeIds.value}
                                        multiple={true}
                                        options={employeeIds.options}
                                        onChange={(e: any) => this.typeaheadOnChange(employeeIds.name, e)}
                                        placeholder="List of employees"
                                        isInvalid={employeeIds.error.length > 0} />

                                </div>
                                <div className="col-lg-12 ">
                                    <button type="submit" className="col-lg-2 btn btn-sm btn-primary pull-right">Submit</button>
                                    <button onClick={this.handleDelete} className="col-lg-2 btn btn-sm btn-danger pull-right mr-2">Delete</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }

    onMapClicked(e: any, t: any, coords: any) {
        const { latLng } = coords;
        this.setState({ marker: { show: true, lat: latLng.lat(), lng: latLng.lng() } })
    }

    typeaheadOnChange = (name: string, e: any) => {
        let value = e;
        if (e.length > 0 && e[0].customOption) {
            value = [{ name: e[0].name }];
        }
        onChange(this, name, value);
    }

    handleDelete(){
        var cnf = window.confirm("are you sure ?")
        if(cnf)
        deleteGeofencing(this.props.code)
        .then((res: any) => {
            this.props.goToList()
        })
        .catch((err: any) => {
            alert(err)

        })
    }

    handleLocationChange(e: any) {

    }

    renderDepartmentSelect = (type: any) => {
        if (this.state.leaveTypes.options)
            return (<select name={type.name} value={type.value}
                onChange={this._onChange} className={type.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                <React.Fragment>
                    <option>--Select--</option>
                    {this.state.leaveTypes.options.map((dep: any, dIndex: number) => {
                        return (<option key={dIndex} value={dep.leaveTypeId}>{dep.leaveTypeName}</option>)
                    })}
                </React.Fragment>
            </select>)
        else
            return null;
    }

    private _onChange = (e: any, callback?: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    private _setError = (name: string, error: string) => {
        setError(this, name, error);
    }



    private _clearFormError() {
        this._setError('isFormValid', '')
        this._setError('fromDate', '');
        this._setError('toDate', '');
        this._setError('dayType', '');
        this._setError('type', '');
        this._setError('reason', '');
    }

    private _getJsonToPOST(state: any) {
        const { employeeIds, groupName, showLoader, radius, marker } = this.state;

        const jsonToReturn = {
            groupName: groupName.value,
            radius: radius.value,
            employeeIds: employeeIds.value.map((e: any) => e.id),
            lat: marker.lat,
            lng: marker.lng,
            id: this.props.code
        };

        return jsonToReturn;
    }

    _submitForm = (e: any) => {
        e.preventDefault();
        this._clearFormError();

        if (!this.state.marker.show) {
            alert("Pick a location on the map too!")
            return;
        }
        console.log('state', this.state)
        if (validateForm(this)) {
            const model = this._getJsonToPOST(this.state);
            //console.log(this.state)
            console.log(model)
            this.props.onSubmit(model);
        }
    }
}

export default EditGeofencingComponent
