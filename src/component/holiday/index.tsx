import * as React from 'react';
import * as moment from 'moment'

export default class HolidayList extends React.Component<any, any>
{
    constructor(props:any)
    {
        super(props);
    }

    public render()
    {
        return (<React.Fragment>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Name</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderHolidayTable()}
                </tbody>
            </table>
        </React.Fragment>)
    }

    renderHolidayTable = () => {
        return this.props.holidays.map((holiday: any, hIndex: number) => {
            return (<tr key={hIndex}>
                <td className="text-center">{holiday.holidayName}</td>
                <td className="text-center">{moment(holiday.holidayDate).format("YYYY-MM-DD")}</td>
                <td className="text-center">{holiday.description}</td>
            </tr>)
        })
    }
}
