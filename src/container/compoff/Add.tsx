import * as React from 'react';

import CONSTANT from '../../constant';
import AddCompOffs from '../../component/compoff/Add'
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { addCompOff } from '../../action/CompOffActions';
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
                            <AddCompOffs
                                onSubmit={this.onSubmit}
                            />

                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }



    onSubmit = (model: any) => {
        addCompOff(model)
            .then((res: any) => {
                this.props.history.push(CONSTANT.url.compOffHistory)
            })
            .catch((err: any) => {
                alert(err)

            })

    }



}

export default AddCompOff;
