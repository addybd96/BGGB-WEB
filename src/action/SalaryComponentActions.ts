import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const getSalaryComponentList: any = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-component?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addSalaryComponent: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-component`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateSalaryComponent: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-component`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getSalaryComponentDetail: any = (id: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-component-detail?id=${id}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const toggleIsActiveStatus: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/toggle-status`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getSalaryStatusList: any = (id: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-status`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// export const getStateList: any = (countryId: string) => {
//     const url = `${process.env.REACT_APP_BASE_URL}/v1/geography/state?ci=${countryId}`;
//     return axios.get(url, getAuthHeader())
//         .then((response: any) => {
//             return response.data;
//         });
// }

// export const getLocationList: any = (page: number, limit: number) => {
//     const url = `${process.env.REACT_APP_BASE_URL}/v1/geography/location?p=${page}&l=${limit}`;
//     return axios.get(url, getAuthHeader())
//         .then((response: any) => {
//             return response.data;
//         });
// }

