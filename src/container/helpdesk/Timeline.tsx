import * as React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import CONSTANT from '../../constant';
import { updateTicket, uploadHelpdeskAttachment, getTicketDetail, getTicketTimeline } from '../../action/HelpdeskActions';
import HelpdeskModal from './../../component/helpdesk/HelpdeskUpdateModal';

class HelpdeskTimeline extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            ticketId: '',
            statusId: '',
            pendingWith: '',
            comment: '',
            subject: '',
            description: '',
            timelineData: [],
            isModalOpen: false
        }
    }

    public componentDidMount() {
        const { match: { params } } = this.props;
        // console.log("params code => ", params.code);
        this.getTicketDetail(params.code);
        getTicketTimeline(params.code).then((response: any) => {
            // console.log("get timeline  => ", response);
            if (response.status) {
                this.setState({ 
                    timelineData: response.result,  
                    ticketId: params.code,
                })
            }
        });
    }

    public render() {
        const { timelineData, isModalOpen, subject, description, statusId, pendingWith } = this.state;
        console.log('pendingWith', pendingWith);
        console.log('statusId', statusId);
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            {timelineData && timelineData.length == 0 && (
                                <div className="col-lg-11">
                                    <div className="row ">
                                        <div className="col-lg-12 mt-4 text-center">No record found</div>
                                    </div>
                                </div>
                            )}

                            {timelineData && timelineData.length > 0 && (

                                <div className="col-lg-11">

                                    <div className="card mt-2">
                                        <div className="card-header">
                                            <b>{subject}</b>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-lg-12 mb-2">
                                                    <div className="row">
                                                        <div className="col-lg-2 timeline-date mb-2">
                                                            {description}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mt-2">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-lg-10">
                                                    Ticket History
                                            </div>
                                                <div className="col-lg-2 text-right">
                                                    <button className="btn primary-control float-right" onClick={this.onTicket}>
                                                        Update Ticket
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                {timelineData && timelineData.length > 0 && timelineData.map((item: any, index: any) =>
                                                    <div className="col-lg-12 mb-2">
                                                        <div className="row">
                                                            <div className="col-lg-2 timeline-date mb-2">
                                                                {moment(item.modifiedOn).format('DD-MMM-YYYY')}
                                                            </div>
                                                            <span className="dot"></span>
                                                            <span className="line"></span>
                                                            <div className="col-lg-10 timeline-details card mb-2 px-0">
                                                                {/* <b className="subject pl-3 mt-1">Attendance Timing Issue</b> */}
                                                                <p className="message pl-3">{item.comment}</p>
                                                                <span className="ticket-status">{item.statusName}</span>
                                                                <div className="col-lg-12 ticket-details">
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <b>Assign To:</b> {item.pendingWithName ? item.pendingWithName : 'None'}
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <b>Updated by:</b> {item.modifiedByName}
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <b>Updated on: </b>{moment(item.modifiedOn).format('DD-MMM-YYYY HH:mm:ss')}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                )}

                                            </div>
                                        </div>
                                    </div>


                                </div>

                            )}
                        </div>
                    </div>
                </div>

                <HelpdeskModal isModalOpen={isModalOpen} closeModal={this.closeModal} selectedStatus={statusId} selectedAssignTo={pendingWith} updateTicket={this.updateTicket} />

            </React.Fragment>
        )
    }

    private onTicket = () => {
        this.setState({ isModalOpen: true });
    }

    private closeModal = () => {
        this.setState({ isModalOpen: false });
    }

    private getTicketDetail = (ticketId: any) => {
        getTicketDetail(ticketId).then((response: any) => {
            console.log("ticket detail  => ", response);
            if (response.status) {
                if(response.result) {
                    this.setState({
                        subject: response.result.subject, 
                        description: response.result.description,
                        statusId: response.result.statusId.toString(),
                        pendingWith: response.result.pendingWith.toString()
                    })
                }
            }
        });
    }

    private updateTicket = async (reqObj: any) => {
        console.log('reqObj update tcket   ', reqObj);
        updateTicket({
            ticketId: this.state.ticketId,
            statusId: reqObj.status,
            pendingWith: reqObj.assignedTo,
            comment: reqObj.comment,
        }).then(async (response: any) => {
            console.log("update timeline  => ", response);
            if (response.status) {
                for (let i = 0; i < reqObj.attachments.length; i++) {
                    const item = reqObj.attachments[i];
                    const itemModel = { ticketId: this.state.ticketId, attachment: item }
                    await uploadHelpdeskAttachment(itemModel);
                }
                this.setState({ isModalOpen: false });
                this.props.history.push(CONSTANT.url.helpdesk);
            }
        });
    }

}

export default HelpdeskTimeline;
