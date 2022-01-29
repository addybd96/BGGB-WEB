import * as React from 'react';
import moment from 'moment';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/asset-liability/ProgressBar';
import ModalWindow from '../../component/common/ModalWindow';
import AddImmovableComp from '../../component/asset-liability/AddImmovable';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Shimmer';
import CONSTANT from '../../constant';
import { addAssetImmovable, getAssetImmovableForm } from './../../action/AssetLiabilityAction';

class AddImmovable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            assetId: props.match.params.id,
            detail: undefined,
            list: undefined,
            showLoader: false,
            showModal: false,
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
                                            <b>Immovable Item</b>
                                            <a className="btn btn-sm btn-primary float-right" href="javascript:none;" onClick={this.showModal}>
                                                <i className="fa fa-plus"></i>&nbsp;Add Immovable Item
                                        </a>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="table-responsive">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Name & Details of Property</th>
                                                                <th scope="col">Village/Town/City</th>
                                                                <th scope="col">Sub Devision/Taluka</th>
                                                                <th scope="col">District</th>
                                                                <th scope="col">State</th>
                                                                <th scope="col">Property Owner Name</th>
                                                                <th scope="col">Relationship to Employee</th>
                                                                <th scope="col">How Acquired</th>
                                                                <th scope="col">Date of Acquisition</th>
                                                                <th scope="col">Name & Detail of person acquired</th>
                                                                <th scope="col">Source and fund of acquisition</th>
                                                                <th scope="col">Annual Income from Property, If any</th>
                                                                <th scope="col">Cost of Accquisition</th>
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
                                                                list !== undefined && list.length === 0 && <tr>
                                                                    <td className="text-center" colSpan={7}>No records found</td>
                                                                </tr>
                                                            }
                                                            {
                                                                list !== undefined && list.map((item: any, ind: number) => {

                                                                    return (
                                                                        <tr key={ind}>
                                                                            <td>{item.nameOfProperty}</td>
                                                                            <td>{item.village}</td>
                                                                            <td>{item.subDivision}</td>
                                                                            <td>{item.district}</td>
                                                                            <td>{item.state}</td>
                                                                            <td>{item.propertyOwner}</td>
                                                                            <td>{item.relationshipEmployee}</td>
                                                                            <td>{item.howAcquired}</td>
                                                                            <td>{moment(item.dateOfAcquisition).format('MMM Do YYYY')}</td>
                                                                            <td>{item.personAcquired}</td>
                                                                            <td>{item.sourceOfAcquisition}</td>
                                                                            <td>{item.annualIncome}</td>
                                                                            <td>{item.acquisitionCost}</td>
                                                                            <td>{moment(item.dateOfDisposal).format('MMM Do YYYY')}</td>
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
                        title="Immovable Form"
                        backdrop="static"
                        size="xl"
                        toggleModal={this.onCancel}>
                        <AddImmovableComp
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
        getAssetImmovableForm(this.state.assetId)
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
        this.setState({ showLoader: true });
        addAssetImmovable(model)
            .then((response: any) => {
                this.setState({ showLoader: false });
                console.log("response ==> ", response);
                if (response.result) {
                    this.setState({ showModal: false });
                    this.loadList();
                    // this.props.history.push(CONSTANT.url.editAssetMovable.replace(':id', this.state.assetId));
                }
            }).catch((err: any) => {
                alert(err)
            });

    }

    saveContinue = () => {
        this.props.history.push(CONSTANT.url.editAssetMovable.replace(':id', this.state.assetId));
    }

}

export default AddImmovable;
