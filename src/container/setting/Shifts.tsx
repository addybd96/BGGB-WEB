import * as React from 'react'

import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ShiftsModal from '../../component/setting/ShiftsModal';

export default class Shifts extends React.Component<any, any>{

    constructor(props: any)
    {
        super(props);
        this.state = {
            shifts: [
                { name: 'Day', startTime: '08:00', endTime: '19:00', comments: 'Good game, well played!', workingHours: '09:30'},
                { name: 'Night', startTime: '22:00', endTime: '09:00', comments: 'Good game, well played!', workingHours: '09:30'},
                { name: 'Day-Night', startTime: '16:00', endTime: '03:00', comments: 'Good game, well played!', workingHours: '09:30'},
            ],
            isModalOpen: true
        }

        this.dismissModal = this.dismissModal.bind(this);
    }

    render() {
        return (<React.Fragment>
            <Header />
            <Sidebar />

            <section>
                <div className="col-lg-12 main-container">
                    <div className="fluid-container">
                        <div className="row">
                            <div className="col-lg-12 mt-4">
                                <div className="row">
                                    <div className="col-lg-6 pl-0">
                                        <h5 className="heading-h1">Shift Timing Details</h5>
                                    </div>
                                    <div className="col-lg-6 text-right pr-0">
                                        <a className="common-btn" data-toggle="modal" data-target="#exampleModal"><i className="fa fa-plus"></i> &nbsp; Add Shift Timing</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <b>Shift Timing</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Shift Name</th>
                                                    <th scope="col">Start Time</th>
                                                    <th scope="col">End Time</th>
                                                    <th scope="col">Comments</th>
                                                    <th scope="col">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderShiftsTable()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ShiftsModal isModalOpen={this.state.isModalOpen} dismissModal={this.dismissModal} />
        </React.Fragment>)
    }

    renderShiftsTable = () => {
        return this.state.shifts.map((item: any, index: number) => {
            return (<tr key={index}>
                <td>{item.name}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.workingHours}</td>
                <th><a href="#" onClick={(e)=>{e.preventDefault();}}><i className="fa fa-hand-pointer-o"></i></a></th>
            </tr>)
        })
    }

    dismissModal = () => {
        this.setState({isModalOpen: false})
    }
}