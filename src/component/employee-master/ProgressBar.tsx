import React from 'react';
import CONSTANT from './../../constant';
import { Link } from 'react-router-dom';

const ProgressBar = (props: any) => {
    const userId = props.userId;
    let masterLink, basicLink, addressLink, educationLink, experienceLink,TrainingLink,departmentalEnquiry, bankLink, jobHistory,
        documentLink, familyLink, workLink, salaryLink, leaveLink = '#', profilePicLink, editNomination,
        LICLink;
    if (userId !== undefined) {
        masterLink = CONSTANT.url.editEmployeeMaster.replace(':id', userId);
        basicLink = CONSTANT.url.editEmployeeBasic.replace(':id', userId);
        addressLink = CONSTANT.url.editEmployeeAddress.replace(':id', userId);
        educationLink = CONSTANT.url.editEmployeeEducation.replace(':id', userId);
        experienceLink = CONSTANT.url.editEmployeeExperience.replace(':id', userId);
        bankLink = CONSTANT.url.editEmployeeBank.replace(':id', userId);
        documentLink = CONSTANT.url.editEmployeeDocument.replace(':id', userId);
        familyLink = CONSTANT.url.editEmployeeFamily.replace(':id', userId);
        workLink = CONSTANT.url.editEmployeeWork.replace(':id', userId);
        salaryLink = CONSTANT.url.editEmployeeSalary.replace(':id', userId);
        leaveLink = CONSTANT.url.editEmployeeLeaveBalance.replace(':id', userId);
        profilePicLink = CONSTANT.url.editEmployeeProfilePicture.replace(':id', userId);
        LICLink = CONSTANT.url.editEmployeeLifeInsurance.replace(':id', userId);
        jobHistory = CONSTANT.url.jobHistory.replace(':id', userId);
        editNomination = CONSTANT.url.editEmployeeNomination.replace(':id', userId);
        TrainingLink = CONSTANT.url.editTrainingExperience.replace(':id', userId);
        departmentalEnquiry = CONSTANT.url.departmentalEnquiry.replace(':id', userId);
    }

    return (
        <div className="row bg-white employee-tab">
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={masterLink}>
                    <i className="fas fa-key mr-3 text-primary"></i>
                    Master Detail
                 </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
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
                <Link to={TrainingLink}>
                    <i className="fas fa-suitcase mr-3 text-warning"></i>
                    Training Detail
                    </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={departmentalEnquiry}>
                    <i className="fas fa-suitcase mr-3 text-warning"></i>
                    Departmental  Enquiry
                    </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={documentLink}>
                    <i className="far fa-file-alt mr-3 text-danger"></i>
                    Document Detail
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={workLink}>
                    <i className="fas fa-hard-hat mr-3 text-danger"></i>
                    Work Profile
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={salaryLink}>
                    <i className="fas fa-wallet mr-3 text-danger"></i>
                    Salary Profile
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={leaveLink}>
                    <i className="fas fa-plane mr-3 text-danger"></i>
                    Leave Balance
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={profilePicLink}>
                    <i className="fas fa-camera mr-3 text-danger"></i>
                    Profile Picture
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={LICLink}>
                    <i className="fa fa-file-text mr-3 text-danger " aria-hidden="true"></i>
                    Declaration Forms
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={jobHistory}>
                    <i className="fa fa-file-text mr-3 text-danger " aria-hidden="true"></i>
                    Job History
                </Link>
            </div>
            <div className="col-md-2 tab-view p-3 text-center">
                <Link to={editNomination}>
                    <i className="fas fa-users mr-3 text-danger " aria-hidden="true"></i>
                    Nomination
                </Link>
            </div>
        </div>
    )
};

export default ProgressBar;