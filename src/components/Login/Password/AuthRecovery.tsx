import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useNavigate } from "react-router-dom";
import { defaultForgotPasswordValues,  ForgotPassword, forgotPasswordSchema, } from "../type";
import { Select } from "../../Global/Select/Select";
import LogoLogin from "../../../assets/svg/Login/Group_14.svg";
import TopRightImagePassword from "../../../assets/svg/AuthRecovery/Group_727.svg";
import BottomLeftImagePassword from "../../../assets/svg/AuthRecovery/Group_726_left.svg";
import Recover_Password from "../../../assets/svg/AuthRecovery/Recover_Password.svg";
import SendMail from "../SendMail/SendMail";
import { forgotPasswordFormat } from "../transformData/login";


const userTypes = [
  { label: "Usuario", value: "user" },
  { label: "Conductor", value: "driver" },
  { label: "Admin", value: "admin" },
  { label: "Corporate", value: "corporate" },
  { label: "Partner", value: "partner" },
];

interface AuthRecoveryProps {
  onBack: () => void;
}

const AuthRecovery: React.FC<AuthRecoveryProps> = ({ onBack }) => {
  // const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: defaultForgotPasswordValues,
  });
  console.log(errors, 'erros')

  const onSubmit = async (data: ForgotPassword) => {
    try {
      console.log(data)
      const response = await forgotPasswordFormat(data)
      const {statusCode, message} = response
      if(statusCode !== 400){
      setIsModalOpen(true);
      }else {
        setError("email", {
          type: "server",
          message: message || "Correo no valido, verifique su correo",
        });
      }

	    
    } catch (error) {
      console.log(error, 'error forgot password')
      {
        setError("email", {
          type: "server",
          message: "Ups algo ocurrio intente mas tarde",
        });
      }
    }
  };

  return (
    <div className="h-screen bg-[#25215F] flex items-center justify-center">
      <div className="bg-white rounded-xl overflow-hidden flex relative w-[1046px] h-[652px]"> 
        <div className="w-1/2 p-12 flex flex-col justify-center items-center">
          <img
            src={LogoLogin}
            alt="Flety"
            className="w-[288px] h-[110px] mb-3"
          />
          <div className="w-full max-w-[320px]">
            <h1 className="text-lg font-bold text-[#25215F] mb-1">
              ¿Has olvidado tu contraseña?
            </h1>
            <p className="text-[14px] font-medium text-[#757575]">
              Seleccione su tipo de usuario e introduzca su correo electrónico
              para resetear su contraseña.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-[320px] mt-4"
          >
            <div>
              <label className="block text-sm mb-2 text-gray-600">
                Tipo de Usuario
              </label>
              <div className="w-full">
                <Select
                  placeholder="Seleccione tipo de usuario"
                  value={watch("role")}
                  onChange={(value) => setValue("role", value)}
                  options={userTypes}
                  error={errors.role?.message}
                  isSearchable={false}
                />
              </div>
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">
                Correo
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="E-mail"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#25215F] text-white py-3 rounded-lg hover:bg-[#1c1847] transition-colors font-medium"
              disabled={!!errors.email || !!errors.role}
            >
              Enviar
            </button>
          </form>

          <div className="mt-4 text-sm font-semibold text-gray-600 flex items-center space-x-1">
            <span>¿Ya tienes una cuenta?</span>
            <button onClick={onBack} className="hover:underline font-medium text-[#25215F]">
              Ingresa aquí
            </button>
          </div>

          <img
            src={BottomLeftImagePassword}
            alt="BottomLeftImagePassword"
            className="absolute bottom-0 left-0 w-auto h-auto"
          />
        </div>

        <div className="relative w-1/2 h-full flex justify-center items-center pr-44 pt-36">
          <img
            src={Recover_Password}
            alt="Recover_Password"
            className="absolute w-[457px] h-[412px]"
          />
          <img
            src={TopRightImagePassword}
            alt="TopRightImagePassword"
            className="absolute top-0 right-0"
          />
        </div>
      </div>
        
  {isModalOpen && <SendMail onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AuthRecovery;
