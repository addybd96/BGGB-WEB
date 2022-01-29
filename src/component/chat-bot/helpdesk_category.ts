import * as axios from 'axios';
import CONFIG from './../../config';
import { getAuthHeader } from '../../utils';

export const getHelpdeskCategories: any = () => {
    const url = '${process.env.REACT_APP_BASE_URL}/v1/setting/helpdesk/category';
    return axios.get(url, { ...getAuthHeader()})
        .then((response: any) => {
            return response.data;
        });
}



