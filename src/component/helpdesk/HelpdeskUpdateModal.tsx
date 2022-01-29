import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isEmpty } from './../../utils';
import { onChange, validateForm, getStorage } from './../../utils';
import { getHelpdeskTicketStatus } from './../../action/HelpdeskActions';
import { getAllEmployeeList } from './../../action/EmployeeAction';

class HelpdeskModal extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        console.log("props.selectedStatus   ", props.selectedStatus)
        this.state = {
            status: { name: 'status', value: props.selectedStatus ? props.selectedStatus: '', error: '', options: [], isRequired: true },
            assignedTo: { name: 'assignedTo', value: props.selectedAssignTo ? props.selectedAssignTo : '', error: '', options: [], isRequired: true },
            comment: { name: 'comment', value: '', error: '', isRequired: true },
            attachments: { name: 'attachments', value: [], error: '', isRequired: false },
        }
    }

    componentDidMount() {
        this.getTicketStatusList();
        this.getEmployees();
    }

    public render() {
        const { status, assignedTo, comment, attachments } = this.state;
        const { isModalOpen } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isModalOpen} className="company-model" >
                    <div className="modal-content">
                        <div className="company-icon">
                            <span><i className="fa fa-building"></i></span>
                        </div>
                        <h1 className="modal-title" id="exampleModalLabel">Helpdesk Ticket</h1>
                    </div>
                    <ModalBody>
                        <div>
                            <div className="row">
                                <div className="col-lg-12 mb-2 px-4">
                                    <div className="row">
                                        <div className="col-lg-12 form-group">
                                            <select
                                                className={status.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                name={status.name}
                                                value={status.value}
                                                onChange={this.onChange}
                                            >
                                                <option value="">Select Status</option>
                                                {
                                                    status.options.map((item: any, index: number) => {
                                                        return (
                                                            <option value={item.id} key={index}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <select
                                                className={assignedTo.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                name={assignedTo.name}
                                                value={assignedTo.value}
                                                onChange={this.onChange}
                                            >
                                                <option value="">Select Assigned To</option>
                                                {
                                                    assignedTo.options.map((item: any, index: number) => {
                                                        return (
                                                            <option value={item.id} key={index}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <textarea
                                                rows={5}
                                                className={comment.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Comment"
                                                name="comment"
                                                value={comment.value}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="col-lg-12 form-group">
                                            <input
                                                type="file"
                                                className={attachments.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Attachment"
                                                name="attachments"
                                                multiple={true}
                                                onChange={this.onChange}
                                            />
                                            {/* {attachments && attachments.value.length> 0 && attachments.value.map((item: any) => {
                                                return <span>Help</span>
                                            })} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="col-lg-16 btn btn-primary" onClick={this._updateModal}>Update</button>
                        <button type="button" className="col-lg-16 btn btn-primary" onClick={this.cancelModal}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }

    private getTicketStatusList = () => {
        getHelpdeskTicketStatus().then((response: any) => {
            console.log("get status list  => ", response);
            if (response.status) {
                this.setState({
                    status: {
                        ...this.state.status,
                        options: response.result
                    }
                })
            }
        });
    }

    private getEmployees = () => {
        this.setState({ showLoader: true });
        getAllEmployeeList().then((res: any) => {
            console.log("res assigned to  => ", res.result);
            this.setState({ showLoader: false });
            this.setState({
                assignedTo: {
                    ...this.state.assignedTo,
                    options: res.result
                }
            })
        });
    }

    private onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === this.state.attachments.name) {
            value = e.target.files;
        }
        onChange(this, name, value);
    }

    private _getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        const jsonToReturn = {
            status: stateData.status.value,
            assignedTo: stateData.assignedTo.value,
            comment: stateData.comment.value,
            attachments: stateData.attachments.value
        };

        return jsonToReturn;
    }

    _updateModal = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const jsonToPost = {
                status: this.state.status.value,
                assignedTo: this.state.assignedTo.value,
                comment: this.state.comment.value,
                attachments: this.state.attachments.value
            };
            this.props.updateTicket(jsonToPost);
        }
    }

    cancelModal = () => {
        this.props.closeModal();
    }

}

export default HelpdeskModal;
