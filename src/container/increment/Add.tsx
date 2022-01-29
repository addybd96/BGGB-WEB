import * as React from 'react';

import CONSTANT from '../../constant';
import AddIncrementComp from '../../component/increment/Add';
import Header from '../../component/common/Header';
import Sidebar from '../../component/common/Sidebar';
import { addIncrement } from '../../action/IncrementAction';

class AddIncrement extends React.Component<any, any> {
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
                            <AddIncrementComp
                                onSubmit={this.onSubmit}
                            />
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }

    onSubmit = (model: any) => {
        addIncrement(model).then((res: any) => {
            if (res && res.result) {
                this.props.history.push(CONSTANT.url.increment.basic);
            }
        })
    }

}

export default AddIncrement;
