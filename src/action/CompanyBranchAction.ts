import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader, getUploadFileHeader } from '../utils';

export const getCompanyBranch: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-branch`;
    return axios.get(url, { reqObj, ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const getCompanyBranchDetail: any = (id: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-branch/detail/${id}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getBranchCategories: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-branch/categories`;
    return axios.get(url, { reqObj, ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const getBranchCategoryDetail: any = (reqObj: any) => {
    console.log(reqObj)
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-branch/category/${reqObj}`;
    return axios.get(url, { reqObj, ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const addBranchCategory: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-branch/category`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const editBranchCategory: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-branch/category`;
    return axios.put(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addCompanyBranch: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-branch`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const editCompanyBranch: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-branch`;
    return axios.put(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}