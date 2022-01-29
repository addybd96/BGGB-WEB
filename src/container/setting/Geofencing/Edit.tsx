import * as React from 'react';

import CONSTANT from './../../../constant';

import Header from './../../../component/common/Header';
import Sidebar from './../../../component/common/Sidebar';
import Edit from '../../../component/Geofencing/Edit'
import { GoogleApiWrapper } from 'google-maps-react'

import { editGeofencing } from '../../../action/GeofencingActions'


class EditGeofencing extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLoader: false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.goToList = this.goToList.bind(this)
    }

    componentDidMount() {
        //this.loadEmployeeList();
    }

    public render() {

        return (
            <React.Fragment>
                <Header />
                <div className="col-lg-12 main-container">
                    <div className="fluid-container pl-0">
                        <div className="row">
                            <Sidebar />
                            <Edit google={this.props.google} code={this.props.match.params.code} onSubmit={this.onSubmit} goToList={this.goToList} />
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    goToList(){
        this.props.history.push(CONSTANT.url.settingsOption.geofencing)
    }



    onSubmit = (model: any) => {

        editGeofencing(model)
            .then((res: any) => {
                this.props.history.push(CONSTANT.url.settingsOption.geofencing)
            })
            .catch((err: any) => {
                alert(err)

            })

    }

    // loadEmployeeList = () => {
    //     this.setState({showLoader: true})
    //     getAllEmployeeList()
    //         .then((res: any) => {
    //             console.log('employees', res)
    //             if (res) {
    //                 this.setState({
    //                     employees: res.result,showLoader: false
    //                 })
    //             }
    //         })
    //         .catch((err: any) => {
    //             console.log(err);
    //             this.setState({showLoader: false
    //             })
    //         })
    // }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyB_hyGaNtm8p66EbS1Cchy42O-0upNIpUA"
})(EditGeofencing);
