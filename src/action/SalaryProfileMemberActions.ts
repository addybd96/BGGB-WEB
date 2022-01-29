import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const getSalaryProfileMemberList: any = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-profile-member?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addSalaryProfileMember: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-profile-member`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateSalaryProfileMember: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-profile-member`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getSalaryProfileMemberDetail: any = (id: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-profile-member-detail?id=${id}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}