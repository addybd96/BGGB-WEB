import * as React from 'react';

const Shimmer = () => {
    return (
        <div className="skeleton mb-3">
            <div className="skeleton-wrapper">
                <div className="skeleton-wrapper-inner">
                    <div className="skeleton-wrapper-body">
                        <div className="skeleton-avatar" />
                        <div className="skeleton-author" />
                        <div className="skeleton-label" />
                        <div className="skeleton-content-1" />
                        <div className="skeleton-content-2" />
                        <div className="skeleton-content-3" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shimmer;