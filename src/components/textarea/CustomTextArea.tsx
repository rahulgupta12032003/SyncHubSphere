// components/CustomTextArea/types.ts
export interface CustomTextAreaProps {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Fixed type
  rows?: number;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  // Style customization props
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  // Additional props spreading
  [key: string]: any;
}

// components/CustomTextArea/CustomTextArea.tsx
import React from "react";

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  id = "input-placeholder",
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  rows = 1,
  error,
  disabled = false,
  required = false,
  // Style classes
  className = "",
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  // Rest props
  ...props
}) => {
  // Default classes that can be overridden
  const defaultClasses = {
    container:
      "xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12",
    label: "form-label",
    input: "form-control",
    error: "text-red-500 text-sm mt-1",
  };

  // Combine default classes with custom classes
  const finalClasses = {
    container: `${defaultClasses.container} ${containerClassName}`,
    label: `${defaultClasses.label} ${labelClassName}`,
    input: `${defaultClasses.input} ${inputClassName}`,
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
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`${finalClasses.input} ${error ? "border-red-500" : ""}`}
        {...props}
      />
      {error && <p className={finalClasses.error}>{error}</p>}
    </div>
  );
};

export default CustomTextArea;
