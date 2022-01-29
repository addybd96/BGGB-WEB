import * as React from 'react';

import CONSTANT from '../../constant';
import AddWFH from '../../component/wfh/Add'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { addWFH } from '../../action/WFHActions';
class AddCompOff extends React.Component<any, any> {
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
                            <AddWFH
                                onSubmit={this.onSubmit}
                            />

                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }



    onSubmit = (model: any) => {
        addWFH(model)
            .then((res: any) => {
                console.log(res);
                this.props.history.push(CONSTANT.url.wfhHistory)
            })
            .catch((err: any) => {
                alert(err)

            })

    }



}

export default AddCompOff;
