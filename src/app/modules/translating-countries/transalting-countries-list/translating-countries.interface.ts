export interface ITransCountry {
  countryId?: string;
  langId?: string;
  name?: string;
  setDatetime?: string;
  country?: {
    countryId: string;
    name: string;
    codeStr: string;
    codeNum: string;
    IcCode: string;
    active: string;
    testing: string;
  };
  lang?: {
    langId: string;
    name: string;
    countryId: string;
    active: string;
    testing: string;
  };
}

export class TransCountry {
  countryId? = '';
  langId? = '';
  setDatetime? = '';
  country = {
    countryId: '',
    name: '',
    codeStr: '',
    codeNum: '',
    IcCode: '',
    active: '',
    testing: '',
  };
  lang?: {
    langId: '';
    name: '';
    countryId: '';
    active: '';
    testing: '';
  };

  constructor(model?) {
    Object.assign(this, model);
  }
}
