import * as axios from 'axios';
import { getAuthHeader, getUploadFileHeader } from '../utils';

export const getAllEmp = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/increment/list-emp`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getIncrementList = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/increment/list/basic?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getIncrementListPqp = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/increment/list/pqp?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getIncrementListSppay = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/increment/list/sppay?p=${page}&l=${limit}`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addIncrement: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/increment`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            if (response.data.status)
                return response.data;
            else
                alert(response.data.error ? response.data.error : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}

export const addIncrementPqp: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/increment/pqp`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            debugger
            if (response.data.status)
                return response.data;
            else
                alert(response.data.error ? response.data.error : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}

export const addIncrementSppay: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/increment/sppay`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            if (response.data.status)
                return response.data;
            else
                alert(response.data.error ? response.data.error : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}