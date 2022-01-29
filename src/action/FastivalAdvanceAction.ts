import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader, getUploadFileHeader } from '../utils';

export const getFastivalAdvance: any = (page: any, limit: any, userType: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/fastival-advance?p=${page}&l=${limit}&t=${userType}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getFastivalAdvanceEmp: any = (page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/festival-advance-emp?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getFastivalAdvanceEmpForRM: any = (page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/festival-advance-emp-repMan?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getFastivalAdvanceCount: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/fastival-advance-count`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getFastivalAdvanceCountEmp: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/fastival-advance-count-emp`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getFestivalStatusList: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-fastival-advance-status`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getAllFastivalAdvance: any = (empCode: any, page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-FastivalAdvance?empCode=${empCode}&p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getAllFastivalAdvanceCount: any = (empCode: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-FastivalAdvance-count?empCode=${empCode}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getAllFastivalAdvanceCountEmp: any = (empCode: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-FastivalAdvance-count-emp`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addFastivalAdvance: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/fastival-advance`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateFastivalAdvance: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/fastival-advance`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const approveFastivalAdvance: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/approve-fastival-advance`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const approveEarlyFastivalAdvance: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/approve-early-fastival-advance`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getPendingFastivalAdvanceApplications: any = (page: any, limit: any, userType: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pending-festivalAddV-applications?p=${page}&l=${limit}&t=${userType}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getEarlyPendingFastivalAdvanceApplications: any = (page: any, limit: any, userType: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pending-early-festivalAddV-applications?p=${page}&l=${limit}&t=${userType}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getPendingFastivalAdvanceApplicationsCount: any = (empCode: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pending-fastival-advance-applications-count`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            if (response.data.status)
            return response.data.result;
        else
            alert(response.data.error ? response.data.error.message : 'Internal Error')
        });
}


// new apis for festival advance 

export const applyFestivalAdvance: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/apply-festival-advance`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getFestivalDetailById: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/fest-adv-details-by-id`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const approve: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/fest-adv-details/approve`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getEmployeeSalaryDetails: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/employee-salary-details`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}