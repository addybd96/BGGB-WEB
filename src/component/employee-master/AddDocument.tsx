import * as React from 'react';
import { onChange, validateForm, setOptions } from '../../utils';
import { getDocumentTypeList } from './../../action/ConfigAction';

class AddFamily extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const detail = props.detail;
        this.state = {
            userId: props.userId,
            id: detail ? detail.id : '',
            documentTypeId: { value: detail ? detail.documentTypeId : '', name: 'documentTypeId', error: '', isRequired: true, options: [] },
            documentNumber: { value: detail ? detail.documentNumber : '', name: 'documentNumber', error: '', isRequired: true },
            documentFile: { value: '', name: 'documentFile', error: '', isRequired: true },
            fileName: detail ? detail.fileName : undefined
        }
    }

    componentDidMount() {
        getDocumentTypeList().then((res: any) => {
            setOptions(this, this.state.documentTypeId.name, res.result);
        }).catch((err: any) => {
            console.log(err);
        });
    }

    public render() {
        const { documentTypeId, documentNumber, documentFile, userId, fileName } = this.state;
        const filePath = fileName ? `${process.env.REACT_APP_BASE_URL}/document/${userId}/${fileName}` : undefined;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-12 form-group">
                        <label>Document Type *</label>
                        <select
                            name={documentTypeId.name}
                            value={documentTypeId.value}
                            onChange={this.onChange}
                            className={documentTypeId.error.length > 0 ? "form-control is-invalid" : "form-control"}>
                            <option>Select a document type</option>
                            {
                                documentTypeId.options.map((e: any, i: number) => {
                                    return (
                                        <option key={i} value={e.id}>{e.name}</option>
                                    )
                                })
                            }
                        </select>
                        <small>* Both Aadhar Card and Pan Card are mandatory to upload</small>
                    </div>
                    <div className="col-lg-12 form-group">
                        <label>Document Number *</label>
                        <input
                            type="text"
                            className={documentNumber.error.length > 0 ? "form-control is-invalid" : "form-control"}
                            placeholder="Enter unique number on the document"
                            name={documentNumber.name}
                            value={documentNumber.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-12 form-group">
                        <label>Upload Document *</label>
                        <input
                            type="file"
                            className={documentFile.error.length > 0 ? "form-control p-1 is-invalid" : "form-control p-1"}
                            name={documentFile.name}
                            onChange={this.onFileChange}
                        />
                        {
                            filePath && <a href={filePath} target="_blank">Click here to download the uploaded file</a>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <button onClick={this.props.onCancel} type="button" className="btn btn-secondary btn-sm btn-block">Cancel</button>
                    </div>
                    <div className="col-md-6" />
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary btn-sm btn-sm btn-block">Submit</button>
                    </div>
                </div>
            </form >
        )
    }

    private onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    private onFileChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.files[0];
        onChange(this, name, value);
    }

    private getJsonToPOST(state: any) {
        const stateData = JSON.parse(JSON.stringify(state));
        let formData = new FormData();
        formData.append('id', stateData.id)
        formData.append('userId', stateData.userId);
        formData.append('documentNumber', stateData.documentNumber.value)
        formData.append('documentTypeId', stateData.documentTypeId.value)
        formData.append('file', this.state.documentFile.value)
        return formData;
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm(this)) {
            const model = this.getJsonToPOST(this.state);
            this.props.onSubmit(model);
        }
    }
}

export default AddFamily;
