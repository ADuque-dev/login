import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultLoginValues, LoginFormValues, loginSchema } from "./type";
import { Select } from "../Global/Select/Select";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import CrownIcon from "../../assets/svg/Login/Vector.svg";
import LogoLogin from "../../assets/svg/Login/Group_14.svg";
import background_imagen from "../../assets/svg/Login/image.svg";
import Watermark from "../../assets/svg/Login/Group_729.svg";
import TopRightImage from "../../assets/svg/Login/Group_726.svg";
// import Camiones from "../../assets/svg/Login/camiones.svg"; 
import { loginUserForm } from "./transformData/login";
import AuthRecovery from "./Password/AuthRecovery";
import { useAuthStore } from "../../storage/authStore";

const userTypes = [
  { label: "Administrador", value: "admin" },
  { label: "Corporativo", value: "corporate" },
  { label: "Partner", value: "partner" },
];

const MAX_ATTEMPTS = 5; 
const LOCK_TIME = 30 * 60 * 1000; 

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const setCredentials = useAuthStore((state) => state.setCrendential);
  const logoutUser = useAuthStore((state) => state.logout);
  const [isRecovering, setIsRecovering] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [attempts, setAttempts] = React.useState<Record<string, number>>({});
  const [lockedAccounts, setLockedAccounts] = React.useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const logout = query.get('logout');

  React.useEffect(() => {
    const storedLocks = localStorage.getItem('lockedAccounts');
    if (storedLocks) {
      const parsedLocks = JSON.parse(storedLocks);
      const validLocks: Record<string, number> = {};

      Object.entries(parsedLocks).forEach(([email, lockTime]) => {
        if (Number(lockTime) > Date.now()) {
          validLocks[email] = Number(lockTime);
        }
      });

      setLockedAccounts(validLocks);
    }
  }, []);

  if (logout === 'true') {
    logoutUser();
  }

  const onSubmit = async (data: LoginFormValues) => {
    const currentEmail = data.email;

    const lockTime = lockedAccounts[currentEmail];
    if (lockTime && lockTime > Date.now()) {
      const remainingMinutes = Math.ceil((lockTime - Date.now()) / (60 * 1000));
      setError("root", {
        message: `Cuenta temporalmente bloqueada. Intente nuevamente en ${remainingMinutes} minutos.`
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const currentAttempts = attempts[currentEmail] || 0;
      const delay = Math.min(currentAttempts * 1000, 5000); 
      await new Promise(resolve => setTimeout(resolve, delay));

      setCredentials(data.email, data.password);
      const loginUser = await loginUserForm(data);

      if ("status" in loginUser && loginUser.status === 401) {
        const newAttempts = (attempts[currentEmail] || 0) + 1;
        setAttempts(prev => ({ ...prev, [currentEmail]: newAttempts }));

        if (newAttempts >= MAX_ATTEMPTS) {
          const newLockTime = Date.now() + LOCK_TIME;
          const newLockedAccounts = { ...lockedAccounts, [currentEmail]: newLockTime };

          setLockedAccounts(newLockedAccounts);
          localStorage.setItem('lockedAccounts', JSON.stringify(newLockedAccounts));

          setError("root", {
            message: "Demasiados intentos fallidos. Cuenta bloqueada temporalmente."
          });
        } else {
          setError("password", {
            message: `Email o Credenciales incorrectas. Intentos restantes: ${MAX_ATTEMPTS - newAttempts}`
          });
        }
      } else if ("user" in loginUser) {
        setAttempts(prev => ({ ...prev, [currentEmail]: 0 }));
        login(loginUser.user, loginUser.tokens);
        navigate("/test", { replace: true });
      }
    } catch (error) {
      setError("root", {
        message: "Error en el servidor. Por favor intente más tarde."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterCorporate = () => {
    navigate('/register-corporate');
  };

  return (
    <div className="h-screen bg-[#25215F] flex items-center justify-center">
      {isRecovering ? (
        <AuthRecovery onBack={() => setIsRecovering(false)} />
      ) : (
        <div className="bg-white rounded-xl overflow-hidden flex flex-col md:flex-row relative w-full max-w-[1046px] h-auto md:h-[652px]">
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-center">
            <img
              src={LogoLogin}
              alt="Flety"
              className="w-[288px] h-[110px] mb-0 md:mb-8"
            />

            <h1 className="text-lg font-medium text-[#25215F] mb-8 text-center">
              Inicio de sesión del Aliado
            </h1>

            {errors.root && (
              <div className="mb-4 w-full max-w-[320px] p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {errors.root.message}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 w-full max-w-[320px]"
            >
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  Tipo de Usuario
                </label>
                <Select
                  placeholder="Seleccione tipo de usuario"
                  value={watch("role")}
                  onChange={(value) => setValue("role", value)}
                  options={userTypes}
                  error={errors.role?.message}
                />
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

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`w-full px-4 pt-5 pb-2 border rounded-lg peer ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Password"
                  />
                  <label className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">
                    Clave
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
                </div>
                {errors.password && !errors.root && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="text-sm text-[#25215F] hover:underline"
                  onClick={() => setIsRecovering(true)}
                >
                  Olvidé mi contraseña
                </button>
              </div>

              <button
                type="submit"
                className={`w-full bg-[#25215F] text-white py-3 rounded-lg hover:bg-[#1c1847] transition-colors font-medium ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verificando..." : "Iniciar sesión"}
              </button>
            </form>
          </div>

          <div className="relative w-full md:w-1/2 h-full flex justify-center items-center">
            <div
              className="absolute inset-0 bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${background_imagen})` }}
            />
            <img
              src={Watermark}
              alt="Decoración Inferior"
              className="absolute bottom-0 left-0 w-full"
            />
            <img
              src={TopRightImage}
              alt="TopRightImage"
              className="absolute top-0 right-0"
            />
            <div className="relative flex flex-col gap-8 justify-center items-center">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm w-[407px] h-auto md:h-[181px]  flex flex-col items-center justify-center">
                <img
                  src={CrownIcon}
                  alt="Crown Icon"
                  className="w-[43px] h-[43px] mb-1"
                />
                <h2 className="text-[17px] font-medium text-[#595959] mb-1">
                  Conviértete en cliente
                  <span className="text-custom-teal font-medium">VIP</span>
                </h2>
                <button
                  className="w-[327px] h-[49px] bg-custom-teal text-white rounded-lg hover:bg-[#00a898] transition-colors font-medium"
                  onClick={handleRegisterCorporate}
                >
                  Regístrate
                </button>
              </div>

              {/* //por ahora no va mientras definen este flujo */}
              {/* <div className="bg-white rounded-xl p-6 text-center shadow-sm w-[407px] h-auto md:h-[181px]  flex flex-col items-center justify-center">
                <img
                  src={CrownIcon}
                  alt="Crown Icon"
                  className="w-[92px] h-[43px] mb-1"
                />
                <h2 className="text-[17px] font-medium text-[#595959] mb-1">
                  Afilia tu flota
                </h2>
                <button className="w-[327px] h-[49px] bg-[#25215F] text-white rounded-lg hover:bg-[#1c1847] transition-colors font-medium">
                  Regístrate
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
