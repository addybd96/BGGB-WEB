import * as React from 'react';

export default class LeaveList extends React.Component<any, any>
{


    public render()
    {
        return(<React.Fragment>
            <div className="table-responsive">
                <table className="table table-striped">
                <thead>
                    <tr>
                      <th scope="col">Empployee ID</th>
                      <th scope="col">Leave Type</th>
                      <th scope="col">Date (From)</th>
                      <th scope="col">Date (To)</th>
                      <th scope="col">Day Type</th>
                      <th scope="col">Reason For Leave</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderLeavesTable()}
                  </tbody>
                </table>
            </div>
        </React.Fragment>)
    }

    renderLeavesTable = () => {
        return this.props.leaves.map((leave: any, lIndex: number)=> {
            return (<tr key={lIndex}>
        <td>{leave.employeeId}</td>
        <td>{leave.leaveType}</td>
        <td>{leave.fromDate}</td>
        <td>{leave.toDate}</td>
        <td>{leave.dayType}</td>
        <td>{leave.reason}</td>
        <td><span className={(leave.status==='pending'?'pending-leave': leave.status === 'rejected'? 'rejected-leave':'approved-leave ') + ' text-capitalize'}>{leave.status}</span></td>
            </tr>)
        })
    }
}