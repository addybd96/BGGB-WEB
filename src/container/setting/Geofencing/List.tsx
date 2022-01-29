import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../../constant';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';

import { getAllGeofencing } from '../../../action/GeofencingActions'
import { getDateParts } from '../../../utils';
class ListGeofencing extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            leaveList: [],
            showLoader: false,
            geofencing: []
        }
    }
    componentDidMount() {
        this.loadList()
        
    }
    public render() {
        const { geofencing, showLoader } = this.state;
        if (showLoader)
            return null;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-10">
                                            Geo Fencing
                                        </div>
                                        <div className="col-lg-2 text-right pr-0">
                                        <Link to={CONSTANT.url.settingsOption.addGeofencing}>
                                            <a className="common-btn">
                                                <i className="fa fa-plus"></i> &nbsp;Add Geofencing
                                                </a>
                                        </Link>
                                    </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Location</th>
                                                    <th>Radius</th>
                                                    <th>Modified By</th>
                                                    <th>Modified On</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {geofencing && geofencing.length == 0 && <tr>
                                                        <td className="text-center" colSpan={6}>No record found</td>
                                                    </tr>
                                                    }
                                                {geofencing.map((item: any, index: number) => {
                                                    const modOn = getDateParts(item.modifiedOn);
                                                    return (<tr>
                                                        <td>{item.groupName}</td>
                                                        <td><a target="blank" href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`}> View Location </a></td>
                                                        <td>{item.radius}</td>
                                                        <td>{item.modifier}</td>
                                                        <td>{modOn.relativeTime}</td>
                                                        <th scope="col">
                                                                    <Link to={CONSTANT.url.settingsOption.editGeofencing.replace(':code', item.id)}>
                                                                        <a>
                                                                            <i className="fa fa-edit"></i>
                                                                        </a>
                                                                    </Link>
                                                                </th>
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }

    loadList = () => {
        this.setState({ showLoader: true })
        getAllGeofencing()
            .then((res: any) => {
                console.log(res)
                if (res) {
                    this.setState({
                        geofencing: res.result, showLoader: false
                    })
                }
            })
            .catch((err: any) => {
                console.log(err);

            })
    }


}

export default ListGeofencing;
