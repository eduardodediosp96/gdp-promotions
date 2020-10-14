export interface ICountry {
  pKey?: string;
  countryId?: string;
  name?: string;
  codeStr?: string;
  codeNum?: string;
  icCode?: string;
  langId?: string;
  currencyId?: string;
  identId?: string;
  active?: string;
  testing?: string;
  insDatetime?: string;
}

export class Country {
  pKey = '';
  countryId = '';
  name = '';
  codeStr = '';
  codeNum = '';
  icCode = '';
  langId = '';
  currencyId = '';
  identId = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
