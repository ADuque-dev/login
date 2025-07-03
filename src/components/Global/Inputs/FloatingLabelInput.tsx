import React, { useState, forwardRef } from "react";
import { Backspace } from "@phosphor-icons/react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface CountryCode {
  code: string;
  flag: string;
}

interface FloatingLabelInputProps {
  id: string;
  label: string;
  backgroundLabel?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  className?: string;
  withPrefix?: boolean;
  countryCodes?: CountryCode[];
  withClear?: boolean;
  onClear?: () => void;
  error?: FieldError | undefined;
  borderError?: boolean;
  onChange?: (data: any) => void;
}

const defaultCountryCodes: CountryCode[] = [
  { code: "+58", flag: "🇻🇪" },
  { code: "+01", flag: "🇺🇸" },
  { code: "+507", flag: "🇵🇦" },
  { code: "+57", flag: "🇨🇴" },
  { code: "+56", flag: "🇨🇱" },
];

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  (
    {
      id,
      label,
      type = "text",
      placeholder = "",
      register,
      className = "",
      withPrefix = false,
      countryCodes = defaultCountryCodes,
      withClear = false,
      onClear,
      error,
      borderError = false,
      onChange,
      value,
      backgroundLabel
    },
    ref
  ) => {
    const [selectedCode, setSelectedCode] = useState(countryCodes[0]?.code || "");

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };

    const hasError = error !== undefined || borderError;

    return (
      <div className="relative w-full">
        <label
          htmlFor={id}
          className={`absolute -top-2 left-2 ${backgroundLabel ? backgroundLabel : 'bg-white'}  px-1 text-sm z-[10] ${
            hasError ? "text-red-500" : "text-gray-500"
          }`}
        >
          {label}
        </label>
        <div
          className={`flex items-center border rounded-lg ${
            hasError ? "border-red-500" : "border-gray-300"
          }`}
        >
          {withPrefix && (
            <div className="relative">
              <select
                className="px-2 py-2 bg-teal-500 text-white font-bold rounded-l-md appearance-none pr-6 cursor-pointer"
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
              >
                {countryCodes.map(({ code, flag }) => (
                  <option key={code} value={code}>
                    {flag} {code}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                ▼
              </span>
            </div>
          )}
          <div className="relative flex-1">
            <input
              id={id}
              type={type}
              value={value}
              {...(register ? register(id, { onChange }) : { onChange })}
              className={`w-full px-2 py-2 rounded-lg ${backgroundLabel && backgroundLabel} ${
                withClear ? "pr-8" : ""
              } ${className} ${hasError ? "text-red-500" : ""}`}
              placeholder={placeholder}
              ref={ref}
            />

            {withClear && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Backspace className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export default FloatingLabelInput;
