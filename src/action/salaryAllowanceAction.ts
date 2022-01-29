import * as axios from 'axios';
import CONFIG from '../config';
import { getAuthHeader } from '../utils';

export const getSalaryAllowanceList: any = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-allowance`;
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

export const getSalaryComponentsList: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-components-lists`;
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

export const addSalaryComponents: any = (data:any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/add-salary-components`;
    return axios.post(url, data, getAuthHeader())
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

export const getEpmList: any = (page: number, limit: number) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/employee-list`;
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
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-allowance-by-id?id=${id}&type=${type}`;
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

export const addOfficiatingAllow: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/officiating-allowance`;
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

export const addWashingAllow: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/washing-allowance`;
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

export const addCycleAllow: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/cycle-allowance`;
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

export const otherAllowance: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/salary-other-allowance`;
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

export const errearsAllow: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/errears-allowance`;
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

export const conveyanceAllow: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/conveyance-allowance`;
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

export const daAllow: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/da-allowance`;
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

export const addPensionDaAllow: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/payroll/pension-da-allowance`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            if (response.data.status)
                return response.data;
            else
                alert(response.data.error ? response.data.error : 'Internal Error')
        })
       
}
