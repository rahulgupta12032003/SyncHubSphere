// File: sortData.js or sortData.ts (if using TypeScript)

/**
 * Sorts an array of data based on a field and direction.
 *
 * @template T The type of data in the array.
 * @param {T[]} data The array of data to sort.
 * @param {string} field The field to sort by (must be a key of T).
 * @param {'asc' | 'desc' | null} direction The sort direction ('asc', 'desc', or null for no sorting).
 * @returns {T[]} A new sorted array, or the original array if no sorting is applied.  Returns a *copy* of the original to avoid side effects.
 */
const sortTableData = <T extends Record<string, any>>(
  data: T[],
  field: string | null,
  direction: "asc" | "desc" | null
): T[] => {
  if (!field || direction === null) {
    return [...data]; // Return a copy of the original data if no sorting is needed.
  }

  const sortedData = [...data].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];

    // Handle potential null or undefined values
    if (aValue === null || aValue === undefined) aValue = "";
    if (bValue === null || bValue === undefined) bValue = "";

    // Handle string sorting (case-insensitive)
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    } else {
      // Handle numeric or other data types
      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    }
  });

  return sortedData;
};

export default sortTableData;
