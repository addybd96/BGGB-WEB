import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from './../../constant';
import { getLocationList } from './../../action/GeographyActions';
import { getDateParts } from '../../utils';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            page: 1,
            limit: 10
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;

        this.loadList();
    }

    public render() {
        const { list, page, limit } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="card mt-2">
                                <div className="card-header">
                                    Regions
                                    <div className="float-right">
                                        <Link className="common-btn" to={CONSTANT.url.settingsOption.addLocation}><i className="fa fa-plus"></i> &nbsp; Add Region </Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Region Name</th>
                                                    <th scope="col">State</th>
                                                    <th scope="col">Country</th>
                                                    <th scope="col">Admin</th>
                                                    <th scope="col">Modified by</th>
                                                    <th scope="col">Modified on</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={6}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={6}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.map((l: any, i: any) => {
                                                        const modOn = getDateParts(l.modifiedOn);
                                                        const detailPageURL = CONSTANT.url.settingsOption.editLocation.replace(':code', l.id);
                                                        return (
                                                            <tr key={i}>
                                                                <td>{l.name}</td>
                                                                <td>{l.stateName}</td>
                                                                <td>{l.countryName}</td>
                                                                <td>{l.adminName}</td>
                                                                <td>{l.modifiedByName}</td>
                                                                <td>{modOn.relativeTime}</td>
                                                                <th scope="col"><Link to={detailPageURL}><i className="fas fa-edit"></i></Link></th>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    loadList = () => {
        const { page, limit } = this.state;
        getLocationList(page, limit).then((res: any) => {
            this.setState({ list: res.result });
        })
    }
}

export default ComponentName;
