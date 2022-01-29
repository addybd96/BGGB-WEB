import * as React from "react";

import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import AddNominee from "../../component/employee-master/AddNominee";
import ModalWindow from "../../component/common/ModalWindow";
import ProgressBar from "../../component/employee-master/ProgressBar";
import { getCookie } from '../../utils';
import { addNomineeDetail, getNomineeDetailList, getFamilyDetail, getSectionDetail, updateSectionFreezeDetail  } from "./../../action/EmployeeAction";

class EmployeeDocument extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            list: undefined,
            showModal: false,
            detail: undefined,
            familyList: undefined,
            showLoader: false,
            isSystemUser: getCookie('isu'),
            freezed: true,
            sectionId: 15,
            
        };
    }

    componentDidMount() {
        this.getNomineeList();
        this.getEmployeeFamily();
    }

    public render() {
        const { showModal, userId, list, detail, familyList, total, index, isSystemUser, freezed } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12  employee-tab mt-2 mb-3">
                                <ProgressBar userId={userId} />
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    Nomination Details
                                    <div className="float-right">
                                        {isSystemUser === 'true' ? this.renderFreezeButtons(freezed) : null}
                                    </div>
                                        {isSystemUser === 'true' || !freezed ? <a className="btn btn-primary btn-sm btn-sm float-right" href="javascript:void" onClick={this.showModal}>
                                        <i className="fas fa-plus-circle mr-1"></i>Add Nominee</a>: null}
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Share (%)</th>
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
                                                    list !== undefined && list.map((item: any, index: number) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td>{item.amount} %</td>
                                                                <th scope="col">
                                                                    <a href="javascript:void;" onClick={(e: any) => {
                                                                        // e.preventDefault()
                                                                        const detail = this.state.list.filter((i: any) => i.id === item.id)[0]

                                                                        const total = this.state.total - parseInt(detail.amount)

                                                                        this.setState({ showModal: true, detail, total, index });
                                                                    }} data-id={item.id}>
                                                                        <i className="fas fa-edit pe-none"></i>
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
                            <div className="row mt-3">
                                <div className="col-md-9"></div>
                                <div className="col-md-3">
                                    <button
                                        onClick={this.submitPage}
                                        type="submit"
                                        className="btn btn-primary btn-sm btn-block btn-sm"
                                    >
                                        Save & Continue
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showModal && (
                        <ModalWindow
                            title="Document detail"
                            backdrop="static"
                            toggleModal={this.onCancel}
                        >
                            <AddNominee
                                lIndex={index}
                                userId={userId}
                                familyList={familyList}
                                detail={detail}
                                total={total}
                                onSubmit={this.onSubmit}
                                onCancel={this.onCancel}
                            />
                        </ModalWindow>
                    )}
            </React.Fragment>
        );
    }

    renderFreezeButtons = (freezed: any) => {
        return <button onClick={(e: any) => {
            this.toggleFreezed(!freezed);
        }} className="btn btn-sm btn-primary ml-2" >{freezed ? 'Unlock' : 'Lock'}</button>
    }

    toggleFreezed = (freezed: any) => {
        this.setState({ showLoader: true })
        let payload = {
            userId: this.props.match.params.id,
            sectionId: this.state.sectionId,
            freezed
        }
        updateSectionFreezeDetail(payload).then((res: any) => {
            this.getNomineeList()
        })
    }

    getNomineeList = () => {
        const { userId } = this.state;
        getNomineeDetailList(userId).then((res: any) => {
            console.log(res)

            var total = 0;

            res.result.map((item: any) => {
                total += parseInt(item.amount)
            })

            this.setState({ list: res.result, total });
            getSectionDetail(this.state.userId, this.state.sectionId).then((sec: any) => {
                if (sec.result) {
                    this.setState({ freezed: sec.result.freezed })
                }
            })
        });
    };

    getEmployeeFamily = () => {
        getFamilyDetail(this.state.userId).then((response: any) => {
            this.setState({
                familyList: response.result,
                showLoader: false
            });
        }, (error: any) => {
            alert(error.Message);
            this.setState({ showLoader: false });
        });
    }

    onSubmit = (e: any, index: any) => {
        console.log('index', index)
        this.setState({showModal: false})
        let list = this.state.list.slice(0)

        if(index != undefined)
            list[index] = e
        else
            list.push(e)
        
        let total = 0
        list.map((item: any) => {
            total += parseInt(item.amount)
        })

        console.log(list)
        this.setState({ list, detail: null, total })
    };

    submitPage = async (e: any) => {

        if (this.state.total < 100) {
            alert('Nomination total is not 100 %')
        }
        else {
            let list = this.state.list.slice(0)

            for (var i = 0; i < list.length; i++) {

                try{
                    let ret = await addNomineeDetail(list[i])
                }catch(err)
                {
                    alert(err)
                }
            }
            alert('changes saved successfully')
        }

    }

    showModal = () => {
        if(this.state.list && this.state.familyList)
            this.setState({ showModal: true, detail: null, index: undefined });
    };

    onCancel = () => {
        this.setState({ showModal: false });
    };

    onEdit = (e: any) => {
        e.preventDefault()
        const id = parseInt(e.target.dataset.id, 10);
        const detail = this.state.list.filter((i: any) => i.id === id)[0];
        this.setState({ showModal: true, detail });
    };
}

export default EmployeeDocument;