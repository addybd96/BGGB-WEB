import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader, getUploadFileHeader } from '../utils';

export const getCompOffs: any = (page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/comp-off?p=${page}&l=${limit}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getCompOffsCount: any = (page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/comp-off-count`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAllCompOffs: any = (empCode: any, page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-comp-off?empCode=${empCode}&p=${page}&l=${limit}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAllCompOffsCount: any = (empCode: any, page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-comp-off-count?empCode=${empCode}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const addCompOff: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/comp-off`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const approveCompOff: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/approve-compoff`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}