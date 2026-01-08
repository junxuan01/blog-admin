import corporateService from '@clients/corporate';
import type { CountryEntity } from './type';

/**
 * api.admin.configs.GetDictionaryReplyData
 */
export interface APIAdminConfigsGetDictionaryReplyData {
  car_types?: APIAdminConfigsDictionary[];
  // service_types?: APIAdminConfigsDictionary[];
  // order_source?: APIAdminConfigsDictionary[];
  order_payment_status?: APIAdminConfigsDictionary[];
  order_status?: APIAdminConfigsDictionary[];
  // trip_types?: APIAdminConfigsDictionary[];
  // vehicle_levels?: APIAdminConfigsDictionary[];
  [property: string]: any;
}

/**
 * api.admin.configs.Dictionary
 */
export interface APIAdminConfigsDictionary {
  label?: string;
  value?: string;
  children?: APIAdminConfigsDictionary[];
  [property: string]: any;
}

export const getConfig = async () => {
  return corporateService.get<APIAdminConfigsGetDictionaryReplyData>(
    '/api/v1/config'
  );
};

/**
 * 获取国家区号列表
 */
export const getCountryList = async () => {
  return corporateService.get<CountryEntity>(
    '/api/corporates_admin/profile/country-codes'
  );
};
