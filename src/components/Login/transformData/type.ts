export interface ILoginForm {
  email: string;
  role: string;
  password: string;
}


export interface IForgotPassword{
  email: string;
  role: string;
  origin: string;
}

export interface IUpdatePassword{
  password: string;
  origin: string;
}

