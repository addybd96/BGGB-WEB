import * as React from 'react';
import { CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from './../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from './../../constant';
import { getSalaryComponentList, toggleIsActiveStatus } from './../../action/SalaryComponentActions';
import Loader from '../../component/common/Loader';

class ComponentName extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: undefined,
            page: 1,
            limit: 10,
            showLoader: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = CONSTANT.title.locationList;

        this.loadList();
    }

    public render() {
        const { list, showLoader, page, limit } = this.state;
        let lcList, scList = undefined;

        if (list !== undefined) {
            lcList = list.filter((i: any) => i.isCompliance === true);
            scList = list.filter((i: any) => i.isCompliance === false);
        }
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11">
                            <div className="row mt-3">
                                <div className="col-lg-12">
                                    <h5 className="heading-h1">Payroll settings</h5>
                                </div>
                            </div>
                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <b>Legal compliance</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    {/* <th scope="col">Type</th>
                                                    <th scope="col">Amount</th> */}
                                                    {/* <th scope="col">Is active?</th> */}
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    lcList === undefined && <tr>
                                                        <td className="text-center" colSpan={2}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    lcList !== undefined && lcList.length === 0 && <tr>
                                                        <td className="text-center" colSpan={2}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    lcList !== undefined && lcList.map((l: any, i: any) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{l.name}<br /><small>{l.description}</small></td>
                                                                <td className="float-right">
                                                                    <CustomInput data-id={l.id} onClick={this.toggleStatus} type="switch" id={`clCustomSwitchId-${i}`} name={`clCustomSwitch-${i}`} checked={l.isActive} />
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

                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="float-left"><b>Salary component </b></div>
                                    <div className="float-right">
                                        <Link to={CONSTANT.url.settingsOption.addSalaryComponent}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Percentage</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    scList === undefined && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    scList !== undefined && scList.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    scList !== undefined && scList.map((l: any, i: any) => {
                                                        const detailPageURL = CONSTANT.url.settingsOption.editSalaryComponent.replace(':code', l.id);
                                                        return (
                                                            <tr key={i}>
                                                                <td>{l.name}<br /><small>{l.description}</small></td>
                                                                <td>{l.amount !== null ? parseInt(l.amount, 10).toLocaleString('en-IN') : '-'}</td>
                                                                <td>{l.percentage !== null ? parseInt(l.percentage, 10).toLocaleString('en-IN') : '-'}</td>
                                                                <th scope="col"><Link to={detailPageURL}><i className="fa fa-pencil"></i></Link></th>
                                                                <td className="float-right"><CustomInput data-id={l.id} onClick={this.toggleStatus} type="switch" id={`scCustomSwitchId-${i}`} name={`scCustomSwitch`} checked={l.isActive} /></td>

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
                {
                    showLoader && <Loader />
                }
            </React.Fragment>
        )
    }

    loadList = () => {
        const { page, limit } = this.state;
        getSalaryComponentList(page, limit).then((res: any) => {
            this.setState({ list: res.result });
        })
    }

    toggleStatus = (e: any) => {
        const id = parseInt(e.target.dataset.id, 10);
        const isActive = e.target.checked;
        this.setState({ showLoader: true });
        toggleIsActiveStatus({ id, isActive }).then((res: any) => {
            const updatedList = this.state.list.map((i: any) => {
                if (i.id === id) {
                    i.isActive = res.result.isActive;
                }
                return i;
            });
            this.setState({
                list: updatedList,
                showLoader: false
            });
        });
    }
}

export default ComponentName;
