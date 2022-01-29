import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const getCountryList: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geography/country`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getStateList: any = (countryId: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geography/state?ci=${countryId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getLocationList: any = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geography/location/list?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getLocationDetail: any = (locationId: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geography/location/detail/${locationId}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}


export const addLocation: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geography/location`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateLocation: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/geography/location`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}
