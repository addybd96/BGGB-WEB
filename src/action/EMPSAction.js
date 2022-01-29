import * as axios from "axios";
import { getAuthHeader } from "../utils";

// get calls
export const getRole = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/epms/roles`;
  return axios.get(url, getAuthHeader()).then((response) => {
    return response.data;
  });
};
export const getEmpID = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/epms/getEmpID`;
  return axios.get(url, getAuthHeader()).then((response) => {
    return response.data;
  });
};
export const getKRA = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/epms/KRA`;
  return axios.get(url, getAuthHeader()).then((response) => {
    return response.data;
  });
};
//post calls
export const addNewRole = (model) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/epms/addRole`;
  return axios.post(url, model, getAuthHeader()).then((response) => {
    return response.data;
  });
};
export const addNewKRA = (model) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/epms/addKRA`;
  return axios.post(url, model, getAuthHeader()).then((response) => {
    return response.data;
  });
};
export const addKRARoleMap = (model) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/epms/addRoleKRAMap`;
  return axios.post(url, model, getAuthHeader()).then((response) => {
    return response.data;
  });
};
