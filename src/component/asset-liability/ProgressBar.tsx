import React from 'react';
import CONSTANT from './../../constant';
import { Link } from 'react-router-dom';

const AssetProgressBar = (props: any) => {
    const userId = props.assetId;
    let detailLink, immovableLink, movableLink, debitLink, shareLink, declarationLink;
    if (userId !== undefined) {
        detailLink = CONSTANT.url.assetLiabilityAdd.replace(':id', userId);
        immovableLink = CONSTANT.url.editAssetImmovable.replace(':id', userId);
        movableLink = CONSTANT.url.editAssetMovable.replace(':id', userId);
        debitLink = CONSTANT.url.editAssetDebt.replace(':id', userId);
        shareLink = CONSTANT.url.editAssetShare.replace(':id', userId);
        declarationLink = CONSTANT.url.editAssetDeclaration.replace(':id', userId);
    } else {
        detailLink = CONSTANT.url.assetLiabilityAdd;
        // immovableLink = CONSTANT.url.editAssetImmovable.replace(':id', userId);
        // movableLink = CONSTANT.url.addMovable;
        // debitLink = CONSTANT.url.addDebit;
        // shareLink = CONSTANT.url.addShare;
        // declarationLink = CONSTANT.url.assetDeclaration;
    }

    return (
        <div className="row bg-white employee-tab">
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={detailLink}>
                    <i className="fas fa-key mr-3 text-primary"></i>
                    Detail Form
                 </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={immovableLink}>
                    <i className="far fa-user-circle mr-3 text-primary"></i>
                    Immovable Form
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={movableLink}>
                    <i className="fas fa-home mr-3 text-success"></i>
                    Movable Form
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={debitLink}>
                    <i className="fas fa-users mr-3 text-info"></i>
                    Debt Form
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={shareLink}>
                    <i className="fas fa-rupee-sign mr-3 text-success"></i>
                    Share Form
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={declarationLink}>
                    <i className="fas fa-graduation-cap mr-3"></i>
                    Declaration
                </Link>
            </div>
        </div>
    )
};

export default AssetProgressBar;