import * as axios from "axios";
import CONFIG from "./../config";
import { getAuthHeader, getUploadFileHeader } from "../utils";

export const getDesignations: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/designation`;
  return axios
    .get(url, { reqObj, ...getAuthHeader() })
    .then((response: any) => {
      return response.data;
    });
};

export const getAllowanceType: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/allowance`;
  return axios
    .get(url, { reqObj, ...getAuthHeader() })
    .then((response: any) => {
      return response.data;
    });
};

export const getDepartments: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/department`;
  return axios
    .get(url, { reqObj, ...getAuthHeader() })
    .then((response: any) => {
      return response.data;
    });
};

export const getLocation: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/geography/location`;
  return axios
    .get(url, { reqObj, ...getAuthHeader() })
    .then((response: any) => {
      return response.data;
    });
};

export const getDocumentType: any = (documentTypeId: string) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/document-type`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getDocumentTypeDetail: any = (documentTypeId: string) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/document-type?documentTypeId=${documentTypeId}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getUser: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/user`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getUserRole: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/role`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getUserPermissions: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/user-permisions`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

/**||||||||||||||||||||||||||||||||||||||||||||||||| ADD ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

export const addDesignations: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/designation`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addDepartments: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/department`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addLocation: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/add/setting/location`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addUser: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/user`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addDocumentType: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/document-type`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addUserRole: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/role`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

/**||||||||||||||||||||||||||||||||||||||||||||||||| EDIT ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

export const updateDocumentType: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/document-type`;
  return axios.put(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const updateDepartment: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/department`;
  return axios.put(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const updateDesignation: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/designation`;
  return axios.put(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const updateUser: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/user`;
  return axios.put(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const updateUserRole: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/setting/role`;
  return axios.put(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

// leave type
export const getLeaveTypeList = (page: number, limit: number) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave-type/list?p=${page}&l=${limit}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};
//getBasicInfo
export const getBasicInfo = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/getBasicInfo`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getLeaveTypeCount = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave-type/count`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addLeaveType: any = (model: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave-type`;
  return axios.post(url, model, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const updateLeaveType: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave-type`;
  return axios.put(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getLeaveTypeDetail: any = (id: string) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave-type/detail/${id}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};
// leave type

// holiday type
export const getHolidayTypeList = (page: number, limit: number) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/holiday-type/list?p=${page}&l=${limit}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addHolidayType: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/holiday-type`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const updateHolidayType: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/holiday-type`;
  return axios.put(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getHolidayTypeDetail: any = (id: string) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/holiday-type/detail/${id}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};
// holiday type

// holiday
export const getHolidayList = (page: number, limit: number) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/holiday/list?p=${page}&l=${limit}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getCurrentHolidayList = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/holiday/current-list`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getUpcomingBirthdays = (userType: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/employee/upcoming-birthdays?t=${userType}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};
// holiday

//attendanceType
export const getAttendanceTypeList = (page: number, limit: number) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-type/list?p=${page}&l=${limit}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addAttendanceType: any = (model: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-type`;
  return axios.post(url, model, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const updateAttendanceType: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-type`;
  return axios.put(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getAttendanceTypeDetail: any = (id: string) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/attendance-type/detail/${id}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};
//attendanceType

export const getWorkRoles = (page: number, limit: number) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/work-role/list`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getWorkLocations = (page: number, limit: number) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/work-location/list?p=${page}&l=${limit}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

//leavestatus
export const getLeaveStatusList = (page: number, limit: number) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/leave-status/list?p=${page}&l=${limit}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

// loan type
export const getLoanTypeList = (page: number, limit: number) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/loan-type/list?p=${page}&l=${limit}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const addLoanType: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/loan-type`;
  return axios.post(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const updateLoanType: any = (reqObj: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/loan-type`;
  return axios.put(url, reqObj, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

export const getLoanTypeDetail: any = (id: string) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/loan-type/detail/${id}`;
  return axios.get(url, getAuthHeader()).then((response: any) => {
    return response.data;
  });
};

// |||||||||||||||||||||||||||||||||||||||||||| FULE ||||||||||||||||||||||||||||||||||||||||

export const addFuel: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/fuel`,
      model,
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

export const getFuelList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/fuel`, {
      ...getAuthHeader(),
      params: params,
    })
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

// |||||||||||||||||||||||||||||||||||||||||||| TADA ||||||||||||||||||||||||||||||||||||||||
export const addTaDa: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/tada`,
      model,
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

export const getTaDaList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/tada`, {
      ...getAuthHeader(),
      params: params,
    })
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

// ||||||||||||||||||||||||||||||||||||||||||||NEWS PAPER |||||||||||||||||||||||||||||||||||||

export const addNewsPaper: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/news-paper`,
      model,
      getAuthHeader()
    )
    .then((response: any) => {
      console.log("1111111", response);
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

export const getNewsPaperList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/news-paper`, {
      ...getAuthHeader(),
      params: params,
    })
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

// ||||||||||||||||||||||||||||||||||||||||||||Mobile Allowance |||||||||||||||||||||||||||||||||||||

export const addMobiler: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/mobile`,
      model,
      getAuthHeader()
    )
    .then((response: any) => {
      console.log("1111111", response);
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

export const getMobileList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/mobile`, {
      ...getAuthHeader(),
      params: params,
    })
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

// |||||||||||||||||||||||||||||||||||||||||||| HOTEL ||||||||||||||||||||||||||||||||||||||||

export const addHotel: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/hotel`,
      model,
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

export const getHotelList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/hotel`, {
      ...getAuthHeader(),
      params: params,
    })
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

// |||||||||||||||||||||||||||||||||||||||||||| BRIEF CASE ||||||||||||||||||||||||||||||||||||||||

export const addBriefCase: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/brief-case`,
      model,
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

export const getBriefCaseList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/brief-case`, {
      ...getAuthHeader(),
      params: params,
    })
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

// |||||||||||||||||||||||||||||||||||||||||||| ENTERTAINMENT ||||||||||||||||||||||||||||||||||||||||

export const addEntertainment: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/entertainment`,
      model,
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

export const getEntertainmentList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/entertainment`, {
      ...getAuthHeader(),
      params: params,
    })
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

// |||||||||||||||||||||||||||||||||||||||||||| UNIFORM AND LIVERIES ||||||||||||||||||||||||||||||||||||||||

export const addUniformAndLiveries: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/uniform-and-liveries`,
      model,
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

export const getaddUniformAndLiveriesList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/uniform-and-liveries`, {
      ...getAuthHeader(),
      params: params,
    })
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
///////////////////////// Leave Approval Config ///////////////////////////////////////////////////////

export const addLeaveApprovalConfig: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/leaveApproval-config`,
      model,
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

export const getReportingManagerApprovalConfig: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/rep-manager-approval-config/get`,
      model,
      getAuthHeader()
    )
    .then((response: any) => {
      debugger;
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

export const addReportingManagerApprovalConfig: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/rep-manager-approval-config`,
      model,
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

export const newReportingManagerAllowance: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/change-rep-manager-allowance`,
      model,
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

export const getLeaveApprovalConfigList: any = (params: any) => {
  return axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/v1/config/leaveApproval-config-data`,
      { ...getAuthHeader(), params: params }
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

///////////////////////// Payment Config ///////////////////////////////////////////////////////

export const addPaymentConfig: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/payment-config`,
      model,
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

export const getPaymentConfigList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/payment-config-data`, {
      ...getAuthHeader(),
      params: params,
    })
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

///////////////////////// Approval Config ///////////////////////////////////////////////////////

export const addApprovalConfig: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/approval-config`,
      model,
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

export const getApprovalConfigList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/approval-config-data`, {
      ...getAuthHeader(),
      params: params,
    })
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

// ||||||||||||||||||||||||||||||||||||||||||||Medical Allowance |||||||||||||||||||||||||||||||||||||

export const addMedicalAllowance: any = (model: any) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/v1/config/medical`,
      model,
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

export const getMedicalAllowanceList: any = (params: any) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/v1/config/medical-allowance-list`, {
      ...getAuthHeader(),
      params: params,
    })
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

/////////Approval Config//////////////////export const getTrevelAlneById: any = (params: any) => {

export const getAllowanceNameById: any = (userId: any, allowanceName: any) => {
  const url = `${process.env.REACT_APP_BASE_URL}/v1/config/approval-config-by-allowance-name?userId=${userId}&allowanceName=${allowanceName}`;
  return axios
    .get(url, { ...getAuthHeader() })
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
