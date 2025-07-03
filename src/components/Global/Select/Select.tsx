"use client"

import React, { useState, useRef, useEffect } from "react"
import type { SelectProps } from "./types"
import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react"

export const Select: React.FC<SelectProps> = ({
  label,
  value = "", // Asegurar que value tenga un valor por defecto
  onChange,
  options = [],
  error,
  icon,
  placeholder = "Seleccione una opción",
  disable = false,
  isSearchable = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  // Asegurarse de que options sea un array antes de usar filter
  const safeOptions = Array.isArray(options) ? options : []
  const filteredOptions = safeOptions.filter((option) => option.label?.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelectClick = () => {
    if (!disable) {
      setIsOpen((prev) => !prev)
    }
  }

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue)
    setSearchTerm("")
    setIsOpen(false)
  }

  // Cerrar el select cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const selectedOption = safeOptions.find((opt) => opt.value === value)
  const displayText = selectedOption ? selectedOption.label : placeholder

  return (
    <div className="relative w-full" ref={selectRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        <div
          className={`
            w-full h-[44px] bg-white border-b border-[#D9D9D9] rounded-none pl-2 pr-2
            cursor-pointer focus:outline-none transition-all flex items-center justify-between
            ${disable ? "opacity-50 cursor-not-allowed" : ""}
            ${error ? "border-red-500" : ""}
          `}
          onClick={handleSelectClick}
        >
          <div className="flex gap-2 items-center text-[#595959] flex-1">
            {icon && React.createElement(icon, { size: 20, className: "text-[#595959] flex-shrink-0" })}
            <span className="text-sm truncate">{displayText}</span>
          </div>
          <CaretDown
            size={16}
            className={`text-[#595959] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

        {isOpen && (
          <div className="absolute w-full bg-white border border-[#D9D9D9] rounded-md mt-1 max-h-[300px] overflow-auto z-50 shadow-lg">
            {isSearchable && (
              <div className="sticky top-0 bg-white border-b border-[#D9D9D9] p-2">
                <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                  <MagnifyingGlass size={18} className="text-[#595959]" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none pl-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-sm text-[#595959]">No se encontraron opciones</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`
                      px-4 py-2.5 flex items-center gap-3 hover:bg-[#F5F5F5] cursor-pointer transition
                      ${value === option.value ? "bg-[#F5F5F5]" : ""}
                    `}
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    {option.icon &&
                      React.createElement(option.icon, {
                        size: 20,
                        className: "text-[#595959]",
                      })}
                    <span className="text-sm text-[#595959]">{option.label}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
