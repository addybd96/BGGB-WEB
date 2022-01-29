import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader } from '../utils';

export const getAssetDetailForm: any = (id: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/detail-form/${id}`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const getAssetImmovableForm: any = (id: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/immovable-form/${id}`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const getAssetMovableForm: any = (id: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/movable-form/${id}`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const getAssetDebtForm: any = (id: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/debt-form/${id}`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const getAssetShareForm: any = (id: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/share-form/${id}`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}


// All Post Methods
export const addAssetDetail: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/detail-form`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAssetImmovable: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/immovable-form`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAssetMovableShare: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/movable-form-share`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAssetMovableCash: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/movable-form-cash`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAssetMovableExceed: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/movable-form-exceed`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAssetMovableBelow: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/movable-form-below`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAssetDebt: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/debt-form`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAssetShare: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/share-form`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addAssetDeclaration: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/declaration-form`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// All update Methods
export const updateAssetDetailForm: any = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/detail-form`;
    return axios.put(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

// get assets list of employees
export const getEmployeeAssetList: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/list-emp`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

// get assets list of employees
export const getEmployeeAssetListByAdmin: any = (year: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/asset-liability/list-admin?year=${year}`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}