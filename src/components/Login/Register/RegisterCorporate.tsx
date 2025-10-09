import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CameraPlusIcon, EyeIcon, EyeSlashIcon, FileArrowUpIcon } from "@phosphor-icons/react";
import LogoLogin from "../../../assets/svg/Login/Group_14.svg";
import BottomLeftImagePassword from "../../../assets/svg/AuthRecovery/Group_726_left.svg";
import DocumentViewer from "../../Global/ModalViewDocument/DocumentViewer";
import FloatingLabelInput from "../../Global/Inputs/FloatingLabelInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultLoginValues,
  loginSchema,
  RegisterFormValues,
} from "../Register/type";
import { registerCorporate } from "../../../services/registerCorporate/service";
import { showTailwindAlert } from "../../Global/Alerts/AlertBasic";
import { useNavigate } from 'react-router-dom';
import { getCountryCityList } from "../../../services/cityList/service";
import CustomDropdown from "../../Global/Inputs/CustomDropdown";
import ConfirmationModal from "../../Global/Modals/ConfirmationModal";
import StatusModal from "../../Global/Modals/StatusModal";

const RegisterCorporate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  
  const selectedCountry = watch("country") || "";
  const selectedCity = watch("city") || "";
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormData | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');

  const [files, setFiles] = useState({
    logo: null as File | null,
    logoPreview: "",
    document: null as File | null,
    documentUrl: "",
  });

  useEffect(() => {
    const loadCountries = async () => {
      const data = await getCountryCityList();
      if (data?.success) {
        setCountries(data.country_list);
      }
    };
    loadCountries();
  }, []);

  const handleCountryChange = (countryName: string) => {
    setValue("country", countryName);
    setValue("city", "");
    const country = countries.find(c => c.countryname === countryName);
    setCities(country?.city_list || []);
  };

  const handleCityChange = (cityName: string) => {
    setValue("city", cityName);
  };

  const countryOptions = countries.map(country => ({
    value: country.countryname,
    label: country.countryname
  }));

  const cityOptions = cities.map(city => ({
    value: city.cityname,
    label: city.cityname
  }));



  const handleFileChange = (
    type: "logo" | "document",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === "document" && file.type !== "application/pdf") {
      alert("Por favor, sube solo archivos PDF");
      return;
    }

    if (type === "logo") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles((prev) => ({
          ...prev,
          document: file,
          documentUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [documentToView, setDocumentToView] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const handleViewDocument = () => {
    if (files.documentUrl) {
      setDocumentToView({
        url: files.documentUrl,
        title: files.document?.name || "Documento",
      });
    } else {
      alert("No hay ningún documento cargado");
    }
  };

  const onSubmit = (data: RegisterFormValues) => {
    const formDataToSend = new FormData();
    (Object.entries(data) as [keyof RegisterFormValues, string][]).forEach(
      ([key, value]) => {
        formDataToSend.append(key, value);
      }
    );
    if (files.logo instanceof File) {
      formDataToSend.append("logo", files.logo, files.logo.name);
    }
    if (files.document instanceof File) {
      formDataToSend.append("document", files.document, files.document.name);
    }
    
    setFormDataToSubmit(formDataToSend);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    if (!formDataToSubmit) return;
    
    setShowConfirmModal(false);
    const response = await registerCorporate(formDataToSubmit);
    if (response?.status === 201) {
      setStatusType('success');
      setShowStatusModal(true);
    } else {
      setStatusType('error');
      setShowStatusModal(true);
    }
  };

  const handleStatusModalClose = () => {
    setShowStatusModal(false);
    if (statusType === 'success') {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#25215F] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl overflow-hidden relative w-full max-w-[620px] min-h-[auto] md:min-h-[652px] p-4 sm:p-6 md:p-12 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-2 flex flex-col justify-center mb-6 md:mb-12">
          <h1 className="text-xl md:text-2xl font-bold text-[#25215F] mb-2">
            Bienvenido
          </h1>

          <img
            src={LogoLogin}
            alt="Flety"
            className="w-[150px] h-[81px] md:w-[211px] mb-3"
          />

          <div className="space-y-4">
            <div>
              <div className="relative bg-[#F5F5F5] rounded-lg h-[173px] w-full max-w-[212px] p-4 flex flex-col justify-between">
                {files.logoPreview ? (
                  <img
                    src={files.logoPreview}
                    alt="Logo"
                    className="rounded-[4px] object-contain h-[95px] w-full"
                  />
                ) : (
                  <div className="h-[103px] bg-[#F5F5F5] flex items-center justify-center rounded-[4px]">
                    <span className="text-gray-400">Logo</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={(e) => handleFileChange("logo", e)}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="absolute bottom-4 right-4 flex items-center text-[14px] leading-[17px] font-medium font-['Libre_Franklin'] text-gray-600 hover:text-gray-800"
                >
                  <span>Agregar</span>
                  <div className="w-[40px] h-[40px] ml-2 flex items-center justify-center rounded-[4px] bg-gray-200">
                    <CameraPlusIcon
                      size={18}
                      className="text-[#25215F]"
                      weight="bold"
                    />
                  </div>
                </button>
              </div>
              <p className="mt-2 text-[14px] leading-[17px] ml-[5px] font-medium text-[#25215F] font-['Libre_Franklin']">
                Foto representante / Logo Empresa
              </p>
            </div>

            <div>
              <div className="relative bg-[#F5F5F5] rounded-lg h-[88px] w-full max-w-[212px] p-7 flex flex-col justify-between">
                <input
                  type="file"
                  ref={documentInputRef}
                  onChange={(e) => handleFileChange("document", e)}
                  accept="application/pdf"
                  className="hidden"
                />
                <div className="flex items-center justify-between h-full">
                  {files.document ? (
                    <span className="text-gray-600 text-[12px]">
                      Documento cargado
                    </span>
                  ) : (
                    <span className="text-gray-600 hover:text-gray-800 text-[12px]">
                      Agregar
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => documentInputRef.current?.click()}
                      className="w-[40px] h-[40px] flex items-center justify-center rounded-[4px] bg-gray-200 hover:bg-gray-300"
                    >
                      <FileArrowUpIcon
                        size={18}
                        className="text-[#25215F]"
                        weight="bold"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={handleViewDocument}
                      className="w-[40px] h-[40px] flex items-center justify-center rounded-[4px] bg-gray-200 hover:bg-gray-300"
                    >
                      <EyeIcon
                        size={18}
                        className="text-[#25215F]"
                        weight="bold"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-[14px] leading-[17px] ml-[5px] font-medium text-[#25215F] font-['Libre_Franklin']">
                Cédula representante / RIF
              </p>
            </div>
          </div>
        </div>
        {documentToView && (
          <DocumentViewer
            show={true}
            onClose={() => setDocumentToView(null)}
            documentUrl={documentToView.url}
            documentTitle={documentToView.title}
          />
        )}

        <div className="w-full md:w-1/2 p-2 flex flex-col justify-center mb-6 md:mb-9">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FloatingLabelInput
              id="name"
              label="Nombre"
              type="text"
              register={register}
              placeholder="Nombre"
              error={errors.name}
            />

            <FloatingLabelInput
              id="email"
              label="Email"
              type="email"
              register={register}
              placeholder="Email"
              error={errors.email}
            />

            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm z-10">
                Teléfono
              </label>
              <div className="flex border rounded-lg overflow-hidden h-[75px] items-center">
                <select
                  {...register("countryCode")}
                  className="px-3 border-2 m-3 border-[#00BBB4] rounded-lg focus:outline-none bg-white appearance-none h-[29px]"
                >
                  <option value="+58">🇻🇪 +58</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+34">🇪🇸 +34</option>
                </select>
                <input
                  type="tel"
                  {...register("phone")}
                  className={`flex-1 px-4 py-2 focus:outline-none h-[29px] w-full ml-[-10px] ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  placeholder="N° de teléfono"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500 min-h-[1.5rem]">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <CustomDropdown
                label="País"
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="País"
                error={errors.country?.message}
              />
              <CustomDropdown
                label="Ciudad"
                options={cityOptions}
                value={selectedCity}
                onChange={handleCityChange}
                placeholder="Ciudad"
                disabled={!selectedCountry}
                error={errors.city?.message}
              />
            </div>

            <FloatingLabelInput
              id="address"
              label="Dirección"
              type="text"
              register={register}
              placeholder="Dirección"
              error={errors.address}
            />

            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm z-10">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  {...register("password")}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none pr-10 ${
                    errors.password
                      &&"border-red-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeIcon size={20} className="text-gray-500" />
                  ) : (
                    <EyeSlashIcon size={20} className="text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 min-h-[1.5rem]">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#25215F] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#3a3480] transition mt-6"
            >
              Registrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 relative z-10 pb-8 md:pb-0">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-[#25215F] font-medium">
              Ingresa aquí
            </a>
          </p>
        </div>
        <img
          src={BottomLeftImagePassword}
          alt="BottomLeftImagePassword"
          className="absolute bottom-0 left-0 w-[80px] md:w-[100px] h-auto md:opacity-100"
        />
      </div>
      
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirmar creación de usuario"
        message="Tus datos serán revisados y validados por el área administrativa antes de activar tu cuenta."
      />
      
      <StatusModal
        isOpen={showStatusModal}
        onClose={handleStatusModalClose}
        type={statusType}
        title={statusType === 'success' ? 'Usuario registrado' : 'Ups! Error al registrar el usuario'}
        message={statusType === 'success' 
          ? 'Tu registro ha sido exitoso. Pronto serás contactado.' 
          : 'Ocurrió un problema durante el registro. Inténtalo nuevamente.'}
      />
    </div>
  );
};

export default RegisterCorporate;