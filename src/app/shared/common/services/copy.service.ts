import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class copyPromotion {
  private copiedIdObs$: BehaviorSubject<number> = new BehaviorSubject(null);
  private promotionWhiteAction$: BehaviorSubject<string> = new BehaviorSubject('new');
  constructor() { }
  updatedCopiedId(data: number){
    return this.copiedIdObs$.next(data);
  }
  getCopiedId(): Observable<number> {
      return this.copiedIdObs$.asObservable();
  }
  updatedPromotionWhiteAction(data: string){
    return this.promotionWhiteAction$.next(data);
  }
  getPromotionWhiteAction(): Observable<string> {
      return this.promotionWhiteAction$.asObservable();
  }
}
