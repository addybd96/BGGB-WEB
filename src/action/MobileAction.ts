import * as axios from 'axios';
import { getAuthHeader, getUploadFileHeader } from '../utils';

export const apply: any = (model: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/mobile-allowance/apply`, model, getAuthHeader())
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

    export const getMobileAlneByUserId: any = (params: any) => {
        
        return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/mobile-allowance/list-by-userId`, { ...getAuthHeader(), params: params })
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

    export const getMobileAlne: any = (params: any) => {

        return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/mobile-allowance/list`, { ...getAuthHeader(), params: params })
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

    export const getMobileAlneById: any = (params: any) => {
        return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/mobile-allowance/list-by-id`, { ...getAuthHeader(), params: params })
        .then((response: any) => {
            console.log('1111111response', response);
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

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/mobile-allowance/approved`, model, getAuthHeader())
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

export const updateMobileAllowanceWithdrawl: any = (params: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/mobile-allowance/withdrawl`,params, { ...getAuthHeader(), params: params })
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