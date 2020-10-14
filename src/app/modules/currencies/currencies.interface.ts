export interface ICurrency {
  pKey?: string;
  currencyId?: string;
  nameSingular?: string;
  namePlural?: string;
  symbol?: string;
  active?: string;
  testing?: string;
  insDatetime?: string;
}

export class Currency {
  pKey = '';
  currencyId = '';
  nameSingular = '';
  namePlural = '';
  symbol = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
