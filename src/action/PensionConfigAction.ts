
import * as axios from 'axios';
import { getAuthHeader } from '../utils';

export const addPensionRule: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-rule`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updatePensionRule: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-rule`;
    return axios.put(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getPensionRuleList: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-rule/list`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getPensionRuleDetail: any = (id: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-rule/detail/${id}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// Pension Commutation Factor //
export const addPensionCommFactor: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-comm-factor`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updatePensionCommFactor: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-comm-factor`;
    return axios.put(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getPensionCommFactorList: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-comm-factor/list`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getPensionCommFactorDetail: any = (id: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-comm-factor/detail/${id}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}