export interface Iresources {
  currencies: Array<string>;
  types: Array<string>;
  events : Array<string>;
  enableUsers:Array<string>;
  ptAppliesCoupon:Array<string>;
  platforms : Array<string>;
  processors : Array<string>;
  tags : Array<string>;
}

export class Resources {
  currencies= [];
  types= [];
  events = [];
  enableUser = [];
  ptAppliesCoupon = [];
  platforms = [];
  processors = [];
  tags = [];

  constructor(model?) {
    Object.assign(this, model);
  }
}
