import * as axios from 'axios';
import { getAuthHeader } from '../utils';

export const getTodaysAttendance: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance/check-in`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const checkinAttendance: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance/check-in`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const checkOutAttendance: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance/check-out`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// export const getEmpAttendance: any = (reqObj: any) => {
//     const url = `${process.env.REACT_APP_BASE_URL}/v1/get/emp-attendance`;
//     return axios.post(url, reqObj, getAuthHeader())
//         .then((response: any) => {
//             return response.data;
//         });
// }

// export const addAttendanceExcel: any = (reqObj: any) => {
//     const url = `${process.env.REACT_APP_BASE_URL}/v1/add/attendance/xl`;
//     return axios.post(url, reqObj, getAuthHeader())
//         .then((response: any) => {
//             return response.data;
//         });
// }

// export const addAttendance: any = (reqObj: any) => {
//     const url = `${process.env.REACT_APP_BASE_URL}/v1/add/attendance`;
//     return axios.post(url, reqObj, getAuthHeader())
//         .then((response: any) => {
//             return response.data;
//         });
// }

// export const updateAttendance: any = (reqObj: any) => {
//     const url = `${process.env.REACT_APP_BASE_URL}/v1/update/attendance`;
//     return axios.post(url, reqObj, getAuthHeader())
//         .then((response: any) => {
//             return response.data;
//         });
// }