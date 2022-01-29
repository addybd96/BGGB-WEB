import * as React from 'react';
import moment from 'moment';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/asset-liability/ProgressBar';
import ModalWindow from '../../component/common/ModalWindow';
import AddMovableShare from '../../component/asset-liability/AddMovableShare';
import AddMovableCompCash from '../../component/asset-liability/AddMovableCash';
import AddMovableCompExceed from '../../component/asset-liability/AddMovableExceed';
import AddMovableCompBelow from '../../component/asset-liability/AddMovableBelow';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Shimmer';
import { getAssetMovableForm, addAssetMovableShare, addAssetMovableCash, addAssetMovableExceed, addAssetMovableBelow } from '../../action/AssetLiabilityAction';

import CONSTANT from '../../constant';

class AddMovable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            assetId: props.match.params.id,
            showLoader: false,
            showModalOne: false,
            showModalTwo: false,
            showModalThree: false,
            showModalFour: false,
            list: undefined,
            detail: undefined
        }
    }

    componentDidMount() {
        this.loadList();
    }

    public render() {
        const { showLoader, showModalOne, showModalTwo, showModalThree, showModalFour, assetId, list, detail } = this.state;
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

                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-12 pl-0">
                                            <h5 className="heading-h1">Statement of Movable Property</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Particular of shares, debentures and investments, loan advances etc.</b>
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
                                                            <th scope="col">Nature of Investment</th>
                                                            <th scope="col">Name of Company / Individual</th>
                                                            <th scope="col">No of Units</th>
                                                            <th scope="col">Face Value (Rs)</th>
                                                            <th scope="col">Cost of Accquisition</th>
                                                            <th scope="col">How Acquired</th>
                                                            <th scope="col">Date of Accquisition</th>
                                                            <th scope="col">Whether Promotors' / Employee'Quota'</th>
                                                            <th scope="col">Employee Position at the Time of Accquisition</th>
                                                            <th scope="col">If Company Had Any Borrowing or Other Facility at That Time</th>
                                                            <th scope="col">Date of Disposal / Closure</th>
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
                                                            list !== undefined && list.shares.length === 0 && <tr>
                                                                <td className="text-center" colSpan={7}>No records found</td>
                                                            </tr>
                                                        }
                                                        {
                                                            list !== undefined && list.shares.map((item: any, ind: number) => {

                                                                return (
                                                                    <tr key={ind}>
                                                                        <td>{item.investmentNature}</td>
                                                                        <td>{item.companyName}</td>
                                                                        <td>{item.units}</td>
                                                                        <td>{item.faceValue}</td>
                                                                        <td>{item.acquisitionCost}</td>
                                                                        <td>{item.howAcquired}</td>
                                                                        <td>{moment(item.acquisitionDate).format('MMM Do YYYY')}</td>
                                                                        <td>{item.quota}</td>
                                                                        <td>{item.employeePosition}</td>
                                                                        <td>{item.companyFacility}</td>
                                                                        <td>{moment(item.disposalDate).format('MMM Do YYYY')}</td>
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
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Particular of Cash Deposits: Particulars of cash deposits including deposits with Bank, any company, post office and  other deposits with amounts.</b>
                                        <a className="btn btn-sm btn-primary float-right" href="javascript:none;" onClick={this.showModalTwo}>
                                            <i className="fa fa-plus"></i>&nbsp;Add Row
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Nature of Deposit</th>
                                                            <th scope="col">Name of Bank/Company/PostOffice/Others</th>
                                                            <th scope="col">Account Number</th>
                                                            <th scope="col">Amount Deposited (Rs)</th>
                                                            <th scope="col">Income Derived</th>
                                                            <th scope="col">When Acquired</th>
                                                            <th scope="col">How Acquired</th>
                                                            <th scope="col">Date of Closure</th>
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
                                                            list !== undefined && list.cash.length === 0 && <tr>
                                                                <td className="text-center" colSpan={7}>No records found</td>
                                                            </tr>
                                                        }
                                                        {
                                                            list !== undefined && list.cash.map((item: any, ind: number) => {

                                                                return (
                                                                    <tr key={ind}>
                                                                        <td>{item.depositeNature}</td>
                                                                        <td>{item.bankName}</td>
                                                                        <td>{item.accountNumber}</td>
                                                                        <td>{item.depositeAmount}</td>
                                                                        <td>{item.incomeDerived}</td>
                                                                        <td>{moment(item.acquiredDate).format('MMM Do YYYY')}</td>
                                                                        <td>{item.howAcquired}</td>
                                                                        <td>{item.remark}</td>
                                                                        <td>{moment(item.closureDate).format('MMM Do YYYY')}</td>
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
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Other Movable including all the articles value of which exceeds Rs. 25,000/- individually</b>
                                        <a className="btn btn-sm btn-primary float-right" href="javascript:none;" onClick={this.showModalThree}>
                                            <i className="fa fa-plus"></i>&nbsp;Add Row
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Particulars of Items</th>
                                                            <th scope="col">Date of Acquisition</th>
                                                            <th scope="col">Cost of Acquisition</th>
                                                            <th scope="col">Source of Acquisition</th>
                                                            <th scope="col">Date of Disposal</th>
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
                                                            list !== undefined && list.exceed.length === 0 && <tr>
                                                                <td className="text-center" colSpan={7}>No records found</td>
                                                            </tr>
                                                        }
                                                        {
                                                            list !== undefined && list.exceed.map((item: any, ind: number) => {

                                                                return (
                                                                    <tr key={ind}>
                                                                        <td>{item.particularItem}</td>
                                                                        <td>{moment(item.acquisitionDate).format('MMM Do YYYY')}</td>
                                                                        <td>{item.acquisitionCost}</td>
                                                                        <td>{item.acquisitionSource}</td>
                                                                        <td>{moment(item.disposalDate).format('MMM Do YYYY')}</td>
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
                                </div>

                                <div className="card mt-2">
                                    <div className="card-header">
                                        <b>Lump some value of individual articles of value below Rs. 25,000/-</b>
                                        <a className="btn btn-sm btn-primary float-right" href="javascript:none;" onClick={this.showModalFour}>
                                            <i className="fa fa-plus"></i>&nbsp;Add Row
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Particulars of Items</th>
                                                            <th scope="col">Date of Acquisition</th>
                                                            <th scope="col">Cost of Acquisition</th>
                                                            <th scope="col">Source of Acquisition</th>
                                                            <th scope="col">Date of Disposal</th>
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
                                                            list !== undefined && list.below.length === 0 && <tr>
                                                                <td className="text-center" colSpan={7}>No records found</td>
                                                            </tr>
                                                        }
                                                        {
                                                            list !== undefined && list.below.map((item: any, ind: number) => {

                                                                return (
                                                                    <tr key={ind}>
                                                                        <td>{item.particularItem}</td>
                                                                        <td>{moment(item.acquisitionDate).format('MMM Do YYYY')}</td>
                                                                        <td>{item.acquisitionCost}</td>
                                                                        <td>{item.acquisitionSource}</td>
                                                                        <td>{moment(item.disposalDate).format('MMM Do YYYY')}</td>
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

                            </div>

                        </div>
                    </div>
                </div>
                {
                    showModalOne && <ModalWindow
                        title="Movable Shares"
                        backdrop="static"
                        size="xl"
                        toggleModal={this.onCancel}>
                        <AddMovableShare
                            assetId={assetId}
                            detail={detail}
                            onSubmit={this.onSubmitMovableShare}
                            onCancel={this.onCancel}
                        />
                    </ModalWindow>
                }
                {
                    showModalTwo && <ModalWindow
                        title="Movable Cash"
                        backdrop="static"
                        size="xl"
                        toggleModal={this.onCancel}>
                        <AddMovableCompCash
                            assetId={assetId}
                            detail={detail}
                            onSubmit={this.onSubmitMovableCash}
                            onCancel={this.onCancel}
                        />
                    </ModalWindow>
                }
                {
                    showModalThree && <ModalWindow
                        title="Movable Form3"
                        backdrop="static"
                        size="xl"
                        toggleModal={this.onCancel}>
                        <AddMovableCompExceed
                            assetId={assetId}
                            detail={detail}
                            onSubmit={this.onSubmitMovableExceed}
                            onCancel={this.onCancel}
                        />
                    </ModalWindow>
                }
                {
                    showModalFour && <ModalWindow
                        title="Movable Form4"
                        backdrop="static"
                        size="xl"
                        toggleModal={this.onCancel}>
                        <AddMovableCompBelow
                            assetId={assetId}
                            detail={detail}
                            onSubmit={this.onSubmitMovableBelow}
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
        this.setState({ showModalOne: true, detail: null });
    }

    showModalTwo = () => {
        this.setState({ showModalTwo: true, detail: null });
    }

    showModalThree = () => {
        this.setState({ showModalThree: true, detail: null });
    }

    showModalFour = () => {
        this.setState({ showModalFour: true, detail: null });
    }

    onCancel = () => {
        this.setState({ showModalOne: false, showModalTwo: false, showModalThree: false, showModalFour: false });
    }

    loadList = () => {
        this.setState({ showLoader: true })
        getAssetMovableForm(this.state.assetId)
            .then((res: any) => {
                console.log("res => ", res);
                this.setState({ showLoader: false });
                if (res.result) {
                    this.setState({
                        list: res.result.list,
                    });
                }
            }).catch((err: any) => {
                console.log(err);
            });
    }

    onSubmitMovableShare = (model: any) => {
        this.setState({ showLoader: true });
        addAssetMovableShare(model)
            .then((response: any) => {
                this.setState({ showLoader: false });
                console.log("response ==> ", response);
                if (response.result) {
                    this.setState({ showModalOne: false });
                    this.loadList();
                }
            }).catch((err: any) => {
                alert(err)
            });
    }

    onSubmitMovableCash = (model: any) => {
        this.setState({ showLoader: true });
        addAssetMovableCash(model)
            .then((response: any) => {
                this.setState({ showLoader: false });
                console.log("response ==> ", response);
                if (response.result) {
                    this.setState({ showModalTwo: false });
                    this.loadList();
                }
            }).catch((err: any) => {
                alert(err)
            });
    }

    onSubmitMovableExceed = (model: any) => {
        this.setState({ showLoader: true });
        addAssetMovableExceed(model)
            .then((response: any) => {
                this.setState({ showLoader: false });
                console.log("response ==> ", response);
                if (response.result) {
                    this.setState({ showModalThree: false });
                    this.loadList();
                }
            }).catch((err: any) => {
                alert(err)
            });
    }
    onSubmitMovableBelow = (model: any) => {
        this.setState({ showLoader: true });
        addAssetMovableBelow(model)
            .then((response: any) => {
                this.setState({ showLoader: false });
                console.log("response ==> ", response);
                if (response.result) {
                    this.setState({ showModalFour: false });
                    this.loadList();
                }
            }).catch((err: any) => {
                alert(err)
            });
    }

    saveContinue = () => {
        this.props.history.push(CONSTANT.url.editAssetDebt.replace(':id', this.state.assetId));
    }

}

export default AddMovable;
