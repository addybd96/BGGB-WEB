import React from "react";
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
import CONSTANT from "./../../constant";
import { getCookie } from "../../utils";
import {
  hideByUserId,
  hidePaymentByUserId,
} from "../../action/UniformAndLiveriesAction";
import constant from "./../../constant";

const homeIcon = require("./../../assets/images/menu-icon/home.png");
const empIcon = require("./../../assets/images/menu-icon/employee.png");
const attendenceIcon = require("./../../assets/images/menu-icon/attendance.png");
const salaryIcon = require("./../../assets/images/menu-icon/salary.png");
const leaveIcon = require("./../../assets/images/menu-icon/leaves.png");
const holidayIcon = require("./../../assets/images/menu-icon/calendar.png");
const settingIcon = require("./../../assets/images/menu-icon/settings.png");

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: undefined,
    };
  }

  componentDidMount() {
    const userDetail = getCookie(CONSTANT.cookie.userDetail);

    this.setState({ userType: userDetail.userType });
  }

  render() {
    const { userType } = this.state;
    return (
      <div className="col-md-1 left-section">
        <div className="tab">
          <button className="tablinks">
            <Link to={CONSTANT.url.epms} className="">
              <img src={homeIcon} />
              <p>Home</p>
            </Link>
          </button>
          {userType === "sadmin" ? (
            <>
              <NavLink
                className="epmsTab"
                to={constant.url.epmsconfig}
                activeClassName="border-left border-light"
              >
                <img src={empIcon} />
                <p>Add Role</p>
              </NavLink>

              {/* <NavLink
                className="epmsTab"
                to={constant.url.epmsconfig}
                activeClassName="border-left border-light"
              >
                <img src={empIcon} />
                <p>View Roles</p>
              </NavLink> */}
              <NavLink
                className="epmsTab"
                to={constant.url.addKRA}
                activeClassName="border-left border-light"
              >
                <img src={empIcon} />
                <p>Add KRA</p>
              </NavLink>
              {/* <NavLink
                className="epmsTab"
                to={constant.url.addKRA}
                activeClassName="border-left border-light"
              >
                <img src={empIcon} />
                <p>View KRA</p>
              </NavLink> */}
              <NavLink
                className="epmsTab"
                to={constant.url.mapKRA}
                activeClassName="border-left border-light"
              >
                <img src={empIcon} />
                <p>Map KRA to Role</p>
              </NavLink>
              <NavLink
                className="epmsTab"
                to={constant.url.userRoleMap}
                activeClassName="border-left border-light"
              >
                <img src={empIcon} />
                <p>Map Role To User</p>
              </NavLink>
              <NavLink
                className="epmsTab"
                to={constant.url.addFixedQues}
                activeClassName="border-left border-light"
              >
                <img src={empIcon} />
                <p>Add Fixed Question</p>
              </NavLink>
              {/* <button className="tablinks">
                <img src={empIcon} />
                <p>Employee Master</p>
              </button>
              <button className="tablinks">
                <img src={empIcon} />
                <p>Employee Master</p>
              </button> */}
            </>
          ) : (
            <>
              <button className="tablinks">
                <img src={empIcon} />
                <p>Employee Master</p>
              </button>
              <button className="tablinks">
                <img src={empIcon} />
                <p>Employee Master</p>
              </button>
              <button className="tablinks">
                <img src={empIcon} />
                <p>Employee Master</p>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;
