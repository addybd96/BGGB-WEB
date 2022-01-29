import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const getSalaryDeductionList: any = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-deduction`;
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

export const getById: any = (id: number, type: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-deduction-by-id?id=${id}&type=${type}`;
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

export const addSalaryProv: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-prov`;
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

export const addSalaryWelfare: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-welfare`;
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

export const addSalaryGroupInsurance: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-group-insurance`;
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

export const otherDeduction: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-other-deduction`;
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

export const lwfDeduction: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/lwf-deduction`;
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





