import * as axios from "axios";
import CONFIG from "./../config";
import { getAuthHeader, getUploadFileHeader } from "../utils";

export const getLeaves: any = (page: any, limit: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave?p=${page}&l=${limit}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getLeavesCount: any = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave-count`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getAllLeaves: any = (empCode: any, page: any, limit: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/all-leaves?empCode=${empCode}&p=${page}&l=${limit}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getAllLeavesCount: any = (empCode: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/all-leaves-count?empCode=${empCode}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addLeave: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const updateLeave: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const approveLeave: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/approve-leave`;
  console.log("regobj", reqObj);
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getPendingLeaveApplications: any = (
  empCode: any,
  page: any,
  limit: any,
  sort: any
) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/pending-leave-applications?p=${page}&l=${limit}&s=${sort}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getNewEmpListForLeaveCredit: any = (
  page: any,
  limit: any,
  sort: any
) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leaveCreditEmp/list?p=${page}&l=${limit}&s=${sort}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};
export const creditSingleUserLeave: any = (userId: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/creditLeaveUser?id=${userId}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};
export const creditNewEmpUserLeave: any = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/addLeaveForNewEmpUser`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const creditUserLeave: any = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/creditYearlyLeaveUser`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};
export const creditUserCL: any = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/creditMonthlyCL`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};
export const getPendingLeaveApplicationsCount: any = (sort: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/pending-leave-applications-count?s=${sort}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addLeaveBalanceXL = (model: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/leave-balance-xl`;
  return axios.post(url, model, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getMericalCertificate: any = (id: any, date: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave/medical-certificate?id=${id}`;
  return axios
    .get(url, getAuthHeader())
    .then((response: any) => {
      if (response.data.status) return response.data;
      else alert(response.data.error ? response.data.error : "Internal Error");
    })
    .catch((res: any) => {
      console.log("error", res);
      alert("Network Connection Error.");
    });
};
