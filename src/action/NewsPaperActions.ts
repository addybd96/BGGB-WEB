import * as axios from 'axios';
import { getAuthHeader, getUploadFileHeader } from '../utils';


export const apply: any = (model: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/news-allowance/apply`, model, getAuthHeader())
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
    
    export const getNewsPaperAlneById: any = (params: any) => {
        
        return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/news-allowance/list-by-id`, { ...getAuthHeader(), params: params })
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

export const getNewsPaperAlneByUserId: any = (params: any) => {
        
    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/news-allowance/list-by-userId`, { ...getAuthHeader(), params: params })
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

export const getNewsPaperAlne: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/news-allowance/list`, { ...getAuthHeader(), params: params })
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

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/news-allowance/approved`, model, getAuthHeader())
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

export const updateNewsPaperAllowanceWithdrawl: any = (params: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/news-allowance/withdrawl`,params, { ...getAuthHeader(), params: params })
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