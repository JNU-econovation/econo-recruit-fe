import { https } from "@/src/functions/axios";
import { setToken } from "@/src/utils/authenticate";

interface SignInReq {
  email: string;
  password: string;
}

interface SignInRes {
  accessToken: "string";
  refreshToken: "string";
}

export const signIn = async ({ email, password }: SignInReq) => {
  try {
    const { data } = await https.post<SignInRes>("/login", { email, password });
    setToken(data.accessToken, data.refreshToken);
    return true;
  } catch (error) {
    return false;
  }
};

interface SignUpReq {
  name: string;
  year: number;
  email: string;
  password: string;
}

export const signUp = async ({ name, year, email, password }: SignUpReq) => {
  try {
    const { data } = await https.post("/signup", {
      name,
      year,
      email,
      password,
    });
    return true;
  } catch (error) {
    return false;
  }
};
