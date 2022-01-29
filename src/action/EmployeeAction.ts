import * as axios from 'axios';
import CONSTANT from './../constant';
import { getAuthHeader, getSession } from '../utils';

axios.interceptors.request.use(
    function (res: any) {
        if (
            res.url.match('/v1/login') ||
            res.url.match('/v1/public/country') ||
            res.url.match('/v1/public/language') ||
            res.url.match('/locale/')
        ) {
            return res
        }
        else {
            if (!getSession())
                window.window.location.href = CONSTANT.url.login
            else
                return res
        }
    },
);

// get calls

export const getAllEmployeeListRM = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee-rm/all`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getSalaryComponentListRM = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/salary-component-lists/all`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}
export const getAllEmployeeList = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/all`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getEmployeeCount = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/count`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getEmployeeList = (page: number, limit: number, sort: number, userType: any, search: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/list?p=${page}&l=${limit}&s=${sort}&t=${userType}&search=${search}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getMasterDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/master/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getJobHistory: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/master/employee/job-history/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getBasicDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/basic/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getAddressDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/address/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getBankDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/bank/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getWorkDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/work/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getSalaryDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/salary/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getEducationDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/education/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getDocumentDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/document/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getSettingDocument: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/document/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getExperienceDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/experience/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getFamilyDetail: any = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/family/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}


// export const getEmployeeListSummary = () => {
//     const url = `${process.env.REACT_APP_BASE_URL}/v1/get/employee/summary`;
//     return axios.get(url, getAuthHeader())
//         .then((response: any) => {
//             return response.data;
//         });
// }




// post calls
export const addEmployeeMaster: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/master`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}


// put calls
export const updateEmployeeMaster: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/master`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateSalaryDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/salary`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateAddressDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/address`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateWorkDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/work`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateBankDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/bank`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateBasicDetail = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/basic`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateEmployeeFamily: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/family`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateEducationalDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/education`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateDocumentDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/document`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateProfilePicture: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/profile-picture`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// leave balance
export const getLeaveBalanceDetail = (userId: number, page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/leave-balance?u=${userId}&p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getLeaveLogs = (userId: number, leaveTypeId: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/leave-logs?u=${userId}&l=${leaveTypeId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateLeaveBalance = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/leave-balance`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const leaveBalanceTransaction = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/leave-balance-update`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const deleteLeaveBalance = (id: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/leave-balance/${id}`;
    return axios.delete(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}
// leave balance


export const addBasicDetail: any = (model: any) => {
    let formData = new FormData();
    formData.append('gender', model.gender);
    formData.append('fatherName', model.fatherName);
    formData.append('motherName', model.motherName);
    formData.append('bloodGroup', model.bloodGroup);
    formData.append('maritalStatus', model.maritalStatus);
    formData.append('dateOfBirth', model.dateOfBirth);
    formData.append('personalEmail', model.personalEmail);
    formData.append('nationality', model.nationality);
    formData.append('employeeId', model.employeeId);
    // Attach file
    // formData.append('profilePicture', model.profilePicture);

    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/basicDetail`;
    return axios.post(url, formData, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAddressDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/addressDetail`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const editAddressDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/update/employee/addressDetail`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addEmployeeFamily: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/family`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addWorkProfile: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/workProfile`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const editSalaryProfile: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/update/employee/salaryProfile`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}





export const addEmployeeEducation: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/educationDetail`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addEmployeeExperience: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/experience`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// export const addEmployeeDocument: any = (model: any) => {
//     const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/document`;
//     return axios.post(url, model, getAuthHeader())
//         .then((response: any) => {
//             return response.data;
//         });
// }

// export const addEmployeeBank: any = (model: any) => {
//     const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/bankDetail`;
//     return axios.post(url, model, getAuthHeader())
//         .then((response: any) => {
//             return response.data;
//         });
// }



export const addProfessionalDetail: any = (model: any) => {
    let formData = new FormData();
    formData.append('experience', model.experience);
    formData.append('sourceOfHire', model.email);
    formData.append('skillSet', model.firstName);
    formData.append('currentSalary', model.lastName);
    // Attach file
    formData.append('offerLetter', model.offerLetter);
    formData.append('highestQualification', model.highestQualification);

    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/step3`;
    return axios.post(url, model)
        .then((response: any) => {
            return response.data;
        });
}

export const addEducationalDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/step4`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const editEducationalDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/update/employee/educationDetail`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const employeeBulkUpload: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/byXL`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        })
}


export const employeeReportingMangerUpload: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/reporting-manager-on-employee/byXL`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}


export const addExperienceDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/add/employee/step5`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const editExperienceDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/experience`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}



export const getEmployeeAllDetail = (employeeId: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/get/employee/profile?employeeId=${employeeId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}


export const addNomineeDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/nominee`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getNomineeDetailList = (userId: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/nominee/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getSectionDetail: any = (userId: number, sectionId: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/section?userId=${userId}&sectionId=${sectionId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateSectionFreezeDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/section`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// -------------------------------- Training Experience-----------------------------------------

export const getTrainingDetail: any = (userId: number) => {
    
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/training-experience/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const editTrainingDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/training-experience`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getTrainingSectionDetail: any = (userId: number, sectionId: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/training-section?userId=${userId}&sectionId=${sectionId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateTrainingSectionFreezeDetail: any = (model: any) => {
    
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/section`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// -------------------------------------Departmental Enquiry Details -----------------------

export const getDepartmentDetail: any = (userId: number) => {
    
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/department-enquiry/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const editDepartmentDetail: any = (model: any) => {
    
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/department-enquiry`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getDepartmentSectionDetail: any = (userId: number, sectionId: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/training-section?userId=${userId}&sectionId=${sectionId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateDepartmentSectionFreezeDetail: any = (model: any) => {
    
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/section`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}


