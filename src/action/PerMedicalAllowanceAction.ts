import * as axios from 'axios';
import { getAuthHeader, getUploadFileHeader } from '../utils';


export const apply: any = (model: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/medical-allowance/apply`, model, getAuthHeader())
        .then((response: any) => {
            if (response.data.status)
                return response.data.result;
            else
                alert(response.data.error ? response.data.error.message : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}

export const getMedicalAlneByUserId: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/medical-allowance/list-by-userId`, { ...getAuthHeader(), params: params })
        .then((response: any) => {
            if (response.data.status)
                return response.data.result;
            else
                alert(response.data.error ? response.data.error.message : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}

export const getMedicalAlneById: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/medical-allowance/list-by-id`, { ...getAuthHeader(), params: params })
        .then((response: any) => {
            if (response.data.status)
                return response.data.result;
            else
                alert(response.data.error ? response.data.error.message : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}

export const getMedicalAln: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/medical-allowance/list`, { ...getAuthHeader(), params: params })
        .then((response: any) => {
            if (response.data.status)
                return response.data.result;
            else
                alert(response.data.error ? response.data.error.message : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}

export const approve: any = (model: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/medical-allowance/approved`, model, getAuthHeader())
        .then((response: any) => {
            if (response.data.status)
                return response.data.result;
            else
                alert(response.data.error ? response.data.error.message : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}

export const updateMedicalAllowanceWithdrawl: any = (params: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/medical-allowance/withdrawl`,params, { ...getAuthHeader(), params: params })
        .then((response: any) => {
            if (response.data.status)
                return response.data.result;
            else
                alert(response.data.error ? response.data.error.message : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}