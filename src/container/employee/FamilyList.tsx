import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ModalWindow from '../../component/common/ModalWindow';
import AddFamily from '../../component/employee-master/AddFamily';
import CONSTANT from './../../constant';

import { getFamilyDetail, updateEmployeeFamily, getSectionDetail, updateSectionFreezeDetail } from './../../action/EmployeeAction';
import ProgressBar from '../../component/employee-master/ProgressBar';
import moment from 'moment';
import { getCookie } from '../../utils';

class EmployeeFamily extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            list: undefined,
            showModal: false,
            isSystemUser: getCookie('isu'),
            freezed: true,
            sectionId: 4,
        }
    }

    componentDidMount() {
        this.getEmployeeFamily();
    }

    public render() {
        const { list, userId, showModal, isSystemUser, freezed } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <ProgressBar userId={userId} />
                                </div>
                                <div className="col-md-12">
                                    <div className="card mt-3">
                                        <div className="card-header">
                                            Family Details
                                            <div className="float-right">
                                                {isSystemUser === 'true' ? this.renderFreezeButtons(freezed) : null}
                                            </div>
                                            {isSystemUser === 'true' || !freezed ?<a className="btn btn-primary btn-sm btn-sm float-right" href="javascript:void" onClick={this.showModal}>
                                                <i className="fa fa-plus"></i> &nbsp;Add Family</a>:null}
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
                                                                <td className="text-center" colSpan={9}>Loading...</td>
                                                            </tr>
                                                        }
                                                        {
                                                            list !== undefined && list.length === 0 && <tr>
                                                                <td className="text-center" colSpan={9}>No records found</td>
                                                            </tr>
                                                        }
                                                        {
                                                            list !== undefined && list.map((item: any, ind: number) => {
                                                                return (
                                                                    <tr key={ind}>
                                                                        <td>{item.relationship}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.dateOfBirth ? moment(item.dateOfBirth).format("YYYY-MM-DD") : '-'}</td>
                                                                        <td>{item.contactNumber}</td>
                                                                        <td>{item.address}</td>
                                                                        <td>{item.email ? item.email : '-'}</td>
                                                                        <td>{item.isEmergencyContact ? 'Yes' : 'No'}</td>
                                                                        <td>{item.isDependant ? 'Yes' : 'No'}</td>
                                                                        <th scope="col">
                                                                            <a href="javascript:void;"
                                                                                onClick={(e: any) => {
                                                                                    this.setState({ detail: item, showModal: true })
                                                                                }} >
                                                                                <i className="fas fa-edit"></i>
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
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9"></div>
                        <div className="col-md-3">
                            <Link to={CONSTANT.url.editEmployeeWork.replace(':id', userId)}
                                className="btn btn-primray btn-block">Continue</Link>
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
                            isu={isSystemUser}
                            freezed={freezed}
                            toggleFreezed={this.toggleFreezed}
                        />
                    </ModalWindow>
                }
            </React.Fragment>
        )
    }

    renderFreezeButtons = (freezed: any) => {
        return <button onClick={(e: any) => {
            this.toggleFreezed(!freezed);
        }} className="btn btn-sm btn-primary ml-2" >{freezed ? 'Unlock' : 'Lock'}</button>
    }

    getEmployeeFamily = () => {
        getFamilyDetail(this.state.userId).then((response: any) => {
            this.setState({
                list: response.result,
                showLoader: false
            });
            getSectionDetail(this.state.userId, this.state.sectionId).then((sec: any) => {
                if (sec.result) {
                    this.setState({ freezed: sec.result.freezed })
                }
            })
        }, (error: any) => {
            alert(error.Message);
            this.setState({ showLoader: false });
        });
    }

    toggleFreezed = (freezed: any) => {
        this.setState({ showLoader: true })
        let payload = {
            userId: this.props.match.params.id,
            sectionId: this.state.sectionId,
            freezed
        }
        updateSectionFreezeDetail(payload).then((res: any) => {
            this.getEmployeeFamily()
        })
    }

    onSubmit = (model: any) => {
        if (!this.state.showLoader)
            this.setState({ showLoader: true }, () => {
                updateEmployeeFamily(model).then((res: any) => {
                    alert('Changes were saved successfully');
                    this.setState({ showLoader: false, showModal: false });
                    this.getEmployeeFamily();
                }).catch((err: any) => {
                    alert(err)
                });
            })
    }

    showModal = () => {
        this.setState({ showModal: true, detail: null });
    }

    onCancel = () => {
        this.setState({ showModal: false });
    }
}

export default EmployeeFamily;