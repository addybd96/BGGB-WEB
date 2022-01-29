import * as axios from 'axios';
import CONFIG from '../config';
import { getAuthHeader, getUploadFileHeader } from '../utils';

// loan type
export const getLoanList = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/loan/list?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// pending loan list for approval
export const getPendingLoanList = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pending-loan/list?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getLoanListEmp = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/loan/list-emp?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addLoan: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/loan`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateLoan: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/loan`;
    return axios.put(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getLoanDetail: any = (id: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/loan/detail/${id}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}
// loan type