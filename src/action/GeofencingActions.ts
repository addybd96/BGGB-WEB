import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const getAllGeofencing: any = (empCode: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geofencing/list`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAllGeofencingEmp: any = (code: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geofencing/employee/${code}`;
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const addGeofencing: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geofencing`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const deleteGeofencing: any = (code: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geofencing/${code}`;
    return axios.delete(url,  { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const editGeofencing: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geofencing`;
    return axios.put(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}