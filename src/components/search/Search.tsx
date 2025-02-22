import React, { useState, useCallback } from "react";
import { Search, X } from "lucide-react";

interface SearchComponentProps {
  value: string;
  onSearch: (value: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  showIcon?: boolean;
  searchOnEnter?: boolean;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  size?: number;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  value,
  onSearch,
  onChange,
  onClear,
  showIcon = true,
  searchOnEnter = false,
  placeholder = "Search...",
  className = "",
  inputClassName = "",
  iconClassName = "",
  autoFocus = false,
  disabled = false,
  size = 40,
}) => {
  const [localValue, setLocalValue] = useState<string>(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      onChange?.(newValue);

      if (!searchOnEnter) {
        onSearch(newValue);
      }
    },
    [onChange, onSearch, searchOnEnter]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (searchOnEnter && e.key === "Enter") {
        onSearch(localValue);
      }
    },
    [onSearch, localValue, searchOnEnter]
  );

  const handleClear = useCallback(() => {
    setLocalValue("");
    onClear?.();
    onChange?.("");
    onSearch("");
  }, [onChange, onClear, onSearch]);

  return (
    <div
      className={`relative flex items-center w-full  rounded-sm  focus:z-6 h-[${size}px]  ${className} border border-inputborder  focus:border-gray-200  dark:border-white/10 dark:focus:border-white/10 dark:text-white/70`}
    >
      {showIcon && (
        <div className={`flex items-center  h-[${size}px] px-3  rounded-l-sm`}>
          <Search
            className={`  w-5 h-5 text-gray-500 pointer-events-none ${iconClassName}`}
          />
        </div>
      )}

      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`
          w-full rounded-lg border-none bg-transparent
          py-2 ${showIcon ? "pl-6" : "pl-4"} pr-6
          focus:outline-none focus:ring-2 focus:ring-blue/50 
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition-colors duration-200
          placeholder:text-gray-500
          ${inputClassName}
        `}
      />
      {localValue && (
        <button
          onClick={handleClear}
          className={`
            absolute right-3 p-1 rounded-full bg-danger/10
            hover:bg-danger/30 focus:outline-none
            transition-colors duration-200
            ${disabled ? "hidden" : ""}
          `}
          type="button"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-danger/80 " />
        </button>
      )}
    </div>
  );
};

export default SearchComponent;
