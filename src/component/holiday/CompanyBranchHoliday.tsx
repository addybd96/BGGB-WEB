import * as React from 'react';
import * as moment from 'moment'

import Loader from '../common/Loader'
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import AddHolidayModal from './AddHolidayModal';
import { getCompanyBranch } from '../../action/CompanyBranchAction'
import ModalWindow from '../../component/common/ModalWindow'
import { addCompanyBranchCalender, getHolidayType, getCompanyBranchCalendar } from '../../action/CompanyBranchCalendar'

class AddHoliday extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false,
            isModalOpen: false,
            branch: { value: '', error: '' },
            locations: [
                { id: '1', name: 'Noida' },
                { id: '2', name: 'Gurgaon' },
            ],
            weekend: [],
            week: [
                { value: 0, name: "Sunday" },
                { value: 1, name: "Monday" },
                { value: 2, name: "Tuesday" },
                { value: 3, name: "Wednesday" },
                { value: 4, name: "Thursday" },
                { value: 5, name: "Friday" },
                { value: 6, name: "Saturday" },
            ],

            month: [
                { id: 0, name: "January" },
                { id: 0, name: "February" },
                { id: 0, name: "March" },
                { id: 0, name: "April" },
                { id: 0, name: "May" },
                { id: 0, name: "June" },
                { id: 0, name: "July" },
                { id: 0, name: "August" },
                { id: 0, name: "September" },
                { id: 0, name: "October" },
                { id: 0, name: "November" },
                { id: 0, name: "December" },
            ],
            holidayType: [],
            holidays: [],
            stagedHolidays: [],
            selectedWeekend: []

        }

        this._dismissModal = this._dismissModal.bind(this)
        this._submitModal = this._submitModal.bind(this)
        this._onChange = this._onChange.bind(this)
        this._onCheckChange = this._onCheckChange.bind(this)
        this._saveChanges = this._saveChanges.bind(this)
        this._onLocationChange = this._onLocationChange.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.loadCompanyCalendar = this.loadCompanyCalendar.bind(this)
    }

    componentDidMount() {
        this.setState({ showLoader: true })
        getHolidayType('', 1, 20).then((resp: any) => {
            this.setState({ holidayType: resp.result })
        }).catch((err: any) => {
            console.log('err', err)
        })
        getCompanyBranch().then((resp: any) => {
            this.setState({ locations: resp.result, showLoader: false, branch: { ...this.state.branch, value: resp.result[0].branchId } })
            if (resp.result[0])
                this.loadCompanyCalendar(resp.result[0].branchId)

        }).catch((err: any) => {
            console.log('err', err)
        })


    }

    public render() {
        // const { isModalOpen } = this.state;
        const { showLoader } = this.state
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            {showLoader ? <Loader /> : <div className="col-lg-11 mt-4">
                                <div className="col-lg-12">
                                    <div className="col-lg-12 mt-4">
                                        <div className="row">
                                            <div className="col-lg-6 pl-0">
                                                <h5 className="heading-h1">Company Branch Holidays </h5>
                                            </div>
                                            <div className="col-lg-4 pl-0"></div>
                                            <div className="col-lg-2 pl-0">
                                                {this.renderLocationSelectItems()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mt-2">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <b>Select Weekend</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-12 form-row w-100">

                                                            <div className="d-flex justify-content-between w-100">
                                                                {this.renderWeekCheckboxes()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-4">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-md-2">

                                                    <b>Holidays</b>
                                                </div>
                                                <div className="col-md-8">
                                                    &nbsp;
                                                </div>
                                                <div className="col-md-2">
                                                    <a onClick={(e) => { e.preventDefault(); this.setState({ isModalOpen: true }) }} className="common-btn btn-block text-center" href="add-holiday.html"><i className="fa fa-plus-circle"></i>&nbsp;Add Holiday</a>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {this.state.stagedHolidays ? <table className="table table-striped">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="text-center">Name</th>
                                                        <th className="text-center">Date</th>
                                                        <th className="text-center">Type</th>
                                                        <th className="text-center">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.renderStagedHolidayTable()}
                                                    {this.renderHolidayTable()}
                                                </tbody>
                                            </table> : <div className="text-center">
                                                    Start by clicking "Add Holiday".
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-4 mb-4">
                                    <div className="row">

                                        <div className="col-md-9">
                                            &nbsp;
                                </div>
                                        <div className="col-md-3">
                                            <a className="common-btn btn-block text-center" onClick={this._saveChanges} >Save Changes</a>
                                        </div>
                                    </div>
                                </div>

                            </div>}
                        </div>
                    </div>
                </div>
                {
                    this.state.isModalOpen ? <ModalWindow
                        title="Add Holiday"
                        backdrop="static"
                        toggleModal={this.toggleModal}>
                        <AddHolidayModal holidayType={this.state.holidayType} isModalOpen={this.state.isModalOpen} dismissModal={this._dismissModal} onSubmitModal={this._submitModal} />
                    </ModalWindow> : null
                }
            </React.Fragment>
        )
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    _dismissModal = () => {
        this.setState({ isModalOpen: false })
    }

    private _onChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: { ...this.state[name], value } }, callback);
    }

    private _onLocationChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: { ...this.state[name], value }, showLoader: true }, callback);
        this.loadCompanyCalendar(value)
    }

    private loadCompanyCalendar = (value: any) => {
        getCompanyBranchCalendar(value).then((resp: any) => {
            this.setState({ weekend: resp.result.weekend, holidays: resp.result.holidays, showLoader: false })
        }).catch((err: any) => {
            console.log('err', err)
        })
    }

    private _onCheckChange(e: any, callback?: any) {
        let weekend = this.state.selectedWeekend.slice(0);
        weekend = new Set(weekend)
        if (e.target.checked) {
            weekend.add(e.target.value)
        }
        else {
            weekend.delete(e.target.value)
        }
        this.setState({ selectedWeekend: Array.from(new Set(weekend)) })
    }


    renderLocationSelectItems = () => {
        if (this.state.locations)
            return (<select name="branch" className="form-control" value={this.state.branch.value} onChange={this._onLocationChange}>
                <React.Fragment>
                    <option>Select Branch</option>
                    {this.state.locations.map((dep: any, dIndex: number) => {
                        return (<option key={dIndex} value={dep.branchId}>{dep.branchName}</option>)
                    })}
                </React.Fragment>
            </select>)
    }

    renderWeekCheckboxes = () => {
        const { weekend, selectedWeekend } = this.state
        return this.state.week.map((day: any, index: number) => {
            return (<div key={index} className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" value={day.value} checked={weekend.includes(day.value) || selectedWeekend.includes(day.value.toString())} name={"chk." + day.name} onChange={this._onCheckChange} />
                <label className="form-check-label">{day.name}</label>
            </div>)
        })
    }

    renderHolidayTable = () => {
        return this.state.holidays.map((holiday: any, hIndex: number) => {
            return (<tr key={hIndex}>
                <td className="text-center">{holiday.holidayName}</td>
                <td className="text-center">{moment(holiday.holidayDate).format("YYYY-MM-DD")}</td>
                <td className="text-center">{holiday.holidayType}</td>
                <td className="text-center">{holiday.description}</td>
            </tr>)
        })
    }

    renderStagedHolidayTable = () => {
        return this.state.stagedHolidays.map((holiday: any, hIndex: number) => {
            return (<tr key={hIndex}>
                <td className="text-center">{holiday.name}</td>
                <td className="text-center">{holiday.date}</td>
                <td className="text-center">{holiday.type}</td>
                <td className="text-center">{holiday.description}</td>
            </tr>)
        })
    }

    _submitModal = (data: any) => {

        let holidays = this.state.stagedHolidays.slice(0)
        holidays.push(data)
        this.setState({ isModalOpen: false, stagedHolidays: holidays })
    }

    _saveChanges(e: any) {
        //e.preventDefaults()
        let payload = {
            weekend: this.state.selectedWeekend,
            holidays: this.state.stagedHolidays,
            branchId: this.state.branch.value
        }
        addCompanyBranchCalender(payload).then((resp: any) => {
            console.log('payload', payload)
            console.log('resp', resp)
        })
    }

}

export default AddHoliday;
