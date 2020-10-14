export interface ITransCurrency {
  currencyId?: string;
  langId?: string;
  nameSingular?: string;
  namePlural?: string;
  setUserId?:string;
  setDatetime?: string;
  setTimestamp?: string;
  currency?: {
    currencyId?: string;
    nameSingular?: string;
    namePlural?: string;
    symbol?: string;
    active?: string;
    testing?: string;
  };
  lang?: {
    langId?: string;
    name?: string;
    countryId?: string;
    active?: string;
    testing?: string;
  };
}

export class TransCurrency {
  currencyId?: '';
  langId?: '';
  nameSingular?: '';
  namePlural?: '';
  setUserId?:'';
  setDatetime?: '';
  setTimestamp?: '';
  currency?: {
    currencyId?: '';
    nameSingular?: '';
    namePlural?: '';
    symbol?: '';
    active?: '';
    testing?: '';
  };
  lang?: {
    langId?: '';
    name?: '';
    countryId?: '';
    active?: '';
    testing?: '';
  };

  constructor(model?) {
    Object.assign(this, model);
  }
}
