import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ModalWindow from '../../component/common/ModalWindow';
import AddFamily from '../../component/employee-master/AddFamily';
import CONSTANT from './../../constant';

import { getFamilyDetail, updateEmployeeFamily } from './../../action/EmployeeAction';
import ProgressBar from '../../component/employee-master/OnboardProgressBar';
import moment from 'moment';
import { getCookie } from '../../utils';

class EmployeeFamily extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const ud = getCookie(CONSTANT.cookie.userDetail);
        this.state = {
            userId: ud.id,
            list: undefined,
            showModal: false
        }
    }

    componentDidMount() {
        this.getEmployeeFamily();
    }

    public render() {
        const { list, userId, showModal } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container">
                    <div className="row">
                        <div className="col-lg-12 mt-2 mb-3">
                            <ProgressBar />
                        </div>
                        <div className="col-md-12">
                            <div className="card mt-3">
                                <div className="card-header">
                                    Family Details
                                        <a className="btn btn-primary btn-sm btn-sm float-right" href="javascript:void" onClick={this.showModal}>
                                        <i className="fa fa-plus"></i> &nbsp;Add Family</a>
                                </div>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Relationship</th>
                                                    <th scope="col">Full Name</th>
                                                    <th scope="col">Date Of Birth</th>
                                                    <th scope="col">Contact Number</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">Email Id</th>
                                                    <th scope="col">Emergency Contact</th>
                                                    <th scope="col">Dependent</th>
                                                    <th scope="col">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={8}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={8}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.map((item: any, ind: number) => {
                                                        return (
                                                            <tr key={ind}>
                                                                <td>{item.relationship}</td>
                                                                <td>{item.fullName}</td>
                                                                <td>{moment(item.dateOfBirth).format("YYYY-MM-DD")}</td>
                                                                <td>{item.contactNumber}</td>
                                                                <td>{item.address}</td>
                                                                <td>{item.emailId}</td>
                                                                <td>{item.isEmergencyContact ? 'Yes' : 'No'}</td>
                                                                <td>{item.isDependant ? 'Yes' : 'No'}</td>
                                                                <th scope="col">
                                                                    <a href="#" onClick={(e: any) => {
                                                                        e.preventDefault()
                                                                        this.setState({ detail: item, showModal: true })
                                                                    }} >
                                                                        <i className="fa fa-pencil" data-toggle="modal" data-target="#exampleModal"></i>
                                                                    </a>
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
                        <div className="col-lg-12 pull-right pr-0 pl-0">
                            <div className="row">
                                <div className="col-lg-12 pull-right mt-3 mb-3">
                                    <Link to={CONSTANT.url.obEmployeeBank}
                                        className="btn btn-primary btn-sm">Continue</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showModal && <ModalWindow
                        title="Family detail"
                        backdrop="static"
                        toggleModal={this.onCancel}>
                        <AddFamily
                            userId={userId}
                            detail={this.state.detail}
                            onSubmit={this.onSubmit}
                            onCancel={this.onCancel}
                        />
                    </ModalWindow>
                }
            </React.Fragment>
        )
    }

    private getEmployeeFamily = () => {
        getFamilyDetail(this.state.userId).then((response: any) => {
            this.setState({
                list: response.result,
                showLoader: false
            });
        }, (error: any) => {
            alert(error.Message);
            this.setState({ showLoader: false });
        });
    }

    onSubmit = (model: any) => {
        updateEmployeeFamily(model).then((res: any) => {
            alert('Changes were saved successfully');
            this.setState({ showLoader: false, showModal: false });
            this.getEmployeeFamily();
        }).catch((err: any) => {
            alert(err)
        });
    }

    showModal = () => {
        this.setState({ showModal: true, detail: null });
    }

    onCancel = () => {
        this.setState({ showModal: false });
    }
}

export default EmployeeFamily;