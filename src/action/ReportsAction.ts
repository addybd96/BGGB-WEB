import * as axios from "axios";
import { getAuthHeader } from "../utils";

export const getEmployeeReports: any = () => {
  return axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/v1/reports/employee-reports`,
      getAuthHeader()
    )
    .then((response: any) => {
      if (response.data.status) return response.data.result;
      else
        alert(
          response.data.error ? response.data.error.message : "Internal Error"
        );
    })
    .catch((res: any) => {
      console.log("error", res);
      alert("Network Connection Error.");
    });
};

export const getWorkDesignationStatus: any = (model:any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/reports/work-desig-status/list`,
      model,
      getAuthHeader()
    )
    .then((response: any) => {
      debugger
      if (response.data.status) return response.data.result;
      else
        alert(
          response.data.error ? response.data.error.message : "Internal Error"
        );
    })
    .catch((res: any) => {
      console.log("error", res);
      alert("Network Connection Error.");
    });
};


export const getEmployeeLeaveReports: any = (data:any) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/reports/employee-leave-reports`,data,getAuthHeader())
    .then((response: any) => {
      if (response.data.status) return response.data.result;
      else
        alert(
          response.data.error ? response.data.error.message : "Internal Error"
        );
    })
    .catch((res: any) => {
      console.log("error", res);
      alert("Network Connection Error.");
    });
};

export const getEmployeeLeaveReportsAdmin: any = (data:any) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/reports/employee-leave-reports/all`,data,getAuthHeader())
    .then((response: any) => {
      if (response.data.status) return response.data.result;
      else
        alert(
          response.data.error ? response.data.error.message : "Internal Error"
        );
    })
    .catch((res: any) => {
      console.log("error", res);
      alert("Network Connection Error.");
    });
};
export const getReportingManagerDetails: any = (data:any) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/v1/reports/reporting-manager-details`,data,getAuthHeader())
    .then((response: any) => {
      if (response.data.status) return response.data.result;
      else
        alert(
          response.data.error ? response.data.error.message : "Internal Error"
        );
    })
    .catch((res: any) => {
      console.log("error", res);
      alert("Network Connection Error.");
    });
};