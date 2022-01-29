import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../constant';

import moment from 'moment';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/employee-master/ProgressBar';
import ModalWindow from '../../component/common/ModalWindow';

import { getDepartmentDetail,editDepartmentDetail,getDepartmentSectionDetail,updateDepartmentSectionFreezeDetail } from '../../action/EmployeeAction';
import { clearUnwanted, getCookie } from '../../utils';
import AddDepartmentalEnquiry from '../../component/employee-master/AddDepartmentalEnquiry';

class DepartmentalEnquiry extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            list: undefined,
            showModal: false,
            isSystemUser: getCookie('isu'),
            freezed: true,
            sectionId: 7,
        }
    }

    componentDidMount() {
        
        this.setState({ showLoader: true })
        this.getExperienceDetail();
    }

    public render() {
        const { list, showModal, userId, isSystemUser, freezed } = this.state;
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
                                    Departmental Details
                                    <div className="float-right">
                                        {isSystemUser === 'true' ? this.renderFreezeButtons(freezed) : null}
                                    </div>
                                    {isSystemUser === 'true' || !freezed ? <a href='javascript:void' className="btn btn-sm btn-primary float-right" onClick={this.showModal}>
                                        <i className="fa fa-plus"></i> &nbsp;Add Departmental Experience
                                    </a> : null}
                                </div>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">File Name</th>
                                                    <th scope="col">Date of Chargesheet</th>
                                                    <th scope="col">Chargesheet number</th>
                                                    <th scope="col">Order Number</th>
                                                    <th scope="col">Appellate Order number</th>
                                                    <th scope="col">isSuspended</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Suspension From Date</th>
                                                    <th scope="col">Suspension From Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined || list === null && <tr>
                                                        <td className="text-center" colSpan={6}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.map((item: any, ind: number) => {

                                                        return (
                                                            <tr key={ind}>
                                                                <td>{item.fileName}</td>
                                                                <td>{item.ChargesheetDate}</td>
                                                                <td>{item.ChargesheetNumber}</td>
                                                                <td>{item.OrderNumber}</td>
                                                                <td>{item.ApNumber}</td>
                                                                <td>{item.suspended}</td>
                                                                <td>{item.typeList}</td>
                                                                <td>{moment(item.from).format("YYYY-MM-DD")}</td>
                                                                <td>{moment(item.to).format("YYYY-MM-DD")}</td>
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
                            <div className="col-lg-2 pull-right pr-0 pl-0">
                                <div className="row">
                                    <div className="col-lg-12 pull-right mt-3 mb-3">
                                        <Link to={CONSTANT.url.editEmployeeBank.replace(':id', userId)}
                                            className="btn btn-primary btn-sm">Continue</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showModal && <ModalWindow
                        title="Enquiry detail"
                        backdrop="static"
                        toggleModal={this.onCancel}>
                        <AddDepartmentalEnquiry
                            userId={userId}
                            detail={this.state.detail}
                            onSubmit={this.onSubmit}
                            onCancel={this.onCancel}
                        />
                    </ModalWindow>
                }
            </React.Fragment >
        )
    }

    renderFreezeButtons = (freezed: any) => {
        return <button onClick={(e: any) => {
            this.toggleFreezed(!freezed);
        }} className="btn btn-sm btn-primary ml-2" >{freezed ? 'Unlock' : 'Lock'}</button>
    }

    getExperienceDetail = () => {
        getDepartmentDetail(this.state.userId).then((response: any) => {
            this.setState({
                list: response.result,
                showLoader: false
            });
            getDepartmentSectionDetail(this.state.userId, this.state.sectionId).then((sec: any) => {
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
        updateDepartmentSectionFreezeDetail(payload).then((res: any) => {
            this.getExperienceDetail()
        })
    }

    onSubmit = (model: any) => {
        
        if (!this.state.showLoader)
            this.setState({ showLoader: true }, () => {
                editDepartmentDetail(clearUnwanted({ ...model })).then((res: any) => {
                    
                    alert('Changes were saved successfully');
                    this.setState({ showLoader: false, showModal: false });
                    this.getExperienceDetail();
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

export default DepartmentalEnquiry;