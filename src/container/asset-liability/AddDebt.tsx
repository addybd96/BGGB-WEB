import * as React from 'react';
import moment from 'moment';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/asset-liability/ProgressBar';
import ModalWindow from '../../component/common/ModalWindow';
import AddDebitComp from '../../component/asset-liability/AddDebt';
import CONSTANT from '../../constant';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Shimmer';
import { getAssetDebtForm, addAssetDebt } from '../../action/AssetLiabilityAction';

class AddDebt extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            assetId: props.match.params.id,
            detail: undefined,
            showLoader: false,
            showModal: false,
            list: undefined
        }
    }

    componentDidMount() {
        this.loadList();
    }

    public render() {
        const { showLoader, showModal, assetId, list, detail } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />

                            <div className="col-lg-11 my-3">

                                <div className="col-lg-12  mt-2 mb-3">
                                    <ProgressBar assetId={assetId} />
                                </div>

                                {
                                    list === undefined && <Shimmer />
                                }

                                {
                                    list !== undefined &&
                                    <div className="card mt-2">
                                        <div className="card-header">
                                            <b>Debit Form</b>
                                            <a className="btn btn-sm btn-primary float-right" href="javascript:none;" onClick={this.showModal}>
                                                <i className="fa fa-plus"></i>&nbsp;Add Row
                                        </a>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="table-responsive">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Name & Address of Creator</th>
                                                                <th scope="col">Date of Incurring Liability</th>
                                                                <th scope="col">Date of Transaction</th>
                                                                <th scope="col">Sanctioned Limit</th>
                                                                <th scope="col">Outstanding</th>
                                                                <th scope="col">Date of Liquidation</th>
                                                                <th scope="col">Remark</th>
                                                                {/* <th scope="col">Edit</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                list === undefined && <tr>
                                                                    <td className="text-center" colSpan={7}>Loading...</td>
                                                                </tr>
                                                            }
                                                            {
                                                                list !== undefined && list.length === 0 && <tr>
                                                                    <td className="text-center" colSpan={7}>No records found</td>
                                                                </tr>
                                                            }
                                                            {
                                                                list !== undefined && list.map((item: any, ind: number) => {

                                                                    return (
                                                                        <tr key={ind}>
                                                                            <td>{item.creatorName}</td>
                                                                            <td>{moment(item.liabilityDate).format('MMM Do YYYY')}</td>
                                                                            <td>{moment(item.transactionDate).format('MMM Do YYYY')}</td>
                                                                            <td>{item.sanctionedLimit}</td>
                                                                            <td>{item.outstanding}</td>
                                                                            <td>{moment(item.liquidationDate).format('MMM Do YYYY')}</td>
                                                                            <td>{item.remark}</td>
                                                                            {/* <th scope="col">
                                                                                <a href="#" onClick={(e: any) => {
                                                                                    e.preventDefault()
                                                                                    // this.setState({ detail: item, showModal: true })
                                                                                }} >
                                                                                    <i className="fas fa-edit"></i>
                                                                                </a>
                                                                            </th> */}
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="col-lg-12 mt-2 mb-2 ">
                                            <button type="button" className="col-lg-2 btn primary-control pull-right" onClick={this.saveContinue}>Save and Continue</button>
                                        </div>
                                    </div>
                                }
                            </div>


                        </div>
                    </div>
                </div>
                {
                    showModal && <ModalWindow
                        title="Debit Form"
                        backdrop="static"
                        size="xl"
                        toggleModal={this.onCancel}>
                        <AddDebitComp
                            assetId={assetId}
                            detail={detail}
                            onSubmit={this.onSubmit}
                            onCancel={this.onCancel}
                        />
                    </ModalWindow>
                }
                {
                    showLoader && <Loader />
                }
            </React.Fragment >
        )
    }

    showModal = () => {
        this.setState({ showModal: true, detail: null });
    }

    onCancel = () => {
        this.setState({ showModal: false });
    }

    loadList = () => {
        this.setState({ showLoader: true })
        getAssetDebtForm(this.state.assetId)
            .then((res: any) => {
                console.log("res => ", res);
                this.setState({ showLoader: false });
                if (res.result) {
                    this.setState({
                        list: res.result,
                    })
                }
            }).catch((err: any) => {
                console.log(err);
            });
    }

    onSubmit = (model: any) => {
        this.setState({ showLoader: true })
        addAssetDebt(model)
            .then((res: any) => {
                console.log("res => ", res);
                this.setState({ showLoader: false });
                if (res.result) {
                    this.setState({ showModal: false });
                    this.loadList();
                }
            }).catch((err: any) => {
                alert(err);
            });
    }

    saveContinue = () => {
        this.props.history.push(CONSTANT.url.editAssetShare.replace(':id', this.state.assetId));
    }

}

export default AddDebt;
