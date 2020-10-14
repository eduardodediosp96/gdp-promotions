import { Infotmation } from './interfaces/information.interface';
import { Iplatform } from './interfaces/platform.interface';
import { Iprocessor } from './interfaces/processor.interface copy';
import { IenableUser } from './interfaces/enableUser.interface';
import { Itag } from './interfaces/tag.interface';
import { Ievent } from './interfaces/event.interface';

export interface Ipromotion {
  code?: string;
  codeId?: number;
  currencyId: string;
  typeId: string;
  template: string;
  description: string;
  lifeStart: string;
  lifeEnd: string;
  bonus: string;
  amountStart: string,
  amountEnd: string,
  paymentLimit: string,
  quantityByIp: string,
  quantityByUser: string,
  quantityTotal: string,
  frequency: string;
  restrictionFactor: number,
  appliesTo: string,
  enableUsers:Array<string>;
  active : string;
  testing : string;
  setUserId: string;
  playthrough: boolean;
  tags : Array<string>;
  processors : Array<string>;
  platforms : Array<string>;
  events : Array<string>;
  information:Array<object>;
}

export class Promotion {
  code= "";
  codeId= 0;
  currencyId= "";
  typeId= "";
  template= "";
  description= "";
  lifeStart= "";
  lifeEnd= "";
  bonus= 0;
  amountStart= 0;
  amountEnd= 0;
  paymentLimit= 0;
  quantityByIp= 0;
  quantityByUser= "";
  quantityTotal= "";
  frequency= "";
  restrictionFactor= 0;
  appliesTo= "";
  enableUsers= [];
  active= 1;
  testing= 1;
  setUserId= 0;
  playthrough= false;
  tags= [];
  processors= [];
  platforms= [];
  events= [];
  information= [];

  constructor(model?) {
    Object.assign(this, model);
  }
}
