"use client"

import { Minus, Plus } from "@phosphor-icons/react"
import type React from "react"

interface CounterProps {
  value: number
  onChange: (value: number) => void
  label: string
  icon: React.ReactNode
  error?: string
}

export const Counter: React.FC<CounterProps> = ({ value, onChange, label, icon, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex h-[45px] w-[340px] items-center gap-4 rounded-lg bg-gray-50">
        <div className="flex gap-3 flex-1 align-middle">
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-gray-100 rounded-lg flex-shrink-0">
            {icon}
          </div>
          <p className="text-gray-800 text-[14px] leading-[18px] break-words">{label}</p>
        </div>
        <div className="flex items-center bg-[#E6F8F8] gap-3 rounded-full p-1">
          <button
            type="button"
            onClick={() => onChange(Math.max(0, value - 1))}
            className="w-8 h-8 flex items-center justify-center text-white bg-[#00bbb4] rounded-full hover:bg-[#009f9a]"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="bg-[#daf4f4] rounded-full w-8 h-8 ">
            <p className="text-[#00bbb4]  text-center mt-1 font-medium">{value}</p>
          </span>
          <button
            type="button"
            onClick={() => onChange(value + 1)}
            className="w-8 h-8 flex items-center justify-center text-white bg-[#00bbb4] rounded-full hover:bg-[#009f9a]"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
