import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../../constant';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';

import { getAttendanceTypeList } from '../../../action/SettingsActions'
import { getDateParts } from '../../../utils';

class ListAttendance extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            page: 1,
            limit: 20,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadList()
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
                            <div className="card">
                                <div className="card-header">
                                    <div className="pull-left">
                                        Attendance type
                                    </div>
                                    <div className="pull-right">
                                        <Link to={CONSTANT.url.addattendanceType} className="common-btn">
                                            <i className="fa fa-plus" />&nbsp;Add Attendance type
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Modified by</th>
                                                    <th scope="col">Modified on</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={4}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={4}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.map((item: any, index: number) => {
                                                        const modOn = getDateParts(item.modifiedOn);
                                                        const url = CONSTANT.url.editattendanceType.replace(':code', item.id);
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td>{`${item.createdByName}`}</td>
                                                                <td>{`${modOn.relativeTime}`}</td>
                                                                <td>
                                                                    <Link to={url}>
                                                                        <i className="fas fa-edit" />
                                                                    </Link>
                                                                </td>
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
            </React.Fragment >
        )
    }

    loadList = () => {
        const { page, limit } = this.state;
        getAttendanceTypeList(page, limit).then((res: any) => {
            this.setState({
                list: res.result
            })
        }).catch((err: any) => {
            console.log(err);
        })
    }
}

export default ListAttendance;
