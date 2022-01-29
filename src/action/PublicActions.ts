import * as axios from 'axios';
import { getAuthHeader } from '../utils';

export const getCountryList: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/public/country`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getLanguageList: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/public/language`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getLocale: any = (fileName: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/locale/${fileName}`;
    return axios.get(url)
        .then((response: any) => {
            return response;
        });
}
