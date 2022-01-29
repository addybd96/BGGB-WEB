import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const companyCodeSearch: any = (keyword: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/check/company/code`;
    return axios.post(url, keyword)
        .then((response: any) => {
            return response.data;
        });
}

export const getLoginStatusList = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/master/login-status`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getRoleList = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/master/role`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getDocumentTypeList = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/master/document-type`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getEmpStatusList = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/emp-status/list`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getMaritalStatusList = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/master/marital-status`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getGenderList = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/master/gender`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getRelationList = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/master/relation`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}