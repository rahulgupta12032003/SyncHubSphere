import React from "react";
import ShowEntries from "../show-entries/ShowEntries";

interface PaginationLabels {
  first: string;
  previous: string;
  next: string;
  last: string;
  showing?: string;
  of?: string;
  entries?: string;
}

interface PaginationProps {
  totalEntries: number;
  entriesPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEntriesPerPageChange?: any;
  showEntries?: boolean;
  showEntriesDropdown?: boolean;
  className?: string;
  maxPageNumbers?: number;
  labels?: Partial<PaginationLabels>;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

const defaultLabels: PaginationLabels = {
  first: "First",
  previous: "Previous",
  next: "Next",
  last: "Last",
  showing: "Showing",
  of: "of",
  entries: "entries",
};

const PaginationButton: React.FC<ButtonProps> = ({
  children,
  active = false,
  className = "",
  ...props
}) => (
  <button
    className={`
      page-link px-3 py-[0.375rem]
      ${active ? "active text-white" : "text-gray-700 hover:active"}
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

const Pagination: React.FC<PaginationProps> = ({
  totalEntries,
  entriesPerPage,
  currentPage,
  onPageChange,
  onEntriesPerPageChange,
  showEntries = true,
  showEntriesDropdown = true,
  className = "",
  maxPageNumbers = 5,
  labels: customLabels = {},
}) => {
  const labels = { ...defaultLabels, ...customLabels };
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(startEntry + entriesPerPage - 1, totalEntries);

  const getPageNumbers = (): number[] => {
    const pageNumbers: number[] = [];
    let start = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let end = Math.min(totalPages, start + maxPageNumbers - 1);

    if (end - start + 1 < maxPageNumbers) {
      start = Math.max(1, end - maxPageNumbers + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const customOptions = [10, 20, 30, 50, 75, 100];
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center ${className}`}
    >
      <div className="flex items-center">
        {/* Show Entries Section */}
        {showEntriesDropdown && (
          <ShowEntries
            value={entriesPerPage}
            onChange={onEntriesPerPageChange}
            options={customOptions}
            className="mr-4"
          />
        )}
        {showEntries && (
          <div className="text-sm text-gray-600 font-medium">
            {labels.showing} {startEntry} {labels.of} {endEntry} {labels.of}{" "}
            {totalEntries} {labels.entries}
          </div>
        )}
      </div>

      {/* Pagination Navigation */}
      <nav aria-label="">
        <ul className="ti-pagination sm:justify-end justify-center mb-0 flex items-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <PaginationButton
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              aria-label={`Go to ${labels.first} page`}
            >
              {labels.first}
            </PaginationButton>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <PaginationButton
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label={`Go to ${labels.previous} page`}
            >
              {labels.previous}
            </PaginationButton>
          </li>

          {getPageNumbers().map((number) => (
            <li key={number} className="page-item">
              <PaginationButton
                onClick={() => onPageChange(number)}
                active={currentPage === number}
                aria-label={`Page ${number}`}
                aria-current={currentPage === number ? "page" : undefined}
              >
                {number}
              </PaginationButton>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <PaginationButton
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label={`Go to ${labels.next} page`}
            >
              {labels.next}
            </PaginationButton>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <PaginationButton
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label={`Go to ${labels.last} page`}
            >
              {labels.last}
            </PaginationButton>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
