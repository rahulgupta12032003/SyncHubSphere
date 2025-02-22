import React from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[] | any;
  value?: Option[];
  onChange: (selectedOptions: Option[] | any) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  isDisabled?: boolean;
  //   customStyles?: StylesConfig<Option, true>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  required = false,
  error,
  containerClassName = "xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 ",
  labelClassName = "",
  selectClassName = "",
  isDisabled = false,
  //   customStyles,
}) => {
  const handleChange = (selectedOptions: MultiValue<Option>) => {
    onChange(selectedOptions as Option[]);
  };

  //   const defaultStyles: StylesConfig<Option, true> = {
  //     control: (base, state) => ({
  //       ...base,
  //       minHeight: "40px",
  //         border: state.isFocused ? "2px solid #2563eb" : "1px solid #e2e8f0",
  //         boxShadow: "none",
  //         "&:hover": {
  //           border: state.isFocused ? "2px solid #2563eb" : "1px solid #cbd5e1",
  //         },
  //     }),
  //     multiValue: (base) => ({
  //       ...base,
  //         backgroundColor: "#e2e8f0",
  //         borderRadius: "4px",
  //     }),
  //     multiValueLabel: (base) => ({
  //       ...base,
  //         color: "#1e293b",
  //         padding: "2px 8px",
  //     }),
  //     multiValueRemove: (base) => ({
  //       ...base,
  //         color: "#64748b",
  //       ":hover": {
  //         backgroundColor: "#cbd5e1",
  //         color: "#1e293b",
  //       },
  //     }),
  //   };

  const finalClasses = { error: "text-red-500 text-sm mt-1" };
  return (
    <div className={containerClassName}>
      <label className={`form-label ${labelClassName}`}>
        {label}
        {required && <span className="text-red/50 ml-1">*</span>}
      </label>
      <Select
        isMulti
        name="colors"
        options={options}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        className={`basic-multi-select ${selectClassName}`}
        id="choices-multiple-default"
        menuPlacement="auto"
        classNamePrefix="Select2"
        // styles={{ ...defaultStyles, ...customStyles }}
      />
      {error && <p className={finalClasses.error}>{error}</p>}
    </div>
  );
};

export default MultiSelect;
