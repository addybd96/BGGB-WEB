import * as React from "react";

import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import AddDocument from "../../component/employee-master/AddDocument";
import ModalWindow from "../../component/common/ModalWindow";
import ProgressBar from "../../component/employee-master/ProgressBar";
import { clearUnwanted, getCookie } from '../../utils';
import CONSTANT from '../../constant'
import { updateDocumentDetail, getDocumentDetail, getSectionDetail, updateSectionFreezeDetail } from "./../../action/EmployeeAction";

class EmployeeDocument extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            list: undefined,
            showModal: false,
            detail: undefined,
            isSystemUser: getCookie('isu'),
            freezed: true,
            sectionId: 8,
        };
    }

    componentDidMount() {
        this.setState({ showLoader: true })
        this.getDocumentList();
    }

    public render() {
        const { showModal, userId, list, detail, isSystemUser, freezed } = this.state;
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
                                    Document Details
                                    <div className="float-right">
                                        {isSystemUser === 'true' ? this.renderFreezeButtons(freezed) : null}
                                    </div>
                                    {isSystemUser === 'true' || !freezed ? <a className="btn btn-primary btn-sm btn-sm float-right" href="javascript:void" onClick={this.showModal}>
                                        <i className="fas fa-plus-circle mr-1"></i>Add Document</a> : null}
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Document Type</th>
                                                    <th scope="col">Document Number</th>
                                                    <th scope="col">Document Link</th>
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
                                                        const filePath = `${process.env.REACT_APP_BASE_URL}/document/${item.userId}/${item.fileName}`;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.documentTypeName}</td>
                                                                <td>{item.documentNumber}</td>
                                                                <td><a target="_blank" href={filePath}>Download</a></td>
                                                                <th scope="col">
                                                                    <a href="javascript:void;" onClick={this.onEdit} data-id={item.id}>
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
                                        onClick={()=>{
                                            console.log('list', list)
                                            const filterResult = list.filter((item: any) => {
                                                return item.documentTypeId == 1 || item.documentTypeId == 2
                                            });
                                            if (filterResult.length > 0) {
                                                let findAadhar = filterResult.find((o: any) => o.documentTypeId === 1);
                                                let findPan = filterResult.find((o: any) => o.documentTypeId === 2);
                                                if (!findAadhar)
                                                    {alert("Please upload Aadhar Card");
                                                    return
                                                }
                                                if (!findPan)
                                                    {alert("Please upload PAN Card");
                                                    return
                                                }

                                                this.props.history.push(CONSTANT.url.editEmployeeWork.replace(':id', this.state.userId))
                                            } else {
                                                alert("Please upload the required documents");
                                            }
                                            //
                                        }}
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
                            <AddDocument
                                userId={userId}
                                detail={detail}
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


    getDocumentList = () => {
        const { userId } = this.state;
        getDocumentDetail(userId).then((res: any) => {
            this.setState({ showLoader: false });
            if (res.result) {
                this.setState({ list: res.result });
                const filterResult = res.result.filter((item: any) => {
                    return item.documentTypeId == 1 || item.documentTypeId == 2
                });
                if (filterResult.length > 0) {
                    let findAadhar = filterResult.find((o: any) => o.documentTypeId === 1);
                    let findPan = filterResult.find((o: any) => o.documentTypeId === 2);
                    if (!findAadhar)
                        alert("Please upload Aadhar Card");
                    if (!findPan)
                        alert("Please upload PAN Card");
                } else {
                    alert("Please upload the required documents");
                }
            }
            getSectionDetail(this.state.userId, this.state.sectionId).then((sec: any) => {
                if (sec.result) {
                    this.setState({ freezed: sec.result.freezed })
                }
            })
        });
    };

    toggleFreezed = (freezed: any) => {
        this.setState({ showLoader: true })
        let payload = {
            userId: this.props.match.params.id,
            sectionId: this.state.sectionId,
            freezed
        }
        updateSectionFreezeDetail(payload).then((res: any) => {
            this.getDocumentList()
        })
    }

    onSubmit = (e: any) => {
        if (!this.state.showLoader)
            this.setState({ showLoader: true }, () => {
                updateDocumentDetail(e).then((response: any) => {
                    this.getDocumentList()
                    this.onCancel()
                }, (error: any) => {
                    alert(error.message);
                });
            });
    };

    showModal = () => {
        this.setState({ showModal: true, detail: null });
    };

    onCancel = () => {
        this.setState({ showModal: false });
    };

    onEdit = (e: any) => {
        const id = parseInt(e.target.dataset.id, 10);
        const detail = this.state.list.filter((i: any) => i.id === id)[0];
        this.setState({ showModal: true, detail });
    };
}

export default EmployeeDocument;