import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordForm } from "./resetPasswordSchema";
import { updatePasswordFormat } from "../transformData/login";
import useQueryParams from "../../../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import LogoLogin from "../../../assets/svg/Login/Group_14.svg";
import TopRightImagePassword from "../../../assets/svg/AuthRecovery/Group_727.svg";
import BottomLeftImagePassword from "../../../assets/svg/AuthRecovery/Group_726_left.svg";
import Recover_Password from "../../../assets/svg/AuthRecovery/Recover_Password.svg";
import { Eye, EyeSlash } from "@phosphor-icons/react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { token, origin } = useQueryParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const saveAuthTokenResetPassword = () => {
    const tokenData = {
      token: token,
      refresh_token: '',
      timestamp: Date.now(),
    };
    localStorage.setItem(
      "auth-storage",
      JSON.stringify({ state: { tokens: tokenData } })
    );
  };

  useEffect(() => {
    saveAuthTokenResetPassword();
  }, [token]);

  const onSubmit = async (data: ResetPasswordForm) => {
    const response = await updatePasswordFormat({
      password: data.password,
      origin,
    });

    const { status, statusCode, message, origin: originResponse } = response;

    if ((status || statusCode) !== 200) {
      setError("password", {
        type: "server",
        message: message || "Error al actualizar la contraseña",
      });
    } else {
      if (originResponse === "web") navigate("/login");
      else setIsMobile(true);
    }
  };

  return (
    <div className="h-screen bg-[#25215F] flex items-center justify-center">
      <div className="bg-white rounded-xl overflow-hidden flex flex-col md:flex-row relative md:w-[1046px] h-auto md:h-[652px]">
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center">
          <img src={LogoLogin} alt="Flety" className="w-[200px] md:w-[288px] mb-3" />
          <div className="w-full max-w-[320px] text-center md:text-left">
            <h1 className="text-lg font-bold text-[#25215F] mb-1">Cambio de Contraseña</h1>
            <p className="text-[14px] font-medium text-[#757575]">
              {isMobile
                ? "Inicia sesión desde tu dispositivo móvil"
                : "Ingrese y verifique su nueva contraseña"}
            </p>
          </div>

          {!isMobile && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-[320px] mt-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full px-4 pt-5 pb-2 border rounded-lg ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Password"
                />
                <label className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">
                  Ingrese nueva contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeSlash className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full px-4 pt-5 pb-2 border rounded-lg ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Confirm Password"
                />
                <label className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">
                  Repetir contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeSlash className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button type="submit" className="w-full bg-[#25215F] text-white py-3 rounded-lg hover:bg-[#1c1847] transition-colors font-medium">
                Continuar
              </button>
            </form>
          )}

          <img src={BottomLeftImagePassword} alt="BottomLeftImagePassword" className="absolute bottom-0 left-0 w-auto h-auto hidden md:block" />
        </div>

        <div className="relative w-full md:w-1/2 h-full flex justify-center items-center pr-4 md:pr-44 pt-12 ">
          <img src={Recover_Password} alt="Recover_Password" className="hidden md:block absolute w-[457px] h-[412px] md:ml-[115px]" />
          <img src={TopRightImagePassword} alt="TopRightImagePassword" className="absolute top-0 right-0 hidden md:block " />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
