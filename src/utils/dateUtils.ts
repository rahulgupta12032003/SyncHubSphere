// utils/dateUtils.ts
export const getCurrentYear = (): number => new Date().getFullYear();

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

export const formatDateTime = (isoDate: string): string => {
  const date = new Date(isoDate);

  const padZero = (num: number) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
