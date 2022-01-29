import React from 'react';
import CONSTANT from './../../constant';
import { Link } from 'react-router-dom';
import tab1 from '../../assets/images/tab1.png';
import tab2 from '../../assets/images/tab2.png';
import tab4 from '../../assets/images/tab4.png';
import tab5 from '../../assets/images/tab5.png';
import menu from '../../assets/images/menu-icon4.png';

const OnboardProgressBar = (props: any) => {
    let masterLink, basicLink, addressLink, educationLink, experienceLink, bankLink,
        documentLink, familyLink, workLink, salaryLink = '';

    masterLink = CONSTANT.url.editEmployeeMaster.replace('employee/master/:id', 'onboard/master');
    basicLink = CONSTANT.url.editEmployeeBasic.replace('employee/basic/:id', 'onboard/basic');
    addressLink = CONSTANT.url.editEmployeeAddress.replace('employee/address/:id', 'onboard/address');
    educationLink = CONSTANT.url.editEmployeeEducation.replace('employee/education/:id', 'onboard/education');
    experienceLink = CONSTANT.url.editEmployeeExperience.replace('employee/experience/:id', 'onboard/experience');
    bankLink = CONSTANT.url.editEmployeeBank.replace('employee/bank/:id', 'onboard/bank');
    documentLink = CONSTANT.url.editEmployeeDocument.replace('employee/document/:id', 'onboard/document');
    familyLink = CONSTANT.url.editEmployeeFamily.replace('employee/family/:id', 'onboard/family');
    workLink = CONSTANT.url.editEmployeeWork.replace('employee/work/:id', 'onboard/work');
    salaryLink = CONSTANT.url.editEmployeeSalary.replace('employee/salary/:id', 'onboard/salary');

    return (
        <div className="row bg-white employee-tab">
            <div className="col-md-2 tab-view p-3 text-center ">
                <Link to={basicLink}>
                    <i className="far fa-user-circle mr-3 text-primary"></i>
                    Basic Detail
                    </Link>
            </div>

            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={addressLink}>
                    <i className="fas fa-home mr-3 text-success"></i>
                    Address Detail
                    </Link>
            </div>

            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={familyLink}>
                    <i className="fas fa-users mr-3 text-info"></i>
                    Family Detail
                    </Link>
            </div>

            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={bankLink}>
                    <i className="fas fa-rupee-sign mr-3 text-success"></i>
                    Bank Detail
                    </Link>
            </div>

            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={educationLink}>
                    <i className="fas fa-graduation-cap mr-3"></i>
                    Education Detail
                    </Link>
            </div>

            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={experienceLink}>
                    <i className="fas fa-suitcase mr-3 text-warning"></i>
                    Experience Detail
                    </Link>
            </div>

            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={documentLink}>
                    <i className="far fa-file-alt mr-3 text-danger"></i>
                    Document Detail
                    </Link>
            </div>
        </div>
    )
};

export default OnboardProgressBar;