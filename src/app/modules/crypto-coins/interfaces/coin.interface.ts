export interface Icoin {
  id:string,
  symbol:string,
  name:string
}

export class Coin implements Icoin {
  id:'';
  symbol:'';
  name:'';
  currencyId = '';
  coinImage = '';
  coinPrice = '';
  coinRank = '';
  coinScore = '';
  description = '';
  coinLinks = [];
  Platform = [];

  constructor(model?) {
    Object.assign(this, model);
  }
}
