import * as React from 'react';
import moment from 'moment';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/asset-liability/ProgressBar';
import ModalWindow from '../../component/common/ModalWindow';
import AddShareComp from '../../component/asset-liability/AddShare';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Shimmer';
import { getAssetShareForm, addAssetShare } from '../../action/AssetLiabilityAction';
import CONSTANT from '../../constant';

class AddShare extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            assetId: props.match.params.id,
            showLoader: false,
            showModal: false,
            detail: undefined,
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
                                            <b>Share Form</b>
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
                                                                <th scope="col">Transaction Made (Purchase/Sale)</th>
                                                                <th scope="col">Detail of each Transaction in Shares</th>
                                                                <th scope="col">Particulars of party/firms</th>
                                                                <th scope="col">Whether parti is</th>
                                                                <th scope="col">If Purchased, Amount Financed from Personal Sources</th>
                                                                <th scope="col">If Purchased, Amount Financed from Other Sources</th>
                                                                <th scope="col">Date of Transaction</th>
                                                                <th scope="col">Amount Derived from sale</th>
                                                                <th scope="col">Any Other relevant factor</th>
                                                                <th scope="col">Date of Disposal</th>
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
                                                                            <td>{item.transactionMade}</td>
                                                                            <td>{item.transactionDetail}</td>
                                                                            <td>{item.partyParticulars}</td>
                                                                            <td>{item.partyIs}</td>
                                                                            <td>{item.financedAmount}</td>
                                                                            <td>{item.financedAmountOther}</td>
                                                                            <td>{moment(item.transactionDate).format('MMM Do YYYY')}</td>
                                                                            <td>{item.saleAmount}</td>
                                                                            <td>{item.otherFactor}</td>
                                                                            <td>{moment(item.dateOfDisposal).format('MMM Do YYYY')}</td>
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
                        title="Share Form"
                        backdrop="static"
                        size="xl"
                        toggleModal={this.onCancel}>
                        <AddShareComp
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
        getAssetShareForm(this.state.assetId)
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
        addAssetShare(model)
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
        this.props.history.push(CONSTANT.url.editAssetDeclaration.replace(':id', this.state.assetId));
    }

}

export default AddShare;
