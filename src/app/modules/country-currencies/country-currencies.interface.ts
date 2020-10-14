import { ICountry, Country } from '../country/country.interface';
import { ICurrency, Currency } from '../currencies/currencies.interface';

export interface ICountryCurrency {
  countryId?: string;
  currencyId?: string;
  country?: ICountry;
  currency?: ICurrency;
}

export class CountryCurrency {
  countryId = '';
  currencyId = '';
  country = new Country();
  currency = new Currency();

  constructor(model?) {
    Object.assign(this, model);
    this.country = new Country(this.country);
    this.currency = new Currency(this.currency);
  }

}
