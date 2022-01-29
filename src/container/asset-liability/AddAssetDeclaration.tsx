import * as React from 'react';

import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import ProgressBar from '../../component/asset-liability/ProgressBar';
import AddDeclaration from '../../component/asset-liability/AddDeclaration';
import Loader from '../../component/common/Loader';
import CONSTANT from '../../constant';
import { addAssetDeclaration } from '../../action/AssetLiabilityAction';

class AddAssetDeclaration extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            assetId: props.match.params.id,
            showLoader: false
        }
    }

    public render() {
        const { showLoader, assetId } = this.state;
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
                                <AddDeclaration
                                    assetId={assetId}
                                    onSubmit={this.onSubmit}
                                />
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

    onSubmit = (model: any) => {
        this.setState({ showLoader: true })
        addAssetDeclaration(model)
            .then((res: any) => {
                console.log("res => ", res);
                this.setState({ showLoader: false });
                if (res.result) {
                    // Add Navigation
                    this.props.history.push(CONSTANT.url.dashboard);
                }
            }).catch((err: any) => {
                alert(err);
            });
    }

}

export default AddAssetDeclaration;
