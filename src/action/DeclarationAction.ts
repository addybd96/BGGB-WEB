import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader, getUploadFileHeader } from '../utils';

// get calls
export const getDeclaratioinDetails = (userId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/declaration/${userId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// put calls

export const updateIncomeTaxDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/income-tax/detail`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}
export const updateSocietyTaxDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/society/detail`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}
export const updateUnionDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/unoin/detail`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}
export const updateLicTaxDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/lic/detail`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getSalaryDeductionList: any = (id: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-deduction?id=${id}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}
export const getSalaryAllowanceList: any = (id: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-allowance?id=${id}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}