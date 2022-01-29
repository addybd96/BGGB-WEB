import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader, getUploadFileHeader } from '../utils';


export const addCompanyBranchCalender: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-calender`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addHolidayXL: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/holidayXL`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getCompanyBranchCalendar: any = (id:any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/company-calendar?id=${id}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getHolidayType: any = (reqObj: any, page: any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/holiday-type/list?p=${page}&l=${limit}`;
    return axios.get(url, {reqObj, ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

