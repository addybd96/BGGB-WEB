import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../constant';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/employee-master/ProgressBar';
import ModalWindow from '../../component/common/ModalWindow';
import AddEducation from '../../component/employee-master/AddEducation';

import { updateEducationalDetail, getEducationDetail, getSectionDetail, updateSectionFreezeDetail } from './../../action/EmployeeAction';
import { getCookie } from '../../utils';

class EmployeeEducation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            list: undefined,
            showModal: false,
            userType: undefined,
            isSystemUser: getCookie('isu'),
            freezed: true,
            sectionId: 6,
        }
    }

    componentDidMount() {
        const userDetail = getCookie(CONSTANT.cookie.userDetail);
        this.setState({ userType: userDetail.userType });
        this.getEmployeeEducation();
    }

    public render() {
        const { list, userId, showModal, userType, isSystemUser, freezed } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12  mt-2 mb-3">
                                <ProgressBar userId={userId} />
                            </div>
                            <div className="card mt-3">
                                <div className="card-header">
                                    Education Details
                                    <div className="float-right">
                                        {isSystemUser === 'true' ? this.renderFreezeButtons(freezed) : null}
                                    </div>
                                    {isSystemUser === 'true' || !freezed ? <a className="btn btn-sm btn-primary float-right" href="javascript:none;" onClick={this.showModal}>
                                        <i className="fa fa-plus"></i>&nbsp;Add Education
                                    </a> : null}
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Degree/Diploma</th>
                                                    <th scope="col">Institute Name</th>
                                                    <th scope="col">Percentage/Grade</th>
                                                    <th scope="col">Specialization/Branch</th>
                                                    <th scope="col">Start year</th>
                                                    <th scope="col">End Year</th>
                                                    {userType === 'sadmin' || userType === 'radmin' ?
                                                        <th scope="col">Edit</th>
                                                        : null}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={7}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={7}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.map((item: any, ind: number) => {

                                                        return (
                                                            <tr key={ind}>
                                                                <td>{item.course}</td>
                                                                <td>{item.institute}</td>
                                                                <td>{item.marks}</td>
                                                                <td>{item.specialization}</td>
                                                                <td>{moment(item.startYear).format('MMM Do YYYY')}</td>
                                                                <td>{moment(item.endYear).format('MMM Do YYYY')}</td>
                                                                {userType === 'sadmin' || userType === 'radmin' ?
                                                                    <th scope="col">
                                                                        <a href="#" onClick={(e: any) => {
                                                                            e.preventDefault()
                                                                            this.setState({ detail: item, showModal: true })
                                                                        }} >
                                                                            <i className="fas fa-edit"></i>
                                                                        </a>
                                                                    </th>
                                                                    : null}
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 pull-right pr-0 pl-0">
                                <div className="row">
                                    <div className="col-lg-12 pull-right mt-3 mb-3">
                                        <Link to={CONSTANT.url.editEmployeeExperience.replace(':id', userId)}
                                            className="btn btn-primary btn-sm">Continue</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showModal && <ModalWindow
                        title="Education detail"
                        backdrop="static"
                        toggleModal={this.onCancel}>
                        <AddEducation
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

    renderFreezeButtons = (freezed: any) => {
        return <button onClick={(e: any) => {
            this.toggleFreezed(!freezed);
        }} className="btn btn-sm btn-primary ml-2" >{freezed ? 'Unlock' : 'Lock'}</button>
    }

    showModal = () => {
        this.setState({ showModal: true, detail: null });
    }

    onCancel = () => {
        this.setState({ showModal: false });
    }

    getEmployeeEducation = () => {
        const { userId } = this.state;
        getEducationDetail(userId).then((response: any) => {
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
            this.getEmployeeEducation()
        })
    }

    onSubmit = (model: any) => {

        if (!this.state.showLoader)
            this.setState({ showLoader: true }, () => {
                updateEducationalDetail(model).then((res: any) => {
                    alert('Changes were saved successfully');
                    this.setState({ showLoader: false, showModal: false });
                    this.getEmployeeEducation();
                }).catch((err: any) => {
                    alert(err)
                });
            })

    }
}

export default EmployeeEducation;