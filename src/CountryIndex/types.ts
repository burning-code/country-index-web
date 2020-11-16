interface ICountryAbstract {
  name: string;
  alpha2Code: string;
}

interface ICountriesData {
  countries: ICountryAbstract[];
}

interface ICountriesQuery {
  keywords: string;
  limit: number;
}

interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

interface ILanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface ICountry {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  nativeName: string;
  currencies: ICurrency[];
  languages: ILanguage[];
  flag: string;
  cioc: string;
}

interface ICountryData {
  country: ICountry;
}

interface ICountryQuery {
  code: string;
}

interface ISelectCountryFunc {
  (country: ICountryAbstract): void;
}

interface IOnSearchTextChangeFunc {
  (text: string): void;
}

export type {
  ICountryAbstract,
  ICountriesData,
  ICountriesQuery,
  ICurrency,
  ILanguage,
  ICountry,
  ICountryData,
  ICountryQuery,
  ISelectCountryFunc,
  IOnSearchTextChangeFunc,
};
