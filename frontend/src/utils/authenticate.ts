import { getCookie, setCookie } from "./cookieUtil";

export const setToken = (accessToken: string, refreshToken: string) => {
  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
};

export const getToken = () => getCookie("accessToken");

/**로그인 되어있는지 boolean 형식으로 반환 */
export const CheckIsLoggedIn = (): boolean => {
  const data = getToken();
  return data !== null;
};

export const logout = () => {
  setCookie("accessToken", "", -1);
};
