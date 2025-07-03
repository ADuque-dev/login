import { forgotPassword, loginUser, refreshToken, updatePassword } from "../../../services/login/service"
import { IForgotPassword, ILoginForm, IUpdatePassword } from "./type"

export const loginUserForm = async (body: ILoginForm): Promise< 
 { tokens: string; user: {first_name: string; last_name: string; role: string } } | { status: number; message: string } 
> => {
  const response = await loginUser(body);
  const { data } = response;

  if (data.status === 401 || data.statusCode === 401) {
    return {
      status: data.status || data.statusCode,
      message: "Email address or password invalid",
    };
  }
  return {
    tokens: data.tokens,
    user: {
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      role: data.user.role,
    },
  };
};
export const refreshTokenForm = async (refresh_token: string) => {
  console.log(refresh_token, "refresh_token");
  const response= await refreshToken(refresh_token)
  const {data } = response
  return {
    tokens: data.tokens,
    user: {
      _id: data.user._id,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      role: data.user.role,
    }
  }
}

export const forgotPasswordFormat = async (forgotData: IForgotPassword) => {
  const formatData= {
    userData: forgotData.email,
    origin: forgotData.origin,
    role: forgotData.role
  }
  const response= await forgotPassword(formatData)
  const {data } = response
  return data
}

export const updatePasswordFormat= async (dataUpdatePassword: IUpdatePassword) => {
  const response= await updatePassword(dataUpdatePassword)
  const {data } = response
  return data
}

