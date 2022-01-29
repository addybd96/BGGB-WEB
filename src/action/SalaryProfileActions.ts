import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const getSalaryProfileList: any = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-profile?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addSalaryProfile: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-profile`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateSalaryProfile: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-profile`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getSalaryProfileDetail: any = (id: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-profile-detail?id=${id}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}