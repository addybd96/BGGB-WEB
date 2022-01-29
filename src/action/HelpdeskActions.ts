import * as axios from 'axios';
import { getAuthHeader, getUploadFileHeader } from '../utils';


export const getCategory: any = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/helpdesk/category`;
    return axios.get(url, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getCategoryList: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/helpdesk/category/list`;
    return axios.get(url, { reqObj, ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const getSubCategory: any = (categoryId: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/helpdesk/sub-category?id=${categoryId}`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const getTicketDetail: any = (ticketId: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/ticket/detail/${ticketId}`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const getTicketTimeline: any = (ticketId: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/ticket/timeline/${ticketId}`;
    return axios.get(url, { ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const addCategory: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/helpdesk/category`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const addSubCategory: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/helpdesk/sub-category`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

//////////////////////////////// Helpdesk Ticket ////////////////////////////////

export const addTicket: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/ticket`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getTicketList: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/ticket`;
    return axios.get(url, { reqObj, ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const updateTicket: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/ticket`;
    return axios.put(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const getHelpdeskTicketStatus: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/helpdesk-status/list`;
    return axios.get(url, { reqObj, ...getAuthHeader() })
        .then((response: any) => {
            return response.data;
        });
}

export const addHelpdeskTicketStatus: any = (reqObj: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/helpdesk-status`;
    return axios.post(url, reqObj, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

export const uploadHelpdeskAttachment: any = (reqObj: any) => {
    let formData = new FormData();
    formData.append('ticketId', reqObj.ticketId);
    formData.append('file', reqObj.attachment);
    const url = `${process.env.REACT_APP_BASE_URL}/v1/ticket/attachment`;
    return axios.post(url, formData, getUploadFileHeader())
        .then((response: any) => {
            return response.data;
        });
}