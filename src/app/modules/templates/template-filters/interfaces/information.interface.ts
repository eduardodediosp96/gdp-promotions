import { Ilang } from './lang.interface';
export interface Iinformation {
  iKey : string;
  content : string;
  lang : Ilang;
  active : string;
  testing : string;
  insDatetime : string;
}

export class Infotmation {
  iKey = '';
  content = '';
  lang = '';
  active = '';
  testing = '';
  insDatetime = '';

  constructor(model?) {
    Object.assign(this, model);
  }

}
