import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../constant';
import moment from 'moment'

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/employee-master/ProgressBar';

import {getJobHistory } from '../../action/EmployeeAction';

class EmployeeEducation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            list: undefined,
            list1: undefined,
            showModal: false
        }
    }

    componentDidMount() {
        this.getEmployeeEducation();
    }

    public render() {
        const { list,list1, userId, showModal } = this.state;
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
                                    JOB History
                                   
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                <th scope="col">EmployeeId </th>
                                                <th scope="col">Designation </th>
                                                <th scope="col">Department </th>
                                                <th scope="col">Reporting Manager </th>
                                                <th scope="col">Branch Name </th>
                                                <th scope="col">Work Location </th>
                                                <th scope="col">Work Role </th>
                                                <th scope="col">Date Of Joining </th>
                                                <th scope="col">From Date</th>
                                                <th scope="col">To Date </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list === undefined && <tr>
                                                        <td className="text-center" colSpan={10}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.length === 0 && <tr>
                                                        <td className="text-center" colSpan={10}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list !== undefined && list.map((item: any, ind: number) => {
                                                         const colom = JSON.parse(item.colom)
                                                        return (
                                                            <tr key={ind}>
                                                                                                                                
                                                                <td ><span >{item.employeeId}</span></td>
                                                                <td> <span className = {colom.designationId?'text-success':'' }> {item.dsName}</span></td>
                                                                <td> <span className = {colom.departmentId?'text-success':'' }> {item.dpName}</span></td>
                                                                <td> <span className = {colom.reportingManagerId?'text-success':'' }> {item.rm}</span></td>
                                                                <td> <span className = {colom.companyBranchId?'text-success':'' }> {item.branchName}</span></td>
                                                                <td> <span className = {colom.workLocationId?'text-success':'' }> {item.location}</span></td>
                                                                <td> <span className = {colom.workRoleId?'text-success':'' }> {item.workRole}</span></td>
                                                                <td> <span className = {colom.dateOfJoining?'text-success':'' }> {moment(item.dateOfJoining).format('MMM Do YYYY')}</span></td>
                                                                <td> <span > {moment(item.from).format('MMM Do YYYY')}</span></td>
                                                                <td> <span > {item.to?moment(item.to).format('MMM Do YYYY'):'Present'}</span></td>
                                                                                                                              
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                          <div className="card mt-3">
                                <div className="card-header">
                                    Employee Status
                                   
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                <th scope="col">Login Status </th>
                                                <th scope="col">Employment Status </th>
                                                <th scope="col">From Date </th>
                                                <th scope="col">To Date </th>
                                               
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list1 === undefined && <tr>
                                                        <td className="text-center" colSpan={10}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    list1 !== undefined && list1.length === 0 && <tr>
                                                        <td className="text-center" colSpan={10}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    list1 !== undefined && list1.map((item: any, ind: number) => {
                                                        return (
                                                            <tr key={ind}>
                                                                                                                                
                                                                <td> <span > {item.loginStatus}</span></td>
                                                                <td> <span className ="text-success"> {item.empName}</span></td>
                                                                <td> <span > {moment(item.employmentStatusFromDate).format('MMM Do YYYY')}</span></td>
                                                                <td> <span >{item.employmentStatusToDate ? moment(item.employmentStatusToDate).format('MMM Do YYYY'):'Present'}  </span></td>
                                                                                                                                
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


            </React.Fragment>
        )
    }



 

    getEmployeeEducation = () => {
        const { userId } = this.state;
        getJobHistory(userId).then((response: any) => {
            this.setState({
                list: response.result?response.result.jobHistory:[],
                list1: response.result?response.result.employeeHistory:[],
                showLoader: false
            });
        }, (error: any) => {
            alert(error.Message);
            this.setState({ showLoader: false });
        });
    }

   
}

export default EmployeeEducation;