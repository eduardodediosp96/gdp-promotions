export interface Ilang {
  lKey : string;
  name : string;
  shortName : string;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Lang {
  iKey = '';
  name = '';
  shortName = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
