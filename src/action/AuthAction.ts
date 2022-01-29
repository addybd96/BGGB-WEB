import * as axios from "axios";
import CONSTANT from "./../constant";
import { getAuthHeader, getCookie, setCookie } from "./../utils";

export const registerCompany = (model: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/auth/registration`;
  return axios.post(url, model).then((response: any) => {
    if (response.data.result) {
      setCookie(CONSTANT.cookie.token, response.data.result.token);
      setCookie(CONSTANT.cookie.userDetail, response.data.result);
    }
    return response.data;
  });
};

export const registerStepOne: any = (userDetail: any) => {
  const loginUrl = `${process.env.REACT_APP_BASE_URL}/v1/registrations/step1`;
  return axios.post(loginUrl, userDetail).then((response: any) => {
    if (response.data.status) {
      console.log("response  ", response.data);
      setCookie("token", response.data.result.token);
      setCookie(CONSTANT.cookie.userDetail, response.data.result);
    }
    return response.data;
  });
};

export const registerStepTwo: any = (userDetail: any) => {
  const loginUrl = `${process.env.REACT_APP_BASE_URL}/v1/registrations/step2`;
  return axios.put(loginUrl, userDetail).then((response: any) => {
    return response.data;
  });
};

export const getAuthenticationFormComplete = () => {
  const val = getCookie(CONSTANT.cookie.authentication);
  //   return false;
  if (val) {
    return true;
  } else {
    return false;
  }
};

export const checkAuthenticationFormComplete = () => {
  const authenticationFormUrl = `${
    process.env.REACT_APP_BASE_URL
  }/v1/authenticationFormComplete/${getCookie(CONSTANT.cookie.userDetail).id}`;
  return axios
    .get(authenticationFormUrl, getAuthHeader())
    .then((response: any) => {
      if (response.data.result) {
        console.log("response  ", response.data);
        setCookie(CONSTANT.cookie.authentication, response.data.result);
        return response.data.result;
      }
    });
};
export const postAuthenticationFormComplete: any = (data: any) => {
  const authenticationFormUrl = `${process.env.REACT_APP_BASE_URL}/v1/authenticationFormComplete`;

  return axios
    .post(authenticationFormUrl, data, getAuthHeader())
    .then((response: any) => {
      if (response.data.result) {
        console.log("response  ", response.data);
        setCookie(CONSTANT.cookie.authentication, response.data.result);
      }
      return response.data;
    });
};

export const login: any = (userDetail: any) => {
  const loginUrl = `${process.env.REACT_APP_BASE_URL}/v1/login`;
  return axios.post(loginUrl, userDetail).then((response: any) => {
    if (response.data.result) {
      console.log("response  ", response.data);
      setCookie(CONSTANT.cookie.token, response.data.result.token);
      setCookie(CONSTANT.cookie.userDetail, response.data.result);
    }
    return response.data;
  });
};

export const sendForgotPasswordLink: any = (reqObj: any) => {
  const loginUrl = `${process.env.REACT_APP_BASE_URL}/v1/forgot/password/link`;
  return axios.post(loginUrl, reqObj).then((response: any) => {
    if (response.data.status) {
      console.log("Forgot ", response.data);
    }
    return response.data;
  });
};

export const resetPassword: any = (reqObj: any) => {
  const loginUrl = `${process.env.REACT_APP_BASE_URL}/v1/reset/password`;
  return axios.post(loginUrl, reqObj, getAuthHeader()).then((response: any) => {
    if (response.data.status) {
      console.log("Forgot ", response.data);
    }
    return response.data;
  });
};

export const changePassword: any = (reqObj: any) => {
  const loginUrl = `${process.env.REACT_APP_BASE_URL}/v1/change/password`;
  return axios.post(loginUrl, reqObj, getAuthHeader()).then((response: any) => {
    if (response.data.status) {
      console.log("change pass response  ", response.data);
    }
    return response.data;
  });
};
