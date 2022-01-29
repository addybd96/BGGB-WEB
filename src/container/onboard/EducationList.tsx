import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../constant';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/employee-master/OnboardProgressBar';
import ModalWindow from '../../component/common/ModalWindow';
import AddEducation from '../../component/employee-master/AddEducation';

import { editEducationalDetail, getEducationDetail } from './../../action/EmployeeAction';
import { clearUnwanted, getCookie } from '../../utils';

class EmployeeEducation extends React.Component<any, any> {
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
        this.getEmployeeEducation();
    }

    public render() {
        const { list, userId, showModal } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container">
                    <div className="row">
                        <div className="col-md-12  mt-2 mb-3">
                            <ProgressBar />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card row">
                                <div className="card-header">
                                    Education Details
                                    <a className="btn btn-sm btn-primary float-right" href="javascript:none;" onClick={this.showModal}>
                                        <i className="fa fa-plus"></i>&nbsp;Add Education
                                    </a>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Degree/Diploma</th>
                                                    <th scope="col">Institute Name</th>
                                                    <th scope="col">Percentage/Grade</th>
                                                    <th scope="col">Start year</th>
                                                    <th scope="col">End Year</th>
                                                    <th scope="col">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={5}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={5}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.map((item: any, ind: number) => {

                                                        return (
                                                            <tr key={ind}>
                                                                <td>{item.course}</td>
                                                                <td>{item.institute}</td>
                                                                <td>{item.marks}</td>
                                                                <td>{item.startYear}</td>
                                                                <td>{item.endYear}</td>
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
                    </div>
                    <div className="row">
                        <div className="col-md-12 pull-right pr-0 pl-0">
                            <div className="row">
                                <div className="col-lg-12 pull-right mt-3 mb-3">
                                    <Link to={CONSTANT.url.obEmployeeExperience}
                                        className="btn btn-primary btn-sm">Continue</Link>
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
        }, (error: any) => {
            alert(error.Message);
            this.setState({ showLoader: false });
        });
    }

    onSubmit = (model: any) => {
        editEducationalDetail(clearUnwanted({ ...model })).then((res: any) => {
            alert('Changes were saved successfully');
            this.setState({ showLoader: false, showModal: false });
            this.getEmployeeEducation();
        }).catch((err: any) => {
            alert(err)
        });
    }
}

export default EmployeeEducation;