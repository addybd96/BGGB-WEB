import * as React from 'react';
import * as moment from 'moment'
import { Link } from 'react-router-dom'
import CONSTANT from '../../../constant';

export default class CompOffList extends React.Component<any, any>
{

    constructor(props: any) {
        super(props)
        this.state = {
            isModalOpen: false
        }
    }

    public render() {
        const { isModalOpen } = this.state
        return (<React.Fragment>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center" scope="col">Name</th>
                            <th className="text-center" scope="col">SOL</th>
                            <th className="text-center" scope="col">Address</th>
                            <th className="text-center" scope="col">Location</th>
                            <th className="text-center" scope="col">Edit</th>
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
        return this.props.branches.map((branch: any, lIndex: number) => {
            console.log(branch)
            return (<tr key={lIndex}>
                <td className="text-center">{branch.branchName}</td>
                <td className="text-center">{branch.soul}</td>
                <td className="text-center">{branch.branchAddress}</td>
                <td className="text-center">{branch.locationName}</td>
                <td className="text-center"><Link to={CONSTANT.url.settingsOption.editCompanyBranch.replace(':code', branch.branchId)}>
                    <a>
                        <i className="fa fa-edit"></i>
                    </a>
                </Link></td>
            </tr>)
        })
    }

    toggleModal = (e: any) => {
        this.setState({ isModalOpen: !this.state.isModalOpen, selectedId: e })
    }

    dismissModal = () => {
        this.setState({ isModalOpen: false })
    }

    // onSubmit = (payload:any) => {
    //     payload.id=this.state.selectedId
    //     approveCompOff(payload).then((resp:any)=>{
    //         this.setState({isModalOpen: false})
    //         this.props.loadList();
    //         console.log(payload)
    //     }).catch((err:any)=>{
    //         console.log(err)
    //     })
    // }
}