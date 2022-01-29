import * as React from 'react';
import moment from 'moment'

export default class DeductionList extends React.Component<any, any> {

    public render() {
        const { list } = this.props;

        return (
            <React.Fragment>
                <div className="card mt-3">
                    <div className="card-header">
                        Group Insurance
                   </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Amount </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.groupInsurance === undefined && <tr>
                                            <td className="text-center" colSpan={5}>Loading...</td>
                                        </tr>
                                    }
                                    {
                                        list.groupInsurance !== undefined && list.groupInsurance.length === 0 && <tr>
                                            <td className="text-center" colSpan={5}>No records found</td>
                                        </tr>
                                    }
                                    {
                                        list.groupInsurance !== undefined && list.groupInsurance.map((item: any, ind: number) => {

                                            return (
                                                <tr key={ind}>
                                                    <td>{item.name}</td>
                                                    <td>{item.amount}</td>
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
                        Welfare Association
                   </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Amount </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.welfare === undefined && <tr>
                                            <td className="text-center" colSpan={5}>Loading...</td>
                                        </tr>
                                    }
                                    {
                                        list.welfare !== undefined && list.welfare.length === 0 && <tr>
                                            <td className="text-center" colSpan={5}>No records found</td>
                                        </tr>
                                    }
                                    {
                                        list.welfare !== undefined && list.welfare.map((item: any, ind: number) => {

                                            return (
                                                <tr key={ind}>
                                                    <td>{item.name}</td>
                                                    <td>{item.amount}</td>
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
                        Other Deduction
                   </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Amount </th>
                                        <th scope="col">Date </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.otherDeduction === undefined && <tr>
                                            <td className="text-center" colSpan={5}>Loading...</td>
                                        </tr>
                                    }
                                    {
                                        list.otherDeduction !== undefined && list.otherDeduction.length === 0 && <tr>
                                            <td className="text-center" colSpan={5}>No records found</td>
                                        </tr>
                                    }
                                    {
                                        list.otherDeduction !== undefined && list.otherDeduction.map((item: any, ind: number) => {

                                            return (
                                                <tr key={ind}>
                                                    <td>{item.name}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{moment.unix(item.date).format('YYYY-MM-DD')}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </React.Fragment>
        )
    }


}

