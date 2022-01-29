import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from './../../constant';

const empDefaultImg = require('./../../assets/images/user-img.jpg');
const tab1 = require('./../../assets/images/tab1.png');
const tab2 = require('./../../assets/images/tab2.png');
const tab3 = require('./../../assets/images/tab3.png');
const tab4 = require('./../../assets/images/tab4.png');
const tab5 = require('./../../assets/images/menu-icon4.png');
const tab6 = require('./../../assets/images/tab6.png');
const tab7 = require('./../../assets/images/tab5.png');

const AddEmployeeSidePanel = (props: any) => {
    return (
        <div className="col-lg-3">
            <div className="employee-profile card mt-5">
                <div className="profile-head">
                    <img src={empDefaultImg} />
                </div>
                <div className="col-lg-12 employee-details">
                    <b>Pooja Gupta</b>
                    <div className="email">pooja_gupta@gmail.com</div>
                    <div className="emp-id"><strong>Emp ID -</strong> 0012291991</div>
                </div>
            </div>

            <div className="col-lg-12 card employee-tab mt-2 mb-4">
                {/* <Link to={CONSTANT.url.addEmployeeBasic}>
                    <div className="tab"><a><img src={tab1} />Basic Details</a></div>
                </Link>
                <Link to={CONSTANT.url.addEmployeeAddress}>
                    <div className="tab"><a><img src={tab2} />Address Details</a></div>
                </Link>
               
                <Link to={CONSTANT.url.addEmployeeEducation}>
                    <div className="tab"><a><img src={tab4} />Education Details</a></div>
                </Link>
                <Link to={CONSTANT.url.addEmployeeExp}>
                    <div className="tab"><a><img src={tab5} />Experience Details</a></div>
                </Link>
                <Link to={CONSTANT.url.addEmployeeSalary}>
                    <div className="tab"><a><img src={tab6} />Salary Details</a></div>
                </Link>
                <Link to={CONSTANT.url.addEmployeeCompensation}>
                    <div className="tab"><a><img src={tab7} />Compensation & Benifit</a></div>
                </Link> */}
                {/* <div className="tab"><a href="employee-address-details.html"><img src={tab1} />Basic Details</a></div> */}
                {/* <div className="tab"><a href="employee-address-details.html"><img src={tab2} />Address Details</a></div> */}
                {/* <div className="tab"><a href="employee-professional-details.html"><img src={tab3} />Professional Details</a></div> */}
                {/* <div className="tab"><a href="employee-education-details.html"><img src={tab4} />Education Details</a></div> */}
                {/* <div className="tab"><a href="employee-experience-details.html"><img src={tab5} />Experience Details</a></div> */}
                {/* <div className="tab"><a href="employee-salary.html"><img src={tab6} />Salary Details</a></div> */}
                {/* <div className="tab"><a href="employee-compensation-and-benefits.html"><img src={tab5} />Compensation & Benifit</a></div> */}
            </div>

        </div>
    );
}

export default AddEmployeeSidePanel;
