import React from "react";
import { Link } from "react-router-dom";
import constant from "../../constant";
import { getCookie, getSession } from "../../utils";
import Sidebar from "./EPMSSidepanel";

import { Route, Switch, Redirect } from "react-router-dom";
import { getAuthenticationFormComplete } from "../../action/AuthAction";
import { AddEMPSComfig } from "./AddEPMSConfig";
import { AddKRA } from "./AddKRA";
import { MapKRA } from "./mapKRA";
import { AddUserRoll } from "./AddUserToRoll";
import { AddFixedQues } from "./AddFixedQues";

const logo = require("./../../assets/images/logo/logo.png");
const userImage = require("./../../assets/images/user-img.jpg");
const PrivateRoute = (props) => {
  let result;
  if (getSession()) {
    if (getAuthenticationFormComplete()) return <Route {...props} />;
    else
      return (
        <Redirect
          exact={true}
          to={{
            pathname: constant.url.getAuthenticationFormComplete,
            state: { from: props.path },
          }}
        />
      );
  } else {
    return (
      <Redirect
        exact={true}
        to={{ pathname: constant.url.login, state: { from: props.path } }}
      />
    );
  }
};

export const EPMSDashboard = () => {
  const ud = getCookie(constant.cookie.userDetail);
  return (
    <React.Fragment>
      <div className="header-container">
        <div className="d-flex justify-content-between">
          <div className="col-4 col-lg-2">
            <div className="logo">
              <Link to={constant.url.dashboard}>
                <img src={logo} alt="HRMS" />
              </Link>
            </div>
          </div>

          <h4 className="text-secondary">Epms Dashboard</h4>
          <div className="btn-group user-profile" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              className="btn dropdown-toggle"
              data-toggle="dropdown"
            >
              {ud.name}
            </button>

            <div className="dropdown-menu">
              <a className="dropdown-item" href={constant.url.changePassword}>
                Change Password
              </a>
              <a className="dropdown-item" href={constant.url.logout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <Sidebar />

        <Switch>
          <PrivateRoute
            exact={true}
            path={constant.url.epmsconfig}
            component={AddEMPSComfig}
          />
          <PrivateRoute
            exact={true}
            path={constant.url.addKRA}
            component={AddKRA}
          />
          <PrivateRoute
            exact={true}
            path={constant.url.mapKRA}
            component={MapKRA}
          />
          <PrivateRoute
            exact={true}
            path={constant.url.userRoleMap}
            component={AddUserRoll}
          />
          <PrivateRoute
            exact={true}
            path={constant.url.addFixedQues}
            component={AddFixedQues}
          />
        </Switch>
      </div>
    </React.Fragment>
  );
};
