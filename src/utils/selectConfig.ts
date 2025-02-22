export const groupsConfig: any = {
  valueKey: "groupname",
  labelKey: "groupname",
  parentKey: "group",
  isObjectData: false,
};
export const verticalsConfig: any = {
  labelKey: "name",
  parentKey: "verticals",
  isObjectDatavalue: true, // This flags that we want value same as key
  isObjectData: true, // This flags that we should handle it as an object structure
};

export const userTypeConfig: any = {
  valueKey: "usertype",
  labelKey: "usertype",
  parentKey: "usertype",
  isObjectData: false,
};

export const academicYearConfig: any = {
  valueKey: "id", // These won't be used when isObjectData is true
  labelKey: "name",
  parentKey: "academicYear",
  isObjectData: true,
};
export const applicationYearsConfig: any = {
  valueKey: "id",
  labelKey: "name",
  parentKey: "academicYear",
  isObjectData: true,
};

export const stateListConfig: any = {
  valueKey: "state",
  labelKey: "state",
  parentKey: "stateList",
  isObjectData: false,
};

export const cityListConfig: any = {
  valueKey: "city",
  labelKey: "city",
  parentKey: "checkinnCity",
  isObjectData: false,
};

export const creEmailsConfig: any = {
  valueKey: "emailid",
  labelKey: "emailid",
  parentKey: "creList",
  isObjectData: false,
};

export const smsGatewayListConfig: any = {
  valueKey: "id",
  labelKey: "name",
  parentKey: "smsGatewayList",
  isObjectData: true,
};

export const attdSmsTriggerConfig: any = {
  valueKey: "ast_time",
  labelKey: "ast_time",
  parentKey: "attd_sms_trigger",
  isObjectData: false,
};

export const bankAcademicYearConfig: any = {
  valueKey: "id", // These won't be used when isObjectData is true
  labelKey: "name",
  parentKey: "academic_year_list",
  isObjectData: true,
};

export const addBankAcademicYearsList: any = {
  valueKey: "id", // These won't be used when isObjectData is true
  labelKey: "name",
  parentKey: "academic_year",
  isObjectData: true,
};

export const addBankNameList: any = {
  valueKey: "id", // These won't be used when isObjectData is true
  labelKey: "name",
  parentKey: "bank_names",
  isObjectData: true,
};
