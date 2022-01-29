import * as React from 'react';

import Header from '../../component/common/Header'
import Sidebar from '../../component/common/Sidebar';
import HolidayList from '../../component/holiday/index';
import {getCompanyBranch} from '../../action/CompanyBranchAction'
import {getCompanyBranchCalendar} from '../../action/CompanyBranchCalendar';

export default class Holiday extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            holidays: [
                
            ],
            branch: {name: 'branch', value: '', error:'', options:null}
        }

        this._onLocationChange = this._onLocationChange.bind(this) 
        this.loadCompanyCalendar = this.loadCompanyCalendar.bind(this)
    }

    componentDidMount(){
        this.loadCompanyCalendar('value')
    }

    public render() {
        const { holidays } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <div className="card mt-2">
                                <b className="card-header">
                                    <div className="float-left">
                                        Holiday Calender
                                </div>
                                    {/* <div className="float-right">
                                        {this.renderLocationSelectItems()}
                                    </div> */}
                                </b>
                                <div className="card-body leave-details">
                                    <HolidayList holidays={holidays} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    toggleHolidayModal = (e: any) => {
        e.preventDefault();
        this.setState({ holidayModal: !this.state.holidayModal, modal_title: 'Add Holiday' })
    }

    renderLocationSelectItems = () => {
        if(this.state.branch.options)
        return (<select name="branch" className="form-control" value={this.state.branch.value} onChange={this._onLocationChange}>
            <React.Fragment>
                <option>Select Branch</option>
                {this.state.branch.options.map((dep: any, dIndex: number) => {
                    return (<option key={dIndex} value={dep.branchId}>{dep.branchName}</option>)
                })}
            </React.Fragment>
        </select>)
    }

    private _onLocationChange(e: any, callback?: any) {
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({ [name]: { ...this.state[name], value }, showLoader: true }, callback);

        this.loadCompanyCalendar(value)
    }

    loadCompanyCalendar = (value: any) => {
        getCompanyBranchCalendar(value).then((resp:any)=>{
            
            this.setState({holidays: resp.result.holidays, showLoader: false})
        }).catch((err:any)=>{
            console.log('err', err)
        })
    }

}