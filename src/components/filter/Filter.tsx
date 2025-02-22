import React, { useState } from "react";
import { Filter, X } from "lucide-react";

type FilterOption = {
  id: string;
  label: string;
  value: string;
};

type FilterDropdownProps = {
  options: FilterOption[];
  selectedValue: string;
  onFilterSubmit: (value: string) => void;
  title?: string;
  className?: string;
};

const FilterData: React.FC<FilterDropdownProps> = ({
  options,
  selectedValue,
  onFilterSubmit,
  title = "Filter",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState(selectedValue);
  console.log("tempSelected", tempSelected);
  console.log("tempSelected selectedValue", selectedValue);
  const handleSubmit = () => {
    onFilterSubmit(tempSelected);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-200"
      >
        <Filter className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        // <div className="absolute z-50 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
        <div className="absolute z-50 mt-2 w-72 bg-white rounded-xl shadow-lg border-2 border-secondary/30 right-0 transform translate-x-0 transition-transform duration-200 ease-out">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Options */}
          <div className="p-4 max-h-72 overflow-y-auto">
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="filter"
                    value={option.value}
                    checked={
                      tempSelected === option.value &&
                      option.value !== selectedValue
                    }
                    onChange={(e) => setTempSelected(e.target.value)}
                    className="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-200 rounded-b-xl">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-secondary rounded-lg transition-colors"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterData;

{
  /* <FilterDropdown
            options={filterOptions}
            selectedValue={selectedFilter}
            onFilterSubmit={handleFilterSubmit}
            title="Filter Items"
            className="w-fit border border-secondary/60 rounded-lg"
          /> */
}
