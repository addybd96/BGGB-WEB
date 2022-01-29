import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const updateCompanyDetail: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-details`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getCompanyDetail = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-details`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}
