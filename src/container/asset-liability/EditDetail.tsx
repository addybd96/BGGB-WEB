import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/asset-liability/ProgressBar';
import AddAsset from '../../component/asset-liability/AddDetail';
import CONSTANT from '../../constant';
import { addAssetDetail, getAssetDetailForm, updateAssetDetailForm } from './../../action/AssetLiabilityAction';
import Loader from '../../component/common/Loader';
import Shimmer from '../../component/common/Shimmer';

class EditAddAssetLiability extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            assetId: props.match.params.id,
            detail: undefined,
            showLoader: false
        }
    }

    componentDidMount() {
        this.loadList();
    }

    public render() {
        const { showLoader, assetId, detail } = this.state;
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
                                    detail === undefined && <Shimmer />
                                }
                                {
                                    detail !== undefined && <AddAsset
                                        detail={detail}
                                        assetId={assetId}
                                        onSubmit={this.onSubmit}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showLoader && <Loader />
                }
            </React.Fragment >
        )
    }

    loadList = () => {
        this.setState({ showLoader: true })
        getAssetDetailForm(this.state.assetId)
            .then((res: any) => {
                console.log("res => ", res);
                this.setState({ showLoader: false });
                if (res.result) {
                    this.setState({
                        detail: res.result,
                        assetId: res.result.id
                    })
                } else {
                    this.setState({
                        detail: {},
                    })
                }
            }).catch((err: any) => {
                console.log(err);
            });
    }

    onSubmit = (model: any) => {
        this.setState({ showLoader: true });
        // console.log("model ", model)
        if (model.id) {
            updateAssetDetailForm(model)
                .then((response: any) => {
                    this.setState({ showLoader: false });
                    console.log("update response ==> ", response);
                    if (response.result) {
                        this.props.history.push(CONSTANT.url.editAssetImmovable.replace(':id', response.result.id));
                    }
                }).catch((err: any) => {
                    alert(err)
                });
        } else {
            addAssetDetail(model)
                .then((response: any) => {
                    this.setState({ showLoader: false });
                    console.log("response ==> ", response);
                    if (response.result) {
                        this.props.history.push(CONSTANT.url.editAssetImmovable.replace(':id', response.result.id));
                    }
                }).catch((err: any) => {
                    alert(err)
                });
        }

    }

}

export default EditAddAssetLiability;
