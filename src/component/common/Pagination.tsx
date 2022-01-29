import React from 'react';

const Pagination = (props: any) => {
    return (
        <React.Fragment>
            <div className="pagination-control">
                <nav aria-label="Page navigation example">
                    <ul className="pagination float-right">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default Pagination;
