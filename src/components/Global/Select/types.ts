import { Icon } from "@phosphor-icons/react";


export interface SelectOption {
  label: string;
  value: string;
  icon?: Icon;
}

export interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  icon?: Icon;
  placeholder?: string;
  disable?: boolean
  isSearchable?: boolean;
  className?: string;
}


//// truck
export interface TruckOption {
  id: string;
  label: string;
  capacity: string;
  palletCount: string;
  cubicMeters: string;
}

export interface SelectTruckProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: TruckOption[];
  error?: string;
  placeholder?: string;
  disable?: boolean;
}