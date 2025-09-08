import { https } from "@/src/functions/axios";
import { AxiosError } from "axios";

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
      window.localStorage.setItem("accessToken", data.accessToken);
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const signOut = async () => {
  try {
    await https.post<SignInRes>("/logout");
    window.localStorage.removeItem("accessToken");
    return true;
  } catch (e) {
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

interface VerifyEmailReq {
  email: string;
}

export const verifyEmail = async ({ email }: VerifyEmailReq) => {
  // TODO: 서버에서 오는 에러를 핸들링해서, 컴포넌트에서 커스텀하게 사용할 수 있게 변경해야 한다.
  try {
    await https.post("/password/verify", {
      email,
    });
    return true;
  } catch (error) {
    const serverError = error as AxiosError<{ code: string }>;
    //TODO: 서버 에러 처리 방식 고민해보기(다른 api 에서도 적용할 수 있도록)
    if (serverError.response?.data.code === "INTERVIEWER_404_1") return false;
  }
};

interface VerifyCodeReq {
  email: string;
  code: string;
}

export const verifyCode = async (request: VerifyCodeReq) => {
  try {
    await https.post("/verify-code", request);

    return true;
  } catch (error) {
    const serverError = error as AxiosError<{ code: string }>;
    //TODO: 서버 에러 처리 방식 고민해보기(다른 api 에서도 적용할 수 있도록)
    // 이메일을 안보낸 상태에서 인증을 하려 시도할 때
    if (serverError.response?.data.code === "EMAIL_VERIFICATION_404_1")
      return false;
    // 인증번호가 틀릴 때
    if (serverError.response?.data.code === "EMAIL_VERIFICATION_400_1")
      return false;
  }
};

interface ResetPasswordReq {
  email: string;
  password: string;
}

export const resetPassword = async (request: ResetPasswordReq) => {
  // TODO: 서버에서 오는 에러를 핸들링해서, 컴포넌트에서 커스텀하게 사용할 수 있게 변경해야 한다.
  try {
    await https.post("/password/reset", request);
    return true;
  } catch (error) {
    return false;
  }
};
