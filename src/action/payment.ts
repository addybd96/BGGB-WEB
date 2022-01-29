import * as axios from 'axios';
import { getAuthHeader, } from '../utils';

export const updatePayment: any = (body: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payment/add-transaction`;
    return axios.post(url, body, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}


export const getBriefCaseAlneByUserId: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/payment/brief-case-allowance`, { ...getAuthHeader(), params: params })
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

export const getEntertenmentByUserId: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/payment/entertainment`, { ...getAuthHeader(), params: params })
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

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/payment/mobile-allowance`, { ...getAuthHeader(), params: params })
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

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/payment/news-allowance`, { ...getAuthHeader(), params: params })
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

export const getTadaAlneByUserId: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/payment/tada-allowance`, { ...getAuthHeader(), params: params })
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

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/payment/travel-allowance`, { ...getAuthHeader(), params: params })
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

export const getUnifromAlneByUserId: any = (params: any) => {

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/payment/uniform-liveries`, { ...getAuthHeader(), params: params })
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

    return axios.get(`${process.env.REACT_APP_BASE_URL}/v1/payment/medical-allowance`, { ...getAuthHeader(), params: params })
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

export const getPayRollList: any = (page: number, limit: number, status: boolean, date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payment/payroll-list?date=${date}&p=${page}&l=${limit}&status=${status}`;
    return axios.get(url, getAuthHeader())
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

export const getPayRollListCount: any = (date: any, status: boolean) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payment/payroll-list-count?date=${date}&status=${status}`;
    return axios.get(url, getAuthHeader())
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

export const getFestivalAdvance: any = (page: number, limit: number, status: boolean) => {
const url = `${process.env.REACT_APP_BASE_URL}/v1/payment/festival-advance?status=${status}&p=${page}&l=${limit}`;
return axios.get(url, getAuthHeader())
    .then((response: any) => {
        return response.data;
    });
}