import axios from "axios";
import errorConfig from "./errorConfig";

const https = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

https.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("accessToken") ?? '""');
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  return config;
});

https.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { data, status: errorStatus } = error.response;
    const { code: errorCode, reason: errorReason } = data;
    const errorMessage =
      errorConfig[errorCode].message || errorReason || error.message;

    error.message = errorMessage;

    if (errorStatus === 401 || errorStatus === 403) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("로그인이 필요합니다.");
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export { https };
