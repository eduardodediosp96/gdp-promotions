export interface ICallingCode {
  pKey?: string;
  icCode?: string;
  countryId?: string;
  active?: string;
  testing?: string;
  insDatetime?: string;
}

export class CallingCode {
  pKey = '';
  icCode = '';
  countryId = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }
}
