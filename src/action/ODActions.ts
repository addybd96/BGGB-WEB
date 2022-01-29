import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader, getUploadFileHeader } from '../utils';

export const getOD: any = (page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/od?p=${page}&l=${limit}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getODCount: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/od-count`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAllOD: any = (empCode: any, page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-od?empCode=${empCode}&p=${page}&l=${limit}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAllODCount: any = (empCode: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/all-od-count?empCode=${empCode}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const addOD: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/od`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const approveOD: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/approve-od`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}