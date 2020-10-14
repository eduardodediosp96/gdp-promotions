export interface Itype {
  tKey : string;
  name : string;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Type {
  tKey = '';
  name = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
