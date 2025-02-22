import React from "react";

interface CustomCheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id = crypto.randomUUID(),
  label,
  checked = false,
  onChange,
  className = "",
  labelClassName = "",
  inputClassName = "",
  size = "md",
  disabled = false,
}) => {
  const getBaseClasses = () => {
    return "form-check form-check-lg flex items-center xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12";
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "form-check-sm";
      case "lg":
        return "form-check-lg";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={`${getBaseClasses()} ${getSizeClasses()} ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={`form-check-input ${inputClassName}`}
      />
      {label && (
        <label htmlFor={id} className={`form-check-label ${labelClassName}`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default React.memo(CustomCheckbox);
