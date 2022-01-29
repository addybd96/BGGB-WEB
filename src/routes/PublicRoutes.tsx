import React, { Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import CONSTANT from './../constant';
import Login from './../container/auth/Login';
import Logout from './../container/auth/Logout';
import Register from './../container/auth/Register';
import ChangePassword from './../container/auth/ChangePassword';
import ChatBOT from './../container/ChatBOT';


const PublicRoutes = () => (
    <Fragment>
        <Switch>
            <Route exact={true} path={CONSTANT.url.login} component={Login} />
            <Route exact={true} path={CONSTANT.url.logout} component={Logout} />
            <Route exact={true} path={CONSTANT.url.register} component={Register} />
            <Route exact={true} path={CONSTANT.url.changePassword} component={ChangePassword} />
            <Route exact={true} path={CONSTANT.url.chatBot} component={ChatBOT} />
            {/* <Route component={NotFound} /> */}
        </Switch>
    </Fragment>
);

export default PublicRoutes;
