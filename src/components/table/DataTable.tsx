import React, { useState, useCallback, Fragment } from "react";
import { MoveVertical, MoveUp, MoveDown } from "lucide-react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

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
  manualSortBy?: any;
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
  // Pagination, search, entries props
  showPagination?: boolean;
  showSearch?: boolean;
  showEntries?: boolean;
  entriesOptions?: number[];
  defaultPageSize?: number;
  initialGlobalFilter?: string;
};

const DataTable = <T extends Record<string, any>>({
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
  // Pagination, search, entries props
  showPagination = true,
  showSearch = true,
  showEntries = true,
  entriesOptions = [10, 25, 50],
  defaultPageSize = 10,
  initialGlobalFilter = "",
}: TableProps<T>) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [globalFilter, setLocalGlobalFilter] = useState(initialGlobalFilter); // Local state for search filter
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // React Table setup
  const reactTableInstance: any = useTable(
    {
      columns: columns as any, // Type assertion
      data,
      manualSortBy: true, // Enable manual sorting
      manualGlobalFilter: true, // Enable manual filtering
      initialState: {
        sortBy: sortConfig ? [sortConfig] : [],
        globalFilter,
        pageSize,
      } as any,
      //   autoResetPage: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter, // Corrected: Use the destructured setGlobalFilter
    setPageSize: setReactTablePageSize,
  } = reactTableInstance;

  // Update React Table's global filter whenever our local state changes
  React.useEffect(() => {
    setGlobalFilter(globalFilter); // Corrected: Use the destructured setGlobalFilter
  }, [globalFilter, setGlobalFilter]);

  React.useEffect(() => {
    setReactTablePageSize(pageSize);
  }, [pageSize, setReactTablePageSize]);

  const { sortBy, globalFilter: reactTableGlobalFilter, pageIndex } = state;

  // Update sortConfig when react-table's sortBy changes
  React.useEffect(() => {
    if (sortBy.length > 0) {
      const [{ id, desc }] = sortBy;
      const direction = desc ? "desc" : "asc";
      if (onSort && typeof id === "string") {
        onSort(id, direction);
      }
    } else if (onSort) {
      onSort(sortConfig?.field || "", null);
    }
  }, [sortBy, onSort, sortConfig]);

  // Sorting icon component
  const SortIcon: React.FC<{
    isActive: boolean;
    direction: "asc" | "desc" | any;
    config: Required<SortIconConfig>;
    className?: string;
  }> = ({ isActive, direction, config, className }) => {
    if (!isActive) {
      return (
        <span className={`text-gray-400 ${className}`}>
          {config.defaultIcon || <MoveVertical size={config.size} />}
        </span>
      );
    }

    if (direction === "asc") {
      return (
        <span className={`text-primary ${className}`}>
          {config.ascIcon || <MoveUp size={config.size} />}
        </span>
      );
    }

    return (
      <span className={`text-primary ${className}`}>
        {config.descIcon || <MoveDown size={config.size} />}
      </span>
    );
  };

  // Update the header cell rendering in your table component
  const renderHeaderCell = (
    column: TableColumn<T> | any,
    index: number,
    sortConfig?: TableProps<T>["sortConfig"],
    onSort?: TableProps<T>["onSort"],
    sortIconConfig?: SortIconConfig
  ) => {
    const defaultSortIconConfig: Required<SortIconConfig> = {
      show: true,
      defaultIcon: <MoveVertical />,
      ascIcon: <MoveUp />,
      descIcon: <MoveDown />,
      size: 16,
      color: "currentColor",
      className: "",
      ...sortIconConfig,
    };

    const showSortIcon = column.showSortIcon ?? defaultSortIconConfig.show;
    const isColumnSortable = column.sortable !== false;
    const isCurrentSortField =
      (sortConfig?.field === column.accessor ||
        (sortBy.length > 0 && sortBy[0].id === column.accessor)) &&
      isColumnSortable;

    const handleSort = () => {
      if (!isColumnSortable || !onSort || typeof column.accessor !== "string")
        return;

      const nextDirection =
        !sortConfig && sortBy.length === 0
          ? "asc"
          : sortConfig?.field !== column.accessor && sortBy.length === 0
          ? "asc"
          : sortBy.length > 0 && sortBy[0].id !== column.accessor
          ? "asc"
          : sortBy.length > 0 && !sortBy[0].desc
          ? "desc"
          : sortBy.length > 0 && sortBy[0].desc
          ? null
          : "asc";

      if (nextDirection === null) {
        onSort(column.accessor, null);
      } else {
        onSort(column.accessor, nextDirection);
      }
    };

    return (
      <th
        key={index} // Add the key here
        {...column.getHeaderProps(
          isColumnSortable ? column.getSortByToggleProps() : {}
        )}
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
                direction={
                  isCurrentSortField
                    ? sortBy.length > 0
                      ? sortBy[0].desc
                        ? "desc"
                        : "asc"
                      : sortConfig?.direction
                    : null
                }
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
    table: `table table-hover mb-0 table-bordered ${tableClassName}`,
    headerCell: `
      px-4 ${condensed ? "py-2" : "py-3"}
      text-center text-xs font-medium 
      border-b border-primary/10
      ${customStyles.headerBg || "bg-gradient-to-b from-gray-50 to-gray-100"}
      ${customStyles.headerText || "text-gray-700"}
      ${stickyHeader ? "sticky top-0 z-10" : ""}
      ${headerClassName}
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

  const handleDropdownToggle = useCallback(
    (index: number) => {
      setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    },
    [openDropdownIndex]
  );

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
                e.stopPropagation();
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
                e.stopPropagation();
                handleDropdownToggle(rowIndex);
              }}
            >
              {dropdownButtonName || "Action ▼"}
            </button>
            {openDropdownIndex === rowIndex && (
              <div className="absolute right-0 z-50 w-48 mt-1 bg-white rounded-lg shadow-lg border border-gray-300">
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
                          e.stopPropagation();
                          action.onClick(row);
                          setOpenDropdownIndex(null);
                        }}
                        disabled={isDisabled}
                        className={`
                            flex items-center gap-1 w-full px-4 py-3 text-xs text-left
                            ${
                              isDisabled
                                ? "text-gray-400 cursor-not-allowed"
                                : `text-gray-700 hover:bg-gray-100 ${
                                    (actionIndex === 0 && "rounded-t-lg") || // First item
                                    (actionIndex ===
                                      dropdownActions.length - 1 &&
                                      "rounded-b-lg") // Last item
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
                      {action.separator && <hr className=" border-gray-300" />}
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {showEntries && (
          <div className="mb-4 flex">
            <select
              className="selectpage border me-1"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {entriesOptions.map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
            {showSearch && (
              <span className="ms-auto">
                <input
                  value={globalFilter}
                  onChange={(e) => setLocalGlobalFilter(e.target.value)} // Use the local state setter
                  className="form-control !w-auto"
                  placeholder="Search..."
                />
              </span>
            )}
          </div>
        )}
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                {headerGroup.headers.map((column: any) =>
                  renderHeaderCell(
                    column,
                    0,
                    sortConfig,
                    onSort,
                    sortIconConfig
                  )
                )}
                {(staticButtons.length > 0 || dropdownActions.length > 0) &&
                  actionColumn?.show !== false && (
                    <th
                      key={Math.random()} // Add the key here
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
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={bodyClassName}>
            {page.map((row: any, rowIndex: number) => {
              prepareRow(row);
              const isSelected = selectedRow === row.original;
              const key = getKeyForRow(row.original, rowIndex);
              const rowClass =
                typeof rowClassName === "function"
                  ? rowClassName(row.original, rowIndex)
                  : rowClassName;

              return (
                <tr
                  key={key}
                  {...row.getRowProps()}
                  className={`
                    ${styles.bodyRow(rowIndex, isSelected)}
                    ${rowClass}
                  `}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.cells.map((cell: any, colIndex: number) => {
                    const column = columns[colIndex];
                    if (!column) return null;
                    const value = cell.value;

                    return (
                      <td
                        key={colIndex}
                        {...cell.getCellProps()}
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
                        {renderCell(column, row.original, value)}
                      </td>
                    );
                  })}

                  {(staticButtons.length > 0 || dropdownActions.length > 0) && (
                    <td className={styles.bodyCell}>
                      {renderActionButtons(row.original, rowIndex)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {data.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            {emptyStateMessage}
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {showPagination && (
          <div className="block sm:flex items-center mt-4">
            <div>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </div>
            <div className="sm:ms-auto float-right my-1 sm:my-0  ">
              <button
                className="btn-outline-light tablebutton me-2 sm:inline block"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {" Previous "}
              </button>
              <button
                className="btn-outline-light tablebutton me-2"
                onClick={() => {
                  previousPage();
                }}
                disabled={!canPreviousPage}
              >
                {" << "}
              </button>
              <button
                className="btn-outline-light tablebutton me-2"
                onClick={() => {
                  previousPage();
                }}
                disabled={!canPreviousPage}
              >
                {" < "}
              </button>
              <button
                className="btn-outline-light tablebutton me-2"
                onClick={() => {
                  nextPage();
                }}
                disabled={!canNextPage}
              >
                {" > "}
              </button>
              <button
                className="btn-outline-light tablebutton me-2"
                onClick={() => {
                  nextPage();
                }}
                disabled={!canNextPage}
              >
                {" >> "}
              </button>
              <button
                className="btn-outline-light tablebutton sm:inline block"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {" Next "}
              </button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .dropdown-menu {
          position: fixed;
          z-index: 1000;
        }

        @media screen and (max-height: 700px) {
          .dropdown-menu {
            max-height: 200px;
          }
        }

        @media screen and (min-height: 701px) {
          .dropdown-menu {
            max-height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default DataTable;
