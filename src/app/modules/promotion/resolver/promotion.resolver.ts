import { Ipromotion, Promotion } from './../promotion.interface';
import { promotionService } from '../promotion.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class promotionResolver implements Resolve<any> {
  constructor(private service: promotionService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // return this.service.getProperty(route.params['id'])
    // var resolver:Observable<any> = {
    // 'resources':this.service.resources({ headers:  [] }),
    // 'loadedUser':this.service.item(route.params['id'])
    // }
    var item: any = null;
    console.log('muestrame la ruta mierda', route.params)
    if(route.params['id'] != 'new')
    item = this.service.item({id: route.params['id'], headers:  [] })
    return item
  }
}
