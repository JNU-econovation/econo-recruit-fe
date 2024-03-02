import { https } from "@/src/functions/axios";
import { localStorage } from "@/src/functions/localstorage";

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
    if (data satisfies SignInRes) {
      alert("로그인이 성공하였습니다");
    }

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
