import * as _moment from 'moment';
import { Moment } from 'moment';

const moment =  _moment;
export interface IpromotionFilter {
  code?: string;
  currencyId: string;
  typeId: string;
  events : Array<string>;
  lifeStart: string;
  fromSelector: string;
  lifeEnd: string;
  toSelector: string;
  quantityByIpSelector: string;
  quantityByIp: string;
  enableUsers:Array<string>;
  platforms : Array<string>;
  processors : Array<string>;
  active : number;
  condition : number;
  tags : Array<number>;
}

export class PromotionFilter {
  code= "";
  currencyId= "";
  typeId= "";
  events = [];
  lifeStart= "";
  fromSelector="gte";
  lifeEnd= "";
  toSelector="lte";
  quantityByIpSelector= "gte";
  quantityByIp= 1;
  enableUsers=[];
  platforms = [];
  processors = [];
  active = null;
  condition = null;
  tags = [];

  constructor(model?) {
    Object.assign(this, model);
  }
}
