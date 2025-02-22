export interface CustomDatePickerProps {
  id?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  showIcon?: boolean;
  // Date handling
  selected?: Date | null;
  onChange?: (date: Date | any) => void;
  // Style customization props
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  pickerClassName?: string;
  errorClassName?: string;
  // Additional props spreading
  [key: string]: any;
}

// components/CustomDatePicker/CustomDatePicker.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  id = "datepicker-placeholder",
  label,
  error,
  disabled = false,
  required = false,
  showIcon = true,
  selected,
  onChange,
  // Style classes
  className = "",
  containerClassName = "",
  labelClassName = "",
  pickerClassName = "",
  errorClassName = "",
  // Rest props
  ...props
}) => {
  // Default classes that can be overridden
  const defaultClasses = {
    container:
      "xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12",
    label: "form-label",
    picker: "ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10",
    error: "text-red-500 text-sm mt-1",
  };

  // Combine default classes with custom classes
  const finalClasses = {
    container: `${defaultClasses.container} ${containerClassName}`,
    label: `${defaultClasses.label} ${labelClassName}`,
    picker: `${defaultClasses.picker} ${pickerClassName}`,
    error: `${defaultClasses.error} ${errorClassName}`,
  };

  return (
    <div className={`${finalClasses.container} ${className}`}>
      {label && (
        <label htmlFor={id} className={finalClasses.label}>
          {label}
          {required && <span className="text-red/50 ml-1">*</span>}
        </label>
      )}
      <div className="input-group">
        <div className="input-group-text text-[#8c9097] dark:text-white/50">
          <i className="ri-calendar-line"></i>
        </div>
        <DatePicker
          id={id}
          selected={selected}
          onChange={onChange}
          disabled={disabled}
          required={required}
          showIcon={showIcon}
          className={`${finalClasses.picker} ${error ? "border-red-500" : ""}`}
          {...props}
        />
      </div>
      {error && <p className={finalClasses.error}>{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
