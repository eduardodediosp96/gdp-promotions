export interface Icurrency {
  currencyId : string;
  nameSingular : string;
  namePlural : string;
  symbol : string;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Event {
  currencyId = '';
  nameSingular = '';
  namePlural = '';
  symbol : '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
