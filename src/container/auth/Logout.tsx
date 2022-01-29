import React from 'react';
import { removeAllCookies } from './../../utils';
import CONSTANT from './../../constant';
class Logout extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        removeAllCookies();
        localStorage.removeItem('rsc_cache')
        props.history.push('/');
    }

    componentDidMount() {
        document.title = 'Logout';
    }

    public render() {
        return (
            <React.Fragment>
                <div className="text-center">Redirecting to home page</div>
            </React.Fragment>
        );
    }
}

export default Logout;