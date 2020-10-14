export interface Itemplate {
  templateId?: string;
  name?: string;
  currencyId: string;
  typeName: string;
  enableUsers:Array<string>;
  restFactor: number,
  platforms : Array<string>;
  processors : Array<string>;
  events : Array<string>;
}

export class Template {
  templateId= '';
  name= '';
  currencyId= '';
  typeName= '';
  enableUsers=[];
  restFactor= 0;
  platforms = [];
  processors = [];
  events = [];

  constructor(model?) {
    Object.assign(this, model);
  }
}
