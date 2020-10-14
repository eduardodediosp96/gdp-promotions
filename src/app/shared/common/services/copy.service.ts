import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class copyPromotion {
  private copiedIdObs$: BehaviorSubject<number> = new BehaviorSubject(null);
  constructor() { }
  updatedCopiedId(data: number){
    return this.copiedIdObs$.next(data);
  }
  getCopiedId(): Observable<number> {
      return this.copiedIdObs$.asObservable();
  }
}
