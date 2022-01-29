import React from 'react';

function Paging(props: any) {
    const { page, listItem, onPageChange } = props;
    return (
        <div className="row">
            <div className="col-md-3">
                <button type="button" onClick={onPageChange} data-type='-' disabled={page === 1} className="btn btn-link btn-sm btn-outline-info">Prev</button>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-3">
                <button type="button" onClick={onPageChange} data-type='+' disabled={listItem.length === 0} className="btn btn-link btn-sm float-right btn-outline-info">Next</button>
            </div>
        </div>
    )
}

export default Paging;