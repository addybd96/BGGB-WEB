import * as React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../../constant';

import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';

import { getDocumentType } from '../../../action/SettingsActions'

class ListDocument extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            documentList: []
        }
    }
    componentDidMount() {
        this.loadList()

    }
    public render() {
        const { documentList } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12 mt-4">
                                <div className="row">
                                    <div className="col-lg-6 pl-0">
                                        <h5 className="heading-h1">Document Type</h5>
                                    </div>
                                    <div className="col-lg-6 text-right pr-0">
                                        <Link to={CONSTANT.url.settingsOption.addDocument}>
                                            <a className="common-btn">
                                                <i className="fa fa-plus"></i> &nbsp;Add Document
                                                </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <b>Role </b>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Document Name</th>
                                                    <th scope="col">is Mandatory </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    documentList === undefined && <tr>
                                                        <td className="text-center" colSpan={3}>Loading...</td>
                                                    </tr>
                                                }
                                                {
                                                    documentList !== undefined && documentList.length === 0 && <tr>
                                                        <td className="text-center" colSpan={3}>No records found</td>
                                                    </tr>
                                                }
                                                {
                                                    documentList !== undefined &&
                                                    documentList.map((item: any, ind: number) => {
                                                        console.log(item.isMandatory);
                                                        return (
                                                            <tr key={ind}>
                                                                <td>{item.name}</td>
                                                                <td>{item.isMandatory ? 'Yes' : 'No'}</td>
                                                                <th scope="col">
                                                                    <Link to={CONSTANT.url.settingsOption.editDocument.replace(':code', item.id)}>
                                                                        <i className="fas fa-edit"></i>
                                                                    </Link>
                                                                </th>
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
                    </div>
                </div>
            </React.Fragment >
        )
    }

    loadList = () => {
        getDocumentType().then((res: any) => {
            this.setState({ documentList: res.result })
        }).catch((err: any) => {
            console.log(err);
        })
    }
}

export default ListDocument;
