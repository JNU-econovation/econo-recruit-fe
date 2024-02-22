import axios from "axios";
import { CheckIsLoggedIn, getToken } from "../utils/authenticate";

const https = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

https.interceptors.request.use((config) => {
  // const token = JSON.parse(localStorage.getItem("accessToken") ?? '""');
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  return config;
});

//TODO: 경고창을 띄울지 안띄울지 결정해야함
// https.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       CheckIsLoggedIn();
//       alert("로그인이 필요합니다.");
//       window.location.href = "/signin";
//     }
//   }
// );

export { https };
