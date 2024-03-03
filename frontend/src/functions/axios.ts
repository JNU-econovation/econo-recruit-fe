import axios from "axios";

const https = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

https.defaults.withCredentials = true;

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
    if (error.response.status === 401 || error.response.status === 403) {
      alert("로그인이 필요합니다.");
      window.location.href = "/signin";
    }
  }
);

export { https };
