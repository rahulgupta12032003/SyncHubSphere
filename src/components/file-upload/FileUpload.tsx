// components/forms/types.ts
export interface BaseFieldProps {
  id?: string;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export interface Option {
  value: string;
  label: string;
}

// components/forms/FileUpload.tsx
import React from "react";

interface FileUploadProps extends BaseFieldProps {
  onChange: (file: File | null) => void;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  required,
  onChange,
  accept,
  className = "",
  containerClassName = "",
  labelClassName = "",
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className={`form-label ${labelClassName}`}>
          {label}
          {required && <span className="text-red/50 ml-1">*</span>}
        </label>
      )}
      <div>
        <label className="block bg-white  rounded-sm">
          <span className="sr-only">Choose Profile photo</span>
          <input
            id={id}
            onChange={(e) => onChange(e.target.files?.[0] || null)}
            accept={accept}
            type="file"
            className={`block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50
                file:me-4 file:py-2 file:px-4
                file:rounded-s-sm file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary focus-visible:outline-none ${className}`}
          />
        </label>
      </div>
    </div>
  );
};
