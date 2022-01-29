import * as axios from 'axios';
import { getAuthHeader, getUploadFileHeader } from '../utils';


export const apply: any = (model: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/brief-case-allowance/apply`, model, getAuthHeader())
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
        
        return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/brief-case-allowance/list-by-id`, { ...getAuthHeader(), params: params })
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
        
    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/brief-case-allowance/list-by-userId`, { ...getAuthHeader(), params: params })
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

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/brief-case-allowance/list`, { ...getAuthHeader(), params: params })
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

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/brief-case-allowance/approved`, model, getAuthHeader())
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

export const getBrifDateByUserId: any = (params: any) => {
        
    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/brief-case-allowance/Date-by-userId`, { ...getAuthHeader(), params: params })
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

export const updateBCAllowanceWithdrawl: any = (params: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/briefCase-allowance/withdrawl`,params, { ...getAuthHeader(), params: params })
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