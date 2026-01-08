export interface CountryItemEntity {
  code?: string;
  flag_path?: string;
  is_show?: number;
  name?: string;
  region?: string;
  /** 国家代码，如 SG, MY */
  value?: string;
  /** 国际区号，如 +65, +60 */
  key?: string;
}

export interface CountryEntity {
  country_codes?: CountryItemEntity[];
}

export interface EnterpriseConfigEntity {
  business_units?: {
    label?: string;
    value?: string;
  }[];

  payment_methods?: {
    label?: string;
    value?: string;
  }[];
}
