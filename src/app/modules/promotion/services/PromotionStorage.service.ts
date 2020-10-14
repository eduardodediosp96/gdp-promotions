import { Promotion } from './../promotion.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PromotionStorage {

    private promotionObs$: BehaviorSubject<Promotion> = new BehaviorSubject(null);

    getProfileObs(): Observable<Promotion> {
        return this.promotionObs$.asObservable();
    }

    setProfileObs(promotion: Promotion) {
        this.promotionObs$.next(promotion);
    }
}
