interface SelectOption {
  value: string | number;
  label: string;
  [key: string]: any;
}

interface BaseItem {
  [key: string]: any;
}

// Enhanced config interface to handle object structure
interface TransformConfig<T extends BaseItem> {
  valueKey: keyof T;
  labelKey: keyof T;
  parentKey?: string;
  filterKey?: keyof T;
  filterValue?: any;
  customTransform?: (item: T) => SelectOption;
  isObjectDatavalue?: boolean; // New flag for object structure
  isObjectData?: boolean; // New flag for object structure
}

export function transformToSelectOptions<T extends BaseItem>(
  data: { [key: string]: any } | null | undefined,
  config: TransformConfig<T>
): SelectOption[] {
  if (!data) return [];

  const {
    valueKey,
    labelKey,
    parentKey,
    filterKey,
    filterValue,
    customTransform,
    isObjectDatavalue = false,
    isObjectData,
  } = config;

  // Handle nested data
  let sourceData = parentKey && data ? data[parentKey] : data;

  if (!sourceData) return [];

  // Handle object structure (like your verticals data)
  if (isObjectData) {
    return Object.entries(sourceData).map(([key, value]) => ({
      value: isObjectDatavalue ? (value as string) : key,
      label: value as string,
    }));
  }

  // Handle array structure (original logic)
  const arrayData = Array.isArray(sourceData) ? sourceData : [sourceData];

  if (filterKey && filterValue !== null) {
    return arrayData
      .filter((item) => item[filterKey] === filterValue)
      .map((item) => {
        if (customTransform) {
          return customTransform(item);
        }
        return {
          value: item[valueKey],
          label: item[labelKey],
        };
      });
  }

  return arrayData.map((item) => {
    if (customTransform) {
      return customTransform(item);
    }
    return {
      value: item[valueKey],
      label: item[labelKey],
    };
  });
}
