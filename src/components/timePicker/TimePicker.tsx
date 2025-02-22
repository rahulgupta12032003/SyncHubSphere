// TimePicker.tsx
import React from "react";
import DatePicker from "react-datepicker";

interface TimePickerProps {
  selectedTime: Date;
  onTimeChange: (date: Date) => void;
  label?: string;
  required?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  showIcon?: boolean;
  timeIntervals?: number;
  timeCaption?: string;
  dateFormat?: string;
  customIcon?: React.ReactNode;
}

const TimePicker: React.FC<TimePickerProps> = ({
  selectedTime,
  onTimeChange,
  label,
  required,
  containerClassName = "",
  inputClassName = "",
  iconClassName = "",
  showIcon = true,
  timeIntervals = 15,
  timeCaption = "Time",
  dateFormat = "h:mm aa",
  customIcon,
}) => {
  const defaultContainerClasses = "xxl:col-span-4 xl:col-span-6 col-span-12";
  const defaultInputClasses =
    "ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10";
  const defaultIconClasses = "text-[#8c9097] dark:text-white/50";

  return (
    <div
      className={`${
        containerClassName ? containerClassName : defaultContainerClasses
      } `}
    >
      <div className="form-group">
        {label && (
          <label htmlFor={label} className={`form-label`}>
            {label}
            {required && <span className="text-red/50 ml-1">*</span>}
          </label>
        )}
        <div className="input-group">
          {showIcon && (
            <div className={`input-group-text ${iconClassName}`}>
              {customIcon || <i className="ri-time-line"></i>}
            </div>
          )}
          <DatePicker
            selected={selectedTime}
            onChange={(date) => date && onTimeChange(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={timeIntervals}
            timeCaption={timeCaption}
            dateFormat={dateFormat}
            className={`${
              inputClassName ? inputClassName : defaultInputClasses
            } `}
          />
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
