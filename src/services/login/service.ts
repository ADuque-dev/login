import { securityApi } from "../../api/securityApi";

interface ILogin {
    email: string;
    role: string;
    password: string;
}

interface IForgotPassword{
  userData: string;
  role: string;
  origin: string;
}

export interface IUpdatePassword{
  password: string;
  origin: string;
}




export const loginUser = async (body: ILogin) => {
    try {
      const { data, status } = await securityApi.post(`/auth`, body);
      return await { data, status };
    } catch (error) {
      const { response } = error;
      return response;
    }
  };

  export const refreshToken = async (refresh_token: string) => {
    try {
      const { data, status } = await securityApi.post(`/auth/refreshToken`, {refresh_token});
      return await { data, status };
    } catch (error) {
      console.log(error)
      const { response } = error;
      return response;
    }
  };

  export const forgotPassword = async (forgotData: IForgotPassword) => {
    try {
      const { data, status } = await securityApi.post(`/auth/forgotPassword`, forgotData);
      return await { data, status };
    } catch (error) {
      console.log(error)
      const { response } = error;
      return response;
    }
  };
  export const updatePassword = async (updatePasswordData: IUpdatePassword) => {
    const { password, origin } = updatePasswordData;
  
    try {
      const response = await securityApi.put(
        "/auth/updatePassword",
        { password, origin }, 
       
      );
      return response;
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  };