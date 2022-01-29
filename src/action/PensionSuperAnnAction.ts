import * as axios from 'axios';
import { getAuthHeader } from '../utils';

export const getPensionDaAllowList: any = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/pension-da-allowance`;
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

export const getPensionDAbyId: any = (id: number, type: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/pension-da-allowance-by-id?id=${id}`;
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

export const runPension: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-superannuation/run-pension`;
    return axios.post(url, model, getAuthHeader())
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

export const getPensionList: any = (page: number, limit: number, sort: number, date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-superannuation/pension-list?date=${date}&p=${page}&l=${limit}&s=${sort}`;
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

export const getPensionEmpList: any = (page: number, limit: number, sort: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-superannuation/pension-emp-list?p=${page}&l=${limit}&s=${sort}`;
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

export const getPensionListCount: any = (date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-superannuation/pension-list-count?date=${date}`;
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

export const getPensionSlip: any = (id: any, date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-superannuation/pension-slip?id=${id}&date=${date}`;
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
export const revertPension: any = (status: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/pension-superannuation/revert`;
    return axios.post(url, status, getAuthHeader())
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