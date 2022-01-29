import * as React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from '../../constant';
import { getTicketList } from '../../action/HelpdeskActions';

class HelpdeskList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    public componentDidMount() {
        this.getTickets();
    }

    public render() {
        const { data } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            <div className="col-lg-11">
                                {/* <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-6 pl-0">
                                            <h5 className="heading-h1">Helpdesk</h5>
                                        </div>
                                        <div className="col-lg-3 text-right pr-0">
                                            <Link to={CONSTANT.url.settingsOption.helpdeskAddCategory}>
                                                <a className="common-btn"><i className="fa fa-plus"></i> &nbsp; Add Category</a>
                                            </Link>
                                        </div>
                                        <div className="col-lg-3 text-right pr-0">
                                            <Link to={CONSTANT.url.settingsOption.helpdeskAddSubCategory}>
                                                <a className="common-btn"><i className="fa fa-plus"></i> &nbsp; Add Sub Category</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-lg-2 role-head1">
                                                <b>Helpdesk</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Ticket Id</th>
                                                        <th scope="col">Subject</th>
                                                        <th scope="col">Category</th>
                                                        <th scope="col">Raised by</th>
                                                        <th scope="col">Assigned To</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data && data.length > 0 && data.map((item: any, index: any) =>
                                                        <tr>
                                                            <td>{item.id}</td>
                                                            <td>{item.subject}</td>
                                                            <td>{item.categoryName}</td>
                                                            <td>{item.createdByName}</td>
                                                            <td>{item.pendingWithName ? item.pendingWithName : '-'}</td>
                                                            <td>{item.statusName ? item.statusName : '-'}</td>
                                                            <th scope="col">
                                                                <Link
                                                                    to={{ pathname: CONSTANT.url.helpdeskTimeline.replace(':code', item.id), state: { detail: { id: item.id, subject: item.subject, description: item.description, statusId: item.statusId, pendingWith: item.pendingWith } } }}>
                                                                    <a>
                                                                        <i className="fa fa-pencil"></i>
                                                                    </a>
                                                                </Link>
                                                            </th>
                                                        </tr>
                                                    )}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

    private getTickets = () => {
        getTicketList().then((response: any) => {
            console.log("get getTicketList response  => ", response);
            if (response.status) {
                this.setState({ data: response.result })
            }
        });
    }

}

export default HelpdeskList;
