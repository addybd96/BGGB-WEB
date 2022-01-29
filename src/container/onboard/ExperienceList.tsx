import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../constant';

import moment from 'moment';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/employee-master/OnboardProgressBar';
import ModalWindow from '../../component/common/ModalWindow';
import AddExperience from '../../component/employee-master/AddExperience';

import { getExperienceDetail, editExperienceDetail } from '../../action/EmployeeAction';
import { clearUnwanted, getCookie } from '../../utils';

class EmployeeExperience extends React.Component<any, any> {
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
        this.getExperienceDetail();
    }

    public render() {
        const { list, showModal, userId } = this.state;
        return (
            <React.Fragment>
            <Header />
            <div className="fluid-container">
                <div className="row">
                    <div className="my-3">
                        <div className="col-lg-12  mt-2 mb-3">
                        <ProgressBar />
                            </div>
                            <div className="card mt-3">
                                <div className="card-header">
                                    Experience Details
                                    <a href='javascript:void' className="btn btn-sm btn-primary float-right" onClick={this.showModal}>
                                        <i className="fa fa-plus"></i> &nbsp;Add Experience
                                    </a>
                                </div>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Job Profile</th>
                                                    <th scope="col">Company Name</th>
                                                    <th scope="col">From</th>
                                                    <th scope="col">To</th>
                                                    <th scope="col">Summary</th>
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
                                                                <td>{item.jobProfile}</td>
                                                                <td>{item.companyName}</td>
                                                                <td>{moment(item.from).format("YYYY-MM-DD")}</td>
                                                                <td>{moment(item.to).format("YYYY-MM-DD")}</td>
                                                                <td>{item.remarks}</td>
                                                                <th scope="col">
                                                                    <a href="#" onClick={(e:any)=>{
                                                                        e.preventDefault()
                                                                        this.setState({detail: item, showModal: true})
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
                                        <Link to={CONSTANT.url.obEmployeeDocument}
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
                        <AddExperience
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

    getExperienceDetail = () => {
        getExperienceDetail(this.state.userId).then((response: any) => {
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
        editExperienceDetail(clearUnwanted({...model})).then((res: any) => {
            alert('Changes were saved successfully');
            this.setState({ showLoader: false, showModal: false });
            this.getExperienceDetail();
        }).catch((err: any) => {
            alert(err)
        });
    }

    showModal = () => {
        this.setState({ showModal: true, detail:null });
    }

    onCancel = () => {
        this.setState({ showModal: false });
    }
}

export default EmployeeExperience;