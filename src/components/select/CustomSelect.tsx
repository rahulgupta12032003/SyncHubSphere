export interface SelectOption {
  value: string | number;
  label: string;
}

export interface CustomSelectProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: any;
  onChange?: (option: SelectOption | any) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  options: SelectOption[];
  isMulti?: boolean;
  // Style props
  className?: string;
  containerClassName?: string; // Added this prop
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
}

// components/CustomSelect/CustomSelect.tsx
import React from "react";
import Select from "react-select";

const CustomSelect: React.FC<CustomSelectProps> = ({
  id = "react-select-3-live-region",
  label,
  placeholder = "Select an option",
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  options,
  isMulti = false,
  // Style classes
  className = "",
  containerClassName = "",
  labelClassName = "",
  selectClassName = "",
  errorClassName = "",
}) => {
  // Default classes
  const defaultClasses = {
    container:
      "xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12",
    label: "form-label",
    select: "min-h-[42px]",
    error: "text-red text-sm mt-1",
  };

  // Combine default classes with custom classes
  const finalClasses = {
    container: `${defaultClasses.container} ${containerClassName} ${className}`,
    label: `${defaultClasses.label} ${labelClassName}`,
    select: `${defaultClasses.select} ${selectClassName}`,
    error: `${defaultClasses.error} ${errorClassName}`,
  };

  return (
    <div className={finalClasses.container}>
      {label && (
        <label htmlFor={id} className={finalClasses.label}>
          {label}
          {required && <span className="text-red/50 ml-1">*</span>}
        </label>
      )}
      <Select
        id={id}
        options={options}
        value={value}
        onChange={onChange}
        isDisabled={disabled}
        placeholder={placeholder}
        className={finalClasses.select}
        classNamePrefix="Select2"
        isMulti={isMulti}
      />
      {error && <p className={finalClasses.error}>{error}</p>}
    </div>
  );
};

export default CustomSelect;
