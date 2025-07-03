"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { CaretDown, MagnifyingGlass, Truck } from "@phosphor-icons/react"

import { TruckOption, type SelectTruckProps } from "./types"

export const SelectTruck: React.FC<SelectTruckProps> = ({
  label ,
  value = "", // Asegurar que value tenga un valor por defecto
  onChange,
  options = [],
  error,
  placeholder = "Seleccione una opción",
  disable = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const [safeOptions, setSafeOptions] = useState(Array.isArray(options) ? options : [])   
  const [filteredOptions, setFilteredOptions] = useState<TruckOption[]>([])

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

  useEffect(() => {
    setSafeOptions(options)
    setFilteredOptions(options)
  }, [options])
  

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

  const selectedOption = safeOptions.find((opt) => opt.id === value)
  const displayText = selectedOption ? selectedOption.label : placeholder

  return (
    <div className="relative w-full" ref={selectRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        <div
          className={`
            w-full h-[44px] bg-white border-b border-[#D9D9D9] rounded-none pl-2 pr-2
            cursor-pointer focus:outline-none focus:ring-0
            flex items-center justify-between
            ${disable ? "opacity-50 cursor-not-allowed" : ""}
            ${error ? "border-red-500" : ""}
          `}
          onClick={handleSelectClick}
        >
          <div className="flex gap-2 items-center text-[#595959] flex-1">
            <Truck size={20} className="text-[#595959] flex-shrink-0" />
            <span className="text-sm truncate">{displayText}</span>
          </div>
          <CaretDown
            size={16}
            className={`text-[#595959] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
        {isOpen && (
          <div className="absolute w-full bg-white border border-[#D9D9D9] rounded-md mt-1 max-h-[400px] overflow-auto z-50 shadow-lg">
            <div className="sticky top-0 bg-white border-b border-[#D9D9D9] p-2">
              <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                <MagnifyingGlass size={18} className="text-[#595959]" />
                <input
                  type="text"
                  placeholder="Buscar camión..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setFilteredOptions(safeOptions.filter((option) => option?.name?.toLowerCase().includes(e.target.value.toLowerCase())))
                  } }
                  className="w-full bg-transparent border-none focus:outline-none pl-2 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-sm text-[#595959]">No se encontraron camiones</div>
              ) : (
                filteredOptions.map((option) => {
                  
                  return <div
                    key={option.id}
                    className={`
                      px-4 py-2.5 hover:bg-[#F5F5F5] cursor-pointer
                      ${value === option.id ? "bg-[#F5F5F5]" : ""}
                    `}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Truck size={20} className="text-[#595959]" />
                      <div className="flex-1">
                        <div className="text-sm text-[#595959] font-medium">{option.label}</div>
                        <div className="text-xs text-[#595959] mt-0.5">
                          Capacidad: {option.capacity}kg | M³: {option.cubicMeters} | Paletas: {option.palletCount}
                        </div>
                      </div>
                    </div>
                  </div>
                }
                  
                )
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
