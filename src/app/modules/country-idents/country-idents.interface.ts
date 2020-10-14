import { ICountry, Country } from '../country/country.interface';
import { IIdents, Ident } from '../idents/idents.interface';

export interface ICountryIdents {
  countryId?: string;
  identId?: string;
  onlyDigits?: string;
  lenMin?: number;
  lenMax?: number;
  setDatetime?: string;
  country?: ICountry;
  ident?: IIdents;
}

export class CountryIdents {
  countryId = '';
  identId = '';
  onlyDigits = '';
  lenMin = 0;
  lenMax = 0;
  setDatetime = '';
  country = new Country();
  ident = new Ident();

  constructor(model?) {
    Object.assign(this, model);
    this.country = new Country(this.country);
    this.ident = new Ident(this.ident);
  }

}
