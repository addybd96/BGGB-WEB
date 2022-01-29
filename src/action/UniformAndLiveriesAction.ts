import * as axios from 'axios';
import { getAuthHeader, getUploadFileHeader } from '../utils';


export const apply: any = (model: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/uniform-liveries/apply`, model, getAuthHeader())
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
        
        return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/uniform-liveries/list-by-id`, { ...getAuthHeader(), params: params })
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
        
    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/uniform-liveries/list-by-userId`, { ...getAuthHeader(), params: params })
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

export const updateuniformAllowanceWithdrawl: any = (params: any) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/uniform-allowance/withdrawl`,params, { ...getAuthHeader(), params: params })
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

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/uniform-liveries/list`, { ...getAuthHeader(), params: params })
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

    return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/uniform-liveries/approved`, model, getAuthHeader())
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

export const getDateByUserId: any = (params: any,model: any) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/uniform-liveries/Date-by-userId`, { ...getAuthHeader(),model : model, params: params })
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

export const hideByUserId: any = (params: any) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/perquisites/uniform-liveries/HideuserId`, { ...getAuthHeader(), params: params })
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

export const hidePaymentByUserId: any = (params: any) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/payment-module/payment/hidePaymentByUserId`, { ...getAuthHeader(), params: params })
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