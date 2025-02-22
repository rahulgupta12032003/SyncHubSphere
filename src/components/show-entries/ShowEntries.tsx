import React from "react";

interface ShowEntriesProps {
  value: number;
  options?: number[];
  onChange: (value: number) => void;
  label?: {
    prefix?: string;
    suffix?: string;
  };
  className?: string;
}

const ShowEntries: React.FC<ShowEntriesProps> = ({
  value,
  options = [10, 25, 50, 100],
  onChange,
  label = {
    prefix: "",
    suffix: "",
  },
  className = "",
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {label.prefix && (
        <span className="text-gray-700 text-base text-md">{label.prefix}</span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="form-selec h-10 block border  border-primary/40 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary text-md"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {label.suffix && (
        <span className="text-gray-700 text-base text-md">{label.suffix}</span>
      )}
    </div>
  );
};

export default ShowEntries;
