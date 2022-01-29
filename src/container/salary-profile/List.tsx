import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from './../../constant';
import { getSalaryProfileList } from './../../action/SalaryProfileActions';

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
                        <div className="col-lg-11">
                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left">
                                        <b>Salary profile </b>
                                    </div>
                                    <div className="float-right">
                                        <Link className="" to={CONSTANT.url.settingsOption.addSalaryProfile}><i className="fa fa-plus"></i></Link>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={2}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={2}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.map((l: any, i: any) => {
                                                        const detailPageURL = CONSTANT.url.settingsOption.editSalaryProfile.replace(':code', l.id);
                                                        return (
                                                            <tr>
                                                                <td>{l.name}</td>
                                                                {/* <td>{l.salaryComponent}</td> */}
                                                                <td className="float-right"><Link to={detailPageURL}><i className="fa fa-pencil"></i></Link></td>
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
        getSalaryProfileList(page, limit).then((res: any) => {
            this.setState({ list: res.result });
        })
    }
}

export default ComponentName;
