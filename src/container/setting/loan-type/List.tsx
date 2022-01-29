import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../../constant';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';

import { getLoanTypeList } from '../../../action/SettingsActions'
import { getDateParts } from '../../../utils';

class ListLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            list: undefined
        }
    }

    componentDidMount() {
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
                                    Loan Type list
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.addLoanType}>
                                            <a className="common-btn">
                                                <i className="fa fa-plus"></i> &nbsp;Add Loan Type
                                                </a>
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
                                                        const url = CONSTANT.url.editHolidayType.replace(':code', item.id);
                                                        const modOn = getDateParts(item.createdOn);
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td>{item.modifiedByName}</td>
                                                                <td>{`${modOn.relativeTime}`}</td>
                                                                <th scope="col">
                                                                    <Link to={url}>
                                                                        <i className="fas fa-edit" />
                                                                    </Link>
                                                                </th>
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
        getLoanTypeList(page, limit).then((res: any) => {
            this.setState({
                list: res.result
            })
        }).catch((err: any) => {
            console.log(err);
        })
    }
}

export default ListLeave;
