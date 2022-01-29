import * as React from 'react';

import ModalWindow from '../../component/common/ModalWindow';
import Lic from '../../component/employee-master/Lic';
import CONSTANT from './../../constant';
import { getCookie, } from '../../utils';
import { updateLicTaxDetail } from '../../action/DeclarationAction';

class EmployeeLic extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const userDetail = getCookie(CONSTANT.cookie.userDetail)
        this.state = {
            userId: props.userId,
            list: props.detail ? props.detail.lic : undefined,
            showModal: false,
            userType: userDetail.userType
        }
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({ list: nextProps.detail.lic });
    }

    public render() {
        const { list, userId, userType, showModal } = this.state;

        return (
            <React.Fragment>
                <div className="card mt-3">
                    <div className="card-header">
                        Life Insurance Details
                                    {(userType === 'sadmin' || userType === 'radmin') &&
                            <a className="btn btn-sm btn-primary float-right" href="javascript:none;" onClick={this.showModal}>
                                <i className="fa fa-plus"></i>&nbsp;Add LIC
                                    </a>}
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">insurance provider name</th>
                                        <th scope="col">LIC No </th>
                                        <th scope="col">Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list === undefined && <tr>
                                            <td className="text-center" colSpan={5}>Loading...</td>
                                        </tr>
                                    }
                                    {
                                        list !== undefined && list.length === 0 && <tr>
                                            <td className="text-center" colSpan={5}>No records found</td>
                                        </tr>
                                    }
                                    {
                                        list !== undefined && list.map((item: any, ind: number) => {

                                            return (
                                                <tr key={ind}>
                                                    <td>{item.insuranceProvider}</td>
                                                    <td>{item.licNo}</td>
                                                    <td>{item.amount}</td>

                                                    <th scope="col">
                                                        <a href="#" onClick={(e: any) => {
                                                            e.preventDefault()
                                                            this.setState({ detail: item, showModal: true })
                                                        }} >
                                                            <i className="fas fa-edit"></i>
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
                {
                    showModal
                    && <ModalWindow
                        title="Life Insurance "
                        backdrop="static"
                        toggleModal={this.onCancel}>
                        <Lic
                            userId={userId}
                            detail={this.state.detail}
                            onSubmit={this.onSubmit}
                            onCancel={this.onCancel}
                        />
                    </ModalWindow>
                }
            </React.Fragment>
        )
    }

    showModal = () => {
        this.setState({ showModal: true, detail: null });
    }

    onCancel = () => {
        this.setState({ showModal: false });
    }

    onSubmit = (model: any) => {
        this.setState({ showLoader: true });
        updateLicTaxDetail(model).then((res: any) => {
            this.setState({ showLoader: false });
            this.props.loadList()
            alert('Changes were saved successfully');
        }, (error: any) => {
            alert(error.message);
            this.setState({ showLoader: false });

        });
    }
}

export default EmployeeLic;