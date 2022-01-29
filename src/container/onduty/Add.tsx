import * as React from 'react';

import CONSTANT from '../../constant';
import AddODComponent from '../../component/onduty/Add'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { addOD } from '../../action/ODActions';
class AddOD extends React.Component<any, any> {
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
                            <AddODComponent
                                onSubmit={this.onSubmit}
                            />

                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }



    onSubmit = (model: any) => {
        addOD(model)
            .then((res: any) => {
                console.log(res);
                this.props.history.push(CONSTANT.url.odHistory)
            })
            .catch((err: any) => {
                alert(err)

            })

    }



}

export default AddOD;
