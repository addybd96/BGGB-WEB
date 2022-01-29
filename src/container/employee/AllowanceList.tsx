import * as React from 'react';



export default class AllowanceList extends React.Component<any, any> {


    public render() {
        const { list } = this.props;

        return (
            <React.Fragment>
                <div className="card mt-3">
                    <div className="card-header">
                        Officiating Allowance
                     </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.officiating === undefined && <tr>
                                            <td className="text-center" colSpan={5}>Loading...</td>
                                        </tr>
                                    }
                                    {
                                        list.officiating !== undefined && list.officiating.length === 0 && <tr>
                                            <td className="text-center" colSpan={5}>No records found</td>
                                        </tr>
                                    }
                                    {
                                        list.officiating !== undefined && list.officiating.map((item: any, ind: number) => {

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
                        Cycle Allowance
                     </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.cycle === undefined && <tr>
                                            <td className="text-center" colSpan={5}>Loading...</td>
                                        </tr>
                                    }
                                    {
                                        list.cycle !== undefined && list.cycle.length === 0 && <tr>
                                            <td className="text-center" colSpan={5}>No records found</td>
                                        </tr>
                                    }
                                    {
                                        list.cycle !== undefined && list.cycle.map((item: any, ind: number) => {

                                            return (
                                                <tr key={ind}>
                                                    <td>{item.name}</td>
                                                    <td>{Number(item.amount)}</td>

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
                    Washing Allowance
                     </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.washing === undefined && <tr>
                                            <td className="text-center" colSpan={5}>Loading...</td>
                                        </tr>
                                    }
                                    {
                                        list.washing !== undefined && list.washing.length === 0 && <tr>
                                            <td className="text-center" colSpan={5}>No records found</td>
                                        </tr>
                                    }
                                    {
                                        list.washing !== undefined && list.washing.map((item: any, ind: number) => {

                                            return (
                                                <tr key={ind}>
                                                    <td>{item.name}</td>
                                                    <td>{Number(item.amount)}</td>

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

