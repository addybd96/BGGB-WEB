import * as React from 'react';

import Header from './../component/common/Header';
import Sidebar from '../component/common/Sidebar';

class AcknowledgeConfig extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    public render() {
        return (
            <React.Fragment>
                <Header />
                <Sidebar />
                
            </React.Fragment>
        )
    }

}

export default AcknowledgeConfig;