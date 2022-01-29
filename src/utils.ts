import { Cookies } from "react-cookie";
import moment from "moment";
import CONSTANT from "./constant";
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}

export const setCookie = (cookieName: string, token: any) => {
  const cookies = new Cookies();
  cookies.set(cookieName, token, { path: "/" });
};

export const getCookie = (cookieName: string) => {
  const cookie = new Cookies();
  const value = cookie.get(cookieName);
  return value;
};

export const removeCookie = (cookieName: string) => {
  const cookie = new Cookies();
  const value = cookie.remove(cookieName, cookieName, { path: "/" });
  return value;
};

export const removeAllCookies = () => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    // let cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
};

export const setStorage = (key: string, jsonObj: any) => {
  localStorage.setItem(key, JSON.stringify(jsonObj));
};

export const getStorage = (keyName: string) => {
  const item: any = localStorage.getItem(keyName);
  return JSON.parse(item);
};
// export const setAuthToken = (token: any) => {
//     const cookies = new Cookies();
//     cookies.set(CONSTANT.cookie.token, token, { path: '/' });
// };
// export const setUserDetail = (userDetail: any) => {
//     const cookies = new Cookies();
//     cookies.set('_user', JSON.stringify(userDetail), { path: '/' });
// };
// export const getAuthToken = () => {
//     const token = getCookie(CONSTANT.cookie.token);
//     return token;
// }

// export const getLanguage = (): string => {
//     const cookies = new Cookies();
//     const lang = cookies.get('_language');
//     return lang ? lang : 'en';
// }

export const removeAllLocalStorge = () => {
  localStorage.clear();
};
// export const getUserDetail = () => {
//     const token = getCookie('userDetail');
//     return token;
// }
// export const getRememberDetail = () => {
//     const token = getCookie('rememberDetail');
//     return token;
// }
export const getAuthHeader = () => {
  const token = getCookie(CONSTANT.cookie.token);
  const header = {
    headers: { Authorization: "Bearer " + token },
  };
  return header;
};

export const getUploadFileHeader = () => {
  const token = getCookie(CONSTANT.cookie.token);
  const header = {
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data/json",
    },
  };
  return header;
};

export const onChange = (
  context: any,
  name: string,
  newValue: any,
  callback?: any
) => {
  context.setState(
    { [name]: { ...context.state[name], value: newValue } },
    callback && callback
  );
};

export const onArrayChange = (
  context: any,
  name: string,
  value: any,
  callback?: any
) => {
  const updatedValue = context.state[name].value.concat(value);
  context.setState(
    { [name]: { ...context.state[name], value: updatedValue } },
    callback && callback
  );
};

export const setOptions = (
  context: any,
  name: string,
  value: any,
  callback?: any
) => {
  context.setState(
    { [name]: { ...context.state[name], options: value } },
    callback && callback
  );
};

export const clearOptions = (
  context: any,
  name: string,
  value: any,
  callback?: any
) => {
  context.setState(
    { [name]: { ...context.state[name], options: [] } },
    callback && callback
  );
};

export const setError = (
  context: any,
  name: string,
  error: string,
  callback?: any
) => {
  context.setState(
    { [name]: { ...context.state[name], error } },
    callback && callback
  );
};

export const setRequired = (
  context: any,
  name: string,
  newIsRequired: any,
  callback?: any
) => {
  context.setState(
    { [name]: { ...context.state[name], isRequired: newIsRequired } },
    callback && callback
  );
};

export const setShow = (
  context: any,
  name: string,
  newShow: any,
  callback?: any
) => {
  context.setState(
    { [name]: { ...context.state[name], show: newShow } },
    callback && callback
  );
};

export const validateForm = (context: any) => {
  const st = JSON.parse(JSON.stringify(context.state));
  let status = true;
  for (let key in st) {
    if (st.hasOwnProperty(key) && st[key]) {
      const name = st[key].name;
      const isRequired = st[key].isRequired;
      const value = st[key].value != null ? st[key].value : "";
      if (isRequired && value.length === 0) {
        status = false;
        setError(context, name, "This field is required");
      } else if (isRequired && value.length > 0) {
        setError(context, name, "");
      }
    }
  }

  return status;
};

export const getJobCodeFromUrlParam = (urlParam: string) => {
  const jobCodeParamArray = urlParam.split("-");
  const jobCode = jobCodeParamArray[jobCodeParamArray.length - 1];
  const jobTitle = urlParam
    .replace(jobCode, "")
    .replace(/-/g, " ")
    .trim();
  return { jobTitle, jobCode };
};

export const getDateParts = (input: string) => {
  // utcOffset(330).
  // const mDate = moment.unix(input).subtract(5, "hours").subtract(30, "minutes");
  const mDate = moment(input);
  return {
    date: mDate.format("DD"),
    month: mDate.format("MM"),
    monthName: mDate.format("MMM"),
    year: mDate.format("YYYY"),
    hour: mDate.format("h"),
    minute: mDate.format("mm"),
    seconds: mDate.format("ss"),
    amOrpm: mDate.format("A"),
    relativeTime: mDate.fromNow(),
  };
};

export const toLowercaseAndRemoveSpecialChar = (name: string) => {
  const formattedName = name.toLowerCase().replace(/ /g, "-");
  return formattedName;
};

export const removeSpaceAndAddHyphen = (param: string) => {
  const formattedName = param.toLowerCase().replace(/ /g, "-");
  return formattedName;
};

export const replaceForwardSlashWithComma = (param: string) => {
  const formattedName = param.toLowerCase().replace(/\//g, ",");
  return formattedName;
};

export const removeHyphenAndAddSpace = (param: string) => {
  const formattedName = param.toLowerCase().replace(/-/g, " ");
  return formattedName;
};

export const removeCommas = (param: string) => {
  const formattedName = param.toLowerCase().replace(/,/g, "");
  return formattedName;
};

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const isEmpty = (input: any) => {
  const dataType = typeof input;
  if (input === null || input === undefined) {
    return true;
  } else if (dataType === "string") {
    const parsedValue = input.replace(/ /g, "").replace(/(?:\r\n|\r|\n)/g, "");
    if (parsedValue.length === 0) {
      return true;
    }
  } else if (dataType === "object") {
    return Object.keys(input).length === 0;
  }
  return false;
};

export const replaceLineBreakWithBR = (input: any) => {
  return input.replace(/(?:\r\n|\r|\n)/g, "<br/>");
};

export const setLocalStorageItem = (key: string, jsonObj: any) => {
  localStorage.setItem(key, JSON.stringify(jsonObj));
};

export const getLocalStorageItem = (keyName: string) => {
  const item: any = localStorage.getItem(keyName);
  return JSON.parse(item);
};

export const setSessionStorageItem = (key: string, jsonObj: any) => {
  sessionStorage.setItem(key, JSON.stringify(jsonObj));
};

export const getSessionStorageItem = (keyName: string) => {
  const item: any = sessionStorage.getItem(keyName);
  return JSON.parse(item);
};

export const getCategoryOptions = () => {
  return [
    { label: "Select Category", value: "" },
    { label: "General", value: "General" },
    { label: "SC", value: "SC" },
    { label: "ST", value: "ST" },
    { label: "OBC-Creamy", value: "OBC-Creamy" },
    { label: "OBC-Non-Creamy", value: "OBC-Non-Creamy" },
  ];
};

export const getGenderOptions = () => {
  return [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Transgender", value: "Transgender" },
  ];
};

export const getMaritalStatusOptions = () => {
  return [
    { label: "Select Marital status", value: "" },
    { label: "Single/unmarried", value: "Single/unmarried" },
    { label: "Married", value: "Married" },
    { label: "Widowed", value: "Widowed" },
    { label: "Divorced", value: "Divorced" },
    { label: "Seperated", value: "Seperated" },
    { label: "Other", value: "Other" },
  ];
};

export const titleCase = (str: string) => {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

export const getRelativeTime = (date: any) => {
  const d = new Date(date * 1000);
  return moment(d).fromNow();
};

export const isValid24HourTime = (timeStr: any) =>
  timeStr.search(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) != -1;

export const isValidDateFormat = (dateString: any) =>
  dateString.search(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/) !=
  -1;

export const isValidDate = (dateString: any) => {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
};

export const clearUnwanted = (model: any) => {
  for (var key in { ...model }) {
    if (model[key] == null) delete model[key];
  }
  return model;
};

export function isEquivalent(a: any, b: any, skip: any) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (propName == skip) continue;
    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

export const textTransform = (str: string) => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const appendFile = (modle: any) => {
  const formData = new FormData();
  if (modle.constructor === Array) {
    modle.forEach((m: any, i: number) => {
      // let key: string = k, value: any = v
      // for (const [k, v] of Object.entries(m)) {
      // key = (!!value) && (value.constructor === Array) ? `${key}[]` : key
      // value = (!!value) && (value.constructor === Array) ? value.map((v: any) => JSON.stringify(v)) : value
      formData.append(`tada[${i}]`, JSON.stringify(m));
      formData.append(`file[${i}]`, m.img);
      // }
    });
    return formData;
  } else {
    for (const [k, v] of Object.entries(modle)) {
      let key: string = k,
        value: any = v;
      key = !!value && value.constructor === Array ? `${key}[]` : key;
      value =
        !!value && value.constructor === Array
          ? value.map((v: any) => JSON.stringify(v))
          : value;
      formData.append(key, value);
    }
    return formData;
  }
};

export const getSession = () => {
  let jwt = getCookie(CONSTANT.cookie.token);
  try {
    if (jwt) {
      const base64Url = jwt.split(".")[1];
      const { exp } = JSON.parse(window.atob(base64Url));
      return exp > moment().unix();
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
