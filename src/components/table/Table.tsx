import React, { useState, useCallback, useRef, useEffect } from "react";
import { ChevronsUpDown, ChevronsDown, ChevronsUp } from "lucide-react";

// Advanced type definitions
type SortDirection = "asc" | "desc" | null;

type SortConfig = {
  field: string;
  direction: SortDirection;
};

interface SortIconConfig {
  show?: boolean;
  defaultIcon?: React.ReactNode;
  ascIcon?: React.ReactNode;
  descIcon?: React.ReactNode;
  size?: number;
  color?: string;
  className?: string;
}

type TableColumn<T> = {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  sortable?: boolean;
  showSortIcon?: boolean | any; // Individual column sort icon control
  customSortIcon?: {
    default?: React.ReactNode;
    asc?: React.ReactNode;
    desc?: React.ReactNode;
  };
  className?: string;
  headerClassName?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: "left" | "center" | "right";
  customRenderer?: (value: any, row: T) => React.ReactNode;
};

type ActionButton<T> = {
  label: string;
  onClick: (row: T) => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean | ((row: T) => boolean);
  hide?: boolean | ((row: T) => boolean);
  variant?: "primary" | "secondary" | "danger" | "custom";
};

type DropdownAction<T> = ActionButton<T> & {
  separator?: boolean;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  staticButtons?: ActionButton<T>[];
  dropdownActions?: DropdownAction<T>[];
  actionColumn?: {
    show?: boolean;
    title?: string | React.ReactNode;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    align?: "left" | "center" | "right";
    className?: string;
  };
  dropdownButtonName?: React.ReactNode;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  cellClassName?: string;
  statusColumn?: {
    accessor: keyof T;
    activeValue: any;
    inactiveValue: any;
    customStatuses?: Record<string | number, string>;
  };
  sortConfig?: {
    field: string;
    direction: "asc" | "desc" | null;
  };
  onSort?: (field: string, direction: "asc" | "desc" | null) => void;
  sortIconConfig?: SortIconConfig;
  onRowClick?: (row: T) => void;
  selectedRow?: T;
  isLoading?: boolean;
  emptyStateMessage?: string;
  stickyHeader?: boolean;
  rowKey?: keyof T | ((row: T) => string | number);
  containerClassName?: string;
  zebra?: boolean;
  condensed?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  customStyles?: {
    headerBg?: string;
    headerText?: string;
    rowBorder?: string;
    hoverBg?: string;
    selectedRowBg?: string;
  };
};

const Table = <T extends Record<string, any>>({
  data,
  columns,
  staticButtons = [],
  dropdownActions = [],
  actionColumn,
  dropdownButtonName,
  tableClassName = "",
  headerClassName = "",
  bodyClassName = "",
  rowClassName = "",
  cellClassName = "",
  statusColumn,
  onSort,
  sortConfig,
  sortIconConfig,
  onRowClick,
  selectedRow,
  isLoading = false,
  emptyStateMessage = "No data available",
  stickyHeader = false,
  rowKey,
  containerClassName = "",
  zebra = false,
  condensed = false,
  bordered = true,
  hoverable = true,
  customStyles = {},
}: TableProps<T>) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const dropdownRef = useRef<any>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const headerRef = useRef<HTMLTableElement | any>(null);

  // Sorting icon component
  const SortIcon: React.FC<{
    isActive: boolean;
    direction: "asc" | "desc" | null;
    config: Required<SortIconConfig>;
    className?: string;
  }> = ({ isActive, direction, config, className }) => {
    if (!isActive) {
      return (
        <span className={`text-gray-400 ${className}`}>
          {config.defaultIcon || <ChevronsUpDown size={config.size} />}
        </span>
      );
    }

    if (direction === "asc") {
      return (
        <span
          className={` ${
            isScrolling ? "text-gray-400" : "text-primary"
          } ${className}`}
        >
          {config.ascIcon || <ChevronsUp size={config.size} />}
        </span>
      );
    }

    return (
      <span
        className={` ${
          isScrolling ? "text-gray-400" : "text-primary"
        } ${className}`}
      >
        {config.descIcon || <ChevronsDown size={config.size} />}
      </span>
    );
  };

  // Update the header cell rendering in your table component
  const renderHeaderCell = (
    column: TableColumn<T>,
    index: number,
    sortConfig?: TableProps<T>["sortConfig"],
    onSort?: TableProps<T>["onSort"],
    sortIconConfig?: SortIconConfig
  ) => {
    const defaultSortIconConfig: Required<SortIconConfig> = {
      show: true,
      defaultIcon: null,
      ascIcon: null,
      descIcon: null,
      size: 16,
      color: "currentColor",
      className: "",
      ...sortIconConfig,
    };

    const showSortIcon = column.showSortIcon ?? defaultSortIconConfig.show;
    const isColumnSortable = column.sortable !== false;
    const isCurrentSortField = sortConfig?.field === column.accessor;

    const handleSort = () => {
      if (!isColumnSortable || !onSort || typeof column.accessor !== "string")
        return;

      const nextDirection = !sortConfig
        ? "asc"
        : sortConfig.field !== column.accessor
        ? "asc"
        : sortConfig.direction === "asc"
        ? "desc"
        : sortConfig.direction === "desc"
        ? null
        : "asc";

      onSort(column.accessor, nextDirection);
    };

    return (
      <th
        key={index}
        className={`
        ${styles.headerCell}
        ${column.headerClassName || ""}
        ${isColumnSortable ? "cursor-pointer select-none" : ""}
      `}
        onClick={handleSort}
        style={{
          width: column.width,
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          textAlign: column.align || "left",
        }}
      >
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            {column.header}
            {isColumnSortable && showSortIcon && (
              <SortIcon
                isActive={isCurrentSortField}
                direction={isCurrentSortField ? sortConfig?.direction : null}
                config={{
                  ...defaultSortIconConfig,
                  ...(column.customSortIcon && {
                    defaultIcon: column.customSortIcon.default,
                    ascIcon: column.customSortIcon.asc,
                    descIcon: column.customSortIcon.desc,
                  }),
                }}
                className={`transition-colors ${defaultSortIconConfig.className}`}
              />
            )}
          </div>
        </div>
      </th>
    );
  };

  const getBaseStyles = () => ({
    container: `relative  ${containerClassName}`,
    table: `table table-bordered table-bordered-primary border-primary/10 min-w-full ${tableClassName}`,
    headerCell: `
      px-4 ${condensed ? "py-2" : "py-3"}
      text-center text-xs font-medium 
      border-b border-primary/10
      ${customStyles.headerBg || "bg-gradient-to-b from-gray-50 to-gray-100"}
      ${customStyles.headerText || "text-gray-700"}
      ${stickyHeader ? "sticky top-0 z-10" : ""}
      ${headerClassName}
       ${
         isScrolling
           ? "bg-primary text-white table-bordered-primary border-primary"
           : "bg-gradient-to-b from-gray-50 to-gray-100 border-b border-primary/10"
       }

    `,
    bodyRow: (index: number, isSelected: boolean) => `
      ${hoverable ? "hover:bg-gray-200" : ""}
      ${zebra && index % 2 === 1 ? "bg-gray-50" : ""}
      ${isSelected ? customStyles.selectedRowBg || "bg-blue/50" : ""}
      border-t border-primary/10
      ${
        typeof rowClassName === "function"
          ? rowClassName(data[index], index)
          : rowClassName
      }
    `,
    bodyCell: `
      px-2 ${condensed ? "py-1" : "py-2"}
      text-xs text-gray-900
      ${cellClassName}
    `,
    wrapper: `
      ${bordered ? "border-primary/10" : ""}
    `,
    buttons: {
      bankDetails: `
        px-2 py-1 text-xs font-medium text-white
        bg-[#5bc0de] hover:bg-[#4ab0ce]
        rounded-sm transition-colors
      `,
      plan: `
        px-2 py-1 text-xs font-medium text-white
        bg-[#337ab7] hover:bg-[#2e6da4]
         rounded-sm transition-colors
      `,
      action: `
        px-2 py-1 text-xs font-medium
        text-gray-700 bg-white
        border border-gray-300 rounded-sm
        hover:bg-gray-50 transition-colors
      `,
    },
    status: {
      active: "badge bg-primary/10 text-primary capitalize",
      inactive: "badge bg-light text-dark capitalize",
    },
  });

  const styles = getBaseStyles();

  const handleDropdownToggle = (rowIndex: any) => {
    setOpenDropdownIndex((prevIndex) =>
      prevIndex === rowIndex ? null : rowIndex
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if the click is outside the dropdown and button
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(null);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getKeyForRow = useCallback(
    (row: T, index: number) => {
      if (!rowKey) return index;
      return typeof rowKey === "function" ? rowKey(row) : row[rowKey];
    },
    [rowKey]
  );

  const renderCell = (
    column: TableColumn<T>,
    row: T,
    value: any
  ): React.ReactNode => {
    if (column.customRenderer) {
      return column.customRenderer(value, row);
    }

    if (statusColumn && column.accessor === statusColumn.accessor) {
      const statusClass =
        statusColumn.customStatuses?.[value] ||
        (value === statusColumn.activeValue
          ? styles.status.active
          : value === statusColumn.inactiveValue
          ? styles.status.inactive
          : "");

      return (
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs ${statusClass}`}
        >
          {value}
        </span>
      );
    }

    return typeof value === "boolean" ? value.toString() : value;
  };

  const renderActionButtons = (row: T, rowIndex: number) => {
    if (!staticButtons.length && !dropdownActions.length) return null;

    return (
      <div className="flex gap-2 justify-center items-center">
        {staticButtons.map((button, btnIndex) => {
          const isHidden =
            typeof button.hide === "function" ? button.hide(row) : button.hide;
          if (isHidden) return null;

          const isDisabled =
            typeof button.disabled === "function"
              ? button.disabled(row)
              : button.disabled;
          const buttonStyle =
            button.label === "Bank Details"
              ? styles.buttons.bankDetails
              : button.label === "SMS Plan"
              ? styles.buttons.plan
              : button.className;

          return (
            <button
              key={btnIndex}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
                button.onClick(row);
              }}
              disabled={isDisabled}
              className={buttonStyle}
            >
              {button.icon && <span className="mr-1">{button.icon}</span>}
              {button.label}
            </button>
          );
        })}

        {dropdownActions.length > 0 && (
          <div className="relative">
            <button
              className={styles.buttons.action}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
                handleDropdownToggle(rowIndex);
              }}
            >
              {dropdownButtonName || "Action ▼"}
            </button>
            {openDropdownIndex === rowIndex && (
              <div
                ref={dropdownRef}
                className="absolute right-0 z-50 w-48 mt-1 bg-white rounded-lg shadow-lg border border-gray-300"
              >
                {dropdownActions.map((action, actionIndex) => {
                  const isHidden =
                    typeof action.hide === "function"
                      ? action.hide(row)
                      : action.hide;
                  if (isHidden) return null;

                  const isDisabled =
                    typeof action.disabled === "function"
                      ? action.disabled(row)
                      : action.disabled;

                  return (
                    <React.Fragment key={actionIndex}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click event from bubbling up
                          action.onClick(row);
                          setOpenDropdownIndex(null); // Optionally close dropdown after clicking an item
                        }}
                        disabled={isDisabled}
                        className={`
                            flex items-center gap-1 w-full px-4 py-3 text-xs text-left
                            ${
                              isDisabled
                                ? "text-gray-400 cursor-not-allowed"
                                : `text-gray-700 hover:bg-gray-100 
                                   ${
                                     (actionIndex === 0 && "rounded-t-lg") ||
                                     (actionIndex ===
                                       dropdownActions.length - 1 &&
                                       "rounded-b-lg")
                                   }`
                            }
                            ${action.className || ""}
                          `}
                      >
                        {action.icon && (
                          <span className="mr-2">{action.icon}</span>
                        )}
                        {action.label}
                      </button>
                      {action.separator && <hr className="border-gray-300" />}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current && headerRef.current) {
        setIsScrolling(tableRef.current.scrollTop > 0);
      }
    };

    if (tableRef.current) {
      tableRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableRef.current) {
        tableRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const tableStyle: any = {
    height: "100%",
    overflowX: "auto",
    overflowY: "auto",
  };

  // const headerStyle: any = {
  //   backgroundColor: isScrolling && "white",
  //   position: "sticky",
  //   top: -1,
  //   zIndex: 1,
  //   border: isScrolling && "1px solid green",
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div style={tableStyle} ref={tableRef}>
          <table className={styles.table}>
            <thead ref={headerRef}>
              <tr
              //  style={headerStyle}
              >
                {columns.map((column, index) =>
                  renderHeaderCell(
                    column,
                    index,
                    sortConfig,
                    onSort,
                    sortIconConfig
                  )
                )}
                {(staticButtons.length > 0 || dropdownActions.length > 0) &&
                  actionColumn?.show !== false && (
                    <th
                      className={` ${styles.headerCell} ${
                        actionColumn?.className || ""
                      } `}
                      style={{
                        textAlign: actionColumn?.align || "right",
                        width: actionColumn?.width,
                        minWidth: actionColumn?.minWidth || "200px",
                        maxWidth: actionColumn?.maxWidth,
                      }}
                    >
                      {actionColumn?.title || "Actions"}
                    </th>
                  )}
                {(staticButtons.length > 0 || dropdownActions.length > 0) &&
                  actionColumn?.show === false && (
                    <th
                      className={` ${styles.headerCell} ${
                        actionColumn?.className || ""
                      } `}
                    ></th>
                  )}
              </tr>
            </thead>
            <tbody className={bodyClassName}>
              {data?.map((row, rowIndex) => {
                const isSelected = selectedRow === row;
                const key = getKeyForRow(row, rowIndex);
                const rowClass =
                  typeof rowClassName === "function"
                    ? rowClassName(row, rowIndex)
                    : rowClassName;

                return (
                  <tr
                    key={key}
                    className={`
                    ${styles.bodyRow(rowIndex, isSelected)}
                    ${rowClass}
                  `}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((column, colIndex) => {
                      const value =
                        typeof column.accessor === "function"
                          ? column.accessor(row)
                          : row[column.accessor as keyof T];

                      return (
                        <td
                          key={colIndex}
                          className={`${styles.bodyCell} ${
                            column.className || ""
                          }`}
                          style={{
                            textAlign: column.align || "left",
                            width: column.width,
                            minWidth: column.minWidth,
                            maxWidth: column.maxWidth,
                          }}
                        >
                          {renderCell(column, row, value)}
                        </td>
                      );
                    })}

                    {(staticButtons.length > 0 ||
                      dropdownActions.length > 0) && (
                      <td className={styles.bodyCell}>
                        {renderActionButtons(row, rowIndex)}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {data.length === 0 && !isLoading && (
          <div className="lex items-center justify-center absolute inset-10 text-center py-8 text-gray-500">
            {emptyStateMessage}
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-10 bg-white/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
