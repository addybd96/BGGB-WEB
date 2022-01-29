import * as React from 'react';

import { isEmpty, onChange, validateForm, setError } from '../../../utils';
import CONSTANT from '../../../constant';
import Header from '../../../component/common/Header';
import Sidebar from '../../../component/common/Sidebar';
import { addDocumentType } from '../../../action/SettingsActions';
import AddDocumentComponent from '../../../component/document/Add'

class AddDocument extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {

        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            <AddDocumentComponent
                                onSubmit={this.onSubmit}
                            />
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }


    onSubmit = (model: any) => {
        addDocumentType(model)
            .then((res: any) => {
                console.log(res);
                this.props.history.push(CONSTANT.url.settingsOption.document)
            })
            .catch((err: any) => {
                alert(err)

            })
    }


}

export default AddDocument;
