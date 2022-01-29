import * as axios from 'axios';
import { getAuthHeader, getUploadFileHeader } from '../utils';


export const addPuserInfo: any = (model: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/user-info`, model, getUploadFileHeader())
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

export const apply: any = (model: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/travel-allowance/apply`, model, getAuthHeader())
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

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/travel-allowance/approved`, model, getAuthHeader())
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

export const getPuserInfo: any = () => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/user-info`, getAuthHeader())
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

export const getTrevelAlneById: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/travel-allowance/list-by-id`, { ...getAuthHeader(), params: params })
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

export const getTrevelAlneByUserId: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/travel-allowance/list-by-userId`, { ...getAuthHeader(), params: params })
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

export const updateVechicalAllowanceWithdrawl: any = (params: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/travel-allowance/withdrawl`,params, { ...getAuthHeader(), params: params })
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

export const getTrevelAln: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/travel-allowance/list`, { ...getAuthHeader(), params: params })
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