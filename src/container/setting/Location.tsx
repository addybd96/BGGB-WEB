import * as React from 'react';

import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import LocationModal from '../../component/setting/LocationModal';

class AddLocation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    public render() {
        const { isModalOpen } = this.state;
        return (
            <React.Fragment>
                <Header />
                <Sidebar />
                <section>
                    <div className="col-lg-12 main-container">
                        <div className="fluid-container">
                            <div className="row">
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6 pl-0">
                                            <h5 className="heading-h1">Location Details</h5>
                                        </div>
                                        <div className="col-lg-6 text-right pr-0">
                                            <a className="common-btn" onClick={this._onAddLocation}><i className="fa fa-plus"></i> &nbsp; Add Location </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <b>Location </b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Location Name</th>
                                                        <th scope="col">Country</th>
                                                        <th scope="col">State/Province</th>
                                                        <th scope="col">Time Zone</th>
                                                        <th scope="col">Comments</th>
                                                        <th scope="col">Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Noida</td>
                                                        <td>India</td>
                                                        <td>Uttrakhand</td>
                                                        <td>10:75</td>
                                                        <td>Created Department Now</td>
                                                        <th scope="col"><i className="fa fa-pencil" data-toggle="modal" data-target="#exampleModal"></i></th>
                                                    </tr>
                                                    <tr>
                                                        <td>Noida</td>
                                                        <td>India</td>
                                                        <td>Uttrakhand</td>
                                                        <td>10:75</td>
                                                        <td>Created Department Now</td>
                                                        <th scope="col"><i className="fa fa-pencil" data-toggle="modal" data-target="#exampleModal"></i></th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <LocationModal isModalOpen={isModalOpen} dismissModal={this._closeModal} onSubmitModal={this._onSubmitModal} />

            </React.Fragment>
        )
    }

    _onAddLocation = () => {
        this.setState({ isModalOpen: true });
    }

    _onSubmitModal = () => {
        this.setState({ isModalOpen: true });
    }

    _closeModal = () => {
        this.setState({ isModalOpen: false });
    }

}

export default AddLocation;
