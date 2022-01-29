import * as axios from 'axios';
import { getAuthHeader } from '../utils';


export const runPayRoll: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/run-payroll`;
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

export const salaryComponentAdd: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/salay-components/add`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            if (response.data.status)
                return response.data.result;
            else
                alert(response.data.error ? response.data.error : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}

export const salaryComponentGet: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/salay-components/get`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            debugger
            if (response.data.status)
                return response.data.result;
            else
                alert(response.data.error ? response.data.error : 'Internal Error')
        })
        .catch((res: any) => {
            console.log('error', res);
            alert('Network Connection Error.')
        });
}

export const getPayRollList: any = (page: number, limit: number, sort: number, date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/payroll-list?date=${date}&p=${page}&l=${limit}&s=${sort}`;
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

export const getPayRollListCount: any = (date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/payroll-list-count?date=${date}`;
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

export const getSalarySlip: any = (id: any, date: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-slip?id=${id}&date=${date}`;
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

export const getEmpSalarySlip: any = (date:any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/emp-salary-slip?date=${date}`;
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
export const revertPayRoll: any = (status: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/revert`;
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

