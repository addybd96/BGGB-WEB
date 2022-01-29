import * as React from "react";

import Header from "../../component/common/Header";
import Sidebar from "../../component/common/Sidebar";
import AddLeaveBalance from "../../component/employee-master/AddLeaveBalance";
import ModalWindow from "../../component/common/ModalWindow";
import ProgressBar from "../../component/employee-master/ProgressBar";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { updateProfilePicture, getBasicDetail } from "./../../action/EmployeeAction";

class EmployeeDocument extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            img_path: null,
        };

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.loadList();
    }

    public render() {
        const { userId, img_path, picture } = this.state;
        console.log(picture)
        return (
            <React.Fragment>
                <Header />
                <div className="fluid-container px-0">
                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-11 my-3">
                            <div className="col-lg-12  employee-tab mt-2 mb-3">
                                <ProgressBar userId={userId} />
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    Profile Picture
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Upload File</label>
                                        <input type="file" className="form-control p-1" onChange={this.onChange} />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{ width: '600px', height: '600px' }}>
                                            {!img_path && picture && <img style={{ width: '600px', height: '600px' }} src={`${process.env.REACT_APP_BASE_URL}/profile-picture/${userId}/${picture}`} />}
                                            {img_path && <Cropper
                                                ref={(ref: any) => { this.cropper = ref }}
                                                zoomOnWheel={false}
                                                style={{ height: 600, width: '100%' }}
                                                aspectRatio={1}
                                                crop={this._crop.bind(this)}
                                                src={this.state.img_path} />}
                                        </div>
                                        <div className="col-md-10">

                                        </div>

                                        {img_path && <div className="col-md-2 mt-2">
                                            <button className="btn btn-primary btn-block" onClick={this.onSubmit}>Save</button>
                                        </div>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }


    async _crop() {

        await this.setState({ cropped: await this.getCroppedImg(this.cropper.getCroppedCanvas(), 'img.jpg') })
    }

    private cropper: any;

    getCroppedImg = (canvas: any, fileName: any) => {

        return new Promise((resolve, reject) => {
            canvas.toBlob((file: any) => {
                if (file)
                    file.name = fileName;
                var fil = new File([file], fileName, { type: 'image/jpeg', lastModified: Date.now() });
                resolve(fil);
            }, 'image/jpeg');
        });
    }

    onChange = (e: any) => {
        let files = e.target.files

        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = () => {
                this.setState({ img_path: fr.result, original: fr.result })
            }

            if (files[0].size <= 1000000)
                fr.readAsDataURL(files[0])
            else
                window.alert("File cannot be larger than 1 MB!")
        }
    }

    loadList = () => {
        const { userId } = this.state;
        this.setState({ showLoader: true });
        getBasicDetail(userId).then((res: any) => {
            this.setState({ showLoader: false, picture: res.result.profilePicture });
        })
    };

    onSubmit = (e: any) => {

        let formData = new FormData()
        const { userId, cropped } = this.state;

        formData.append('userId', userId)
        formData.append('file', cropped)

        this.setState({ showLoader: true }, () => {
            updateProfilePicture(formData).then((response: any) => {
                window.location.reload()
            }, (error: any) => {
                alert(error.message);
            });
        });
    };

    showModal = () => {
        this.setState({ showModal: true, detail: null });
    };

    onCancel = () => {
        this.setState({ showModal: false });
    };

    onEdit = (e: any) => {
        const id = parseInt(e.target.dataset.id, 10);
        const detail = this.state.list.filter((i: any) => i.id === id)[0];
        this.setState({ showModal: true, detail });
    };

    // onDelete = (id: number) => {
    //     // const id = parseInt(e.target.dataset.id, 10);
    //     this.setState({ showLoader: true });
    //     deleteLeaveBalance(id).then((res: any) => {
    //         this.setState({ showModal: false, showLoader: false });
    //         this.loadList();
    //     });
    // }
}

export default EmployeeDocument;