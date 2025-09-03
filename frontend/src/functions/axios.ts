import axios from "axios";
import errorConfig, { ErrorCode } from "./errorConfig";

const createApiInstance = (baseURL: string) => {
  const instance = axios.create({ baseURL });

  instance.defaults.withCredentials = true;

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { data, status: errorStatus } = error.response;
      const { code: errorCode, reason: errorReason } = data;
      const errorMessage =
        errorConfig[errorCode as ErrorCode]?.message ||
        errorReason ||
        error.message;
      error.message = errorMessage;

      if (errorStatus === 401 || errorStatus === 403) {
        alert("로그인이 필요합니다.");
        window.location.href = "/signin";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const apiV1 = createApiInstance(process.env.NEXT_PUBLIC_API_URL!);
export const apiV2 = createApiInstance(process.env.NEXT_PUBLIC_API_URL_V2!);

export const https = apiV1;
