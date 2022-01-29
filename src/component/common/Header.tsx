import React from 'react';
import CONSTANT from './../../constant';
import { getCookie } from '../../utils';
import Chatbot from "./../../component/chat-bot/Index";

const logo = require("./../../assets/images/logo/logo.png");
const userImage = require('./../../assets/images/user-img.jpg');

const Header: React.FC = () => {
    const ud = getCookie(CONSTANT.cookie.userDetail)
    return (
        <header>
            {/* <Chatbot /> */}
            <div className="header-container">
                <div className="row">
                    <div className="col-4 col-lg-2">
                        <div className="logo"><a href={CONSTANT.url.dashboard}><img src={logo} alt="HRMS" /></a>
                        </div>
                    </div>
                    <nav className="col-8 col-lg-10 navbar navbar-expand-lg menu-bar">
                        <button className="navbar-toggler top-navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </button>

                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">

                                {/* <li className="nav-item">
                                                <a className="nav-link" href="/">
                                                    <i className="fa fa-gear"></i>
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" href="/">
                                                    <span className="notification-count">8</span>
                                                    <i className="fa fa-bell"></i>
                                                </a>
                                            </li> */}

                                <div className="btn-group user-profile" role="group">
                                    <button id="btnGroupDrop1" type="button" className="btn dropdown-toggle"
                                        data-toggle="dropdown">
                                        {/* <img src={userImage} alt="" />  */}
                                        {ud.name}
                                    </button>

                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href={CONSTANT.url.changePassword}>Change Password</a>
                                        <a className="dropdown-item" href={CONSTANT.url.logout}>Logout</a>
                                    </div>
                                </div>

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
