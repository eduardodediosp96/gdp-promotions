import * as _moment from 'moment';
import { Moment } from 'moment';

const moment =  _moment;
export interface ItemplateFilter {
  templateName: string;
  typeId: string;
  events : Array<string>;
  platforms : Array<string>;
  processors : Array<string>;
}

export class TemplateFilter {
  templateName = "";
  currencyId= "";
  typeId= "";
  events = [];
  platforms = [];
  processors = [];

  constructor(model?) {
    Object.assign(this, model);
  }
}
