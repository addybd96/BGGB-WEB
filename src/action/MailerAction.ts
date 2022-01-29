import * as axios from 'axios';
import CONFIG from './../config';
import { getAuthHeader, getUploadFileHeader } from '../utils';

export const sendOnboardingEmail = (model: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/v1/mailer/on-boarding`;
    return axios.post(url, model, getAuthHeader())
        .then((response: any) => {
            return response.data;
        });
}

