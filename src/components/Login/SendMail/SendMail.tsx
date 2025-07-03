import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoLogin from "../../../assets/svg/Login/Group_14.svg";
import TopRightImagePassword from "../../../assets/svg/AuthRecovery/Group_727.svg";
import BottomLeftImagePassword from "../../../assets/svg/AuthRecovery/Group_726_left.svg";
import UndrawMessageSent from "../../../assets/svg/AuthRecovery/undraw_message_sent_re.svg";

interface SendMailProps {
  onClose: () => void;
}

const SendMail: React.FC<SendMailProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(61); 
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = () => {
    if (canResend) {
      setCountdown(61); 
      setCanResend(false);
      // Lógica para reenviar el correo aquí
    }
  };

  const handleGoToLogin = () => {
    onClose(); 
    navigate("/login"); 
  };

  return (
    <div className="fixed inset-0 h-screen bg-[#25215F] flex items-center justify-center">
      <div className="bg-white rounded-xl overflow-hidden flex relative w-[1046px] h-[652px]"> 
        <div className="w-1/2 p-16 flex flex-col items-center justify-start h-full relative">
     
          <img
            src={LogoLogin}
            alt="Flety"
            className="w-[288px] h-[110px]  mb-7"
          />
          <div className="w-full max-w-[320px]">
            <h1 className="text-lg font-bold text-[#25215F] mb-1">
              ¡Verifica en tu correo!
            </h1>
            <p className="text-[14px] font-medium text-[#757575]">
              Hemos enviado un link a tu bandeja de entrada para resetear tu contraseña.
              <br/>
              <br/>
              Por favor, revisa tu correo electrónico y sigue las instrucciones.
            </p>
          </div>
          <button
            className=" space-y-6 max-w-[320px] mt-4 w-full bg-[#25215F] text-white py-3 rounded-lg hover:bg-[#1c1847] transition-colors font-medium"
            onClick={handleGoToLogin}
          >
            Volver al inicio
          </button>
          
          <button
            type="button"
            className={`text-[14px] font-medium mt-2 ${canResend ? "text-[#25215F] cursor-pointer" : "text-[#757575] cursor-not-allowed"}`}
            onClick={handleResendEmail}
            disabled={!canResend}
          >
            {canResend ? "Reenviar Correo" : `Para reenviar un nuevo correo debemos esperar ${countdown === 61 ? "1 min 60" : countdown}s`}
          </button>
          <img
            src={BottomLeftImagePassword}
            alt="BottomLeftImagePassword"
            className="absolute bottom-0 left-0 w-auto h-auto"
          />
        </div>

        <div className="relative w-1/2 h-full flex justify-center items-center pr-44 pt-36">
          <img src={UndrawMessageSent} alt="Recover_Password" className="absolute w-[467px] h-[404px] top-[154px]" />
          <img src={TopRightImagePassword} alt="TopRightImagePassword" className="absolute top-0 right-0" />
        </div>
      </div>
    </div>
  );
};

export default SendMail;
