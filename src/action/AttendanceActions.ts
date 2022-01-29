import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader, getUploadFileHeader } from '../utils';


export const getAttendance: any = (date: any, search:any, page:any, limit: any, type: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance?date=${date}&search=${search}&p=${page}&l=${limit}&t=${type}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getArrivalPieData: any = (date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-arrivalpiechartdata?date=${date}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAttendanceDashboardEmpReport: any = (date: any, page:any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-dashboard-emp-report?date=${date}&p=${page}&l=${limit}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getArrivalTrendsData: any = (date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-arrivaltrendsdata?date=${date}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAttendanceReport: any = (date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-report?date=${date}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAttendanceCount: any = (date: any, search:any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-count?date=${date}&search=${search}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getEmpAttendance: any = (fromDate:any, toDate:any, search:any, page:any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/emp-attendance?fromDate=${fromDate}&toDate=${toDate}&search=${search}&p=${page}&l=${limit}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getEmpAttendanceCount: any = (fromDate:any, toDate:any, search:any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/emp-attendance-count?fromDate=${fromDate}&toDate=${toDate}&search=${search}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAttendanceHistory: any = (fromDate:any, toDate:any, page:any, limit: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-history?startDate=${fromDate}&endDate=${toDate}&p=${page}&l=${limit}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const getAttendanceHistoryCount: any = (fromDate:any, toDate:any, search:any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-history-count?startDate=${fromDate}&endDate=${toDate}`;
    return axios.get(url, {...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}

export const addAttendanceExcel: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance/excel`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAttendance: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const updateAttendance: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance`;
    return axios.put(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}