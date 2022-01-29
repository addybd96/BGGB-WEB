import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const getWFH: any = (page:any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/wfh?p=${page}&l=${limit}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getWFHCount: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/wfh-count`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAllWFH: any = (empCode: any, page:any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-wfh?empCode=${empCode}&p=${page}&l=${limit}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAllWFHCount: any = (empCode: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-wfh-count?empCode=${empCode}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const addWFH: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/wfh`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const approveWFH: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/approve-wfh`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}