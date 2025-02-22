import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: { id: string; label: string; value: string }[];
  onSelect: (value: string) => void;
  selectedValue: string;
  title?: string;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "warning" | "info" | "success";
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedValue,
  title = "Action",
  className = "",
  variant = "primary",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="ti-btn-group !m-0" ref={dropdownRef}>
      <div className="hs-dropdown ti-dropdown relative">
        <div className="flex">
          <button
            className={`ti-btn ti-btn-${variant}-full !me-0 !rounded-e-none px-4`}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            {title}
          </button>

          <button
            type="button"
            aria-label="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`ti-btn ti-btn-${variant}-full opacity-[0.85] !rounded-s-none px-3`}
          >
            <i className="ri-arrow-down-s-line align-middle text-base"></i>
          </button>
        </div>

        {isOpen && (
          <ul
            className="hs-dropdown-menu  mt-1 absolute top-full right-0 z-[60] min-w-[10rem] bg-white shadow-md rounded-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700 bg-white border rounded-md shadow-lg"
            role="menu"
          >
            {options.map((option) => (
              <li key={option.id} role="menuitem">
                <button
                  className="ti-dropdown-item block w-full px-4 py-3 text-left item-left text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
