import * as React from 'react';

import CONSTANT from './../../../constant';
import AddDocumentComponent from '../../../component/document/Add'
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { getDocumentTypeDetail, updateDocumentType, } from '../../../action/SettingsActions'
class AddLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log(props.match.params.code);
        this.state = {
            documentTypeId: { value: props.match.params.code },
            documentDetail: undefined
        }
    }

    componentDidMount() {
        this.loadList()
    }

    public render() {
        const { documentDetail } = this.state;

        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            {
                                documentDetail &&
                                <AddDocumentComponent
                                    onSubmit={this.onSubmit}
                                    documentDetail={documentDetail}
                                />
                            }
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    loadList = () => {
        getDocumentTypeDetail(this.state.documentTypeId.value)
            .then((res: any) => {
                if (res.result) {
                    this.setState({
                        documentDetail: {
                            id: res.result.id,
                            name: res.result.name,
                            isMandatory: res.result.isMandatory
                        }
                    });
                }
            })
            .catch((err: any) => {
                console.log(err);
            })
    }

    onSubmit = (model: any) => {
        model.documentTypeId = this.state.documentTypeId.value
        updateDocumentType(model)
            .then((res: any) => {
                console.log(res);
                this.props.history.push(CONSTANT.url.settingsOption.document)
            })
            .catch((err: any) => {
                alert(err)

            })
    }
}

export default AddLeave;
